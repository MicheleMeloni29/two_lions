"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type CompactHeaderProps = {
  isVisible?: boolean;
  logoHref?: string;
  rightContent?: ReactNode;
};

export default function CompactHeader({
  isVisible = true,
  logoHref = "/",
  rightContent,
}: CompactHeaderProps) {
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
    <motion.header
      className="fixed inset-x-0 top-0 z-[70] px-0 pt-0"
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -18,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative flex w-full items-center justify-between border border-[color:var(--color-secondary)]/70 bg-white/92 px-4 py-3 shadow-[0_18px_60px_-36px_rgba(0,35,91,0.35)] backdrop-blur-md md:px-6">
        <div
          className="absolute bottom-0 left-0 h-[4px] bg-primary"
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />

        <Link
          href={logoHref}
          className="flex items-center text-primary transition-opacity hover:opacity-85"
          aria-label="Two Lions"
        >
          <Image
            src="/twoLions_logo.png"
            alt="Two Lions"
            width={58}
            height={58}
            priority
            className="h-10 w-auto object-contain md:h-12"
          />
        </Link>

        {rightContent ? <div className="shrink-0">{rightContent}</div> : <div />}
      </div>
    </motion.header>
  );
}
