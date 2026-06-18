"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import RotatingText from "./UI/RotatingText";
import ScrollIndicator from "./UI/ScrollIndicator";
import ToggleLang from "./UI/toggleLang";

const rotatingTexts = [
  "IDENTITY ADVERSITING",
  "FOOD AND BEVERAGE",
  "LUXURY SARDABOOKING",
  "PARFUM",
  "SMART SCHELTER AND ENERGY",
  "SPORT",
];

const secondaryRevealTransition = {
  duration: 0.7,
  delay: 3.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function HeroIntro() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <ToggleLang />
      {/* Holding Icon animation */}
      <div className="flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 7.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Holding Icon */}
          <Image
            src="/twoLions_logo.png"
            alt="Two Lions"
            width={240}
            height={240}
            priority
            className="object-contain text-primary w-60 h-46 md:w-80 md:h-56 lg:w-100 lg:h-64 xl:w-120 xl:h-80 2xl:w-150 2xl:h-96"
          />
        </motion.div>

        {/* Holding name */}
        <motion.h1
          className="font-change-serif-bold text-4xl uppercase tracking-[0.1em] text-primary md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
          initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
        >
          Two Lions
        </motion.h1>
      </div>
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={secondaryRevealTransition}
      >
        <RotatingText
          texts={rotatingTexts}
          splitBy="words"
          rotationInterval={2400}
          staggerDuration={0.03}
          className="absolute bottom-18 left-1/2 z-[60] -translate-x-1/2 bg-transparent px-4 text-center sm:bottom-20 md:bottom-22 lg:bottom-18 xl:bottom-22 2xl:bottom-24"
          style={{ color: "var(--color-secondary)" }}
          mainClassName="justify-center whitespace-nowrap bg-transparent text-center font-change-serif-bold text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-secondary)] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl"
          contentClassName="flex-nowrap justify-center whitespace-nowrap"
          splitLevelClassName="bg-transparent text-[color:var(--color-secondary)]"
          elementLevelClassName="bg-transparent text-[color:var(--color-secondary)]"
      />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={secondaryRevealTransition}
      >
        <ScrollIndicator />
      </motion.div>
    </motion.div>
  );
}
