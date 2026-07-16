import StoreLinkButton from "./StoreLinkButton";
import type { StoreServiceContent } from "./types";

type StoreServicePanelProps = {
  content: StoreServiceContent;
};

export default function StoreServicePanel({
  content,
}: StoreServicePanelProps) {
  return (
    <section className="overflow-hidden border border-[color:var(--color-primary)]/10 bg-white shadow-[0_28px_80px_rgba(31,39,92,0.08)]">
      <div className="grid gap-6 px-5 py-6 md:px-7 md:py-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] xl:items-start xl:px-8">
        <div className="space-y-5">
          <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
            {content.eyebrow}
          </p>
          <h2 className="font-change-serif-bold max-w-[12ch] text-[1.9rem] leading-[0.95] uppercase tracking-[0.015em] text-[color:var(--color-primary)] sm:max-w-[13ch] sm:text-[2.35rem] md:text-[2.9rem]">
            {content.title}
          </h2>
          <p className="max-w-3xl border-l-2 border-[color:var(--color-thirdary)]/70 pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
            {content.lead}
          </p>
          <div className="flex flex-wrap gap-3">
            <StoreLinkButton
              {...content.primaryAction}
              variant={content.primaryAction.variant ?? "gold"}
            />
            <StoreLinkButton
              {...content.secondaryAction}
              variant={content.secondaryAction.variant ?? "outline"}
            />
          </div>
        </div>

        <div className="border border-[color:var(--color-primary)]/10 bg-[color:var(--color-primary)] px-5 py-6 text-white md:px-6 md:py-7">
          <ul className="space-y-4">
            {content.items.map((item) => (
              <li
                key={item}
                className="border-b border-white/18 pb-4 text-[13px] leading-6 text-white sm:text-sm md:text-[15px] md:leading-7 last:border-b-0 last:pb-0"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-white/14 pt-5 text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-thirdary)] sm:text-[13px]">
            {content.note}
          </p>
        </div>
      </div>
    </section>
  );
}
