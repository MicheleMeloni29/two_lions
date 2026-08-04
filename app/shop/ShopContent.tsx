"use client";

import { useEffect, useState } from "react";
import AccordionGallery, {
  type AccordionGalleryItem,
} from "@/components/UI/AccordionGallery";
import CompactHeader from "@/components/UI/CompactHeader";
import { useResetScrollOnMount } from "@/hooks/useResetScrollOnMount";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";

const galleryItems: Record<"it" | "en", AccordionGalleryItem[]> = {
  it: [
    {
      image: "/SectionsBackgrounds/Fodd&Beverage.png",
      label: "Food & Beverage",
      link: "/food-and-beverage/store",
      alt: "Two Lions Food & Beverage store",
    },
    {
      image: "/SectionsBackgrounds/TwoLions_Sport.jpeg",
      label: "Sport",
      link: "/sport/store",
      alt: "Two Lions Sport store",
    },
    {
      image: "/SectionsBackgrounds/Parfum.png",
      label: "Parfum",
      link: "/parfum/store",
      alt: "Two Lions Parfum store",
    },
  ],
  en: [
    {
      image: "/SectionsBackgrounds/Fodd&Beverage.png",
      label: "Food & Beverage",
      link: "/food-and-beverage/store",
      alt: "Two Lions Food & Beverage store",
    },
    {
      image: "/SectionsBackgrounds/TwoLions_Sport.jpeg",
      label: "Sport",
      link: "/sport/store",
      alt: "Two Lions Sport store",
    },
    {
      image: "/SectionsBackgrounds/Parfum.png",
      label: "Parfum",
      link: "/parfum/store",
      alt: "Two Lions Parfum store",
    },
  ],
};

function useShopGalleryMode() {
  const [supportsHover, setSupportsHover] = useState(false);
  const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(false);

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const viewportQuery = window.matchMedia("(min-width: 768px)");

    const updateMode = () => {
      setSupportsHover(hoverQuery.matches);
      setIsTabletOrDesktop(viewportQuery.matches);
    };

    updateMode();
    hoverQuery.addEventListener("change", updateMode);
    viewportQuery.addEventListener("change", updateMode);

    return () => {
      hoverQuery.removeEventListener("change", updateMode);
      viewportQuery.removeEventListener("change", updateMode);
    };
  }, []);

  return {
    trigger: supportsHover ? "hover" : "click",
    orientation: isTabletOrDesktop ? "horizontal" : "vertical",
    isHorizontal: isTabletOrDesktop,
    supportsHover,
  } as const;
}

export default function ShopContent() {
  const { lang, toggleLang } = useSiteLanguage();
  const items = galleryItems[lang];
  const galleryMode = useShopGalleryMode();

  useResetScrollOnMount();

  return (
    <main className="min-h-screen overflow-hidden bg-[color:var(--color-primary)] text-white">
      <CompactHeader
        lang={lang}
        onToggleLang={toggleLang}
      />

      <div className="h-screen w-full">
        <AccordionGallery
          items={items}
          defaultIndex={1}
          expandRatio={galleryMode.isHorizontal ? 0.54 : 0.48}
          trigger={galleryMode.trigger}
          accentColor="#b59a5a"
          overlayColor="#251e57"
          textColor="#ffffff"
          grayscale
          showLabels
          duration={galleryMode.supportsHover ? 0.65 : 0.55}
          ease="power3.out"
          parallax={galleryMode.isHorizontal ? 0.42 : 0.34}
          tilt={galleryMode.supportsHover ? 7 : 0}
          stagger={galleryMode.supportsHover ? 0.06 : 0.04}
          height={galleryMode.isHorizontal ? 900 : 720}
          gap={0}
          radius={0}
          orientation={galleryMode.orientation}
          className="!h-screen shadow-[0_30px_90px_rgba(0,0,0,0.22)]"
        />
      </div>
    </main>
  );
}
