// Button to toggle the language between Italian and English.
"use client";

import { useState } from "react";

export default function ToggleLang() {
  const [lang, setLang] = useState<"it" | "en">("it");
  const isEnglish = lang === "en";

  return (
    <div className="fixed top-3 right-3 z-[60] flex items-center gap-1 md:top-6 md:right-6">
      <span
        className="text-xs font-bold uppercase tracking-[0.25em] transition-colors md:text-sm"
        style={{
          color: isEnglish
            ? "var(--color-light-blue)"
            : "var(--color-primary)",
        }}
      >
        IT
      </span>

      <button
        type="button"
        onClick={() => setLang((prev) => (prev === "it" ? "en" : "it"))}
        className="relative h-7 w-13 rounded-full  transition-colors duration-300 ease-out md:h-8 md:w-15"
        style={{
          backgroundColor: "var(--color-secondary)",
          borderColor: "var(--color-primary)",
        }}
        aria-label={`Cambia lingua: ${lang.toUpperCase()}`}
        aria-pressed={isEnglish}
      >
        <span
          className={`absolute top-[3px] flex h-5 w-5 items-center justify-center transition-all duration-300 ease-out md:top-[3px] md:h-6 md:w-6 ${
            isEnglish ? "left-[27px] md:left-[31px]" : "left-[3px]"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-[28px] w-[28px] md:h-5 md:w-5"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="8.5" />
            <path d="M3.5 12h17" />
            <path d="M12 3.5c2.4 2.3 3.8 5.3 3.8 8.5S14.4 18.2 12 20.5c-2.4-2.3-3.8-5.3-3.8-8.5S9.6 5.8 12 3.5Z" />
          </svg>
        </span>
      </button>

      <span
        className="text-xs font-bold uppercase tracking-[0.25em] transition-colors md:text-sm"
        style={{
          color: isEnglish
            ? "var(--color-primary)"
            : "var(--color-secondary)",
        }}
      >
        EN
      </span>
    </div>
  );
}
