import type { ReactNode } from "react";

function HeadquartersIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16" />
      <path d="M7 20V8h10v12" />
      <path d="M10 8V4h4v4" />
      <path d="M9 11h.01" />
      <path d="M12 11h.01" />
      <path d="M15 11h.01" />
      <path d="M9 14h.01" />
      <path d="M12 14h.01" />
      <path d="M15 14h.01" />
      <path d="M11 20v-3h2v3" />
    </svg>
  );
}

function LocationPinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  );
}

type OfficeCardProps = {
  id: string;
  eyebrow: string;
  title: string;
  lines: string[];
  emphasis?: string;
  icon: ReactNode;
};

function OfficeCard({ id, eyebrow, title, lines, emphasis, icon }: OfficeCardProps) {
  return (
    <article
      id={id}
      className=" bg-trasparent px-5 py-8 text-center sm:px-6 sm:py-9 md:px-7 md:py-10 xl:px-8 xl:py-12 2xl:px-5 2xl:py-14"
    >
      <div className="mx-auto flex max-w-[20rem] flex-col items-center">
        <div className="flex justify-center">{icon}</div>
        <h3 className="mt-4 font-change-serif-bold text-[1.35rem] leading-tight text-primary sm:text-[1.5rem] md:mt-5 md:text-[1.65rem] xl:text-[1.85rem]">
          {title}
        </h3>
        <p className="mt-3 text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-secondary)] sm:text-[10px] md:text-[11px]">
          {eyebrow}
        </p>
        <div className="mt-5 space-y-1 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-[14px] md:mt-6 md:text-[15px] md:leading-7">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        {emphasis ? (
          <p className="mt-5 font-semibold text-primary md:mt-6 md:text-[15px]">
            {emphasis}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export default function OfficesSection() {
  return (
    <section
      id="offices"
      className="bg-linear-to-b from-white via-secondary/20 to-[color:var(--color-secondary)]/50 px-4 py-12 sm:px-5 sm:py-14 md:px-8 md:py-16 xl:px-14 xl:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
        <OfficeCard
          id="office-delaware"
          icon={<HeadquartersIcon />}
          title="Corporate Headquarters"
          eyebrow="Lewes, Delaware, USA"
          lines={[
            "16192 Coastal Highway",
            "Lewes, DE 19958 USA",
            "File Number: 10426498",
            "(EIN) 37-2212324",
          ]}
        />
        <OfficeCard
          id="office-cagliari"
          icon={<LocationPinIcon />}
          title="Italian Operations"
          eyebrow="Cagliari, Sardinia, IT"
          lines={[
            "Via Goffredo Mameli 96",
            "Interno 14, Floor 7",
            "Cagliari 09123",
          ]}
          emphasis="EU Strategic Hub"
        />
      </div>
    </section>
  );
}
