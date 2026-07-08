"use client";

import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CompactHeader from "@/components/UI/CompactHeader";
import ToggleLang from "@/components/UI/toggleLang";
import enMessages from "@/locales/en.json";
import itMessages from "@/locales/it.json";

type ParfumVisualPlaceholder = {
  id: string;
  title: string;
  caption: string;
};

type ParfumSection = {
  id: string;
  title: string;
  description: string;
  items: string[];
  note?: string;
};

type ParfumPageContent = {
  backToHome: string;
  eyebrow: string;
  title: string;
  mission: string;
  nfcLabel: string;
  nfcMeaning: string;
  positioning: string;
  positioningItems: string[];
  positioningFooter: string;
  conceptEyebrow: string;
  conceptTitle: string;
  conceptLead: string;
  conceptQuote: string;
  conceptStatement: string;
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
  visualPlaceholders: ParfumVisualPlaceholder[];
  launchEyebrow: string;
  launchTitle: string;
  launchLead: string;
  launchItems: string[];
  launchFooter: string;
  operatingAreas: string;
  sections: ParfumSection[];
};

const pageContent: Record<"it" | "en", ParfumPageContent> = {
  it: itMessages.parfumPage,
  en: enMessages.parfumPage,
};

const divisionBackgroundImage = "/SectionsBackgrounds/Parfum.png";

