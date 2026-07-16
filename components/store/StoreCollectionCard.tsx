import Image from "next/image";
import StoreLinkButton from "./StoreLinkButton";
import type { StoreCollection } from "./types";

type StoreCollectionCardProps = {
  collection: StoreCollection;
};

export default function StoreCollectionCard({
  collection,
}: StoreCollectionCardProps) {
  return (
    <article className="overflow-hidden border border-[color:var(--color-primary)]/10 bg-white shadow-[0_24px_70px_rgba(31,39,92,0.08)]">
      <div className="relative min-h-[16rem]">
        <Image
          src={collection.imageSrc}
          alt={collection.imageAlt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[color:var(--color-primary)]/92 via-[color:var(--color-primary)]/36 to-transparent" />
        <div className="absolute left-5 top-5 border border-white/16 bg-[color:var(--color-primary)]/58 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-white backdrop-blur-[2px] sm:text-[10px]">
          {collection.eyebrow}
        </div>
      </div>

      <div className="space-y-5 p-5 md:p-6">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)]">
            {collection.id}
          </p>
          <h3 className="font-change-serif-bold text-[1.35rem] uppercase leading-[1.02] tracking-[0.03em] text-[color:var(--color-primary)] md:text-[1.55rem]">
            {collection.title}
          </h3>
          <p className="text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7">
            {collection.description}
          </p>
        </div>

        <ul className="space-y-3 text-[13px] leading-6 text-[color:var(--color-primary)] sm:text-sm md:text-[15px] md:leading-7">
          {collection.points.map((point) => (
            <li
              key={point}
              className="border-b border-[color:var(--color-primary)]/10 pb-3 last:border-b-0 last:pb-0"
            >
              {point}
            </li>
          ))}
        </ul>

        <StoreLinkButton
          {...collection.action}
          variant={collection.action.variant ?? "outline"}
        />
      </div>
    </article>
  );
}
