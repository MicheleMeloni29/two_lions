import { cn } from "@/lib/utils";
import type { StoreSnapshot } from "./types";

type StoreSnapshotGridProps = {
  items: StoreSnapshot[];
};

export default function StoreSnapshotGrid({ items }: StoreSnapshotGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={`${item.label}-${item.value}`}
          className="border border-white/14 bg-white/12 px-4 py-4 backdrop-blur-[4px]"
        >
          <p
            className={cn(
              "font-change-serif-bold leading-none text-white",
              item.value.length > 10
                ? "text-[0.9rem] uppercase tracking-[0.18em] sm:text-[1rem] md:text-[1.12rem]"
                : "text-[1.8rem] md:text-[2.2rem]"
            )}
          >
            {item.value}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/80 sm:text-[11px]">
            {item.label}
          </p>
          {item.detail ? (
            <p className="mt-3 border-t border-white/14 pt-3 text-[12px] leading-5 text-white/72 sm:text-[13px]">
              {item.detail}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
