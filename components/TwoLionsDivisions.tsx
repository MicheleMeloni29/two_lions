"use client";

import { motion } from "framer-motion";
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

  return (
    <section
      id="sections"
      className="bg-[color:var(--color-primary)] px-4 py-10 sm:px-5 md:px-8 md:py-14 lg:p-6"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {items.map((item) => {
          const hasBackgroundImage = Boolean(item.image?.trim());

          return (
            <div
              key={item.slug}
              className={`group relative flex min-h-[55vh] flex-col items-center justify-center overflow-hidden bg-center bg-no-repeat sm:min-h-[60vh] md:min-h-[42vh] lg:min-h-[26rem] xl:min-h-[30rem] ${
                hasBackgroundImage
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
                        "url('/SectionsBackgrounds/twoLions_logo.png')",
                      maskImage: "url('/SectionsBackgrounds/twoLions_logo.png')",
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

              <div className="relative flex flex-col items-center gap-4 px-5 text-center lg:px-5">
                <h3
                  className="font-change-serif-bold text-3xl leading-[0.95] uppercase tracking-[0.1em] text-white drop-shadow-[0_10px_30px_rgba(0,35,91,0.28)] sm:text-4xl md:text-[clamp(2rem,4vw,3.2rem)] lg:text-[clamp(1.9rem,2.2vw,2.8rem)]"
                >
                  {item.label}
                </h3>

                <motion.span
                  className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 drop-shadow-[0_8px_24px_rgba(0,35,91,0.24)] sm:text-xs"
                  animate={{
                    opacity: [0.72, 1, 0.72],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span>explore division</span>
                </motion.span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
