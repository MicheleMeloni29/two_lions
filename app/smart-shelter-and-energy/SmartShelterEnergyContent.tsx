"use client";

import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CompactHeader from "@/components/UI/CompactHeader";
import ToggleLang from "@/components/UI/toggleLang";
import enMessages from "@/locales/en.json";
import itMessages from "@/locales/it.json";

type SmartShelterEnergySection = {
  id: string;
  title: string;
  description: string;
  image?: string;
  items: string[];
  note?: string;
};

type SmartShelterEnergyPageContent = {
  backToHome: string;
  eyebrow: string;
  title: string;
  mission: string;
  snapshot: {
    divisionsLabel: string;
    subdivisionsLabel: string;
    keyPlatformsLabel: string;
    keyPlatformsValue: string;
  };
  operatingAreas: string;
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
  transformation: {
    eyebrow: string;
    title: string;
    lead: string;
    beforeLabel: string;
    beforeTitle: string;
    beforeDescription: string;
    beforeImage: string;
    afterLabel: string;
    afterTitle: string;
    afterDescription: string;
    afterImage: string;
  };
  organigramTitle: string;
  organigramItems: string[];
  sections: SmartShelterEnergySection[];
};

const pageContent: Record<"it" | "en", SmartShelterEnergyPageContent> = {
  it: itMessages.smartShelterEnergyPage,
  en: enMessages.smartShelterEnergyPage
};

const divisionBackgroundImage = "/SectionsBackgrounds/Smart_Shelter&Energy.png";

const sectionThemes = [
  {
    article: "bg-primary text-white",
    title: "text-white",
    list: "text-white",
    divider: "border-[color:var(--color-white)]/18",
    note: "text-white/88 border-[color:var(--color-white)]/18"
  },
  {
    article: "bg-secondary text-white",
    title: "text-white",
    list: "text-white",
    divider: "border-[color:var(--color-white)]/18",
    note: "text-white/88 border-[color:var(--color-white)]/18"
  },
  {
    article: "border border-[color:var(--color-primary)]/12 bg-white text-primary",
    title: "text-[color:var(--color-primary)]",
    list: "text-[color:var(--color-primary)]",
    divider: "border-[color:var(--color-primary)]/12",
    note: "text-[color:var(--color-secondary)] border-[color:var(--color-primary)]/12"
  }
] as const;