const sectionThemes = [
  {
    article: "bg-primary text-white",
    title: "text-white",
    body: "text-white/88",
    list: "text-white",
    divider: "border-[color:var(--color-white)]/18",
    note: "text-white/88 border-[color:var(--color-white)]/18",
  },
  {
    article: "bg-secondary text-white",
    title: "text-white",
    body: "text-white/88",
    list: "text-white",
    divider: "border-[color:var(--color-white)]/18",
    note: "text-white/88 border-[color:var(--color-white)]/18",
  },
  {
    article: "border border-[color:var(--color-primary)]/12 bg-white text-primary",
    title: "text-[color:var(--color-primary)]",
    body: "text-[color:var(--color-secondary)]",
    list: "text-[color:var(--color-primary)]",
    divider: "border-[color:var(--color-primary)]/12",
    note: "text-[color:var(--color-secondary)] border-[color:var(--color-primary)]/12",
  },
] as const;

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function ParfumContent() {
  const [lang, setLang] = useState<"it" | "en">("it");
  const content = pageContent[lang];
  const nfcWords = content.nfcMeaning.split(" ");

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

      <section className="relative overflow-hidden bg-[color:var(--color-primary)] px-4 pb-18 pt-28 text-white sm:px-5 md:px-8 md:pb-24 md:pt-32 xl:px-14 xl:pb-32 xl:pt-36">
        <Image
          src={divisionBackgroundImage}
          alt={`${content.title} background`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[color:var(--color-primary)]/72" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-primary)]/35 via-[color:var(--color-primary)]/20 to-transparent md:h-40" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 md:gap-12 xl:gap-14">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-3 border border-white/16 bg-white/12 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-[4px] transition hover:bg-white hover:text-[color:var(--color-primary)] sm:text-[12px]"
          >
            <span aria-hidden="true">&larr;</span>
            <span>{content.backToHome}</span>
          </Link>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:items-stretch xl:gap-6">
            <div className="min-w-0 space-y-8 border border-white/14 bg-white/10 p-5 backdrop-blur-[6px] sm:p-6 md:space-y-10 md:p-8 xl:p-10">
              <div className="space-y-5 md:space-y-6">
                <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                  {content.eyebrow}
                </p>

                <h1 className="font-change-serif-bold max-w-[9ch] text-[clamp(2rem,10vw,2.8rem)] leading-[0.92] uppercase tracking-[0.01em] break-words sm:max-w-[13ch] md:max-w-[14ch] md:text-[3.9rem] md:tracking-[0.015em] xl:max-w-[12ch] xl:text-[4.8rem]">
                  {content.title}
                </h1>

                <p className="max-w-3xl border-l-2 border-[color:var(--color-thirdary)]/80 pl-4 text-[13px] leading-6 text-white/88 break-words sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
                  {content.mission}
                </p>
              </div>

              <div className="pt-6">
                <div className="grid gap-5">

                  <ul className="grid w-full gap-3 sm:grid-cols-3 sm:items-stretch">
                    {nfcWords.map((word) => (
                      <li
                        key={word}
                        className="flex min-h-[4.5rem] min-w-0 w-full items-center justify-center px-3 py-4 text-center"
                      >
                        <p className="w-full text-center font-change-serif-bold text-[1rem] uppercase leading-none tracking-[0.015em] whitespace-nowrap text-white sm:text-[1.1rem] md:text-[1.16rem]">
                          {word}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="min-w-0 border border-white/14 bg-[color:var(--color-primary)]/74 px-4 py-5 text-white backdrop-blur-[4px] sm:px-5 sm:py-6 md:px-6 md:py-7">
                <p className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                  {content.conceptEyebrow}
                </p>
                <p className="mt-3 text-[13px] leading-6 text-white/88 break-words sm:text-sm md:text-[15px] md:leading-7">
                  {content.conceptLead}
                </p>
                <p className="mt-5 pt-5 font-change-serif-bold text-[1.25rem] leading-[1.08] text-white break-words sm:text-[1.45rem] md:text-[1.25rem]">
                  &quot;{content.conceptQuote}&quot;
                </p>
              </div>
            </div>

            <div className="min-w-0 xl:self-end">
              <div className="min-w-0 border border-white/14 bg-[color:var(--color-primary)]/78 px-4 py-5 text-white backdrop-blur-[4px] sm:px-5 sm:py-6 md:px-6 md:py-7">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                    {content.positioning}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {content.positioningItems.map((item) => (
                    <li
                      key={item}
                      className="border-b border-[color:var(--color-white)]/18 pb-4 text-[13px] leading-6 text-[color:var(--color-white)] break-words sm:text-sm md:text-[15px] md:leading-7 last:border-b-0 last:pb-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-[color:var(--color-white)]/14 pt-5">
                  <p className="text-[11px] uppercase leading-5 tracking-[0.18em] text-[color:var(--color-thirdary)] break-words sm:text-[12px] sm:tracking-[0.24em]">
                    {content.positioningFooter}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[color:var(--color-secondary)]/35 bg-linear-to-b from-[color:var(--color-secondary)]/50 via-[color:var(--color-secondary)]/20 to-transparent px-4 py-16 text-primary sm:px-5 md:px-8 md:py-20 xl:px-14 xl:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-secondary)]/35 via-[color:var(--color-secondary)]/10 to-transparent md:h-40" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 md:gap-12 xl:gap-14">
          <div className="max-w-5xl space-y-5 md:space-y-6">
            <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
              {content.programEyebrow}
            </p>
            <h2 className="font-change-serif-bold max-w-[11ch] text-[clamp(1.95rem,9vw,2.4rem)] leading-[0.94] uppercase tracking-[0.01em] break-words sm:max-w-[17ch] sm:text-[2.5rem] md:max-w-[18ch] md:text-[3.5rem] md:tracking-[0.015em] xl:max-w-[16ch] xl:text-[4.2rem]">
              {content.programTitle}
            </h2>
            <p className="max-w-3xl border-l-2 border-[color:var(--color-thirdary)] pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] break-words sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
              {content.programLead}
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:items-stretch xl:gap-6">
            <div className="relative min-w-0 overflow-hidden border border-[color:var(--color-primary)]/10 bg-white p-5 shadow-[0_28px_80px_rgba(31,39,92,0.08)] md:p-7 xl:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.14),transparent_34%)]" />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                    {content.framework}
                  </p>
                </div>

                <div className="space-y-5">
                  {content.frameworkParagraphs.map((paragraph, index) => (
                    <p
                      key={paragraph}
                      className={joinClasses(
                        "text-[13px] leading-6 text-[color:var(--color-primary)] break-words sm:text-sm md:text-[15px] md:leading-7",
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

            <aside className="min-w-0 flex flex-col justify-between border border-[color:var(--color-primary)] bg-[color:var(--color-primary)] px-4 py-5 text-[color:var(--color-white)] sm:px-5 sm:py-6 md:px-6 md:py-7">
              <div>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-secondary)] sm:text-[10px] md:text-[11px]">
                    {content.focus}
                  </p>
                </div>
                <ul className="space-y-4">
                  {content.focusItems.map((item) => (
                    <li
                      key={item}
                      className="border-b border-[color:var(--color-white)]/18 pb-4 last:border-b-0 last:pb-0"
                    >
                      <span className="text-[13px] leading-6 text-[color:var(--color-white)] break-words sm:text-sm md:text-[15px] md:leading-7">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-stretch xl:gap-6">
            <div className="min-w-0 border border-[color:var(--color-primary)]/10 bg-white px-4 py-5 shadow-[0_28px_80px_rgba(31,39,92,0.08)] sm:px-5 sm:py-6 md:px-7 md:py-8 xl:px-8">
              <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                {content.launchEyebrow}
              </p>
              <h3 className="mt-4 max-w-[11ch] font-change-serif-bold text-[1.7rem] leading-[0.96] uppercase tracking-[0.01em] text-[color:var(--color-primary)] break-words sm:max-w-[14ch] sm:text-[2.2rem] md:text-[2.7rem] md:tracking-[0.015em]">
                {content.launchTitle}
              </h3>
              <p className="mt-5 max-w-xl border-l-2 border-[color:var(--color-thirdary)]/65 pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] break-words sm:text-sm md:text-[15px] md:leading-7">
                {content.launchLead}
              </p>
              <ul className="mt-6 space-y-3">
                {content.launchItems.map((item) => (
                  <li
                    key={item}
                    className="border border-[color:var(--color-primary)]/10 px-4 py-3 text-[12px] uppercase leading-5 tracking-[0.14em] text-[color:var(--color-primary)] break-words sm:text-[13px] sm:tracking-[0.2em]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-[color:var(--color-primary)]/10 pt-5 text-[13px] leading-6 text-[color:var(--color-secondary)] break-words sm:text-sm md:text-[15px] md:leading-7">
                {content.launchFooter}
              </p>
            </div>

            <div className="min-w-0 overflow-hidden border border-[color:var(--color-primary)]/10 bg-white shadow-[0_28px_80px_rgba(31,39,92,0.08)]">
              <div className="px-4 py-5 sm:px-5 sm:py-6 md:px-7 md:py-8 xl:px-8">
                <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                  {content.visualsEyebrow}
                </p>
                <h3 className="mt-4 max-w-[11ch] font-change-serif-bold text-[1.65rem] leading-[0.96] uppercase tracking-[0.01em] text-[color:var(--color-primary)] break-words sm:max-w-[15ch] sm:text-[2.1rem] md:text-[2.5rem] md:tracking-[0.015em]">
                  {content.visualsTitle}
                </h3>
                <p className="mt-5 max-w-2xl border-l-2 border-[color:var(--color-thirdary)]/65 pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] break-words sm:text-sm md:text-[15px] md:leading-7">
                  {content.visualsLead}
                </p>
              </div>

              <div className="grid gap-px bg-[color:var(--color-primary)]/8 md:grid-cols-3">
                {content.visualPlaceholders.map((visual) => (
                  <div
                    key={visual.id}
                    className="min-w-0 bg-white p-4 md:p-5"
                  >
                    <div className="relative overflow-hidden border border-dashed border-[color:var(--color-primary)]/18 bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.18),transparent_45%),linear-gradient(180deg,rgba(31,39,92,0.04),rgba(31,39,92,0.08))]">
                      <div className="min-h-[24rem] px-4 py-4 sm:min-h-0 sm:aspect-[4/5] sm:px-5 sm:py-5">
                        <div className="flex h-full flex-col justify-between">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-[9px] uppercase tracking-[0.18em] text-[color:var(--color-thirdary)] sm:text-[10px] sm:tracking-[0.22em]">
                              {content.visualsEyebrow}
                            </span>
                            <span className="max-w-[9ch] text-right text-[9px] uppercase leading-4 tracking-[0.18em] text-[color:var(--color-primary)]/55 break-words sm:max-w-none sm:text-[10px] sm:tracking-[0.22em]">
                              {content.visualComingSoonLabel}
                            </span>
                          </div>

                          <div className="space-y-4 min-w-0">
                            <div className="h-px w-14 bg-[color:var(--color-thirdary)]/60" />
                            <h4 className="font-change-serif-bold max-w-[10ch] text-[1.2rem] uppercase leading-[1.02] tracking-[0.02em] text-[color:var(--color-primary)] break-words sm:max-w-[9ch] sm:text-[1.35rem] md:text-[1.55rem] md:tracking-[0.04em]">
                              {visual.title}
                            </h4>
                            <p className="text-[13px] leading-6 text-[color:var(--color-secondary)] break-words sm:text-sm md:text-[15px] md:leading-7">
                              {visual.caption}
                            </p>
                          </div>

                          <div className="mt-6 border-t border-[color:var(--color-primary)]/10 pt-4 text-[11px] uppercase leading-5 tracking-[0.18em] text-[color:var(--color-primary)]/60 break-words sm:tracking-[0.24em]">
                            {content.visualPlaceholderLabel}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-14 md:space-y-7 md:pt-18 xl:pt-20">
            <div className="max-w-4xl">
              <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                {content.operatingAreas}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {content.sections.map((section, index) => {
                const theme = sectionThemes[index % sectionThemes.length];

                return (
                  <article
                    key={section.id}
                    className={joinClasses(
                      "flex h-full min-w-0 flex-col overflow-hidden shadow-[0_24px_60px_rgba(31,39,92,0.08)]",
                      theme.article
                    )}
                  >
                    <div className="border-b border-current/10 px-5 py-5 md:px-6">
                      <h3
                        className={joinClasses(
                          "font-change-serif-bold text-[1.15rem] uppercase tracking-[0.03em] break-words sm:text-[1.2rem] md:text-[1.35rem] md:tracking-[0.05em]",
                          theme.title
                        )}
                      >
                        {section.title}
                      </h3>
                      <p
                        className={joinClasses(
                          "mt-3 text-[13px] leading-6 break-words sm:text-sm md:text-[15px] md:leading-7",
                          theme.body
                        )}
                      >
                        {section.description}
                      </p>
                    </div>

                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <ul
                        className={joinClasses(
                          "space-y-3 text-[13px] leading-6 break-words sm:text-sm md:text-[15px] md:leading-7",
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

                      {section.note ? (
                        <p
                          className={joinClasses(
                            "mt-5 border-t pt-5 text-[13px] leading-6 break-words sm:text-sm md:text-[15px] md:leading-7",
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
