"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  BarChart3,
  ServerCog,
  ShoppingBag,
  ArrowUpRight,
  LogOut,
  ArrowLeft,
  Loader2,
} from "lucide-react";

const PLATFORMS = [
  {
    id: "webmail",
    title: "Webmail",
    description: "Posta elettronica aziendale, calendari e contatti",
    url: "https://mail.twolionsinternational.com",
    icon: Mail,
  },
  {
    id: "analytics",
    title: "Web Analytics",
    description: "Statistiche in tempo reale, visite e metriche di traffico",
    url: "https://www.twolionsinternational.com/analytics/",
    icon: BarChart3,
  },
  {
    id: "mail-admin",
    title: "Mail Administration",
    description: "Gestione del server di posta, caselle e domini",
    url: "https://mail.twolionsinternational.com/admin/",
    icon: ServerCog,
  },
  {
    id: "shop-admin",
    title: "Shop Administration",
    description: "Gestione dello store online, prodotti e ordini",
    url: "https://shop.twolionsinternational.com/admin/",
    icon: ShoppingBag,
  },
];

export default function AdminPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="flex h-[100dvh] max-h-[100dvh] flex-col justify-between overflow-hidden bg-white px-3 py-2.5 text-stone-900 sm:px-6 sm:py-5 md:px-8 md:py-6 lg:px-12">
      <div className="mx-auto flex h-full w-full max-w-5xl lg:max-w-6xl flex-col justify-between">
        {/* Top Header Minimal & Responsive */}
        <header className="flex shrink-0 items-center justify-between gap-2 border-b border-stone-200/80 pb-2 sm:pb-3 md:pb-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3.5">
            <Image
              src="/twoLions_logo.png"
              alt="Two Lions"
              width={56}
              height={56}
              className="h-8 w-auto shrink-0 object-contain sm:h-11 md:h-12 drop-shadow-sm"
              priority
            />
            <div className="min-w-0">
              <p className="truncate font-change-serif-bold text-xs tracking-tight text-[color:var(--color-primary)] sm:text-base md:text-lg sm:tracking-wide">
                Two Lions <span className="hidden min-[380px]:inline">International</span>
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-thirdary)] sm:text-[11px] sm:tracking-[0.2em]">
                Area Riservata
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <Link
              href="/"
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-stone-200 bg-stone-50/80 px-2 text-xs text-stone-600 transition-colors hover:border-[color:var(--color-thirdary)] hover:bg-white hover:text-[color:var(--color-primary)] sm:h-auto sm:px-3 sm:py-2"
              title="Torna al sito pubblico"
              aria-label="Torna al sito pubblico"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Sito pubblico</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-red-200 bg-red-50/70 px-2 text-xs font-medium text-red-700 transition-all hover:border-red-300 hover:bg-red-100 disabled:opacity-50 sm:h-auto sm:gap-1.5 sm:px-3 sm:py-2"
            >
              {isLoggingOut ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-red-600" />
              ) : (
                <LogOut className="h-3.5 w-3.5 text-red-600" />
              )}
              <span>Esci</span>
            </button>
          </div>
        </header>

        {/* Main Content: Full-height flexible grid */}
        <main className="my-auto flex flex-1 flex-col justify-between min-h-0 py-2 sm:py-4">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-2 sm:mb-3 md:mb-4 shrink-0 text-center sm:text-left"
          >
            <h1 className="font-change-serif-bold text-lg tracking-wide text-[color:var(--color-primary)] sm:text-2xl md:text-3xl">
              Piattaforme di Gestione
            </h1>
            <p className="mt-0.5 text-xs text-stone-500 sm:text-sm">
              Seleziona la piattaforma a cui desideri accedere. Si aprirà in una nuova scheda sicura.
            </p>
          </motion.div>

          {/* Griglia Piattaforme: 4 righe su Mobile, 2x2 su Desktop, riempiono esattamente lo spazio verticale */}
          <div className="flex-1 grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-2.5 sm:gap-3.5 md:gap-4 lg:gap-5 min-h-0">
            {PLATFORMS.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <motion.a
                  key={platform.id}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  className="group flex h-full items-center justify-between rounded-xl border border-stone-200/90 bg-white p-3 sm:p-4 md:p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:var(--color-thirdary)] hover:shadow-lg hover:shadow-[rgba(181,154,90,0.12)] active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3 sm:gap-4 md:gap-5 min-w-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[color:rgba(181,154,90,0.35)] bg-[color:rgba(181,154,90,0.08)] text-[color:var(--color-thirdary)] transition-colors group-hover:bg-[color:var(--color-thirdary)] group-hover:text-white sm:h-12 sm:w-12 md:h-14 md:w-14">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-change-serif-bold text-base sm:text-lg md:text-xl text-[color:var(--color-primary)] transition-colors group-hover:text-[color:var(--color-thirdary)]">
                        {platform.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-stone-600 line-clamp-1 sm:line-clamp-2 mt-0.5">
                        {platform.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-stone-50 text-stone-400 transition-all group-hover:border-[color:var(--color-thirdary)] group-hover:bg-[color:var(--color-thirdary)] group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
