"use client";

import { Sun, Moon } from "lucide-react";
import { useAdminTheme } from "@/hooks/useAdminTheme";

type AdminThemeSwitchProps = {
  className?: string;
};

export default function AdminThemeSwitch({
  className = "",
}: AdminThemeSwitchProps) {
  const { isDark, toggleTheme } = useAdminTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      title={isDark ? "Passa al tema chiaro" : "Passa al tema scuro"}
      aria-label={isDark ? "Passa al tema chiaro" : "Passa al tema scuro"}
      className={[
        "group relative inline-flex h-8 w-15 sm:h-9 sm:w-16 shrink-0 cursor-pointer items-center rounded-full border p-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-thirdary)]",
        isDark
          ? "border-[color:rgba(181,154,90,0.55)] bg-[color:var(--color-primary)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.35)] hover:border-[color:var(--color-thirdary)]"
          : "border-[color:rgba(181,154,90,0.45)] bg-[color:var(--color-white)] shadow-xs hover:border-[color:var(--color-thirdary)]",
        className,
      ]
        .join(" ")
        .trim()}
    >
      {/* Icone di sfondo (Sole a sinistra, Luna a destra) sempre leggibili */}
      <span className="pointer-events-none flex w-full items-center justify-between px-1">
        <Sun
          className={[
            "h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors duration-300",
            isDark
              ? "text-[color:var(--color-thirdary)]/80 group-hover:text-[color:var(--color-thirdary)]"
              : "text-transparent",
          ].join(" ")}
          aria-hidden="true"
        />
        <Moon
          className={[
            "h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors duration-300",
            isDark
              ? "text-transparent"
              : "text-[color:var(--color-primary)]/70 group-hover:text-[color:var(--color-primary)]",
          ].join(" ")}
          aria-hidden="true"
        />
      </span>

      {/* Cursore scorrevole con icona attiva */}
      <span
        className={[
          "pointer-events-none absolute top-1/2 flex h-6 w-6 sm:h-7 sm:w-7 -translate-y-1/2 items-center justify-center rounded-full shadow-sm transition-all duration-300 ease-out",
          isDark
            ? "left-[calc(100%-1.75rem)] sm:left-[calc(100%-2rem)] bg-[color:var(--color-thirdary)] text-[color:var(--color-white)]"
            : "left-1 bg-[color:var(--color-primary)] text-[color:var(--color-thirdary)] group-hover:bg-[color:var(--color-thirdary)] group-hover:text-[color:var(--color-white)]",
        ].join(" ")}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
        ) : (
          <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
