"use client";

import Link from "next/link";
import enMessages from "@/locales/en.json";
import itMessages from "@/locales/it.json";

type SectionsProps = {
  lang: "it" | "en";
};

type SectionItem = (typeof itMessages.sections.items)[number] &
  (typeof enMessages.sections.items)[number];

const content = {
  it: itMessages.sections,
  en: enMessages.sections,
} as const;

export default function TwoLionsDivisions({ lang }: SectionsProps) {
  const current = content[lang];
  const items = (current.items ?? []) as SectionItem[];
  const divisionRoutes: Partial<Record<SectionItem["slug"], string>> = {
    "publicity-advertising": "/identity-advertising",
    "food-and-beverage": "/food-and-beverage",
  };

  return (
    <section
      id="sections"
      className="bg-[color:var(--color-primary)] px-4 py-10 sm:px-5 md:px-8 md:py-14 lg:p-6"
    >
      <h2 className="pt-10 pb-8 text-[color:var(--color-white)] font-change-serif-bold max-w-[14ch] text-[2.1rem] leading-[0.94] uppercase tracking-[0.015em] sm:max-w-[16ch] sm:text-[2.5rem] md:max-w-[18ch] md:text-[3.4rem] xl:max-w-[20ch] xl:text-[4rem]">
        {current.title}
      </h2>
      <div className="pt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {items.map((item) => {
          const hasBackgroundImage = Boolean(item.image?.trim());
          const divisionRoute = divisionRoutes[item.slug];

          return (
            <div
              key={item.slug}
              className={`group relative flex min-h-[55vh] flex-col items-center justify-center overflow-hidden bg-center bg-no-repeat sm:min-h-[60vh] md:min-h-[42vh] lg:min-h-[26rem] xl:min-h-[30rem] ${hasBackgroundImage
                ? "bg-cover"
                : "bg-[color:var(--color-secondary)]"
                }`}
              style={
                hasBackgroundImage
                  ? {
                    backgroundImage: `url(/SectionsBackgrounds/${item.image})`,
                  }
                  : undefined
              }
            >
              {hasBackgroundImage ? (
                <div className="absolute inset-0 bg-[color:var(--color-primary)]/55" />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_62%)]" />
              )}

              {!hasBackgroundImage ? (
                <div className="absolute inset-0 flex items-center justify-center px-10">
                  <div
                    aria-hidden
                    className="w-full max-w-[18rem] sm:max-w-[22rem] lg:max-w-[26rem]"
                    style={{
                      aspectRatio: "1 / 1",
                      backgroundColor: "var(--color-primary)",
                      WebkitMaskImage:
                        "url('/twoLions_logo.png')",
                      maskImage: "url('/twoLions_logo.png')",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                    }}
                  />
                </div>
              ) : null}

              <div className="absolute bottom-0 left-0 flex flex-col items-start gap-4 px-5 pb-5 text-left lg:px-5">
                <h3
                  className="font-change-serif-bold text-2xl leading-[0.95] uppercase tracking-[0.1em] text-white drop-shadow-[0_10px_30px_rgba(0,35,91,0.28)] sm:text-4xl md:text-[clamp(2rem,4vw,3.2rem)] lg:text-[clamp(1.9rem,2.2vw,2.8rem)]"
                >
                  {item.label}
                </h3>

                {divisionRoute ? (
                  <Link
                    href={divisionRoute}
                    className="inline-flex items-center border border-[color:var(--color-thirdary)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] transition hover:bg-[color:var(--color-thirdary)] hover:text-[color:var(--color-white)] hover:border-[color:var(--color-thirdary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:text-xs"
                  >
                    Explore Division
                  </Link>
                ) : (
                    <span className="inline-flex items-center border border-[color:var(--color-thirdary)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] transition hover:bg-[color:var(--color-thirdary)] hover:text-[color:var(--color-white)] hover:border-[color:var(--color-thirdary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:text-xs">
                    explore division
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
