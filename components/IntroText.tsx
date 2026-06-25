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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-secondary)]/35 via-[color:var(--color-secondary)]/10 to-transparent md:h-40" />
      <div className="pointer-events-none absolute inset-x-4 top-24 h-px bg-[linear-gradient(90deg,rgba(32,26,91,0),rgba(32,26,91,0.18),rgba(32,26,91,0))] md:inset-x-8 xl:inset-x-14" />

      <div className="relative mx-auto flex max-w-md flex-col gap-8 md:max-w-3xl md:gap-10 xl:max-w-7xl xl:gap-14">
        <div className="space-y-5 md:space-y-6">
          <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-secondary)] sm:text-[11px] md:mb-4 md:text-xs">
            {content.eyebrow}
          </p>

          <h2 className="font-change-serif-bold max-w-[10ch] text-3xl leading-[0.92] tracking-[0.03em] uppercase sm:text-[2.2rem] md:max-w-none md:text-5xl xl:text-6xl 2xl:text-7xl">
            {content.title}
          </h2>

          <p className="max-w-xl text-sm leading-6 text-primary/80 font-bold sm:text-[15px] md:text-lg md:leading-8 xl:text-xl">
            {content.subtitle}
          </p>

          <p className="max-w-2xl border-l border-[color:var(--color-secondary)]/70 pl-4 text-sm leading-7 text-primary/78 md:pl-6 md:text-base xl:text-lg xl:leading-8">
            {content.body}
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:items-start xl:gap-8">
          <div className="border border-[color:var(--color-primary)]/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(143,140,173,0.08))] p-5 shadow-[0_28px_70px_-58px_rgba(32,26,91,0.3)] sm:p-6 md:p-8">
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-[color:var(--color-primary)]/10 pb-4 md:mb-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-secondary)] md:text-xs">
                {content.listTitle}
              </h3>
              <span className="text-[10px] uppercase tracking-[0.26em] text-primary/32 md:text-[11px]">
                01
              </span>
            </div>
            <ul className="space-y-4 text-sm leading-6 text-primary/82 sm:text-[15px] md:text-base md:leading-7">
              {content.listItems.map((item) => (
                <li key={item} className="flex gap-3 border-b border-[color:var(--color-primary)]/8 pb-4 last:border-b-0 last:pb-0">
                  <span className="mt-3 h-px w-5 shrink-0 bg-[color:var(--color-primary)]/55" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:gap-6">
            <div className="border border-[color:var(--color-primary)]/22 bg-[color:var(--color-primary)] px-5 py-6 text-white shadow-[0_30px_72px_-58px_rgba(32,26,91,0.6)] sm:px-6 md:px-7 md:py-7">
              <div className="mb-5 flex items-end justify-between gap-4 border-b border-white/10 pb-4 md:mb-6">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-secondary)] md:text-xs">
                  {content.divisionsTitle}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.26em] text-white/28 md:text-[11px]">
                  02
                </span>
              </div>
              <ul className="space-y-3 text-sm leading-6 text-white/88 sm:text-[15px] md:leading-7">
                {content.divisions.map((division) => (
                  <li key={division} className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                    {division}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[color:var(--color-secondary)]/55 bg-[linear-gradient(180deg,rgba(143,140,173,0.22),rgba(255,255,255,0.92))] px-5 py-6 sm:px-6 md:px-7 md:py-7">
              <div className="mb-5 flex items-end justify-between gap-4 border-b border-[color:var(--color-primary)]/10 pb-4 md:mb-6">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/70 md:text-xs">
                  {content.geographicFocusTitle}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.26em] text-primary/32 md:text-[11px]">
                  03
                </span>
              </div>
              <ul className="space-y-3 text-sm leading-6 text-primary/84 sm:text-[15px] md:leading-7">
                {content.geographicFocus.map((area) => (
                  <li key={area} className="border-b border-[color:var(--color-primary)]/8 pb-3 last:border-b-0 last:pb-0">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
