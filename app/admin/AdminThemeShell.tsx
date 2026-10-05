"use client";

import { useAdminTheme } from "@/hooks/useAdminTheme";

export default function AdminThemeShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDark } = useAdminTheme();

  return (
    <div
      className={`relative min-h-screen antialiased transition-colors duration-300 selection:bg-[color:var(--color-thirdary)] selection:text-white ${
        isDark
          ? "bg-[color:var(--color-primary)] text-[color:var(--color-white)]"
          : "bg-white text-[color:var(--color-primary)]"
      }`}
    >
      {/* Sfondo con finitura dorata/blu coerente con il tema attivo */}
      <div
        className={`pointer-events-none fixed inset-0 transition-opacity duration-300 ${
          isDark
            ? "bg-[radial-gradient(ellipse_at_top,rgba(181,154,90,0.14),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(31,39,92,0.55),transparent_60%)]"
            : "bg-[radial-gradient(ellipse_at_top,rgba(181,154,90,0.07),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(37,30,87,0.03),transparent_60%)]"
        }`}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
