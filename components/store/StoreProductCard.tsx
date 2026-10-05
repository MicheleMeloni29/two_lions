import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import type { StoreProduct } from "./types";

type StoreProductCardProps = {
  product: StoreProduct;
  productBasePath: string;
  addToCartLabel: string;
  addedToCartLabel: string;
  openProductLabel?: string;
};

export default function StoreProductCard({
  product,
  productBasePath,
  addToCartLabel,
  addedToCartLabel,
  openProductLabel,
}: StoreProductCardProps) {
  const productHref = `${productBasePath}/${product.slug}`;

  return (
    <article className="group flex h-full flex-col p-2 transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-primary)]/25 hover:shadow-[0_22px_50px_rgba(31,39,92,0.12)] sm:p-3 md:p-5">
      <Link
        href={productHref}
        aria-label={openProductLabel ? `${openProductLabel}: ${product.name}` : product.name}
        className="flex flex-1 flex-col focus:outline-none"
      >
        <div className="relative aspect-square w-full overflow-hidden bg-[color:var(--color-primary)]/[0.02] sm:aspect-[4/3]">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 48vw"
            className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105 sm:p-3 md:p-4"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between gap-2 pt-3 md:gap-3 md:pt-4">
          <h3 className="font-change-serif-bold line-clamp-2 text-center text-[0.82rem] uppercase leading-[1.15] tracking-[0.02em] text-[color:var(--color-primary)] transition-colors duration-300 group-hover:text-[color:var(--color-thirdary)] sm:text-[0.95rem] md:line-clamp-none md:text-[1.12rem] md:leading-[1.08] md:tracking-[0.03em]">
            {product.name}
          </h3>
          <p className="font-change-serif-bold mt-auto text-center text-[1.15rem] leading-none tracking-[0.01em] text-[color:var(--color-thirdary)] sm:text-[1.35rem] md:text-[1.7rem]">
            {product.price}
          </p>
        </div>
      </Link>

      <div className="pt-2.5 sm:pt-3 md:pt-4">
        <AddToCartButton
          productSlug={product.slug}
          idleLabel={addToCartLabel}
          addedLabel={addedToCartLabel}
          disabled={product.inStock === false || product.amountCents === 0}
          outOfStockLabel={product.inStock === false ? "Non disponibile" : "In arrivo"}
          className="w-full"
        />
      </div>
    </article>
  );
}
