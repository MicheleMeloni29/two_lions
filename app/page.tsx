"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import HeroIntro from "@/components/HeroIntro";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";

const IntroText = dynamic(() => import("@/components/IntroText"));
const TwoLionsDivisions = dynamic(() => import("@/components/TwoLionsDivisions"));
const InvestmentSection = dynamic(() => import("@/components/InvestmentSection"));
const ContactSection = dynamic(() => import("@/components/ContactSection"));
const OfficesSection = dynamic(() => import("@/components/OfficesSection"));

export default function Home() {
  const { lang, toggleLang } = useSiteLanguage();
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
        onToggleLang={toggleLang}
      />
      <IntroText lang={lang} />
      <TwoLionsDivisions lang={lang} />
      <InvestmentSection lang={lang} />
      <ContactSection lang={lang} />
      <OfficesSection lang={lang} />
    </main>
  );
}
