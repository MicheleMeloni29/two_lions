"use client";

import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CompactHeader from "@/components/UI/CompactHeader";
import ToggleLang from "@/components/UI/toggleLang";
import enMessages from "@/locales/en.json";
import itMessages from "@/locales/it.json";

type SportVisualPlaceholder = {
  id: string;
  title: string;
  caption: string;
  image?: string;
  alt?: string;
};

type SportSection = {
  id: string;
  title: string;
  description: string;
  competenciesLabel: string;
  items: string[];
  projectsLabel?: string;
  projects?: string[];
  brandsLabel?: string;
  brands?: string[];
  note?: string;
};

type SportPageContent = {
  backToHome: string;
  eyebrow: string;
  title: string;
  mission: string;
  heroImage?: string;
  heroImageAlt?: string;
  snapshot: {
    divisionsValue: string;
    divisionsLabel: string;
    macroAreasValue: string;
    macroAreasLabel: string;
    brandsValue: string;
    brandsLabel: string;
  };
  positioning: string;
  positioningItems: string[];
  positioningFooter: string;
  programEyebrow: string;
  programTitle: string;
  programLead: string;
  framework: string;
  frameworkParagraphs: string[];
  focus: string;
  focusItems: string[];
  visualsEyebrow: string;
  visualsTitle: string;
  visualsLead: string;
  visualComingSoonLabel: string;
  visualPlaceholderLabel: string;
  visualPlaceholders: SportVisualPlaceholder[];
  organizationEyebrow: string;
  organigramTitle: string;
  organigramItems: string[];
  macroAreasTitle: string;
  macroAreasLead: string;
  macroAreas: string[];
  operatingAreas: string;
  sections: SportSection[];
};

const pageContent: Record<"it" | "en", SportPageContent> = {
  it: itMessages.sportPage,
  en: enMessages.sportPage,
};

