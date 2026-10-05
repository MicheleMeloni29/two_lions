"use client";

import { useCallback, useSyncExternalStore } from "react";

export type AdminTheme = "light" | "dark";

export const ADMIN_THEME_STORAGE_KEY = "tl_admin_theme";
export const DEFAULT_ADMIN_THEME: AdminTheme = "light";

let currentTheme: AdminTheme = DEFAULT_ADMIN_THEME;
const listeners = new Set<() => void>();

function isAdminTheme(value: string | null): value is AdminTheme {
  return value === "light" || value === "dark";
}

function readStoredTheme(): AdminTheme {
  if (typeof window === "undefined") return DEFAULT_ADMIN_THEME;
  try {
    const stored = window.localStorage.getItem(ADMIN_THEME_STORAGE_KEY);
    return isAdminTheme(stored) ? stored : DEFAULT_ADMIN_THEME;
  } catch {
    return DEFAULT_ADMIN_THEME;
  }
}

function emitThemeChange() {
  listeners.forEach((listener) => listener());
}

function syncThemeFromStorage(shouldNotify = true) {
  const stored = readStoredTheme();
  if (stored !== currentTheme) {
    currentTheme = stored;
    if (shouldNotify) {
      emitThemeChange();
    }
  }
}

function handleStorage(event: StorageEvent) {
  if (event.key === ADMIN_THEME_STORAGE_KEY) {
    syncThemeFromStorage();
  }
}

function subscribe(listener: () => void) {
  const isFirstSubscriber = listeners.size === 0;
  listeners.add(listener);

  if (isFirstSubscriber && typeof window !== "undefined") {
    syncThemeFromStorage(false);
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function getThemeSnapshot(): AdminTheme {
  return currentTheme;
}

function getServerThemeSnapshot(): AdminTheme {
  return DEFAULT_ADMIN_THEME;
}

function persistTheme(theme: AdminTheme) {
  currentTheme = theme;
  try {
    window.localStorage.setItem(ADMIN_THEME_STORAGE_KEY, theme);
  } catch {
    // Fallback in-memory se localStorage non è disponibile
  }
  emitThemeChange();
}

export function useAdminTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const setTheme = useCallback((nextTheme: AdminTheme) => {
    persistTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    persistTheme(currentTheme === "light" ? "dark" : "light");
  }, []);

  return {
    theme,
    isDark: theme === "dark",
    setTheme,
    toggleTheme,
  };
}
