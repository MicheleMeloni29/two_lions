import type { SiteLang } from "@/lib/siteNavigation";

export const DEFAULT_SITE_LANGUAGE: SiteLang = "en";
export const SITE_LANGUAGE_STORAGE_KEY = "two-lions.language.v1";

export function isSiteLanguage(value: string | null): value is SiteLang {
  return value === "it" || value === "en";
}
