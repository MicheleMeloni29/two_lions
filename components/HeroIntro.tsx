"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import RotatingText from "./UI/RotatingText";
import ScrollIndicator from "./UI/ScrollIndicator";
import ToggleLang from "./UI/toggleLang";

type HeroIntroProps = {
  lang: "it" | "en";
  onToggleLang: () => void;
  isCompactHeader: boolean;
};

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

export default function HeroIntro({
  lang,
  onToggleLang,
  isCompactHeader,
}: HeroIntroProps) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        updateProgress();
        rafRef.current = null;
      });
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative bg-white">
      <motion.header
        className="fixed inset-x-0 top-0 z-[70] px-0 pt-0"
        initial={false}
        animate={{
          opacity: isCompactHeader ? 1 : 0,
          y: isCompactHeader ? 0 : -18,
          pointerEvents: isCompactHeader ? "auto" : "none",
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative flex w-full items-center justify-between border border-[color:var(--color-secondary)]/70 bg-white/92 px-4 py-3 shadow-[0_18px_60px_-36px_rgba(0,35,91,0.35)] backdrop-blur-md md:px-6">
          <div
            className="absolute bottom-0 left-0 h-[4px] bg-primary"
            style={{ width: `${progress * 100}%` }}
            aria-hidden="true"
          />
          <a
            href="#top"
            className="flex items-center text-primary transition-opacity hover:opacity-85"
            aria-label="Two Lions"
          >
            <Image
              src="/SectionsBackgrounds/twoLions_logo.png"
              alt="Two Lions"
              width={58}
              height={58}
              priority
              className="h-10 w-auto object-contain md:h-12"
            />
          </a>

          <ToggleLang
            lang={lang}
            onToggle={onToggleLang}
            className="shrink-0"
          />
        </div>
      </motion.header>

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
              src="/SectionsBackgrounds/twoLions_logo.png"
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
            className="absolute bottom-18 left-1/2 z-[60] -translate-x-1/2 bg-transparent px-4 text-center sm:bottom-20 md:bottom-22 lg:bottom-18 xl:bottom-14 2xl:bottom-16"
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
          <ScrollIndicator href="#intro-text" />
        </motion.div>
      </motion.div>
    </section>
  );
}
