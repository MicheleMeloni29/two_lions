import enMessages from "@/locales/en.json";
import itMessages from "@/locales/it.json";

export type SiteLang = "it" | "en";

type DivisionSlug =
  | "publicity-advertising"
  | "smart-shelter-and-energy"
  | "luxury-sardabooking"
  | "food-and-beverage"
  | "parfum"
  | "sport";

type NavLabels = {
  home: string;
  division: string;
  shop: string;
  menu: string;
  closeMenu: string;
  openDivisionMenu: string;
  closeDivisionMenu: string;
  navigation: string;
};

type DivisionNavItem = {
  slug: DivisionSlug;
  href: string;
  labels: Record<SiteLang, string>;
};

const divisionRouteBySlug: Record<DivisionSlug, string> = {
  "publicity-advertising": "/identity-advertising",
  "smart-shelter-and-energy": "/smart-shelter-and-energy",
  "luxury-sardabooking": "/luxury-sardabooking",
  "food-and-beverage": "/food-and-beverage",
  parfum: "/parfum",
  sport: "/sport",
};

const divisionSlugs = Object.keys(divisionRouteBySlug) as DivisionSlug[];

function getDivisionLabel(
  messages: typeof itMessages | typeof enMessages,
  slug: DivisionSlug
) {
  return (
    messages.sections.items.find((item) => item.slug === slug)?.label ?? slug
  );
}

export const navigationLabels: Record<SiteLang, NavLabels> = {
  it: {
    home: "Home",
    division: "Division",
    shop: "Shop",
    menu: "Apri menu",
    closeMenu: "Chiudi menu",
    openDivisionMenu: "Apri elenco divisioni",
    closeDivisionMenu: "Chiudi elenco divisioni",
    navigation: "Navigazione principale",
  },
  en: {
    home: "Home",
    division: "Division",
    shop: "Shop",
    menu: "Open menu",
    closeMenu: "Close menu",
    openDivisionMenu: "Open divisions list",
    closeDivisionMenu: "Close divisions list",
    navigation: "Main navigation",
  },
};

export const divisionNavItems: DivisionNavItem[] = divisionSlugs.map((slug) => ({
  slug,
  href: divisionRouteBySlug[slug],
  labels: {
    it: getDivisionLabel(itMessages, slug),
    en: getDivisionLabel(enMessages, slug),
  },
}));

export const homeHref = "/#top";
export const shopHref = "/food-and-beverage/store";

export function isDivisionPath(pathname: string) {
  if (isShopPath(pathname)) {
    return false;
  }

  return divisionNavItems.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );
}

export function isShopPath(pathname: string) {
  return pathname === shopHref || pathname.startsWith(`${shopHref}/`);
}
