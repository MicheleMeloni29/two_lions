import Link from "next/link";
import StoreLinkButton from "./StoreLinkButton";
import type { StoreAction } from "./types";

type StoreHeroProps = {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  lead: string;
  panelEyebrow: string;
  panelTitle: string;
  panelItems: string[];
  actions: StoreAction[];
};

export default function StoreHero({
  backHref,
  backLabel,
  eyebrow,
  title,
  lead,
  panelEyebrow,
  panelTitle,
  panelItems,
  actions,
}: StoreHeroProps) {
  return (
    <div className="relative mx-auto flex max-w-7xl flex-col gap-10 md:gap-12 xl:gap-14">
      <Link
        href={backHref}
        className="inline-flex w-fit items-center gap-3 border border-white/16 bg-white/12 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-[4px] transition hover:bg-white hover:text-[color:var(--color-primary)] sm:text-[12px]"
      >
        <span aria-hidden="true">&larr;</span>
        <span>{backLabel}</span>
      </Link>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:items-end xl:gap-6">
        <div className="space-y-6 border border-white/14 bg-white/10 p-6 backdrop-blur-[6px] md:space-y-7 md:p-8 xl:p-10">
          <div className="space-y-5 md:space-y-6">
            <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
              {eyebrow}
            </p>
            <h1 className="font-change-serif-bold max-w-[12ch] text-[2.4rem] leading-[0.92] uppercase tracking-[0.015em] sm:max-w-[13ch] sm:text-[3rem] md:max-w-[14ch] md:text-[4rem] xl:text-[5rem]">
              {title}
            </h1>
            <p className="max-w-3xl border-l-2 border-[color:var(--color-thirdary)]/80 pl-4 text-[14px] leading-7 text-white/88 sm:text-[15px] md:pl-5 md:text-[17px] md:leading-8">
              {lead}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {actions.map((action, index) => (
              <StoreLinkButton
                key={`${action.href}-${action.label}`}
                {...action}
                variant={action.variant ?? (index === 0 ? "gold" : "light")}
              />
            ))}
          </div>
        </div>

        <aside className="flex flex-col justify-between border border-white/14 bg-[color:var(--color-primary)]/74 px-5 py-6 text-white backdrop-blur-[4px] md:px-6 md:py-7">
          <div>
            <p className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
              {panelEyebrow}
            </p>
            <h2 className="mt-4 font-change-serif-bold text-[1.55rem] uppercase leading-[1.02] tracking-[0.03em] md:text-[1.9rem]">
              {panelTitle}
            </h2>
            <ul className="mt-6 space-y-4">
              {panelItems.map((item) => (
                <li
                  key={item}
                  className="border-b border-white/18 pb-4 text-[13px] leading-6 text-white/88 sm:text-sm md:text-[15px] md:leading-7 last:border-b-0 last:pb-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
