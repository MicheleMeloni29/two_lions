import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import StoreLinkButton from "./StoreLinkButton";
import type { StoreProduct } from "./types";

type StoreProductCardProps = {
  product: StoreProduct;
  productBasePath: string;
  addToCartLabel: string;
  addedToCartLabel: string;
  openProductLabel: string;
};

export default function StoreProductCard({
  product,
  productBasePath,
  addToCartLabel,
  addedToCartLabel,
  openProductLabel,
}: StoreProductCardProps) {
  return (
    <article className="flex h-full flex-col border border-[color:var(--color-primary)]/10 bg-white p-4 shadow-[0_14px_40px_rgba(31,39,92,0.05)] md:p-5">
      <div className="relative aspect-[4/3] overflow-hidden border border-[color:var(--color-primary)]/8 bg-[color:var(--color-secondary)]/4">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 pt-4">
        <div className="space-y-3">
          <h3 className="font-change-serif-bold text-[1.02rem] uppercase leading-[1.08] tracking-[0.03em] text-[color:var(--color-primary)] md:text-[1.12rem]">
            {product.name}
          </h3>
          <p className="font-change-serif-bold text-[1.45rem] leading-none tracking-[0.01em] text-[color:var(--color-thirdary)] md:text-[1.7rem]">
            {product.price}
          </p>
        </div>

        <AddToCartButton
          productSlug={product.slug}
          idleLabel={addToCartLabel}
          addedLabel={addedToCartLabel}
        />

        <StoreLinkButton
          href={`${productBasePath}/${product.slug}`}
          label={openProductLabel}
          variant="outline"
          className="mt-auto w-full"
        />
      </div>
    </article>
  );
}