const sectionThemes = [
  {
    article: "bg-primary text-white",
    title: "text-white",
    body: "text-white/88",
    label: "text-[color:var(--color-thirdary)]",
    list: "text-white",
    divider: "border-[color:var(--color-white)]/18",
    note: "text-white/88 border-[color:var(--color-white)]/18",
    chip: "border-[color:var(--color-white)]/18 bg-white/8 text-white",
  },
  {
    article: "bg-secondary text-white",
    title: "text-white",
    body: "text-white/88",
    label: "text-[color:var(--color-thirdary)]",
    list: "text-white",
    divider: "border-[color:var(--color-white)]/18",
    note: "text-white/88 border-[color:var(--color-white)]/18",
    chip: "border-[color:var(--color-white)]/18 bg-white/8 text-white",
  },
  {
    article: "border border-[color:var(--color-primary)]/12 bg-white text-primary",
    title: "text-[color:var(--color-primary)]",
    body: "text-[color:var(--color-secondary)]",
    label: "text-[color:var(--color-thirdary)]",
    list: "text-[color:var(--color-primary)]",
    divider: "border-[color:var(--color-primary)]/12",
    note: "text-[color:var(--color-secondary)] border-[color:var(--color-primary)]/12",
    chip: "border-[color:var(--color-primary)]/12 bg-[color:var(--color-primary)]/3 text-[color:var(--color-primary)]",
  },
] as const;

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SportContent() {
  const [lang, setLang] = useState<"it" | "en">("it");
  const content = pageContent[lang];
  const hasHeroImage = Boolean(content.heroImage?.trim());

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
        rightContent={
          <ToggleLang
            lang={lang}
            onToggle={() =>
              setLang((current) => (current === "it" ? "en" : "it"))
            }
          />
        }
      />

      <section className="relative overflow-hidden bg-[color:var(--color-primary)] px-4 pb-18 pt-28 text-white sm:px-5 md:px-8 md:pb-24 md:pt-32 xl:px-16 xl:pb-36 xl:pt-38 2xl:px-20 2xl:pb-40">
        {hasHeroImage ? (
          <Image
            src={content.heroImage!}
            alt={content.heroImageAlt ?? `${content.title} background`}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.22),transparent_38%),linear-gradient(180deg,rgba(31,39,92,0.94),rgba(37,30,87,0.92))]" />
        )}
        <div className="absolute inset-0 bg-[color:var(--color-primary)]/70" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-primary)]/35 via-[color:var(--color-primary)]/20 to-transparent md:h-40" />

        <div className="relative mx-auto flex max-w-[92rem] flex-col gap-10 md:gap-12 xl:gap-16 2xl:gap-18">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-3 border border-white/16 bg-white/12 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-[4px] transition hover:bg-white hover:text-[color:var(--color-primary)] sm:text-[12px]"
          >
            <span aria-hidden="true">&larr;</span>
            <span>{content.backToHome}</span>
          </Link>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.14fr)_minmax(21rem,0.86fr)] xl:items-stretch xl:gap-7 2xl:gap-8">
            <div className="space-y-8 border border-white/14 bg-white/10 p-5 backdrop-blur-[6px] sm:p-6 md:space-y-10 md:p-8 xl:space-y-12 xl:p-12 2xl:p-14">
              <div className="space-y-5 md:space-y-6">
                <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                  {content.eyebrow}
                </p>

                <h1 className="font-change-serif-bold max-w-[10ch] text-[2.25rem] leading-[0.92] uppercase tracking-[0.015em] sm:max-w-[12ch] sm:text-[2.9rem] md:max-w-[13ch] md:text-[4rem] xl:max-w-[12ch] xl:text-[5rem] 2xl:text-[5.25rem]">
                  {content.title}
                </h1>

                <p className="max-w-4xl border-l-2 border-[color:var(--color-thirdary)] pl-4 text-[13px] leading-6 text-white/88 sm:text-sm md:pl-5 md:text-[15px] md:leading-7 xl:max-w-[44rem] xl:pl-6 xl:text-[17px] xl:leading-8">
                  {content.mission}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 xl:gap-4">
                <div className="border border-white/14 bg-white/12 px-4 py-4 backdrop-blur-[4px] xl:px-5 xl:py-5 2xl:px-6">
                  <p className="font-change-serif-bold text-[1.8rem] leading-none text-white md:text-[2.2rem] xl:text-[2.8rem]">
                    {content.snapshot.divisionsValue}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/80 sm:text-[11px] xl:text-[12px]">
                    {content.snapshot.divisionsLabel}
                  </p>
                </div>
                <div className="border border-white/14 bg-white/12 px-4 py-4 backdrop-blur-[4px] xl:px-5 xl:py-5 2xl:px-6">
                  <p className="font-change-serif-bold text-[1.8rem] leading-none text-white md:text-[2.2rem] xl:text-[2.8rem]">
                    {content.snapshot.macroAreasValue}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/80 sm:text-[11px] xl:text-[12px]">
                    {content.snapshot.macroAreasLabel}
                  </p>
                </div>
                <div className="border border-white/14 bg-white/12 px-4 py-4 backdrop-blur-[4px] xl:px-5 xl:py-5 2xl:px-6">
                  <p className="font-change-serif-bold text-[1.8rem] leading-none text-white md:text-[2.2rem] xl:text-[2.8rem]">
                    {content.snapshot.brandsValue}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/80 sm:text-[11px] xl:text-[12px]">
                    {content.snapshot.brandsLabel}
                  </p>
                </div>
              </div>
            </div>

            <aside className="flex flex-col justify-between border border-white/14 bg-[color:var(--color-primary)]/78 px-5 py-6 text-white backdrop-blur-[4px] md:px-6 md:py-7 xl:px-8 xl:py-9 2xl:px-9">
              <div>
                <div className="mb-5 flex items-center justify-between gap-4 xl:mb-6">
                  <h2 className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px] xl:text-[12px]">
                    {content.positioning}
                  </h2>
                </div>
                <ul className="space-y-4 xl:space-y-5">
                  {content.positioningItems.map((item) => (
                    <li
                      key={item}
                      className="border-b border-[color:var(--color-white)]/18 pb-4 text-[13px] leading-6 text-[color:var(--color-white)] sm:text-sm md:text-[15px] md:leading-7 xl:pb-5 xl:text-[16px] xl:leading-8 last:border-b-0 last:pb-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 border-t border-[color:var(--color-white)]/14 pt-5 text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[12px] xl:mt-10 xl:pt-6 xl:text-[13px]">
                {content.positioningFooter}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[color:var(--color-secondary)]/35 bg-linear-to-b from-[color:var(--color-secondary)]/50 via-[color:var(--color-secondary)]/20 to-transparent px-4 py-16 text-primary sm:px-5 md:px-8 md:py-20 xl:px-16 xl:py-28 2xl:px-20 2xl:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-secondary)]/35 via-[color:var(--color-secondary)]/10 to-transparent md:h-40" />

        <div className="relative mx-auto flex max-w-[92rem] flex-col gap-10 md:gap-12 xl:gap-16 2xl:gap-18">
          <div className="max-w-6xl space-y-5 md:space-y-6 xl:space-y-7">
            <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
              {content.programEyebrow}
            </p>
            <h2 className="font-change-serif-bold max-w-[13ch] text-[2rem] leading-[0.94] uppercase tracking-[0.015em] sm:max-w-[16ch] sm:text-[2.5rem] md:max-w-[18ch] md:text-[3.5rem] xl:max-w-[16ch] xl:text-[4.2rem] 2xl:text-[4.5rem]">
              {content.programTitle}
            </h2>
            <p className="max-w-4xl border-l-2 border-[color:var(--color-thirdary)] pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:pl-5 md:text-[15px] md:leading-7 xl:max-w-[48rem] xl:pl-6 xl:text-[17px] xl:leading-8">
              {content.programLead}
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] xl:items-stretch xl:gap-7 2xl:gap-8">
            <div className="relative overflow-hidden border border-[color:var(--color-primary)]/10 bg-white p-5 shadow-[0_28px_80px_rgba(31,39,92,0.08)] md:p-7 xl:p-10 2xl:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.14),transparent_34%)]" />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between gap-4 xl:mb-7">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px] xl:text-[12px]">
                    {content.framework}
                  </p>
                </div>

                <div className="space-y-5 xl:space-y-6">
                  {content.frameworkParagraphs.map((paragraph, index) => (
                    <p
                      key={paragraph}
                      className={joinClasses(
                        "text-[13px] leading-6 text-[color:var(--color-primary)] sm:text-sm md:text-[15px] md:leading-7",
                        index === 0
                          ? "font-change-serif-bold text-[1.3rem] leading-[1.12] md:text-[1.55rem] xl:text-[1.65rem] xl:leading-[1.14]"
                          : "xl:text-[17px] xl:leading-8"
                      )}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <aside className="flex flex-col justify-between border border-[color:var(--color-primary)] bg-[color:var(--color-primary)] px-5 py-6 text-[color:var(--color-white)] md:px-6 md:py-7 xl:px-8 xl:py-9 2xl:px-9">
              <div>
                <div className="mb-5 flex items-center justify-between gap-4 xl:mb-6">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-secondary)] sm:text-[10px] md:text-[11px] xl:text-[12px]">
                    {content.focus}
                  </p>
                </div>
                <ul className="space-y-4 xl:space-y-5">
                  {content.focusItems.map((item) => (
                    <li
                      key={item}
                      className="border-b border-[color:var(--color-white)]/18 pb-4 xl:pb-5 last:border-b-0 last:pb-0"
                    >
                      <span className="text-[13px] leading-6 text-[color:var(--color-white)] sm:text-sm md:text-[15px] md:leading-7 xl:text-[16px] xl:leading-8">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <div className="overflow-hidden border border-[color:var(--color-primary)]/10 bg-white shadow-[0_28px_80px_rgba(31,39,92,0.08)]">
            <div className="px-5 py-6 md:px-7 md:py-8 xl:px-10 xl:py-10 2xl:px-12 2xl:py-12">
              <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                {content.visualsEyebrow}
              </p>
              <h3 className="mt-4 max-w-[12ch] font-change-serif-bold text-[1.7rem] leading-[0.96] uppercase tracking-[0.015em] text-[color:var(--color-primary)] sm:max-w-[15ch] sm:text-[2.2rem] md:text-[2.6rem] xl:max-w-[15ch] xl:text-[2.6rem]">
                {content.visualsTitle}
              </h3>
              <p className="mt-5 max-w-3xl border-l-2 border-[color:var(--color-thirdary)]/65 pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7 xl:max-w-[52rem] xl:pl-6 xl:text-[17px] xl:leading-8">
                {content.visualsLead}
              </p>
            </div>

            <div className="grid gap-px bg-[color:var(--color-primary)]/8 md:grid-cols-3">
              {content.visualPlaceholders.map((visual) => {
                const hasVisualImage = Boolean(visual.image?.trim());

                return (
                  <div key={visual.id} className="bg-white p-4 md:p-5 xl:p-6">
                    <div className="relative overflow-hidden border border-dashed border-[color:var(--color-primary)]/18 bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.18),transparent_45%),linear-gradient(180deg,rgba(31,39,92,0.04),rgba(31,39,92,0.08))]">
                      {hasVisualImage ? (
                        <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[4/5] xl:aspect-[5/6]">
                          <Image
                            src={visual.image!}
                            alt={visual.alt ?? visual.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-[color:var(--color-primary)]/76 via-[color:var(--color-primary)]/22 to-transparent" />
                          <div className="absolute left-4 top-4 border border-white/18 bg-[color:var(--color-primary)]/56 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-white backdrop-blur-[2px] sm:text-[10px]">
                            {visual.id}
                          </div>
                        </div>
                      ) : (
                        <div className="min-h-[21rem] px-4 py-4 sm:min-h-0 sm:aspect-[16/10] md:aspect-[4/5] md:px-5 md:py-5 xl:min-h-[24rem] xl:aspect-[5/6] xl:px-6 xl:py-6">
                          <div className="flex h-full flex-col justify-between">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-[9px] uppercase tracking-[0.18em] text-[color:var(--color-thirdary)] sm:text-[10px] sm:tracking-[0.22em]">
                                {content.visualsEyebrow}
                              </span>
                              <span className="text-right text-[9px] uppercase leading-4 tracking-[0.18em] text-[color:var(--color-primary)]/55 sm:text-[10px] sm:tracking-[0.22em]">
                                {content.visualComingSoonLabel}
                              </span>
                            </div>

                            <div className="space-y-4">
                              <div className="h-px w-14 bg-[color:var(--color-thirdary)]/60" />
                              <h4 className="font-change-serif-bold max-w-[10ch] text-[1.2rem] uppercase leading-[1.02] tracking-[0.02em] text-[color:var(--color-primary)] sm:text-[1.35rem] md:text-[1.55rem] md:tracking-[0.04em] xl:text-[1.55rem]">
                                {visual.title}
                              </h4>
                              <p className="text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7 xl:text-[16px] xl:leading-8">
                                {visual.caption}
                              </p>
                            </div>

                            <div className="mt-6 border-t border-[color:var(--color-primary)]/10 pt-4 text-[11px] uppercase leading-5 tracking-[0.18em] text-[color:var(--color-primary)]/60 sm:tracking-[0.24em]">
                              {content.visualPlaceholderLabel}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(21rem,0.86fr)_minmax(0,1.14fr)] xl:items-stretch xl:gap-7 2xl:gap-8">
            <div className="border border-[color:var(--color-primary)] bg-[color:var(--color-primary)] px-5 py-6 text-white md:px-6 md:py-7 xl:px-8 xl:py-9 2xl:px-9">
              <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-secondary)] sm:text-[10px] md:text-[11px]">
                {content.organizationEyebrow}
              </p>
              <h3 className="mt-4 font-change-serif-bold max-w-[12ch] text-[1.8rem] leading-[0.96] uppercase tracking-[0.015em] text-white sm:text-[2.2rem] md:text-[2.6rem] xl:text-[2.6rem]">
                {content.organigramTitle}
              </h3>
              <ul className="mt-6 space-y-3 xl:mt-8 xl:space-y-4">
                {content.organigramItems.map((item) => (
                  <li
                    key={item}
                    className="border-b border-[color:var(--color-white)]/18 pb-3 text-[13px] uppercase tracking-[0.16em] text-white sm:text-sm md:text-[15px] md:leading-7 xl:pb-4 xl:text-[16px] xl:leading-8 last:border-b-0 last:pb-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden border border-[color:var(--color-primary)]/10 bg-white p-5 shadow-[0_28px_80px_rgba(31,39,92,0.08)] md:p-7 xl:p-10 2xl:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.14),transparent_34%)]" />
              <div className="relative">
                <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                  {content.organizationEyebrow}
                </p>
                <h3 className="mt-4 max-w-[13ch] font-change-serif-bold text-[1.8rem] leading-[0.96] uppercase tracking-[0.015em] text-[color:var(--color-primary)] sm:max-w-[15ch] sm:text-[2.2rem] md:text-[2.6rem] xl:text-[2.6rem]">
                  {content.macroAreasTitle}
                </h3>
                <p className="mt-5 max-w-3xl border-l-2 border-[color:var(--color-thirdary)]/65 pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7 xl:max-w-[44rem] xl:pl-6 xl:text-[17px] xl:leading-8">
                  {content.macroAreasLead}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:mt-8 xl:gap-4">
                  {content.macroAreas.map((item) => (
                    <div
                      key={item}
                      className="border border-[color:var(--color-primary)]/10 bg-white px-4 py-4 text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-primary)] sm:text-[13px] xl:px-5 xl:py-5 xl:text-[14px]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-14 md:space-y-7 md:pt-18 xl:space-y-8 xl:pt-24 2xl:pt-28">
            <div className="max-w-4xl">
              <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                {content.operatingAreas}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6 2xl:gap-7">
              {content.sections.map((section, index) => {
                const theme = sectionThemes[index % sectionThemes.length];

                return (
                  <article
                    key={section.id}
                    className={joinClasses(
                      "flex h-full flex-col overflow-hidden shadow-[0_24px_60px_rgba(31,39,92,0.08)]",
                      theme.article
                    )}
                  >
                    <div className="border-b border-current/10 px-5 py-5 md:px-6 xl:px-7 xl:py-6">
                      <p className={joinClasses("text-[9px] uppercase tracking-[0.22em] sm:text-[10px] xl:text-[11px]", theme.label)}>
                        {section.id}
                      </p>
                      <h3
                        className={joinClasses(
                          "mt-3 font-change-serif-bold text-[1.15rem] uppercase tracking-[0.03em] sm:text-[1.2rem] md:text-[1.35rem] md:tracking-[0.05em] xl:text-[1.4rem]",
                          theme.title
                        )}
                      >
                        {section.title}
                      </h3>
                      <p
                        className={joinClasses(
                          "mt-3 text-[13px] leading-6 sm:text-sm md:text-[15px] md:leading-7 xl:text-[16px] xl:leading-8",
                          theme.body
                        )}
                      >
                        {section.description}
                      </p>
                    </div>

                    <div className="flex flex-1 flex-col p-5 md:p-6 xl:p-7">
                      <p className={joinClasses("text-[10px] uppercase tracking-[0.22em] sm:text-[11px] xl:text-[12px]", theme.label)}>
                        {section.competenciesLabel}
                      </p>
                      <ul
                        className={joinClasses(
                          "mt-4 space-y-3 text-[13px] leading-6 sm:text-sm md:text-[15px] md:leading-7 xl:mt-5 xl:space-y-4 xl:text-[16px] xl:leading-8",
                          theme.list
                        )}
                      >
                        {section.items.map((item) => (
                          <li
                            key={item}
                            className={joinClasses(
                              "border-b pb-3 xl:pb-4 last:border-b-0 last:pb-0",
                              theme.divider
                            )}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      {section.projects?.length ? (
                        <div className={joinClasses("mt-5 border-t pt-5", theme.note)}>
                          <p className={joinClasses("text-[10px] uppercase tracking-[0.22em] sm:text-[11px] xl:text-[12px]", theme.label)}>
                            {section.projectsLabel}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2 xl:gap-3">
                            {section.projects.map((project) => (
                              <span
                                key={project}
                                className={joinClasses(
                                  "border px-3 py-2 text-[11px] uppercase tracking-[0.16em] sm:text-[12px] xl:px-4 xl:py-2.5 xl:text-[13px]",
                                  theme.chip
                                )}
                              >
                                {project}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {section.brands?.length ? (
                        <div className={joinClasses("mt-5 border-t pt-5", theme.note)}>
                          <p className={joinClasses("text-[10px] uppercase tracking-[0.22em] sm:text-[11px] xl:text-[12px]", theme.label)}>
                            {section.brandsLabel}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2 xl:gap-3">
                            {section.brands.map((brand) => (
                              <span
                                key={brand}
                                className={joinClasses(
                                  "border px-3 py-2 text-[11px] uppercase tracking-[0.16em] sm:text-[12px] xl:px-4 xl:py-2.5 xl:text-[13px]",
                                  theme.chip
                                )}
                              >
                                {brand}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {section.note ? (
                        <p
                          className={joinClasses(
                            "mt-5 border-t pt-5 text-[13px] leading-6 sm:text-sm md:text-[15px] md:leading-7 xl:text-[16px] xl:leading-8",
                            theme.note
                          )}
                        >
                          {section.note}
                        </p>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
