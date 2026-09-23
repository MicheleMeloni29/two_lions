"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { isValidAdminSession } from "@/lib/clientAdminAuth";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Riconosce la pagina di login con o senza trailing slash (/admin/login o /admin/login/)
  const isLoginPage = Boolean(
    (pathname && pathname.includes("/admin/login")) ||
    (typeof window !== "undefined" && window.location.pathname.includes("/admin/login"))
  );

  // Sincronizzazione con la sessione del browser
  const isAuthenticated = useSyncExternalStore(
    subscribe,
    () => isValidAdminSession(),
    () => false
  );

  useEffect(() => {
    // Se non siamo nella pagina di login e non siamo autenticati, reindirizza al login con trailing slash
    if (!isLoginPage && !isAuthenticated) {
      const current = window.location.pathname || "/admin/";
      window.location.replace(`/admin/login/?from=${encodeURIComponent(current)}`);
    }
  }, [isLoginPage, isAuthenticated]);

  // Se siamo nella pagina di login o siamo già autenticati, renderizza subito senza schermata di blocco
  if (isLoginPage || isAuthenticated) {
    return <>{children}</>;
  }

  // Schermata di caricamento mostrata solo durante la verifica iniziale sulle pagine protette (/admin/*)
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <Image
          src="/twoLions_logo.png"
          alt="Two Lions International"
          width={72}
          height={72}
          className="h-14 w-auto object-contain drop-shadow-sm animate-pulse"
          priority
        />
        <div className="flex items-center gap-2 rounded-full border border-[color:rgba(181,154,90,0.35)] bg-[color:rgba(181,154,90,0.06)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-thirdary)]">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-[color:var(--color-thirdary)]" />
          <span>Verifica accesso riservato...</span>
        </div>
      </div>
    </div>
  );
}
