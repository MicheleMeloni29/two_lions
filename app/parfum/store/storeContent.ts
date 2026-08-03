import type { StorePageContent, StoreProduct } from "@/components/store/types";

type ProductCopy = {
  baseId: string;
  baseSlug: string;
  name: string;
  description: string;
};

const imageSrc = "/SectionsBackgrounds/Parfum.png";
const variants = [
  { label: "10 ml", slug: "10ml" },
  { label: "50 ml", slug: "50ml" },
] as const;

const productCopy: Record<"it" | "en", ProductCopy[]> = {
  it: [
    {
      baseId: "PF01",
      baseSlug: "self-pass",
      name: "Self Pass",
      description: "Potenza silenziosa. L'istinto che conquista.",
    },
    {
      baseId: "PF02",
      baseSlug: "corner-corto",
      name: "Corner Corto",
      description: "Preciso. Deciso. Il momento che cambia la partita.",
    },
    {
      baseId: "PF03",
      baseSlug: "two-lions",
      name: "Two Lions",
      description: "Profumi d'elite per l'hockeyista moderno.",
    },
    {
      baseId: "PF04",
      baseSlug: "long-corner",
      name: "Long Corner",
      description: "Eleganza in profondita. Raffinata come una strategia ben giocata.",
    },
    {
      baseId: "PF05",
      baseSlug: "push",
      name: "Push",
      description: "Potenza silenziosa. L'istinto che conquista.",
    },
    {
      baseId: "PF06",
      baseSlug: "short-corner",
      name: "Short Corner",
      description: "Preciso. Decisivo. Il momento che cambia la partita.",
    },
  ],
  en: [
    {
      baseId: "PF01",
      baseSlug: "self-pass",
      name: "Self Pass",
      description: "Silent power. The instinct that conquers.",
    },
    {
      baseId: "PF02",
      baseSlug: "corner-corto",
      name: "Corner Corto",
      description: "Precise. Decisive. The moment that changes the match.",
    },
    {
      baseId: "PF03",
      baseSlug: "two-lions",
      name: "Two Lions",
      description: "Elite fragrances for the modern hockey player.",
    },
    {
      baseId: "PF04",
      baseSlug: "long-corner",
      name: "Long Corner",
      description: "Elegance in depth. Refined like a well-played strategy.",
    },
    {
      baseId: "PF05",
      baseSlug: "push",
      name: "Push",
      description: "Silent power. The instinct that conquers.",
    },
    {
      baseId: "PF06",
      baseSlug: "short-corner",
      name: "Short Corner",
      description: "Precise. Decisive. The game-changing moment.",
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
      imageSrc,
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
