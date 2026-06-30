"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollIndicator from "./UI/ScrollIndicator";
import ToggleLang from "./UI/toggleLang";
import CompactHeader from "./UI/CompactHeader";

type HeroIntroProps = {
  lang: "it" | "en";
  onToggleLang: () => void;
  isCompactHeader: boolean;
};

const secondaryRevealTransition = {
  duration: 0.7,
  delay: 2.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function HeroIntro({
  lang,
  onToggleLang,
  isCompactHeader,
}: HeroIntroProps) {
  return (
    <section className="relative bg-white">
      <CompactHeader
        isVisible={isCompactHeader}
        logoHref="/#top"
        rightContent={
          <ToggleLang
            lang={lang}
            onToggle={onToggleLang}
            className="shrink-0"
          />
        }
      />

      <motion.div
        className="fixed top-3 right-3 z-[60] md:top-6 md:right-6"
        initial={false}
        animate={{
          opacity: isCompactHeader ? 0 : 1,
          y: isCompactHeader ? -10 : 0,
          pointerEvents: isCompactHeader ? "none" : "auto",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <ToggleLang lang={lang} onToggle={onToggleLang} />
      </motion.div>

      <motion.div
        id="top"
        className="relative flex min-h-screen flex-col items-center justify-center bg-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
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
          {/* Holding name */}
          <motion.h1
            className="pt-2 text-xl tracking-[0.1em] text-secondary md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-6xl"
            initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 2.2 }}
          >
            International Corporation
          </motion.h1>
        </div>
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={secondaryRevealTransition}
        >
          <ScrollIndicator href="#intro-text" label="scroll" />
        </motion.div>
      </motion.div>
    </section>
  );
}
