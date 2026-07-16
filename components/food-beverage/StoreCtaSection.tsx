import Image from "next/image";
import StoreLinkButton from "@/components/store/StoreLinkButton";
import type { StoreAction } from "@/components/store/types";

type StoreCtaSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  imageAlt: string;
  primaryAction: StoreAction;
  secondaryAction: StoreAction;
};

export default function StoreCtaSection({
  eyebrow,
  title,
  description,
  highlights,
  imageSrc,
  imageAlt,
  primaryAction,
  secondaryAction,
}: StoreCtaSectionProps) {
  return (
    <section className="relative overflow-hidden border border-[color:var(--color-primary)]/10 bg-[color:var(--color-primary)] text-white shadow-[0_30px_90px_rgba(31,39,92,0.16)]">
      <div className="absolute inset-0">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        <div className="absolute inset-0 bg-[color:var(--color-primary)]/76" />
      </div>

      <div className="relative grid gap-6 px-5 py-6 md:px-7 md:py-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:items-end xl:px-8">
        <div className="space-y-5">
          <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
            {eyebrow}
          </p>
          <h3 className="font-change-serif-bold max-w-[13ch] text-[1.9rem] leading-[0.95] uppercase tracking-[0.015em] sm:max-w-[14ch] sm:text-[2.3rem] md:text-[2.8rem]">
            {title}
          </h3>
          <p className="max-w-3xl border-l-2 border-[color:var(--color-thirdary)]/70 pl-4 text-[13px] leading-6 text-white/88 sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
            {description}
          </p>
          <div className="flex flex-wrap gap-3">
            <StoreLinkButton {...primaryAction} variant={primaryAction.variant ?? "gold"} />
            <StoreLinkButton {...secondaryAction} variant={secondaryAction.variant ?? "light"} />
          </div>
        </div>

        <div className="grid gap-3">
          {highlights.map((highlight) => (
            <div
              key={highlight}
              className="border border-white/14 bg-white/10 px-4 py-4 text-[12px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-[4px] sm:text-[13px]"
            >
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
