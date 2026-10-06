"use client";

import { useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  MapPin,
  Megaphone,
  Trophy,
  Users,
} from "lucide-react";
import CompactHeader from "@/components/UI/CompactHeader";
import ContinuousLoopCarousel from "@/components/UI/ContinuousLoopCarousel";
import DivisionStoreCta from "@/components/store/DivisionStoreCta";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import enMessages from "@/locales/en.json";
import itMessages from "@/locales/it.json";

type EventsCarouselItem = {
  id: string;
  image: string;
  alt: string;
};

type VisionPillar = {
  id: string;
  title: string;
  description: string;
};

type EventsPageContent = {
  backToHome: string;
  eyebrow: string;
  title: string;
  mission: string;
  heroImage?: string;
  heroImageAlt?: string;
  snapshot: {
    areasValue: string;
    areasLabel: string;
    focusValue: string;
    focusLabel: string;
    territoryValue: string;
    territoryLabel: string;
  };
  positioning: string;
  positioningItems: string[];
  positioningFooter: string;
  mandasSection: {
    eyebrow: string;
    title: string;
    lead: string;
    tags: string[];
    carouselItems: EventsCarouselItem[];
  };
  bredaSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    lead: string;
    highlights: string[];
    ctaLabel: string;
    ctaHref: string;
    storeCtaLabel: string;
    storeCtaHref: string;
  };
  visionSection: {
    eyebrow: string;
    title: string;
    lead: string;
    pillars: VisionPillar[];
  };
  contactCta: {
    eyebrow: string;
    title: string;
    description: string;
    actionLabel: string;
    watermark: string;
  };
};

const pageContent: Record<"it" | "en", EventsPageContent> = {
  it: itMessages.eventsPage,
  en: enMessages.eventsPage,
};

const pillarIcons = [Users, MapPin, Trophy, Megaphone] as const;

const pillarThemes = [
  {
    card: "bg-primary text-white border border-[color:var(--color-primary)]",
    iconBox:
      "border-[color:var(--color-thirdary)]/40 bg-[color:var(--color-thirdary)]/16 text-[color:var(--color-thirdary)]",
    id: "text-[color:var(--color-thirdary)]",
    title: "text-white",
    body: "text-white/84",
  },
  {
    card: "bg-white text-primary border border-[color:var(--color-primary)]/12",
    iconBox:
      "border-[color:var(--color-primary)]/14 bg-[color:var(--color-primary)]/5 text-[color:var(--color-primary)]",
    id: "text-[color:var(--color-thirdary)]",
    title: "text-[color:var(--color-primary)]",
    body: "text-[color:var(--color-secondary)]",
  },
  {
    card: "bg-secondary text-white border border-[color:var(--color-secondary)]",
    iconBox:
      "border-[color:var(--color-thirdary)]/40 bg-[color:var(--color-thirdary)]/16 text-[color:var(--color-thirdary)]",
    id: "text-[color:var(--color-thirdary)]",
    title: "text-white",
    body: "text-white/84",
  },
  {
    card: "bg-white text-primary border border-[color:var(--color-primary)]/12",
    iconBox:
      "border-[color:var(--color-primary)]/14 bg-[color:var(--color-primary)]/5 text-[color:var(--color-primary)]",
    id: "text-[color:var(--color-thirdary)]",
    title: "text-[color:var(--color-primary)]",
    body: "text-[color:var(--color-secondary)]",
  },
] as const;

