import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/Footer";
import {
  DEFAULT_SITE_LANGUAGE,
  SITE_LANGUAGE_STORAGE_KEY,
} from "@/lib/siteLanguage";

export const metadata: Metadata = {
  title: "Two Lions",
  description: "",
};

const languageBootstrapScript = `
  try {
    var storedLanguage = localStorage.getItem("${SITE_LANGUAGE_STORAGE_KEY}");
    if (storedLanguage === "it" || storedLanguage === "en") {
      document.documentElement.lang = storedLanguage;
    }
  } catch {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={DEFAULT_SITE_LANGUAGE}
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script id="site-language" strategy="beforeInteractive">
          {languageBootstrapScript}
        </Script>
        {children}
        <Footer />
      </body>
    </html>
  );
}
