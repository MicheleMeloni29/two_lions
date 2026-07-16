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
  price: string;
  shortDescription: string;
  fullDescription: string[];
  imageSrc: string;
  imageAlt: string;
};

export type StoreServiceContent = {
  eyebrow: string;
  title: string;
  lead: string;
  items: string[];
  note: string;
  primaryAction: StoreAction;
  secondaryAction: StoreAction;
};