export default function EventsContent() {
  const { lang, toggleLang } = useSiteLanguage();
  const content = pageContent[lang];
  const hasHeroImage = Boolean(content.heroImage?.trim());

  const mandasCarouselItems = content.mandasSection.carouselItems.map(
    (item) => ({
      id: item.id,
      description: "",
      content: (
        <div className="group relative h-full w-full overflow-hidden">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(min-width: 1280px) 24rem, (min-width: 768px) 20rem, 16rem"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[color:var(--color-primary)]/38 via-transparent to-[color:var(--color-primary)]/12" />
        </div>
      ),
    })
  );

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlScrollBehavior = html.style.scrollBehavior;
    const previousBodyScrollBehavior = body.style.scrollBehavior;

    html.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    const restoreScrollBehavior = window.requestAnimationFrame(() => {
      html.style.scrollBehavior = previousHtmlScrollBehavior;
      body.style.scrollBehavior = previousBodyScrollBehavior;
    });

    return () => {
      window.cancelAnimationFrame(restoreScrollBehavior);
      html.style.scrollBehavior = previousHtmlScrollBehavior;
      body.style.scrollBehavior = previousBodyScrollBehavior;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-primary">
      <CompactHeader
        lang={lang}
        onToggleLang={toggleLang}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[color:var(--color-primary)] px-4 pb-16 pt-28 text-white sm:px-5 md:px-8 md:pb-22 md:pt-32 xl:px-16 xl:pb-30 xl:pt-36 2xl:px-20">
        {hasHeroImage ? (
          <Image
            src={content.heroImage!}
            alt={content.heroImageAlt ?? `${content.title} background`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.22),transparent_38%),linear-gradient(180deg,rgba(31,39,92,0.94),rgba(37,30,87,0.92))]" />
        )}
        <div className="absolute inset-0 bg-[color:var(--color-primary)]/72" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-primary)]/35 via-[color:var(--color-primary)]/20 to-transparent md:h-40" />

        <div className="relative mx-auto flex max-w-[92rem] flex-col gap-8 md:gap-10 xl:gap-14">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-3 border border-white/16 bg-white/12 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-[4px] transition hover:bg-white hover:text-[color:var(--color-primary)] sm:text-[12px]"
          >
            <span aria-hidden="true">&larr;</span>
            <span>{content.backToHome}</span>
          </Link>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(21rem,0.85fr)] xl:items-stretch xl:gap-7">
            <div className="space-y-7 border border-white/14 bg-white/10 p-5 backdrop-blur-[6px] sm:p-6 md:space-y-8 md:p-8 xl:p-10">
              <div className="space-y-4 md:space-y-5">
                <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                  {content.eyebrow}
                </p>

                <h1 className="font-change-serif-bold max-w-[11ch] text-[2.25rem] leading-[0.92] uppercase tracking-[0.015em] sm:max-w-[12ch] sm:text-[2.9rem] md:max-w-[13ch] md:text-[3.8rem] xl:max-w-[12ch] xl:text-[4.6rem]">
                  {content.title}
                </h1>

                <p className="max-w-3xl border-l-2 border-[color:var(--color-thirdary)] pl-4 text-[13px] leading-6 text-white/88 sm:text-sm md:pl-5 md:text-[15px] md:leading-7 xl:text-[16px]">
                  {content.mission}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="border border-white/14 bg-white/12 px-4 py-4 backdrop-blur-[4px]">
                  <p className="font-change-serif-bold text-[1.45rem] leading-none text-white md:text-[1.75rem] xl:text-[2rem]">
                    {content.snapshot.areasValue}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/80 sm:text-[11px]">
                    {content.snapshot.areasLabel}
                  </p>
                </div>
                <div className="border border-white/14 bg-white/12 px-4 py-4 backdrop-blur-[4px]">
                  <p className="font-change-serif-bold text-[1.45rem] leading-none text-white md:text-[1.75rem] xl:text-[2rem]">
                    {content.snapshot.focusValue}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/80 sm:text-[11px]">
                    {content.snapshot.focusLabel}
                  </p>
                </div>
                <div className="border border-white/14 bg-white/12 px-4 py-4 backdrop-blur-[4px]">
                  <p className="font-change-serif-bold text-[1.45rem] leading-none text-white md:text-[1.75rem] xl:text-[2rem]">
                    {content.snapshot.territoryValue}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/80 sm:text-[11px]">
                    {content.snapshot.territoryLabel}
                  </p>
                </div>
              </div>
            </div>

            <aside className="flex flex-col justify-between border border-white/14 bg-[color:var(--color-primary)]/78 px-5 py-6 text-white backdrop-blur-[4px] md:px-6 md:py-7 xl:px-8 xl:py-8">
              <div>
                <h2 className="mb-5 text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                  {content.positioning}
                </h2>
                <ul className="space-y-4">
                  {content.positioningItems.map((item) => (
                    <li
                      key={item}
                      className="border-b border-[color:var(--color-white)]/18 pb-4 text-[13px] leading-6 text-white sm:text-sm md:text-[15px] md:leading-7 last:border-b-0 last:pb-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 border-t border-[color:var(--color-white)]/14 pt-5 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[12px]">
                {content.positioningFooter}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* BLOCK 1: 3° Raduno Ducato di Mandas + 8-Photo Carousel */}
      <section className="relative overflow-hidden border-t border-[color:var(--color-secondary)]/35 bg-linear-to-b from-transparent via-[color:var(--color-secondary)]/18 to-[color:var(--color-secondary)]/38 px-4 py-14 text-primary sm:px-5 md:px-8 md:py-18 xl:px-16 xl:py-22 2xl:px-20">
        <div className="relative mx-auto flex max-w-[92rem] flex-col gap-8 md:gap-10">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:items-end">
            <div className="space-y-4 md:space-y-5">
              <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                {content.mandasSection.eyebrow}
              </p>
              <h2 className="font-change-serif-bold max-w-[16ch] text-[2rem] leading-[0.94] uppercase tracking-[0.015em] sm:text-[2.5rem] md:text-[3.3rem] xl:text-[3.9rem]">
                {content.mandasSection.title}
              </h2>
              <p className="max-w-3xl border-l-2 border-[color:var(--color-thirdary)] pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
                {content.mandasSection.lead}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 xl:justify-end">
              {content.mandasSection.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[color:var(--color-primary)]/14 bg-white/90 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-primary)] shadow-xs sm:text-[11px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden py-5">
            <ContinuousLoopCarousel
              items={mandasCarouselItems}
              duration={38}
              viewportClassName="w-full"
              trackClassName="gap-5 px-5 md:gap-6 md:px-7 xl:gap-7 xl:px-8"
              cardClassName="h-[18rem] w-[14.5rem] sm:h-[20rem] sm:w-[16.5rem] md:h-[22rem] md:w-[18.5rem] xl:h-[24rem] xl:w-[20.5rem]"
            />
          </div>
        </div>
      </section>

      {/* BLOCK 2: World Masters Hockey Breda 2026 (Full-Width Horizontal Layout) */}
      <section className="relative overflow-hidden border-t border-[color:var(--color-secondary)]/35 bg-white px-4 py-14 text-primary sm:px-5 md:px-8 md:py-18 xl:px-16 xl:py-22 2xl:px-20">
        <div className="relative mx-auto max-w-[92rem]">
          <article className="relative overflow-hidden border border-[color:var(--color-primary)] bg-[color:var(--color-primary)] p-6 text-white shadow-[0_28px_80px_rgba(31,39,92,0.12)] sm:p-7 md:p-9 xl:p-11">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.20),transparent_40%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-stretch lg:gap-10">
              {/* Left Narrative & CTA */}
              <div className="flex flex-col justify-between space-y-5 md:space-y-6">
                <div className="space-y-5 md:space-y-6">
                  <div className="inline-flex w-fit items-center border border-[color:var(--color-thirdary)]/50 bg-[color:var(--color-thirdary)]/16 px-3 py-1.5 text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[10px]">
                    {content.bredaSection.eyebrow}
                  </div>

                  <div>
                    <h2 className="font-change-serif-bold max-w-[14ch] text-[2rem] leading-[0.94] uppercase tracking-[0.015em] text-white sm:text-[2.5rem] md:text-[3.2rem] xl:text-[3.6rem]">
                      {content.bredaSection.title}
                    </h2>
                    <p className="mt-2.5 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[12px]">
                      {content.bredaSection.subtitle}
                    </p>
                  </div>

                  <p className="max-w-2xl border-l-2 border-[color:var(--color-thirdary)] pl-4 text-[13px] leading-6 text-white/88 sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
                    {content.bredaSection.lead}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={content.bredaSection.ctaHref}
                    className="group inline-flex items-center gap-2.5 border border-[color:var(--color-thirdary)] bg-[color:var(--color-thirdary)] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-primary)] transition hover:border-white hover:bg-white sm:text-[12px]"
                  >
                    <span>{content.bredaSection.ctaLabel}</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href={content.bredaSection.storeCtaHref}
                    className="inline-flex items-center gap-2 border border-white/24 bg-white/10 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-[color:var(--color-primary)] sm:text-[12px]"
                  >
                    <span>{content.bredaSection.storeCtaLabel}</span>
                  </Link>
                </div>
              </div>

              {/* Right Highlights Column */}
              <ul className="grid gap-3 sm:grid-cols-3 lg:h-full lg:grid-cols-1 lg:grid-rows-3 lg:gap-3.5">
                {content.bredaSection.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex h-full items-center border border-white/14 bg-white/8 p-4 text-[13px] leading-6 text-white backdrop-blur-[2px] sm:text-sm md:p-5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      {/* BLOCK 3: Proprietary Events Vision (4 Icon Pillars) + CTA */}
      <section className="relative overflow-hidden border-t border-[color:var(--color-secondary)]/35 bg-linear-to-b from-transparent via-[color:var(--color-secondary)]/22 to-[color:var(--color-secondary)]/48 px-4 py-14 text-primary sm:px-5 md:px-8 md:py-18 xl:px-16 xl:py-24 2xl:px-20">
        <div className="relative mx-auto flex max-w-[92rem] flex-col gap-10 md:gap-12 xl:gap-14">
          <div className="max-w-4xl space-y-4 md:space-y-5">
            <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
              {content.visionSection.eyebrow}
            </p>
            <h2 className="font-change-serif-bold max-w-[16ch] text-[2rem] leading-[0.94] uppercase tracking-[0.015em] sm:text-[2.5rem] md:text-[3.3rem] xl:text-[3.9rem]">
              {content.visionSection.title}
            </h2>
            <p className="max-w-3xl border-l-2 border-[color:var(--color-thirdary)] pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
              {content.visionSection.lead}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {content.visionSection.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index % pillarIcons.length];
              const theme = pillarThemes[index % pillarThemes.length];

              return (
                <article
                  key={pillar.id}
                  className={`flex flex-col justify-between p-5 shadow-[0_20px_50px_rgba(31,39,92,0.08)] md:p-6 ${theme.card}`}
                >
                  <div>

                    <h3
                      className={`mt-5 font-change-serif-bold text-[1.2rem] uppercase tracking-[0.04em] md:text-[1.3rem] ${theme.title}`}
                    >
                      {pillar.title}
                    </h3>

                    <p
                      className={`mt-3 text-[13px] leading-6 sm:text-sm ${theme.body}`}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <DivisionStoreCta
            eyebrow={content.contactCta.eyebrow}
            title={content.contactCta.title}
            description={content.contactCta.description}
            actionLabel={content.contactCta.actionLabel}
            watermark={content.contactCta.watermark}
            href="/#contact"
            icon={CalendarRange}
          />
        </div>
      </section>
    </main>
  );
}
