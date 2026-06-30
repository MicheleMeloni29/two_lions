"use client";

import React from "react";
import { motion } from "framer-motion";
import enMessages from "@/locales/en.json";
import itMessages from "@/locales/it.json";
import ContinuousLoopCarousel from "./UI/ContinuousLoopCarousel";

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
  const carouselItems = current.pillars.map((pillar, index) => ({
    id: index,
    title: pillar.title,
    description: pillar.body,
  }));

  return (
    <section
      id="investment-opportunities"
      className="relative overflow-hidden border-t border-[color:var(--color-secondary)]/35 bg-linear-to-b from-[color:var(--color-secondary)]/50 via-[color:var(--color-secondary)]/20 to-transparent px-4 py-16 text-primary sm:px-5 md:px-8 md:py-20 xl:px-14 xl:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-secondary)]/35 via-[color:var(--color-secondary)]/10 to-transparent md:h-40" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="max-w-6xl xl:max-w-[82%]"
        >
          <p className="mb-4 text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
            {current.eyebrow1}
          </p>
          <h2 className="font-change-serif-bold max-w-[15ch] text-[2.1rem] leading-[0.94] uppercase tracking-[0.015em] sm:max-w-[16ch] sm:text-[2.5rem] md:max-w-[19ch] md:text-[3.5rem] xl:max-w-[21ch] xl:text-[4.2rem]">
            {current.title}
          </h2>
          <p className="mt-7 max-w-3xl border-l-2 border-[color:var(--color-thirdary)]/65 pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
            {current.lead}
          </p>
        </motion.div>

        <div className="mt-12 space-y-8 md:space-y-6 lg:space-y-8">
          {/* First row: Full width white card */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            custom={0.08}
            className="bg-white p-5 md:p-7 lg:p-8"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-primary)] sm:text-[10px] md:text-[11px]">
                {current.eyebrow2}
              </p>
            </div>
            <div className="space-y-5 text-[13px] leading-6 text-[color:var(--color-primary)] sm:text-sm md:text-[15px] md:leading-7">
              {current.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Second row: Highlights + Carousel */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch md:gap-6 lg:gap-8">
            {/* Highlights card */}
            <motion.aside
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              custom={0.16}
              className="h-full border border-[color:var(--color-primary)] bg-[color:var(--color-primary)] px-5 py-6 text-[color:var(--color-white)] md:px-6 md:py-7 lg:px-8"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-secondary)] sm:text-[10px] md:text-[11px]">
                  {current.highlightsTitle}
                </p>
              </div>
              <ul className="space-y-4">
                {current.highlights.map((item) => (
                  <li
                    key={item}
                    className="border-b border-[color:var(--color-white)]/18 pb-4 last:border-b-0 last:pb-0"
                  >
                    <span className="text-[13px] leading-6 text-[color:var(--color-white)] sm:text-sm md:text-[15px] md:leading-7">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.aside>

            {/* Carousel area */}
              <ContinuousLoopCarousel
                items={carouselItems}
                duration={26}
                viewportClassName="w-full"
                trackClassName="gap-20 sm:gap-26 lg:gap-28"
                cardClassName="min-h-[15rem] w-[15.5rem]  px-4 py-5 sm:min-h-[16rem] sm:w-[17rem] sm:px-5 sm:py-6 md:min-h-[20rem] md:w-[18.5rem] md:px-6 lg:min-h-[18rem] lg:w-[20rem]"
                titleClassName="text-[color:var(--color-thirdary)]"
                descriptionClassName="text-secondary"
              />
            </div>
          </div>
        </div>
    </section>
  );
}
