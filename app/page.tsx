"use client";

import { useEffect, useState } from "react";
import HeroIntro from "@/components/HeroIntro";
import IntroText from "@/components/IntroText";
import InvestmentSection from "@/components/InvestmentSection";
import TwoLionsDivisions from "@/components/TwoLionsDivisions";
import OfficesSection from "@/components/OfficesSection";

export default function Home() {
  const [lang, setLang] = useState<"it" | "en">("it");
  const [isCompactHeader, setIsCompactHeader] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      const threshold = window.innerHeight * 0.82;
      setIsCompactHeader(window.scrollY >= threshold);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, []);

  return (
    <main className="bg-white">
      <HeroIntro
        lang={lang}
        isCompactHeader={isCompactHeader}
        onToggleLang={() => setLang((current) => (current === "it" ? "en" : "it"))}
      />
      <IntroText lang={lang} />
      <TwoLionsDivisions lang={lang} />
      <InvestmentSection lang={lang} />
      <OfficesSection />
    </main>
  );
}
