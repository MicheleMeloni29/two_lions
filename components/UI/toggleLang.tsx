"use client";

type ToggleLangProps = {
  lang: "it" | "en";
  onToggle: () => void;
  className?: string;
};

export default function ToggleLang({
  lang,
  onToggle,
  className = "",
}: ToggleLangProps) {
  const isEnglish = lang === "en";

  return (
    <div className={`flex items-center gap-1 ${className}`.trim()}>
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
        onClick={onToggle}
        className="relative h-7 w-13 rounded-full transition-colors duration-300 ease-out md:h-8 md:w-15"
        style={{
          backgroundColor: "var(--color-secondary)",
          borderColor: "var(--color-primary)",
        }}
        aria-label={
          lang === "it" ? "Cambia lingua: EN" : "Switch language: IT"
        }
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
