export type StoreButtonVariant = "gold" | "light" | "outline";

export type StoreAction = {
  href: string;
  label: string;
  variant?: StoreButtonVariant;
};

export type StoreSnapshot = {
  label: string;
  value: string;
  detail?: string;
};

export type StoreCollection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  imageSrc: string;
  imageAlt: string;
  action: StoreAction;
};

export type StoreProduct = {
  id: string;
  slug: string;
  category: string;
  name: string;
  amountCents: number;
  price: string;
  isDiscounted: boolean;
  shortDescription: string;
  fullDescription: string[];
  imageSrc: string;
  imageAlt: string;
};

export type StoreCatalogProduct = StoreProduct & {
  storeBasePath: string;
};

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

export type StoreContentByLanguage = Record<"it" | "en", StorePageContent>;

export type StoreServiceContent = {
  eyebrow: string;
  title: string;
  lead: string;
  items: string[];
  note: string;
  primaryAction: StoreAction;
  secondaryAction: StoreAction;
};
