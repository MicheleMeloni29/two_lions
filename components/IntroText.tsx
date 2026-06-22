"use client";

import { motion } from "framer-motion";
import enMessages from "@/locales/en.json";
import itMessages from "@/locales/it.json";

type IntroTextProps = {
  lang: "it" | "en";
};

const introContent = {
  it: itMessages.introText,
  en: enMessages.introText,
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

export default function IntroText({ lang }: IntroTextProps) {
  const content = introContent[lang];

  return (
    <section
      id="intro-text"
      className="relative overflow-hidden bg-white px-4 pb-18 pt-28 text-primary sm:px-5 md:px-8 md:pb-24 md:pt-32 xl:px-14 xl:pb-32 xl:pt-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-secondary)] to-secondaty/50 md:h-40" />
      <div className="pointer-events-none absolute -right-12 top-14 h-36 w-36 rounded-full bg-[color:var(--color-secondary)]/30 blur-3xl md:-right-20 md:top-20 md:h-52 md:w-52" />

      <div className="relative mx-auto flex max-w-md flex-col gap-8 md:max-w-3xl md:gap-10 xl:max-w-7xl xl:gap-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-5 md:space-y-6"
        >
          <motion.div variants={fadeUp} custom={0.05}>
            <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-secondary)] sm:text-[11px] md:mb-4 md:text-xs">
              {content.eyebrow}
            </p>
            <h2 className="font-change-serif-bold max-w-[10ch] text-3xl leading-[0.92] tracking-[0.03em] uppercase sm:text-[2.2rem] md:max-w-none md:text-5xl xl:text-6xl 2xl:text-7xl">
              {content.title}
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={0.14}
            className="max-w-xl text-sm leading-6 text-primary/80 font-bold sm:text-[15px] md:text-lg md:leading-8 xl:text-xl"
          >
            {content.subtitle}
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={0.22}
            className="max-w-2xl border-[color:var(--color-secondary)]/70 pl-4 text-sm leading-7 text-primary/78 md:pl-6 md:text-base xl:text-lg xl:leading-8"
          >
            {content.body}
          </motion.p>
        </motion.div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:items-start xl:gap-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={0.12}
            className="rounded-[1.75rem] border border-[color:var(--color-secondary)]/60 bg-white/94 p-5 shadow-[0_24px_80px_-48px_rgba(0,35,91,0.35)] backdrop-blur-sm sm:p-6 md:rounded-[2rem] md:p-8"
          >
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-secondary)] md:mb-5 md:text-xs">
              {content.listTitle}
            </h3>
            <ul className="space-y-3 text-sm leading-6 text-primary/82 sm:text-[15px] md:text-base md:leading-7">
              {content.listItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary md:mt-3" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={0.2}
            className="grid gap-5 md:grid-cols-2 xl:gap-6"
          >
            <div className="rounded-[1.75rem] bg-[color:var(--color-primary)] px-5 py-6 text-white shadow-[0_24px_80px_-50px_rgba(0,35,91,0.45)] sm:px-6 md:rounded-[2rem] md:px-7 md:py-7">
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-secondary)] md:mb-5 md:text-xs">
                {content.divisionsTitle}
              </h3>
              <ul className="space-y-3 text-sm leading-6 text-white/88 sm:text-[15px] md:leading-7">
                {content.divisions.map((division) => (
                  <li key={division}>{division}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-[color:var(--color-secondary)]/60 bg-[color:var(--color-secondary)]/20 px-5 py-6 sm:px-6 md:rounded-[2rem] md:px-7 md:py-7">
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/70 md:mb-5 md:text-xs">
                {content.geographicFocusTitle}
              </h3>
              <ul className="space-y-3 text-sm leading-6 text-primary/84 sm:text-[15px] md:leading-7">
                {content.geographicFocus.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
