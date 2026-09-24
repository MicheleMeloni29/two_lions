import type { StorePageContent, StoreProduct } from "@/components/store/types";

type ProductCopy = {
  baseId: string;
  baseSlug: string;
  name: string;
  description: string;
  imageSrc: string;
};

const variants = [
  { label: "10 ml", slug: "10ml" },
  { label: "50 ml", slug: "50ml" },
] as const;

const productCopy: Record<"it" | "en", ProductCopy[]> = {
  it: [
    {
      baseId: "PF-CAG-HOMME",
      baseSlug: "cagliari-pour-homme",
      name: "Cagliari pour homme",
      description:
        "Un accordo nobile e deciso, tra note marine e legni mediterranei. L'eleganza fiera dell'uomo Two Lions.",
      imageSrc: "/Parfum_Bottles/Cagliari_pourHomme.jpeg",
    },
    {
      baseId: "PF-CAG-UNISEX",
      baseSlug: "cagliari-unisex",
      name: "Cagliari unisex",
      description:
        "Un'essenza fresca e avvolgente che fonde brezza costiera e macchia mediterranea. Identità e armonia senza confini.",
      imageSrc: "/Parfum_Bottles/Cagliari_unisex.jpeg",
    },
    {
      baseId: "PF-CAG-FEMME",
      baseSlug: "cagliari-pour-femme",
      name: "Cagliari pour femme",
      description:
        "Raffinata, luminosa e magnetica con tocchi floreali e agrumati di Sardegna. Una presenza indimenticabile.",
      imageSrc: "/Parfum_Bottles/Cagliari_pourFemme.jpeg",
    },
  ],
  en: [
    {
      baseId: "PF-CAG-HOMME",
      baseSlug: "cagliari-pour-homme",
      name: "Cagliari pour homme",
      description:
        "A noble and decisive accord of marine notes and Mediterranean woods. The proud elegance of the Two Lions man.",
      imageSrc: "/Parfum_Bottles/Cagliari_pourHomme.jpeg",
    },
    {
      baseId: "PF-CAG-UNISEX",
      baseSlug: "cagliari-unisex",
      name: "Cagliari unisex",
      description:
        "A fresh and enveloping essence blending coastal breeze and Mediterranean scrub. Identity and harmony without boundaries.",
      imageSrc: "/Parfum_Bottles/Cagliari_unisex.jpeg",
    },
    {
      baseId: "PF-CAG-FEMME",
      baseSlug: "cagliari-pour-femme",
      name: "Cagliari pour femme",
      description:
        "Refined, luminous, and magnetic with floral and citrus Sardinian touches. An unforgettable presence.",
      imageSrc: "/Parfum_Bottles/Cagliari_pourFemme.jpeg",
    },
  ],
};

function buildProducts(lang: "it" | "en"): StoreProduct[] {
  return productCopy[lang].flatMap((product) =>
    variants.map((variant) => ({
      id: `${product.baseId}-${variant.slug.toUpperCase()}`,
      slug: `${product.baseSlug}-${variant.slug}`,
      category: variant.label,
      name: `${product.name} ${variant.label}`,
      amountCents: 0,
      price: "EUR 00,00",
      isDiscounted: false,
      shortDescription: product.description,
      fullDescription:
        lang === "it"
          ? [
              product.description,
              `Fragranza Two Lions Parfum disponibile nel formato ${variant.label}.`,
              "Prezzo temporaneamente impostato a 00,00 in attesa del collegamento a OpenCart.",
            ]
          : [
              product.description,
              `Two Lions Parfum fragrance available in the ${variant.label} format.`,
              "Price temporarily set to 00.00 while waiting for the OpenCart connection.",
            ],
      imageSrc: product.imageSrc,
      imageAlt: `${product.name} ${variant.label}`,
    }))
  );
}

export const storePageContent: Record<"it" | "en", StorePageContent> = {
  it: {
    allProductsLabel: "Tutti",
    discountsLabel: "Sconti",
    resultsLabel: "prodotti",
    emptyLabel: "Nessun prodotto disponibile per questo filtro.",
    addToCartLabel: "Aggiungi al carrello",
    addedToCartLabel: "Aggiunto al carrello",
    openProductLabel: "Vedi prodotto",
    backToStoreLabel: "Torna allo store",
    detailLabel: "Descrizione completa",
    cartTitle: "Carrello",
    emptyCartLabel: "Il carrello e vuoto.",
    checkoutLabel: "Procedi al pagamento",
    quantityLabel: "Qta",
    totalLabel: "Totale",
    cartAriaLabel: "Apri il carrello",
    removeFromCartLabel: "Rimuovi",
    checkoutTitle: "Checkout",
    checkoutEmptyLabel: "Aggiungi prodotti al carrello per procedere.",
    sortLabel: "Ordina per",
    filterLabel: "Filtra per",
    sortOptions: {
      priceAsc: "Prezzo crescente",
      priceDesc: "Prezzo decrescente",
      nameAsc: "Nome A-Z",
    },
    categories: ["10 ml", "50 ml"],
    products: buildProducts("it"),
  },
  en: {
    allProductsLabel: "All",
    discountsLabel: "Discounts",
    resultsLabel: "products",
    emptyLabel: "No products are available for this filter.",
    addToCartLabel: "Add to cart",
    addedToCartLabel: "Added to cart",
    openProductLabel: "View product",
    backToStoreLabel: "Back to store",
    detailLabel: "Full description",
    cartTitle: "Cart",
    emptyCartLabel: "Your cart is empty.",
    checkoutLabel: "Proceed to payment",
    quantityLabel: "Qty",
    totalLabel: "Total",
    cartAriaLabel: "Open cart",
    removeFromCartLabel: "Remove",
    checkoutTitle: "Checkout",
    checkoutEmptyLabel: "Add products to the cart to continue.",
    sortLabel: "Sort by",
    filterLabel: "Filter by",
    sortOptions: {
      priceAsc: "Price low to high",
      priceDesc: "Price high to low",
      nameAsc: "Name A-Z",
    },
    categories: ["10 ml", "50 ml"],
    products: buildProducts("en"),
  },
};

export function getStoreProduct(lang: "it" | "en", slug: string) {
  return storePageContent[lang].products.find(
    (product) => product.slug === slug
  );
}
