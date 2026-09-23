"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Sincronizzazione conforme a React 18/19 con lo storage del browser
  const isAuthenticated = useSyncExternalStore(
    subscribe,
    () => isValidAdminSession(),
    () => false
  );

  useEffect(() => {
    if (!isLoginPage && !isAuthenticated) {
      const redirectUrl = `/admin/login?from=${encodeURIComponent(pathname || "/admin")}`;
      router.replace(redirectUrl);
    }
  }, [isLoginPage, isAuthenticated, pathname, router]);

  // Se siamo nella pagina di login o siamo già autenticati, renderizza i contenuti
  if (isLoginPage || isAuthenticated) {
    return <>{children}</>;
  }

  // Schermata di caricamento e protezione: impedisce qualsiasi visualizzazione non autorizzata
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