const sectionImagePositions = [
  "center 15%",
  "center 35%",
  "center 55%",
  "left center",
  "right center",
  "center 30%",
  "center center",
  "40% center",
  "60% center"
] as const;

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SmartShelterEnergyContent() {
  const [lang, setLang] = useState<"it" | "en">("it");
  const content = pageContent[lang];

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
            onToggle={() => setLang((current) => (current === "it" ? "en" : "it"))}
          />
        }
      />

      <section className="relative overflow-hidden bg-[color:var(--color-primary)] px-4 pb-14 pt-24 text-white sm:px-5 sm:pb-16 sm:pt-26 md:px-8 md:pb-20 md:pt-30 xl:px-14 xl:pb-28 xl:pt-34">
        <Image
          src={divisionBackgroundImage}
          alt={`${content.title} background`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[color:var(--color-primary)]/68" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-primary)]/35 via-[color:var(--color-primary)]/20 to-transparent md:h-40" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 md:gap-10 xl:gap-12">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-3 border border-white/16 bg-white/12 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-[4px] transition hover:bg-white hover:text-[color:var(--color-primary)] sm:text-[12px]"
          >
            <span aria-hidden="true">&larr;</span>
            <span>{content.backToHome}</span>
          </Link>

          <div className="grid gap-4 lg:gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] xl:items-end">
            <div className="border border-white/14 bg-white/10 p-5 backdrop-blur-[6px] sm:p-6 md:p-8 xl:p-10">
              <div className="space-y-5 md:space-y-6">
                <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                  {content.eyebrow}
                </p>

                <h1 className="font-change-serif-bold max-w-[11ch] text-[2.2rem] leading-[0.92] uppercase tracking-[0.015em] sm:max-w-[12ch] sm:text-[2.8rem] md:max-w-[13ch] md:text-[3.7rem] xl:max-w-[12ch] xl:text-[4.8rem]">
                  {content.title}
                </h1>

                <p className="max-w-3xl border-l-2 border-[color:var(--color-thirdary)]/80 pl-4 text-[13px] leading-6 text-white/88 sm:text-[14px] sm:leading-7 md:pl-5 md:text-[16px] md:leading-8">
                  {content.mission}
                </p>
              </div>
            </div>

            <div className="border border-white/14 bg-[color:var(--color-primary)]/78 px-5 py-6 text-white backdrop-blur-[4px] md:px-6 md:py-7 xl:self-stretch">
              <div>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                    {content.positioning}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {content.positioningItems.map((item) => (
                    <li
                      key={item}
                      className="border-b border-[color:var(--color-white)]/18 pb-4 text-[13px] leading-6 text-[color:var(--color-white)] sm:text-sm md:text-[15px] md:leading-7 last:border-b-0 last:pb-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 border-t border-[color:var(--color-white)]/14 pt-5 text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[12px]">
                {content.positioningFooter}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[color:var(--color-secondary)]/35 bg-linear-to-b from-[color:var(--color-secondary)]/50 via-[color:var(--color-secondary)]/20 to-transparent px-4 py-14 text-primary sm:px-5 sm:py-16 md:px-8 md:py-20 xl:px-14 xl:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-secondary)]/35 via-[color:var(--color-secondary)]/10 to-transparent md:h-40" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 md:gap-10 xl:gap-14">
          <div className="max-w-5xl space-y-4 md:space-y-6">
            <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
              {content.programEyebrow}
            </p>
            <h2 className="font-change-serif-bold max-w-[18ch] text-[2rem] leading-[0.94] uppercase tracking-[0.015em] sm:max-w-[20ch] sm:text-[2.5rem] md:max-w-[20ch] md:text-[3.5rem] xl:max-w-[18ch] xl:text-[4.2rem]">
              {content.programTitle}
            </h2>
            <p className="max-w-3xl border-l-2 border-[color:var(--color-thirdary)] pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
              {content.programLead}
            </p>
          </div>

          <div className="grid gap-4 md:gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:items-stretch xl:gap-6">
            <div className="relative overflow-hidden border border-[color:var(--color-primary)]/10 bg-white p-5 shadow-[0_28px_80px_rgba(31,39,92,0.08)] md:p-7 xl:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.14),transparent_34%)]" />
              <div className="relative">
                <div className="mb-5 flex items-center justify-between gap-4 md:mb-6">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                    {content.framework}
                  </p>
                </div>

                <div className="space-y-4 md:space-y-5">
                  {content.frameworkParagraphs.map((paragraph, index) => (
                    <p
                      key={paragraph}
                      className={joinClasses(
                        "text-[13px] leading-6 text-[color:var(--color-primary)] sm:text-sm md:text-[15px] md:leading-7",
                        index === 0
                          ? "font-change-serif-bold text-[1.3rem] leading-[1.12] md:text-[1.55rem]"
                          : undefined
                      )}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <aside className="overflow-hidden border border-[color:var(--color-primary)] bg-[color:var(--color-primary)] px-5 py-6 text-[color:var(--color-white)] shadow-[0_24px_60px_rgba(31,39,92,0.18)] md:px-6 md:py-7">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-secondary)] sm:text-[10px] md:text-[11px]">
                  {content.focus}
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {content.focusItems.map((item, index) => (
                  <li
                    key={item}
                    className="border border-[color:var(--color-white)]/12 bg-white/6 p-4"
                  >
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 text-[13px] leading-6 text-[color:var(--color-white)] sm:text-sm md:text-[15px] md:leading-7">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="overflow-hidden shadow-[0_28px_80px_rgba(31,39,92,0.08)]">
            <div className="grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="px-5 py-6 md:px-7 md:py-8 xl:px-8">
                <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                  {content.transformation.eyebrow}
                </p>
                <h3 className="mt-4 font-change-serif-bold max-w-[14ch] text-[1.9rem] leading-[0.96] uppercase tracking-[0.015em] text-[color:var(--color-primary)] sm:text-[2.2rem] md:text-[2.7rem]">
                  {content.transformation.title}
                </h3>
                <p className="mt-5 max-w-xl pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7">
                  {content.transformation.lead}
                </p>
              </div>

              <div className="grid gap-px  md:grid-cols-2">
                <article className=" p-3 md:p-4">
                  <div className="relative overflow-hidden">
                    <div className="relative aspect-[5/6] sm:aspect-[16/10] md:aspect-[4/5]">
                      <Image
                        src={content.transformation.beforeImage}
                        alt={content.transformation.beforeTitle}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[color:var(--color-primary)]/76 via-[color:var(--color-primary)]/18 to-transparent" />
                      <div className="absolute left-3 top-3 border border-[color:var(--color-thirdary)]/40 bg-[color:var(--color-thirdary)]/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-[2px]">
                        {content.transformation.beforeLabel}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-4 md:px-5">
                    <h4 className="font-change-serif-bold text-[1.05rem] uppercase tracking-[0.05em] text-[color:var(--color-primary)] md:text-[1.15rem]">
                      {content.transformation.beforeTitle}
                    </h4>
                    <p className="mt-3 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7">
                      {content.transformation.beforeDescription}
                    </p>
                  </div>
                </article>

                <article className="bg-[color:var(--color-primary)]/3 p-3 md:p-4">
                  <div className="relative overflow-hidden bg-[color:var(--color-primary)]">
                    <div className="relative aspect-[5/6] sm:aspect-[16/10] md:aspect-[4/5]">
                      <Image
                        src={content.transformation.afterImage}
                        alt={content.transformation.afterTitle}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[color:var(--color-primary)]/76 via-[color:var(--color-primary)]/18 to-transparent" />
                      <div className="absolute left-3 top-3 border border-[color:var(--color-thirdary)]/40 bg-[color:var(--color-thirdary)]/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-[2px]">
                        {content.transformation.afterLabel}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-4 md:px-5">
                    <h4 className="font-change-serif-bold text-[1.05rem] uppercase tracking-[0.05em] text-[color:var(--color-primary)] md:text-[1.15rem]">
                      {content.transformation.afterTitle}
                    </h4>
                    <p className="mt-3 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7">
                      {content.transformation.afterDescription}
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-14 md:space-y-7 md:pt-18 xl:pt-20">
            <div className="max-w-4xl space-y-3 md:space-y-4">
              <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                {content.operatingAreas}
              </p>
              <div className="h-px w-20 bg-[color:var(--color-thirdary)]/60" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
              {content.sections.map((section, index) => {
                const theme = sectionThemes[index % sectionThemes.length];
                const sectionImage = section.image ?? divisionBackgroundImage;

                return (
                  <article
                    key={section.id}
                    className={joinClasses(
                      "flex h-full flex-col overflow-hidden shadow-[0_24px_60px_rgba(31,39,92,0.08)]",
                      theme.article
                    )}
                  >
                    <div className="relative min-h-[13rem] sm:min-h-[14rem] xl:min-h-[15rem]">
                      <Image
                        src={sectionImage}
                        alt={`${section.title} visual`}
                        fill
                        className="object-cover"
                        style={{ objectPosition: sectionImagePositions[index % sectionImagePositions.length] }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[color:var(--color-primary)] via-[color:var(--color-primary)]/26 to-transparent" />
                      <div className="absolute left-4 top-4 border border-white/18 bg-[color:var(--color-primary)]/56 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-white backdrop-blur-[2px] sm:left-5 sm:top-5 sm:text-[10px]">
                        {section.id}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <div className="flex-1">
                        <h3
                          className={joinClasses(
                            "font-change-serif-bold text-[1.2rem] uppercase tracking-[0.05em] md:text-[1.35rem]",
                            theme.title
                          )}
                        >
                          {section.title}
                        </h3>

                        <p
                          className={joinClasses(
                            "mt-3 text-[13px] leading-6 sm:text-sm md:text-[15px] md:leading-7",
                            theme.note
                          )}
                        >
                          {section.description}
                        </p>

                        <ul
                          className={joinClasses(
                            "mt-5 space-y-3 text-[13px] leading-6 sm:text-sm md:text-[15px] md:leading-7",
                            theme.list
                          )}
                        >
                          {section.items.map((item) => (
                            <li
                              key={item}
                              className={joinClasses(
                                "border-b pb-3 last:border-b-0 last:pb-0",
                                theme.divider
                              )}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {section.note ? (
                        <p
                          className={joinClasses(
                            "mt-5 border-t pt-5 text-[13px] leading-6 sm:text-sm md:text-[15px] md:leading-7",
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
