"use client";

import { motion } from "framer-motion";
import enMessages from "@/locales/en.json";
import itMessages from "@/locales/it.json";

type InvestmentSectionProps = {
  lang: "it" | "en";
};

const content = {
  it: itMessages.investmentSection,
  en: enMessages.investmentSection,
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function InvestmentSection({ lang }: InvestmentSectionProps) {
  const current = content[lang];

  return (
    <section
      id="investment-opportunities"
      className="relative overflow-hidden bg-white px-4 py-18 text-primary sm:px-5 md:px-8 md:py-24 xl:px-14"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-[color:var(--color-secondary)] to-secondaty/50 to-transparent md:h-36" />
      <div className="pointer-events-none absolute right-0 top-24 h-40 w-40 rounded-full bg-[color:var(--color-secondary)]/14 blur-3xl md:h-56 md:w-56" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="max-w-4xl"
        >
          <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-secondary)] sm:text-[11px] md:text-xs">
            {current.eyebrow}
          </p>
          <h2 className="font-change-serif-bold max-w-[14ch] text-3xl leading-[0.96] uppercase tracking-[0.04em] sm:text-[2.2rem] md:max-w-[16ch] md:text-5xl xl:text-6xl">
            {current.title}
          </h2>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-primary/78 sm:text-[15px] md:text-lg md:leading-8">
            {current.lead}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] xl:items-start xl:gap-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            custom={0.08}
            className="rounded-[1.75rem] border border-[color:var(--color-secondary)]/45 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(32,26,91,0.34)] md:rounded-[2rem] md:p-8"
          >
            <div className="space-y-5 text-sm leading-7 text-primary/80 md:text-base md:leading-8">
              {current.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            custom={0.16}
            className="rounded-[1.75rem] bg-[color:var(--color-primary)] px-6 py-7 text-white shadow-[0_28px_80px_-54px_rgba(32,26,91,0.52)] md:rounded-[2rem] md:px-7 md:py-8"
          >
            <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-secondary)] md:text-xs">
              {current.highlightsTitle}
            </p>
            <ul className="space-y-4">
              {current.highlights.map((item) => (
                <li
                  key={item}
                  className="border-b border-white/12 pb-4 last:border-b-0 last:pb-0"
                >
                  <span className="text-sm leading-6 text-white/88 sm:text-[15px] md:text-base md:leading-7">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {current.pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              custom={0.12 + index * 0.08}
              className="rounded-[1.6rem] border border-[color:var(--color-secondary)]/45 bg-[color:var(--color-secondary)]/10 p-5 md:p-6"
            >
              <h3 className="font-change-serif-bold text-xl uppercase tracking-[0.08em] text-primary md:text-2xl">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-primary/76 md:text-[15px] md:leading-7">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
