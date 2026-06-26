"use client";

import { useState } from "react";
import Link from "next/link";
import CompactHeader from "@/components/UI/CompactHeader";
import ToggleLang from "@/components/UI/toggleLang";
import enMessages from "@/locales/en.json";
import itMessages from "@/locales/it.json";

const pageContent = {
  it: itMessages.identityAdvertisingPage,
  en: enMessages.identityAdvertisingPage,
} as const;

export default function IdentityAdvertisingContent() {
  const [lang, setLang] = useState<"it" | "en">("it");
  const content = pageContent[lang];

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

      <section className="relative overflow-hidden bg-white px-4 pb-18 pt-28 text-primary sm:px-5 md:px-8 md:pb-24 md:pt-32 xl:px-14 xl:pb-32 xl:pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-secondary)]/50 via-[color:var(--color-secondary)]/20 to-transparent md:h-40" />

        <div className="relative mx-auto flex max-w-md flex-col gap-8 md:max-w-3xl md:gap-10 xl:max-w-7xl xl:gap-12">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-secondary)] transition hover:text-[color:var(--color-primary)] sm:text-[12px]"
          >
            <span aria-hidden="true">&larr;</span>
            <span>{content.backToHome}</span>
          </Link>

          <div className="space-y-5 md:space-y-6">
            <p className="mb-4 text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-secondary)] sm:text-[10px] md:text-[11px]">
              {content.eyebrow}
            </p>

            <h1 className="font-change-serif-bold max-w-[14ch] text-[2.1rem] leading-[0.94] uppercase tracking-[0.015em] sm:max-w-[16ch] sm:text-[2.5rem] md:max-w-[18ch] md:text-[3.4rem] xl:max-w-[20ch] xl:text-[4rem]">
              {content.title}
            </h1>

            <p className="max-w-4xl border-l border-[color:var(--color-primary)]/65 pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7">
              {content.mission}
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2 xl:items-stretch xl:gap-5">
            <div className="flex flex-col bg-white p-5 md:p-7 xl:h-full xl:p-8">
              <div className="mb-5 flex items-center justify-between gap-4 md:mb-6">
                <h2 className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[color:var(--color-secondary)] sm:text-[10px] md:text-[11px]">
                  {content.operatingAreas}
                </h2>
              </div>
              <ul className="flex flex-1 flex-col justify-evenly gap-3 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:gap-4 md:text-[15px] md:leading-7">
                {content.sections.map((section) => (
                  <li
                    key={section.id}
                    className="border-b border-[color:var(--color-secondary)]/28 py-3 last:border-b-0 last:pb-0"
                  >
                    {section.title}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
              <div className="bg-primary px-5 py-6 text-white md:px-6 md:py-7">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="text-[9px] uppercase tracking-[0.22em] text-white sm:text-[10px] md:text-[11px]">
                    {content.positioning}
                  </h2>
                </div>
                <ul className="space-y-3 text-[13px] leading-6 text-[color:var(--color-white)] sm:text-sm md:text-[15px] md:leading-7">
                  {content.positioningItems.map((item) => (
                    <li
                      key={item}
                      className="border-b border-[color:var(--color-white)]/18 pb-3 last:border-b-0 last:pb-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-secondary px-5 py-6 md:px-6 md:py-7">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-white)] sm:text-[10px] md:text-[11px]">
                    {content.visualSpace}
                  </h2>
                </div>
                <div className="flex min-h-[14rem] items-center justify-center border border-[color:var(--color-white)]/18 px-6 text-center text-[13px] leading-6 text-[color:var(--color-white)] sm:text-sm md:text-[15px] md:leading-7">
                  {content.heroImagePlaceholder}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[color:var(--color-secondary)]/35 bg-linear-to-b from-[color:var(--color-secondary)]/50 via-[color:var(--color-secondary)]/20 to-transparent px-4 py-16 text-primary sm:px-5 md:px-8 md:py-20 xl:px-14 xl:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[color:var(--color-secondary)]/35 via-[color:var(--color-secondary)]/10 to-transparent md:h-40" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-6xl xl:max-w-[82%]">
            <p className="mb-4 text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-secondary)] sm:text-[10px] md:text-[11px]">
              {content.programEyebrow}
            </p>
            <h2 className="font-change-serif-bold max-w-[15ch] text-[2.1rem] leading-[0.94] uppercase tracking-[0.015em] sm:max-w-[16ch] sm:text-[2.5rem] md:max-w-[19ch] md:text-[3.5rem] xl:max-w-[21ch] xl:text-[4.2rem]">
              {content.programTitle}
            </h2>
            <p className="mt-7 max-w-3xl border-l border-[color:var(--color-primary)]/65 pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
              {content.programLead}
            </p>
          </div>

          <div className="mt-12 grid gap-5 xl:grid-cols-3 xl:items-stretch xl:gap-5">
            <div className="bg-white p-5 md:p-7 xl:col-span-2 xl:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-primary)] sm:text-[10px] md:text-[11px]">
                  {content.framework}
                </p>
              </div>
              <div className="space-y-5 text-[13px] leading-6 text-[color:var(--color-primary)] sm:text-sm md:text-[15px] md:leading-7">
                {content.frameworkParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="border border-[color:var(--color-primary)]/14 px-5 py-8 text-center text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7">
                  {content.frameworkImagePlaceholder}
                </div>
              </div>
            </div>

            <aside className="border border-[color:var(--color-primary)] bg-[color:var(--color-primary)] px-5 py-6 text-[color:var(--color-white)] md:px-6 md:py-7 xl:col-span-1">
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
            </aside>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {content.sections.map((section, index) => (
              <article
                key={section.id}
                className={
                  index % 3 === 0
                    ? "bg-secondary p-5 md:p-6"
                    : index % 3 === 1
                      ? "bg-primary p-5 md:p-6"
                      : "bg-white p-5 md:p-6"
                }
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <p
                    className={
                      index % 3 === 2
                        ? "text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-primary)] sm:text-[10px] md:text-[11px]"
                        : "text-[9px] uppercase tracking-[0.22em] text-white/70 sm:text-[10px] md:text-[11px]"
                    }
                  >
                    {section.id}
                  </p>
                </div>
                <h3
                  className={
                    index % 3 === 2
                      ? "font-change-serif-bold text-[13px] uppercase tracking-[0.06em] text-[color:var(--color-primary)] sm:text-sm md:text-[15px]"
                      : "font-change-serif-bold text-[13px] uppercase tracking-[0.06em] text-white sm:text-sm md:text-[15px]"
                  }
                >
                  {section.title}
                </h3>
                <ul
                  className={
                    index % 3 === 2
                      ? "mt-5 space-y-3 text-[13px] leading-6 text-[color:var(--color-primary)] sm:text-sm md:text-[15px] md:leading-7"
                      : "mt-5 space-y-3 text-[13px] leading-6 text-[color:var(--color-white)] sm:text-sm md:text-[15px] md:leading-7"
                  }
                >
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className={
                        index % 3 === 2
                          ? "border-b border-[color:var(--color-primary)]/14 pb-3 last:border-b-0 last:pb-0"
                          : "border-b border-[color:var(--color-white)]/18 pb-3 last:border-b-0 last:pb-0"
                      }
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {section.note ? (
                  <p
                    className={
                      index % 3 === 2
                        ? "mt-5 border-t border-[color:var(--color-primary)]/14 pt-5 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7"
                        : "mt-5 border-t border-[color:var(--color-white)]/18 pt-5 text-[13px] leading-6 text-[color:var(--color-white)] sm:text-sm md:text-[15px] md:leading-7"
                    }
                  >
                    {section.note}
                  </p>
                ) : null}

                <div
                  className={
                    index % 3 === 2
                      ? "mt-5 border border-[color:var(--color-primary)]/14 px-4 py-6 text-center text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7"
                      : "mt-5 border border-[color:var(--color-white)]/18 px-4 py-6 text-center text-[13px] leading-6 text-[color:var(--color-white)] sm:text-sm md:text-[15px] md:leading-7"
                  }
                >
                  {content.sectionImagePlaceholder} {section.title}.
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
