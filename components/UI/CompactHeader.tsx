"use client";

import { ReactNode, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import ToggleLang from "./toggleLang";
import {
  divisionNavItems,
  homeHref,
  isDivisionPath,
  isShopPath,
  navigationLabels,
  shopNavItems,
  type SiteLang,
} from "@/lib/siteNavigation";

type CompactHeaderProps = {
  isVisible?: boolean;
  logoHref?: string;
  lang?: SiteLang;
  onToggleLang?: () => void;
  accessory?: ReactNode;
};

export default function CompactHeader({
  isVisible = true,
  logoHref = homeHref,
  lang,
  onToggleLang,
  accessory,
}: CompactHeaderProps) {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isDesktopDivisionOpen, setIsDesktopDivisionOpen] = useState(false);
  const [isDesktopShopOpen, setIsDesktopShopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDivisionOpen, setIsMobileDivisionOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const rafRef = useRef<number | null>(null);
  const desktopDivisionRef = useRef<HTMLDivElement | null>(null);
  const desktopShopRef = useRef<HTMLDivElement | null>(null);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);
  const mobileDivisionId = useId();
  const mobileShopId = useId();
  const labels = navigationLabels[lang ?? "it"];
  const isHomeActive = pathname === "/";
  const isDivisionActive = isDivisionPath(pathname);
  const isShopActive = isShopPath(pathname);
  const showLanguageToggle = Boolean(lang && onToggleLang);

  const getNavLinkClassName = (isActive: boolean) =>
    [
      "inline-flex items-center text-[12px] uppercase leading-none tracking-[0.24em] transition-colors duration-200 md:h-11 md:text-[12px] lg:text-[14px] xl:text-[14px]",
      isActive
        ? "text-[color:var(--color-thirdary)]"
        : "text-[color:var(--color-primary)] hover:text-[color:var(--color-thirdary)]",
    ].join(" ");

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

  useEffect(() => {
    if (!isDesktopDivisionOpen && !isDesktopShopOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        desktopDivisionRef.current &&
        !desktopDivisionRef.current.contains(event.target as Node)
      ) {
        setIsDesktopDivisionOpen(false);
      }

      if (
        desktopShopRef.current &&
        !desktopShopRef.current.contains(event.target as Node)
      ) {
        setIsDesktopShopOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDesktopDivisionOpen(false);
        setIsDesktopShopOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDesktopDivisionOpen, isDesktopShopOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        mobileDrawerRef.current &&
        !mobileDrawerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
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

          <div className="flex items-center gap-3">
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
          </div>

          <nav
            aria-label={labels.navigation}
            className="hidden items-center gap-8 md:flex lg:gap-14 xl:gap-24"
          >
            <Link
              href={homeHref}
              className={getNavLinkClassName(isHomeActive)}
              onClick={() => setIsDesktopDivisionOpen(false)}
              aria-current={isHomeActive ? "page" : undefined}
            >
              {labels.home}
            </Link>

            <div className="relative" ref={desktopDivisionRef}>
              <button
                type="button"
                className={`${getNavLinkClassName(isDivisionActive)} gap-2`}
                onClick={() => {
                  setIsDesktopShopOpen(false);
                  setIsDesktopDivisionOpen((current) => !current);
                }}
                aria-expanded={isDesktopDivisionOpen}
                aria-label={
                  isDesktopDivisionOpen
                    ? labels.closeDivisionMenu
                    : labels.openDivisionMenu
                }
              >
                <span>{labels.division}</span>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform ${
                    isDesktopDivisionOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {isDesktopDivisionOpen ? (
                <div className="absolute left-1/2 top-full z-20 mt-3 w-[15.5rem] -translate-x-1/2 bg-[color:var(--color-white)]/98 px-5 py-4 shadow-[0_20px_50px_-34px_rgba(0,35,91,0.28)]">
                  <div className="grid gap-3">
                    {divisionNavItems.map((item) => {
                      const isItemActive =
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                      return (
                        <Link
                          key={item.slug}
                          href={item.href}
                          className={`text-[10px] uppercase tracking-[0.22em] transition-colors lg:text-[12px] ${
                            isItemActive
                              ? "text-[color:var(--color-thirdary)]"
                              : "text-[color:var(--color-primary)] hover:text-[color:var(--color-thirdary)]"
                          }`}
                          onClick={() => setIsDesktopDivisionOpen(false)}
                          aria-current={isItemActive ? "page" : undefined}
                        >
                          {item.labels[lang ?? "it"]}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="relative" ref={desktopShopRef}>
              <button
                type="button"
                className={`${getNavLinkClassName(isShopActive)} gap-2`}
                onClick={() => {
                  setIsDesktopDivisionOpen(false);
                  setIsDesktopShopOpen((current) => !current);
                }}
                aria-expanded={isDesktopShopOpen}
                aria-label={
                  isDesktopShopOpen ? labels.closeShopMenu : labels.openShopMenu
                }
              >
                <span>{labels.shop}</span>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform ${
                    isDesktopShopOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {isDesktopShopOpen ? (
                <div className="absolute left-1/2 top-full z-20 mt-3 w-[15.5rem] -translate-x-1/2 bg-[color:var(--color-white)]/98 px-5 py-4 shadow-[0_20px_50px_-34px_rgba(0,35,91,0.28)]">
                  <div className="grid gap-3">
                    {shopNavItems.map((item) => {
                      const isItemActive =
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                      return (
                        <Link
                          key={item.key}
                          href={item.href}
                          className={`text-[11px] uppercase tracking-[0.22em] transition-colors lg:text-[12px] ${
                            isItemActive
                              ? "text-[color:var(--color-thirdary)]"
                              : "text-[color:var(--color-primary)] hover:text-[color:var(--color-thirdary)]"
                          }`}
                          onClick={() => setIsDesktopShopOpen(false)}
                          aria-current={isItemActive ? "page" : undefined}
                        >
                          {item.labels[lang ?? "it"]}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            {accessory}

            {showLanguageToggle ? (
              <div className="hidden md:flex">
                <ToggleLang
                  lang={lang!}
                  onToggle={onToggleLang!}
                  className="shrink-0"
                />
              </div>
            ) : null}

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center text-[color:var(--color-primary)] transition-colors hover:text-[color:var(--color-thirdary)] md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label={labels.menu}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      <div
        className={`fixed inset-0 z-[69] bg-[color:var(--color-primary)]/26 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isMobileMenuOpen}
      />

      <aside
        ref={mobileDrawerRef}
        className={`fixed inset-y-0 right-0 z-[71] flex w-[min(82vw,22rem)] flex-col bg-[color:var(--color-white)] shadow-[0_28px_80px_-40px_rgba(0,35,91,0.45)] transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link
            href={logoHref}
            className="flex items-center text-primary transition-opacity hover:opacity-85"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Two Lions"
          >
            <Image
              src="/twoLions_logo.png"
              alt="Two Lions"
              width={58}
              height={58}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-[color:var(--color-primary)] transition-colors hover:text-[color:var(--color-thirdary)]"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label={labels.closeMenu}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="m6 6 12 12" />
              <path d="M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav
          aria-label={labels.navigation}
          className="flex flex-1 flex-col overflow-y-auto px-5 pb-6"
        >
          <div className="flex flex-col">
            <Link
              href={homeHref}
              className={`border-b border-[color:var(--color-primary)]/10 py-4 text-[12px] uppercase tracking-[0.24em] transition-colors ${
                isHomeActive
                  ? "text-[color:var(--color-thirdary)]"
                  : "text-[color:var(--color-primary)]"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current={isHomeActive ? "page" : undefined}
            >
              {labels.home}
            </Link>

            <div className="border-b border-[color:var(--color-primary)]/10">
              <button
                type="button"
                className={`flex w-full items-center justify-between py-4 text-left text-[12px] uppercase tracking-[0.24em] transition-colors ${
                  isDivisionActive
                    ? "text-[color:var(--color-thirdary)]"
                    : "text-[color:var(--color-primary)]"
                }`}
                onClick={() => {
                  setIsMobileShopOpen(false);
                  setIsMobileDivisionOpen((current) => !current);
                }}
                aria-expanded={isMobileDivisionOpen}
                aria-controls={mobileDivisionId}
                aria-label={
                  isMobileDivisionOpen
                    ? labels.closeDivisionMenu
                    : labels.openDivisionMenu
                }
              >
                <span>{labels.division}</span>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform ${
                    isMobileDivisionOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {isMobileDivisionOpen ? (
                <div
                  id={mobileDivisionId}
                  className="grid gap-3 pb-4"
                >
                  {divisionNavItems.map((item) => {
                    const isItemActive =
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                    return (
                      <Link
                        key={item.slug}
                        href={item.href}
                        className={`text-[11px] uppercase tracking-[0.22em] transition-colors ${
                          isItemActive
                            ? "text-[color:var(--color-thirdary)]"
                            : "text-[color:var(--color-primary)]"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-current={isItemActive ? "page" : undefined}
                      >
                        {item.labels[lang ?? "it"]}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <div className="border-b border-[color:var(--color-primary)]/10">
              <button
                type="button"
                className={`flex w-full items-center justify-between py-4 text-left text-[12px] uppercase tracking-[0.24em] transition-colors ${
                  isShopActive
                    ? "text-[color:var(--color-thirdary)]"
                    : "text-[color:var(--color-primary)]"
                }`}
                onClick={() => {
                  setIsMobileDivisionOpen(false);
                  setIsMobileShopOpen((current) => !current);
                }}
                aria-expanded={isMobileShopOpen}
                aria-controls={mobileShopId}
                aria-label={
                  isMobileShopOpen ? labels.closeShopMenu : labels.openShopMenu
                }
              >
                <span>{labels.shop}</span>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform ${
                    isMobileShopOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {isMobileShopOpen ? (
                <div id={mobileShopId} className="grid gap-3 pb-4">
                  {shopNavItems.map((item) => {
                    const isItemActive =
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                    return (
                      <Link
                        key={item.key}
                        href={item.href}
                        className={`text-[11px] uppercase tracking-[0.22em] transition-colors ${
                          isItemActive
                            ? "text-[color:var(--color-thirdary)]"
                            : "text-[color:var(--color-primary)]"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-current={isItemActive ? "page" : undefined}
                      >
                        {item.labels[lang ?? "it"]}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>

          {showLanguageToggle ? (
            <div className="mt-auto pt-6">
              <ToggleLang
                lang={lang!}
                onToggle={onToggleLang!}
                className="justify-center"
              />
            </div>
          ) : null}
        </nav>
      </aside>
    </>
  );
}
