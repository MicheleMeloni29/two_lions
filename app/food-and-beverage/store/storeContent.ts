import type { StoreProduct } from "@/components/store/types";

export type StorePageContent = {
  allProductsLabel: string;
  discountsLabel: string;
  resultsLabel: string;
  emptyLabel: string;
  addToCartLabel: string;
  addedToCartLabel: string;
  openProductLabel: string;
  backToStoreLabel: string;
  detailLabel: string;
  cartTitle: string;
  emptyCartLabel: string;
  checkoutLabel: string;
  quantityLabel: string;
  totalLabel: string;
  cartAriaLabel: string;
  removeFromCartLabel: string;
  checkoutTitle: string;
  checkoutEmptyLabel: string;
  sortLabel: string;
  filterLabel: string;
  sortOptions: {
    priceAsc: string;
    priceDesc: string;
    nameAsc: string;
  };
  categories: string[];
  products: StoreProduct[];
};

export const storePageContent: Record<"it" | "en", StorePageContent> = {
  it: {
    allProductsLabel: "Tutti",
    discountsLabel: "Sconti",
    resultsLabel: "prodotti",
    emptyLabel: "Nessun prodotto disponibile per questo filtro.",
    addToCartLabel: "Aggiungi al carrello",
    addedToCartLabel: "Aggiunto al carrello",
    openProductLabel: "Apri prodotto",
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
    categories: [
      "Food",
      "Beverage",
      "Coffee & Tea",
      "Wine & Spirits",
      "Brand Sardinia",
    ],
    products: [
      {
        id: "01",
        slug: "pantry-sardegna-selection",
        category: "Food",
        name: "Pantry Sardegna Selection",
        amountCents: 3800,
        price: "EUR 38,00",
        isDiscounted: false,
        shortDescription:
          "Una selezione visuale per pantry premium, conserve e specialita territoriali pensata per retail gourmet e gift format.",
        fullDescription: [
          "Pantry Sardegna Selection raccoglie referenze pensate per una presenza premium a scaffale e per format regalo ad alto valore percepito.",
          "La linea unisce specialita territoriali, conservazione elegante e un racconto coerente con retail gourmet, hospitality selettiva e corporate gifting.",
          "Il prodotto puo essere sviluppato come box introduttiva, capsule stagionale o proposta dedicata a partner commerciali e concept store.",
        ],
        imageSrc: "/Food&Beverage/cibo.png",
        imageAlt: "Selezione Pantry Sardegna",
      },
      {
        id: "02",
        slug: "giunico-coastal-lager",
        category: "Beverage",
        name: "Giunico Coastal Lager",
        amountCents: 950,
        price: "EUR 9,50",
        isDiscounted: true,
        shortDescription:
          "Una referenza craft a forte identita visuale, adatta a locali, beach club, eventi branded e distribuzione selettiva.",
        fullDescription: [
          "Giunico Coastal Lager e pensata per una presenza beverage con forte riconoscibilita visiva e una collocazione naturale in horeca, eventi e summer activation.",
          "La bottiglia lavora bene in contesti hospitality, beach club e venue premium grazie a una narrativa leggera, mediterranea e commerciale.",
          "La linea puo essere ampliata con formati dedicati per attivazioni brandizzate, eventi proprietari o distribuzione selettiva.",
        ],
        imageSrc: "/Food&Beverage/birra_sfondo_mare.png",
        imageAlt: "Birra artigianale Giunico",
      },
      {
        id: "03",
        slug: "caffe-mare-signature-roast",
        category: "Coffee & Tea",
        name: "Caffe Mare Signature Roast",
        amountCents: 1800,
        price: "EUR 18,00",
        isDiscounted: false,
        shortDescription:
          "Una linea dedicata a coffee experience e hospitality, con posizionamento premium per boutique hotel, lounge e food service.",
        fullDescription: [
          "Caffe Mare Signature Roast nasce come proposta premium per ambienti hospitality, lounge e servizi coffee con una forte attenzione all'immagine del prodotto.",
          "La referenza puo essere inserita in boutique hotel, office hospitality, lounge selettive e format horeca che richiedono una presentazione distintiva.",
          "Il concept e predisposto per estensioni su beans, macinato, capsule o formati dedicati a welcome kit e gifting.",
        ],
        imageSrc: "/Food&Beverage/caffe_mare.png",
        imageAlt: "Linea coffee premium",
      },
      {
        id: "04",
        slug: "cannonau-cellar-reserve",
        category: "Wine & Spirits",
        name: "Cannonau Cellar Reserve",
        amountCents: 4200,
        price: "EUR 42,00",
        isDiscounted: true,
        shortDescription:
          "Una bottiglia pensata per ristorazione, gifting e selezioni enologiche con una narrativa elegante e identitaria.",
        fullDescription: [
          "Cannonau Cellar Reserve e una bottiglia costruita per ristorazione, gifting e presentazioni enologiche con un taglio premium e rappresentativo.",
          "La referenza valorizza il racconto del territorio e si inserisce in modo coerente in carte vini, selezioni retail e kit di rappresentanza.",
          "La struttura del prodotto e adatta a future estensioni in linee reserve, edizioni speciali o collaborazioni hospitality.",
        ],
        imageSrc: "/Food&Beverage/vino_cantina.png",
        imageAlt: "Vino premium in cantina",
      },
      {
        id: "05",
        slug: "mediterranean-soft-drinks-set",
        category: "Beverage",
        name: "Mediterranean Soft Drinks Set",
        amountCents: 2400,
        price: "EUR 24,00",
        isDiscounted: true,
        shortDescription:
          "Un assortimento dedicato a beach club, hospitality e attivazioni estive, con immagine luminosa e versatile.",
        fullDescription: [
          "Mediterranean Soft Drinks Set e un assortimento progettato per beach club, hotellerie e attivazioni estive con una presenza visiva chiara e versatile.",
          "Il prodotto puo essere utilizzato come mix pack, come supporto servizio per eventi o come selezione beverage per programmi hospitality stagionali.",
          "La linea e predisposta per lavorare sia in contesto operativo sia come vetrina visuale per campagne summer e partnership territoriali.",
        ],
        imageSrc: "/Food&Beverage/bibite_mare.png",
        imageAlt: "Linea soft drinks",
      },
      {
        id: "06",
        slug: "blue-heritage-tuna",
        category: "Food",
        name: "Blue Heritage Tuna",
        amountCents: 1600,
        price: "EUR 16,00",
        isDiscounted: false,
        shortDescription:
          "Una proposta adatta a specialty retail, gift box gourmet e storytelling mediterraneo ad alto valore percepito.",
        fullDescription: [
          "Blue Heritage Tuna e sviluppato come prodotto gourmet per specialty retail, gift box e presentazioni food con forte valore percepito.",
          "La narrazione mediterranea del prodotto lo rende coerente con box territoriali, selezioni export e formati premium per hospitality e gifting.",
          "La referenza e strutturata per una comunicazione pulita, immediata e facilmente estendibile a linee parallele o bundle dedicati.",
        ],
        imageSrc: "/Food&Beverage/tonno.png",
        imageAlt: "Prodotto gourmet a base tonno",
      },
      {
        id: "07",
        slug: "vermentino-shoreline-edition",
        category: "Brand Sardinia",
        name: "Vermentino Shoreline Edition",
        amountCents: 2900,
        price: "EUR 29,00",
        isDiscounted: true,
        shortDescription:
          "Una signature bottle pronta per welcome kit, gifting e selezioni rappresentative legate al racconto della Sardegna.",
        fullDescription: [
          "Vermentino Shoreline Edition e una signature bottle pensata per welcome kit, gifting e selezioni rappresentative con forte valore identitario.",
          "Il prodotto si presta a hospitality di alto profilo, relazioni corporate e programmi Brand Sardinia costruiti su immagine, territorio e cura del dettaglio.",
          "La struttura e gia adatta a evolvere in limited edition, serie evento o formati dedicati a partner internazionali.",
        ],
        imageSrc: "/Food&Beverage/vino_mare.png",
        imageAlt: "Bottiglia signature con sfondo mare",
      },
    ],
  },
  en: {
    allProductsLabel: "All",
    discountsLabel: "Discounts",
    resultsLabel: "products",
    emptyLabel: "No products are available for this filter.",
    addToCartLabel: "Add to cart",
    addedToCartLabel: "Added to cart",
    openProductLabel: "Open product",
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
    categories: [
      "Food",
      "Beverage",
      "Coffee & Tea",
      "Wine & Spirits",
      "Brand Sardinia",
    ],
    products: [
      {
        id: "01",
        slug: "pantry-sardegna-selection",
        category: "Food",
        name: "Pantry Sardinia Selection",
        amountCents: 3800,
        price: "EUR 38.00",
        isDiscounted: false,
        shortDescription:
          "A visual selection for premium pantry products, preserves and regional specialties designed for gourmet retail and gift formats.",
        fullDescription: [
          "Pantry Sardinia Selection gathers references designed for premium shelf presence and high-value gift formats.",
          "The line combines regional specialties, elegant preservation and a narrative aligned with gourmet retail, selective hospitality and corporate gifting.",
          "The product can evolve into an introductory box, a seasonal capsule or a dedicated proposal for commercial partners and concept stores.",
        ],
        imageSrc: "/Food&Beverage/cibo.png",
        imageAlt: "Pantry Sardinia selection",
      },
      {
        id: "02",
        slug: "giunico-coastal-lager",
        category: "Beverage",
        name: "Giunico Coastal Lager",
        amountCents: 950,
        price: "EUR 9.50",
        isDiscounted: true,
        shortDescription:
          "A craft reference with strong visual identity, suited to venues, beach clubs, branded events and selective distribution.",
        fullDescription: [
          "Giunico Coastal Lager is built for beverage presence with strong visual recognition and a natural fit across horeca, events and summer activations.",
          "The bottle works well in hospitality contexts, beach clubs and premium venues thanks to a light, Mediterranean and commercially focused narrative.",
          "The line can expand through dedicated formats for branded activations, signature events or selective distribution.",
        ],
        imageSrc: "/Food&Beverage/birra_sfondo_mare.png",
        imageAlt: "Giunico craft beer",
      },
      {
        id: "03",
        slug: "caffe-mare-signature-roast",
        category: "Coffee & Tea",
        name: "Caffe Mare Signature Roast",
        amountCents: 1800,
        price: "EUR 18.00",
        isDiscounted: false,
        shortDescription:
          "A line dedicated to coffee experience and hospitality, with premium positioning for boutique hotels, lounges and food service.",
        fullDescription: [
          "Caffe Mare Signature Roast is designed as a premium proposal for hospitality environments, lounges and coffee services with strong attention to product image.",
          "The reference fits boutique hotels, office hospitality, curated lounges and horeca formats that require a more distinctive presentation.",
          "The concept is already prepared for extensions across beans, ground coffee, capsules or welcome-kit and gifting formats.",
        ],
        imageSrc: "/Food&Beverage/caffe_mare.png",
        imageAlt: "Premium coffee line",
      },
      {
        id: "04",
        slug: "cannonau-cellar-reserve",
        category: "Wine & Spirits",
        name: "Cannonau Cellar Reserve",
        amountCents: 4200,
        price: "EUR 42.00",
        isDiscounted: true,
        shortDescription:
          "A bottle designed for restaurants, gifting and wine selections with an elegant and identity-driven narrative.",
        fullDescription: [
          "Cannonau Cellar Reserve is a bottle developed for restaurants, gifting and wine selections with a premium and representative tone.",
          "The reference highlights territorial storytelling and fits naturally into wine lists, curated retail selections and representative kits.",
          "Its structure is already suitable for future reserve lines, special editions or hospitality collaborations.",
        ],
        imageSrc: "/Food&Beverage/vino_cantina.png",
        imageAlt: "Premium wine in cellar",
      },
      {
        id: "05",
        slug: "mediterranean-soft-drinks-set",
        category: "Beverage",
        name: "Mediterranean Soft Drinks Set",
        amountCents: 2400,
        price: "EUR 24.00",
        isDiscounted: true,
        shortDescription:
          "An assortment built for beach clubs, hospitality and summer activations with a bright, versatile image system.",
        fullDescription: [
          "Mediterranean Soft Drinks Set is designed for beach clubs, hospitality and summer activations with a bright and versatile visual identity.",
          "The product can serve as a mix pack, an event service support line or a beverage selection for seasonal hospitality programs.",
          "The line is built to work both as an operational offer and as a visual showcase for summer campaigns and territorial partnerships.",
        ],
        imageSrc: "/Food&Beverage/bibite_mare.png",
        imageAlt: "Soft drinks line",
      },
      {
        id: "06",
        slug: "blue-heritage-tuna",
        category: "Food",
        name: "Blue Heritage Tuna",
        amountCents: 1600,
        price: "EUR 16.00",
        isDiscounted: false,
        shortDescription:
          "A proposal suited to specialty retail, gourmet gift boxes and Mediterranean storytelling with high perceived value.",
        fullDescription: [
          "Blue Heritage Tuna is developed as a gourmet product for specialty retail, gift boxes and food presentations with strong perceived value.",
          "Its Mediterranean storytelling makes it consistent with territorial boxes, export selections and premium hospitality or gifting formats.",
          "The reference is structured for clean communication and can easily expand into parallel lines or dedicated bundles.",
        ],
        imageSrc: "/Food&Beverage/tonno.png",
        imageAlt: "Gourmet tuna-based product",
      },
      {
        id: "07",
        slug: "vermentino-shoreline-edition",
        category: "Brand Sardinia",
        name: "Vermentino Shoreline Edition",
        amountCents: 2900,
        price: "EUR 29.00",
        isDiscounted: true,
        shortDescription:
          "A signature bottle ready for welcome kits, gifting and representative selections tied to the Sardinian narrative.",
        fullDescription: [
          "Vermentino Shoreline Edition is a signature bottle conceived for welcome kits, gifting and representative selections with strong identity value.",
          "The product fits premium hospitality, corporate relationships and Brand Sardinia programs built around image, territory and detail.",
          "Its structure is already prepared to evolve into limited editions, event series or dedicated formats for international partners.",
        ],
        imageSrc: "/Food&Beverage/vino_mare.png",
        imageAlt: "Signature bottle with seaside background",
      },
    ],
  },
};

export function getStoreProduct(lang: "it" | "en", slug: string) {
  return storePageContent[lang].products.find((product) => product.slug === slug);
}
