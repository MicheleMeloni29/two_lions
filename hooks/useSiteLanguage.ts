"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { SiteLang } from "@/lib/siteNavigation";
import {
  DEFAULT_SITE_LANGUAGE,
  isSiteLanguage,
  SITE_LANGUAGE_STORAGE_KEY,
} from "@/lib/siteLanguage";

let currentLanguage = DEFAULT_SITE_LANGUAGE;
const listeners = new Set<() => void>();

function readStoredLanguage() {
  try {
    const storedLanguage = window.localStorage.getItem(
      SITE_LANGUAGE_STORAGE_KEY
    );
    return isSiteLanguage(storedLanguage)
      ? storedLanguage
      : DEFAULT_SITE_LANGUAGE;
  } catch {
    return DEFAULT_SITE_LANGUAGE;
  }
}

function updateDocumentLanguage(language: SiteLang) {
  document.documentElement.lang = language;
}

function emitLanguageChange() {
  listeners.forEach((listener) => listener());
}

function syncLanguageFromStorage(shouldNotify = true) {
  const storedLanguage = readStoredLanguage();
  updateDocumentLanguage(storedLanguage);

  if (storedLanguage !== currentLanguage) {
    currentLanguage = storedLanguage;
    if (shouldNotify) {
      emitLanguageChange();
    }
  }
}

function handleStorage(event: StorageEvent) {
  if (event.key === SITE_LANGUAGE_STORAGE_KEY) {
    syncLanguageFromStorage();
  }
}

function subscribe(listener: () => void) {
  const isFirstSubscriber = listeners.size === 0;
  listeners.add(listener);

  if (isFirstSubscriber) {
    syncLanguageFromStorage(false);
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0) {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function getLanguageSnapshot() {
  return currentLanguage;
}

function getServerLanguageSnapshot() {
  return DEFAULT_SITE_LANGUAGE;
}

function persistLanguage(language: SiteLang) {
  currentLanguage = language;
  updateDocumentLanguage(language);

  try {
    window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, language);
  } catch {
    // The in-memory preference still works when storage is unavailable.
  }

  emitLanguageChange();
}

export function useSiteLanguage() {
  const lang = useSyncExternalStore(
    subscribe,
    getLanguageSnapshot,
    getServerLanguageSnapshot
  );
  const setLang = useCallback((language: SiteLang) => {
    persistLanguage(language);
  }, []);
  const toggleLang = useCallback(() => {
    persistLanguage(currentLanguage === "it" ? "en" : "it");
  }, []);

  return { lang, setLang, toggleLang };
}
