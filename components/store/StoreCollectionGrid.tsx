import StoreCollectionCard from "./StoreCollectionCard";
import type { StoreCollection } from "./types";

type StoreCollectionGridProps = {
  eyebrow: string;
  title: string;
  lead: string;
  collections: StoreCollection[];
};

export default function StoreCollectionGrid({
  eyebrow,
  title,
  lead,
  collections,
}: StoreCollectionGridProps) {
  return (
    <section className="space-y-6 md:space-y-7">
      <div className="max-w-5xl space-y-5 md:space-y-6">
        <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
          {eyebrow}
        </p>
        <h2 className="font-change-serif-bold max-w-[14ch] text-[2rem] leading-[0.94] uppercase tracking-[0.015em] sm:max-w-[15ch] sm:text-[2.5rem] md:max-w-[16ch] md:text-[3.4rem] xl:text-[4rem]">
          {title}
        </h2>
        <p className="max-w-3xl border-l-2 border-[color:var(--color-thirdary)] pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
          {lead}
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {collections.map((collection) => (
          <StoreCollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </section>
  );
}
