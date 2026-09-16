"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("from") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Inserisci sia il nome utente che la password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Credenziali non valide.");
        setIsLoading(false);
        return;
      }

      // Successo: reindirizza alla dashboard
      router.push(redirectTarget);
      router.refresh();
    } catch {
      setErrorMessage("Errore di connessione con il server. Riprova più tardi.");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full max-w-md rounded-2xl border border-stone-200/90 bg-white p-7 shadow-xl sm:p-9"
    >
      {/* Glow superiore dorato delicato */}
      <div className="pointer-events-none absolute -top-10 left-1/2 h-20 w-52 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(181,154,90,0.18),transparent_70%)]" />

      {/* Header Form */}
      <div className="text-center">
        <Image
          src="/twoLions_logo.png"
          alt="Two Lions International"
          width={76}
          height={76}
          className="mx-auto mb-4 h-16 w-auto object-contain drop-shadow-sm"
          priority
        />

        <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:rgba(181,154,90,0.35)] bg-[color:rgba(181,154,90,0.08)] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-thirdary)]">
          <ShieldCheck className="h-3 w-3" /> Area Riservata
        </span>

        <h1 className="mt-3 font-change-serif-bold text-2xl tracking-wide text-[color:var(--color-primary)] sm:text-[1.65rem]">
          Two Lions Executive Suite
        </h1>
        <p className="mt-1.5 text-xs text-stone-500">
          Accesso riservato al centro operativo e di controllo.
        </p>
      </div>

      {/* Messaggio di Errore */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs text-red-700"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form di Login */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-700">
            Nome Utente
          </label>
          <div className="relative mt-1.5">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-thirdary)]" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Inserisci username"
              autoComplete="username"
              required
              disabled={isLoading}
              className="w-full rounded-lg border border-stone-300 bg-stone-50/70 py-2.5 pl-10 pr-3 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:border-[color:var(--color-thirdary)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[color:var(--color-thirdary)] disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-700">
            Password
          </label>
          <div className="relative mt-1.5">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-thirdary)]" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              required
              disabled={isLoading}
              className="w-full rounded-lg border border-stone-300 bg-stone-50/70 py-2.5 pl-10 pr-10 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:border-[color:var(--color-thirdary)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[color:var(--color-thirdary)] disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 transition-colors hover:text-[color:var(--color-thirdary)]"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group relative mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-[color:var(--color-thirdary)] bg-[color:var(--color-white)] hover:bg-[color:var(--color-thirdary)] py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-thirdary)] hover:text-[color:var(--color-white)] transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span>Verifica credenziali...</span>
            </>
          ) : (
            <>
              <span>Accedi alla Dashboard</span>
            </>
          )}
        </button>
      </form>

      {/* Footer del card */}
      <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-4 text-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-stone-500 transition-colors hover:text-[color:var(--color-primary)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Torna al sito pubblico
        </Link>
        <span className="text-[10px] tracking-wider text-stone-400">
          Two Lions © {new Date().getFullYear()}
        </span>
      </div>
    </motion.div>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-12 text-stone-900">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(181,154,90,0.08),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(37,30,87,0.03),transparent_60%)]" />

      <Suspense
        fallback={
          <div className="flex items-center gap-3 text-sm text-[color:var(--color-thirdary)]">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Caricamento Executive Suite...</span>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
