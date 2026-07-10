"use client";

import enMessages from "@/locales/en.json";
import itMessages from "@/locales/it.json";
import ContinuousLoopCarousel from "./UI/ContinuousLoopCarousel";

type IntroTextProps = {
  lang: "it" | "en";
};

const introContent = {
  it: itMessages.introText,
  en: enMessages.introText,
} as const;

export default function IntroText({ lang }: IntroTextProps) {
  const content = introContent[lang];
  const activityItems = content.listItems.map((item, index) => ({
    id: index,
    description: item,
    content: (
      <div className="flex h-full w-full flex-col justify-between border border-[color:var(--color-primary)]/10 bg-[color:var(--color-white)]/94 px-4 py-4 text-left shadow-[0_18px_38px_rgba(31,39,92,0.08)] backdrop-blur-[2px] sm:px-5 sm:py-5">
        <div className="h-px w-10 bg-[color:var(--color-thirdary)]/45" />
        <p className="mt-4 flex-1 text-[13px] leading-6 text-[color:var(--color-primary)] sm:text-sm md:text-[15px] md:leading-7">
          {item}
        </p>
        <div className="mt-4 h-px w-12 bg-[color:var(--color-secondary)]/18" />
      </div>
    ),
  }));

  return (
    <section
      id="intro-text"
      className="relative overflow-hidden px-4 pb-18 pt-28 text-primary sm:px-5 md:px-8 md:pb-24 md:pt-32 xl:px-14 xl:pb-32 xl:pt-36"
    >
      <div className="absolute inset-0 bg-[url('/IntroText_Background.jpeg')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-white/68" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-secondary)]/50 via-[color:var(--color-secondary)]/20 to-transparent md:h-40" />

      <div className="relative mx-auto flex max-w-md flex-col gap-12 md:max-w-3xl md:gap-14 xl:max-w-7xl xl:gap-16">
        <div className="space-y-5 md:space-y-6">
          <p className="mb-4 text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
            {content.eyebrow}
          </p>

          <h2 className="font-change-serif-bold max-w-[14ch] text-[2.1rem] leading-[0.94] uppercase tracking-[0.015em] sm:max-w-[16ch] sm:text-[2.5rem] md:max-w-[18ch] md:text-[3.4rem] xl:max-w-[20ch] xl:text-[4rem]">
            {content.title}
          </h2>

          <p className="max-w-4xl border-l-2 border-[color:var(--color-thirdary)]/65 pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7">
            {content.body}
          </p>
        </div>

        <div className="space-y-12 md:space-y-14 xl:space-y-16">
          <div className="space-y-7 md:space-y-9 xl:space-y-10">
            <div className="px-5 md:px-7 xl:px-8">
              <h3 className="pt-10 text-[9px] font-extrabold uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                {content.listTitle}
              </h3>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-linear-to-r from-white/75 via-white/30 to-transparent sm:w-10 md:w-12" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-linear-to-l from-white/75 via-white/30 to-transparent sm:w-10 md:w-12" />

              <div className="px-5 md:px-7 xl:px-8">
                <ContinuousLoopCarousel
                  items={activityItems}
                  duration={24}
                  viewportClassName="w-full"
                  trackClassName="gap-6 pr-6 md:gap-7 md:pr-7 xl:gap-9 xl:pr-9 2xl:gap-11 2xl:pr-11"
                  cardClassName="h-[9.75rem] w-[13.5rem] sm:h-[10.25rem] sm:w-[14.25rem] md:h-[10.75rem] md:w-[15rem] xl:h-[11.25rem] xl:w-[15.75rem]"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:gap-36">
            <div className="bg-primary px-5 py-6 text-white md:px-6 md:py-7">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                  {content.divisionsTitle}
                </h3>
              </div>
              <ul className="space-y-3 text-[13px] leading-6 text-[color:var(--color-white)] sm:text-sm md:text-[15px] md:leading-7">
                {content.divisions.map((division) => (
                  <li key={division} className="border-b border-[color:var(--color-white)]/18 pb-3 last:border-b-0 last:pb-0">
                    {division}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-secondary px-5 py-6 md:px-6 md:py-7">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                  {content.geographicFocusTitle}
                </h3>
              </div>
              <ul className="space-y-3 text-[13px] leading-6 text-[color:var(--color-white)] sm:text-sm md:text-[15px] md:leading-7">
                {content.geographicFocus.map((area) => (
                  <li key={area} className="border-b border-[color:var(--color-white)]/18 pb-3 last:border-b-0 last:pb-0">
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
