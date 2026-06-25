"use client";

import enMessages from "@/locales/en.json";
import itMessages from "@/locales/it.json";

type IntroTextProps = {
  lang: "it" | "en";
};

const introContent = {
  it: itMessages.introText,
  en: enMessages.introText,
} as const;

export default function IntroText({ lang }: IntroTextProps) {
  const content = introContent[lang];

  return (
    <section
      id="intro-text"
      className="relative overflow-hidden bg-white px-4 pb-18 pt-28 text-primary sm:px-5 md:px-8 md:pb-24 md:pt-32 xl:px-14 xl:pb-32 xl:pt-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-secondary)]/25 via-[color:var(--color-secondary)]/10 to-transparent md:h-40" />

      <div className="relative mx-auto flex max-w-md flex-col gap-8 md:max-w-3xl md:gap-10 xl:max-w-7xl xl:gap-12">
        <div className="space-y-5 md:space-y-6">
          <p className="mb-4 text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-secondary)] sm:text-[10px] md:text-[11px]">
            {content.eyebrow}
          </p>

          <h2 className="font-change-serif-bold max-w-[14ch] text-[2.1rem] leading-[0.94] uppercase tracking-[0.015em] sm:max-w-[16ch] sm:text-[2.5rem] md:max-w-[18ch] md:text-[3.4rem] xl:max-w-[20ch] xl:text-[4rem]">
            {content.title}
          </h2>

          <p className="max-w-3xl border-l border-[color:var(--color-primary)]/65 pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
            {content.subtitle}
          </p>

          <p className="max-w-4xl text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7">
            {content.body}
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.95fr)_minmax(0,0.8fr)] xl:items-start xl:gap-5">
          <div className="border border-[color:var(--color-secondary)]/45 bg-white p-5 md:p-7 xl:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-secondary)] sm:text-[10px] md:text-[11px]">
                {content.listTitle}
              </h3>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-secondary)]/80 sm:text-[10px]">
                01
              </span>
            </div>
            <ul className="space-y-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7">
              {content.listItems.map((item) => (
                <li key={item} className="flex gap-3 border-b border-[color:var(--color-secondary)]/28 pb-4 last:border-b-0 last:pb-0">
                  <span className="mt-3 h-px w-5 shrink-0 bg-[color:var(--color-secondary)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-[color:var(--color-primary)] bg-[color:var(--color-primary)] px-5 py-6 text-[color:var(--color-white)] md:px-6 md:py-7">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-secondary)] sm:text-[10px] md:text-[11px]">
                {content.divisionsTitle}
              </h3>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-secondary)]/80 sm:text-[10px]">
                02
              </span>
            </div>
            <ul className="space-y-3 text-[13px] leading-6 text-[color:var(--color-white)] sm:text-sm md:text-[15px] md:leading-7">
              {content.divisions.map((division) => (
                <li key={division} className="border-b border-[color:var(--color-white)]/18 pb-3 last:border-b-0 last:pb-0">
                  {division}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-[color:var(--color-secondary)]/45 bg-white px-5 py-6 md:px-6 md:py-7">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-secondary)] sm:text-[10px] md:text-[11px]">
                {content.geographicFocusTitle}
              </h3>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-secondary)]/80 sm:text-[10px]">
                03
              </span>
            </div>
            <ul className="space-y-3 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7">
              {content.geographicFocus.map((area) => (
                <li key={area} className="border-b border-[color:var(--color-secondary)]/28 pb-3 last:border-b-0 last:pb-0">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
