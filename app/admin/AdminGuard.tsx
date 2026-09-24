"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { isValidAdminSession } from "@/lib/clientAdminAuth";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isValidAdminSession()) {
      const current = window.location.pathname || "/admin/";
      window.location.replace(`/admin/login/?from=${encodeURIComponent(current)}`);
    } else {
      setIsAuthorized(true);
    }
  }, []);

  // Finché la sessione non è confermata, mostra la schermata di caricamento e protezione
  if (!isAuthorized) {
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

  return <>{children}</>;
}
