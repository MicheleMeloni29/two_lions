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

            <ContinuousLoopCarousel
              items={activityItems}
              viewportClassName="relative left-1/2 w-screen -translate-x-1/2"
              trackClassName="gap-20 sm:gap-24 lg:gap-35"
              cardClassName="h-[8.75rem] w-[11.25rem] px-3 py-3 sm:h-[9.5rem] sm:w-[12.75rem] sm:px-4 sm:py-4 md:h-[10.5rem] md:w-[15rem] md:px-5 lg:h-[11rem] lg:w-[16.5rem] xl:w-[18rem]"
              descriptionClassName="flex h-full items-center justify-center bg-[color:var(--color-secondary)] border-2 rounded-full border-[color:var(--color-thirdary)] px-4 py-4 text-center text-[13px] leading-6 text-[color:var(--color-white)] sm:text-sm md:text-[15px] md:leading-7"
            />
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
