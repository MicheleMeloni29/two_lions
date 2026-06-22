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

const fadeUp = {
  hidden: { opacity: 0, y: 42 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function TwoLionsSections({ lang }: SectionsProps) {
  const current = content[lang];
  const items = (current.items ?? []) as SectionItem[];

  return (
    <section
      id="sections"
      className="bg-[color:var(--color-primary)] px-4 py-10 sm:px-5 md:px-8 md:py-14 lg:p-6"
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
        {items.map((item, index) => {
          const hasBackgroundImage = Boolean(item.image?.trim());

          return (
            <motion.div
              key={item.slug}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={0.08 * index}
              className={`group relative flex min-h-[55vh] flex-col items-center justify-center overflow-hidden rounded-[1.6rem] bg-center bg-no-repeat transition hover:scale-[1.01] active:scale-[0.99] sm:min-h-[60vh] md:min-h-[65vh] lg:h-[calc(100vh-3rem)] ${
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
                <div className="absolute inset-0 bg-[color:var(--color-primary)]/55 transition group-hover:bg-[color:var(--color-primary)]/40" />
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

              <div className="relative flex flex-col items-center gap-4 px-6 text-center">
                <h3
                  className="font-change-serif-bold text-3xl uppercase tracking-[0.12em] text-white drop-shadow-[0_10px_30px_rgba(0,35,91,0.28)] sm:text-4xl md:text-5xl"
                >
                  {item.label}
                </h3>

                <motion.span
                  className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 drop-shadow-[0_8px_24px_rgba(0,35,91,0.24)] sm:text-xs"
                  animate={{
                    opacity: [0.68, 1, 0.68],
                    y: [0, -4, 0],
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    opacity: 1,
                    scale: 1.04,
                  }}
                >
                  <span>{current.clickForMore}</span>
                </motion.span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
