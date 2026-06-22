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
        {items.map((item, index) => (
          <motion.div
            key={item.slug}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0.08 * index}
            className="group relative flex min-h-[55vh] flex-col items-center justify-center overflow-hidden rounded-[1.6rem] bg-cover bg-center bg-no-repeat transition hover:scale-[1.01] active:scale-[0.99] sm:min-h-[60vh] md:min-h-[65vh] lg:h-[calc(100vh-3rem)]"
            style={{
              backgroundImage: `url(/SectionsBackgrounds/${item.image})`,
            }}
          >
            <div className="absolute inset-0 bg-[color:var(--color-primary)]/55 transition group-hover:bg-[color:var(--color-primary)]/40" />

            <div className="relative flex flex-col items-center gap-4 text-center">
              <h3 className="font-change-serif-bold text-3xl uppercase tracking-[0.12em] text-white sm:text-4xl md:text-5xl">
                {item.label}
              </h3>

              <motion.span
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 sm:text-xs"
                whileHover="hover"
              >
                <span>{current.clickForMore}</span>
                <motion.span
                  aria-hidden
                  className="inline-block"
                  animate={{ x: [0, 6, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ x: 8 }}
                >
                  →
                </motion.span>
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
