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
    <article className="group flex h-full flex-col  transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-primary)]/25 hover:shadow-[0_22px_50px_rgba(31,39,92,0.12)] md:p-5">
      <Link
        href={productHref}
        aria-label={openProductLabel ? `${openProductLabel}: ${product.name}` : product.name}
        className="flex flex-1 flex-col focus:outline-none"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--color-primary)]/[0.02]">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
            className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105 sm:p-4"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 pt-4">
          <div className="space-y-3">
            <h3 className="font-change-serif-bold text-center text-[1.02rem] uppercase leading-[1.08] tracking-[0.03em] text-[color:var(--color-primary)] transition-colors duration-300 group-hover:text-[color:var(--color-thirdary)] md:text-[1.12rem]">
              {product.name}
            </h3>
            <p className="font-change-serif-bold text-center text-[1.45rem] leading-none tracking-[0.01em] text-[color:var(--color-thirdary)] md:text-[1.7rem]">
              {product.price}
            </p>
          </div>
        </div>
      </Link>

      <div className="pt-4">
        <AddToCartButton
          productSlug={product.slug}
          idleLabel={addToCartLabel}
          addedLabel={addedToCartLabel}
          className="w-full"
        />
      </div>
    </article>
  );
}
