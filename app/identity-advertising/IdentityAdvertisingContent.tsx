"use client";

import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CompactHeader from "@/components/UI/CompactHeader";
import ToggleLang from "@/components/UI/toggleLang";
import enMessages from "@/locales/en.json";
import itMessages from "@/locales/it.json";

const pageContent = {
  it: itMessages.identityAdvertisingPage,
  en: enMessages.identityAdvertisingPage,
} as const;

// Main image assignments for this page. The hero uses the same division asset shown on the homepage.
const divisionBackgroundImage = "/SectionsBackgrounds/PublicityAdversiting.jpeg";

const sectionThemes = [
  {
    article: "bg-primary text-white",
    eyebrow: "text-white/68",
    title: "text-white",
    list: "text-white",
    divider: "border-[color:var(--color-white)]/18",
    note: "text-white/88 border-[color:var(--color-white)]/18",
  },
  {
    article: "bg-secondary text-white",
    eyebrow: "text-white/68",
    title: "text-white",
    list: "text-white",
    divider: "border-[color:var(--color-white)]/18",
    note: "text-white/88 border-[color:var(--color-white)]/18",
  },
  {
    article: "border border-[color:var(--color-primary)]/12 bg-white text-primary",
    eyebrow: "text-[color:var(--color-secondary)]",
    title: "text-[color:var(--color-primary)]",
    list: "text-[color:var(--color-primary)]",
    divider: "border-[color:var(--color-primary)]/12",
    note: "text-[color:var(--color-secondary)] border-[color:var(--color-primary)]/12",
  },
] as const;

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function IdentityAdvertisingContent() {
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
      {/* Sticky compact header with language toggle */}
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

      {/* Hero section:
          back link, main title/mission, positioning panel and top editorial images */}
      <section className="relative overflow-hidden bg-[color:var(--color-primary)] px-4 pb-18 pt-28 text-white sm:px-5 md:px-8 md:pb-24 md:pt-32 xl:px-14 xl:pb-32 xl:pt-36">
        <Image
          src={divisionBackgroundImage}
          alt={`${content.title} background`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[color:var(--color-primary)]/68" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-primary)]/35 via-[color:var(--color-primary)]/20 to-transparent md:h-40" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 md:gap-12 xl:gap-14">
          <Link
            href="/"
            className="font-bold inline-flex w-fit items-center gap-3 border border-white/16 bg-white/12 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-[4px] transition hover:bg-white hover:text-[color:var(--color-primary)] sm:text-[12px]"
          >
            <span aria-hidden="true">&larr;</span>
            <span>{content.backToHome}</span>
          </Link>

          {/* Top two-column composition:
              left = intro copy + positioning card
              right = hero/support imagery */}
          <div className="max-w-4xl">
            <div className="space-y-8 border border-white/14 bg-white/10 p-6 backdrop-blur-[6px] md:space-y-10 md:p-8 xl:p-10">
              {/* Intro copy comes from identityAdvertisingPage in the locale JSON files. */}
              <div className="space-y-5 md:space-y-6">
                <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                  {content.eyebrow}
                </p>

                <h1 className="font-change-serif-bold max-w-[13ch] text-[2.3rem] leading-[0.92] uppercase tracking-[0.015em] sm:max-w-[14ch] sm:text-[2.8rem] md:max-w-[15ch] md:text-[3.8rem] xl:max-w-[14ch] xl:text-[4.8rem]">
                  {content.title}
                </h1>

                <p className="max-w-3xl border-l-2 border-[color:var(--color-thirdary)]/80 pl-4 text-[13px] leading-6 text-white/88 sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
                  {content.mission}
                </p>
              </div>

              {/* Positioning card. Edit positioningItems in the locale JSON files. */}
              <div className="grid gap-5">
                <div className="flex flex-col justify-between border border-white/14 bg-[color:var(--color-primary)]/72 px-5 py-6 text-white md:px-6 md:py-7">
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
                    Identity system for urban, mobility and premium environments.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program section:
          headline, framework/focus content, image strip and detailed operating-area cards */}
      <section className="relative overflow-hidden border-t border-[color:var(--color-secondary)]/35 bg-linear-to-b from-[color:var(--color-secondary)]/50 via-[color:var(--color-secondary)]/20 to-transparent px-4 py-16 text-primary sm:px-5 md:px-8 md:py-20 xl:px-14 xl:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-secondary)]/35 via-[color:var(--color-secondary)]/10 to-transparent md:h-40" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 md:gap-12 xl:gap-14">
          {/* Program intro text from JSON: programEyebrow, programTitle, programLead */}
          <div className="max-w-5xl space-y-5 md:space-y-6">
            <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
              {content.programEyebrow}
            </p>
            <h2 className="font-change-serif-bold max-w-[15ch] text-[2.1rem] leading-[0.94] uppercase tracking-[0.015em] sm:max-w-[16ch] sm:text-[2.5rem] md:max-w-[18ch] md:text-[3.5rem] xl:max-w-[20ch] xl:text-[4.2rem]">
              {content.programTitle}
            </h2>
            <p className="max-w-3xl border-l-2 border-[color:var(--color-thirdary)] pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
              {content.programLead}
            </p>
          </div>

          {/* Mid-page content:
              left = framework editorial block
              right = focus list */}
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] xl:items-stretch xl:gap-6">
            <div className="relative overflow-hidden border border-[color:var(--color-primary)]/10 bg-white p-5 shadow-[0_28px_80px_rgba(31,39,92,0.08)] md:p-7 xl:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.14),transparent_34%)]" />
              <div className="relative flex h-full flex-col justify-center">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <p className="w-full text-left text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                    {content.framework}
                  </p>
                </div>

                <div className="mx-auto flex max-w-3xl flex-col items-left gap-4 text-left md:gap-5">
                  {content.frameworkParagraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[13px] leading-6 text-[color:var(--color-primary)] sm:text-sm md:text-[15px] md:leading-7"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <aside className="flex flex-col justify-between border border-[color:var(--color-primary)] bg-[color:var(--color-primary)] px-5 py-6 text-[color:var(--color-white)] md:px-6 md:py-7">
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
                      <span className="text-[13px] leading-6 text-[color:var(--color-white)] sm:text-sm md:text-[15px] md:leading-7">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* Detailed operating areas grid.
              Each card is generated from content.sections in the locale JSON files. */}
          <div className="space-y-6 pt-20 md:space-y-7">
            <div className="max-w-4xl">
              <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
                {content.operatingAreas}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {content.sections.map((section, index) => {
                // Theme rotation and per-card image choice for the operating-area cards.
                const theme = sectionThemes[index % sectionThemes.length];
                const isLastCard = index === content.sections.length - 1;
                const centerLastCardOnTablet = isLastCard && content.sections.length % 2 === 1;
                const centerLastCardOnDesktop = isLastCard && content.sections.length % 3 === 1;

                return (
                  <article
                    key={section.id}
                    className={joinClasses(
                      "overflow-hidden",
                      theme.article,
                      centerLastCardOnTablet
                        ? "md:col-[1/-1] md:justify-self-center md:w-full md:max-w-[calc((100%-1.25rem)/2)]"
                        : undefined,
                      centerLastCardOnDesktop
                        ? "xl:col-[2/3] xl:max-w-none"
                        : undefined
                    )}
                  >
                    <div className="relative min-h-[14rem]">
                      <Image
                        src={section.image}
                        alt={`${section.title} visual`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[color:var(--color-primary)] via-[color:var(--color-primary)]/10 to-transparent" />
                      <div className="absolute left-5 top-5 border border-white/18 bg-[color:var(--color-primary)]/56 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-white backdrop-blur-[2px] sm:text-[10px]">
                        {section.id}
                      </div>
                    </div>

                    <div className="p-5 md:p-6">
                      <h3
                        className={joinClasses(
                          "font-change-serif-bold text-[1.2rem] uppercase tracking-[0.05em] md:text-[1.35rem]",
                          theme.title
                        )}
                      >
                        {section.title}
                      </h3>

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
