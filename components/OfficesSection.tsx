import type { ReactNode } from "react";
import enMessages from "@/locales/en.json";
import itMessages from "@/locales/it.json";

function HeadquartersIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7 text-[color:var(--color-thirdary)]"
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
      className="h-7 w-7 text-[color:var(--color-thirdary)]"
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

type OfficeDataRowProps = {
  label?: string;
  children: ReactNode;
};

function OfficeDataRow({ label, children }: OfficeDataRowProps) {
  return (
    <div className="grid gap-2 border-b border-[color:rgba(31,39,92,0.1)] pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4">
      {label ? (
        <p className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-secondary)]">
          {label}
        </p>
      ) : null}
      <div className="text-[13px] leading-6 text-primary sm:text-[14px] md:text-[15px] md:leading-7">
        {children}
      </div>
    </div>
  );
}

type OfficesSectionProps = {
  lang: "it" | "en";
};

const content = {
  it: itMessages.officeSection,
  en: enMessages.officeSection,
} as const;

type OfficeRow = {
  label?: string;
  lines: string[];
};

type ItalianOffice = {
  label?: string;
  city?: string;
  lines: string[];
};

type OfficeCardProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  lines: string[];
  emphasis?: string;
  icon: ReactNode;
  details?: ReactNode;
  articleClassName?: string;
  contentClassName?: string;
  detailsClassName?: string;
};

function OfficeCard({
  id,
  eyebrow,
  title,
  lines,
  emphasis,
  icon,
  details,
  articleClassName,
  contentClassName,
  detailsClassName,
}: OfficeCardProps) {
  return (
    <article
      id={id}
      className={`rounded-[2rem] px-5 py-8  sm:px-6 sm:py-9 md:px-7 md:py-10 xl:px-8 xl:py-12 ${articleClassName ?? ""}`}
    >
      <div
        className={`grid gap-8 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-10 ${contentClassName ?? ""}`}
      >
        <div className="flex flex-col items-start">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:rgba(31,39,92,0.08)]">
            {icon}
          </div>
          {eyebrow ? (
            <p className="mt-5 text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-secondary)] sm:text-[10px] md:text-[11px]">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h3 className="mt-3 font-change-serif-bold text-[1.35rem] leading-tight text-primary sm:text-[1.5rem] md:text-[1.65rem] xl:text-[1.85rem]">
              {title}
            </h3>
          ) : null}
          {emphasis ? (
            <p className="mt-6 border-l-2 border-[color:var(--color-thirdary)] pl-4 font-semibold text-primary md:text-[15px]">
              {emphasis}
            </p>
          ) : null}
        </div>

        <div className="border-t border-[color:rgba(31,39,92,0.12)] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {details ? (
            <div
              className={`w-full text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-[14px] md:text-[15px] md:leading-7 ${detailsClassName ?? ""}`}
            >
              {details}
            </div>
          ) : (
            <div className="w-full space-y-2 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-[14px] md:text-[15px] md:leading-7">
              {lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function OfficesSection({ lang }: OfficesSectionProps) {
  const current = content[lang];
  const headquartersRows = current.headquarters.rows as OfficeRow[];
  const italianOffices = current.italianOperations.offices as ItalianOffice[];

  return (
    <section
      id="offices"
      className="relative overflow-hidden px-4 py-12 sm:px-5 sm:py-14 md:px-8 md:py-16 xl:px-14 xl:py-20"
    >
      <div className="absolute inset-0 bg-[url('/identityAdversiting/Identity_Corporate.png')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-white/80" />
      <div className="absolute inset-0" />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-6xl xl:max-w-[82%]">
          {current.eyebrow ? (
            <p className="mb-4 text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
              {current.eyebrow}
            </p>
          ) : null}
          {current.title ? (
            <h2 className="font-change-serif-bold max-w-[15ch] text-[2.1rem] leading-[0.94] uppercase tracking-[0.015em] text-primary sm:max-w-[16ch] sm:text-[2.5rem] md:max-w-[19ch] md:text-[3.5rem] xl:max-w-[21ch] xl:text-[4.2rem]">
              {current.title}
            </h2>
          ) : null}
          {current.lead ? (
            <p className="mt-7 max-w-3xl border-l-2 border-[color:var(--color-thirdary)]/65 pl-4 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
              {current.lead}
            </p>
          ) : null}
        </div>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 lg:gap-10 xl:mt-14 xl:gap-12">
          <OfficeCard
            id="office-delaware"
            icon={<HeadquartersIcon />}
            title={current.headquarters.title}
            eyebrow={current.headquarters.eyebrow}
            lines={[]}
            emphasis={current.headquarters.emphasis}
            details={
              <div className="space-y-4">
                {headquartersRows.map((row) => (
                  <OfficeDataRow
                    key={[row.label ?? "", ...(row.lines ?? [])].join("-")}
                    label={row.label}
                  >
                    {row.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </OfficeDataRow>
                ))}
              </div>
            }
          />

          <OfficeCard
            id="office-cagliari"
            icon={<LocationPinIcon />}
            title={current.italianOperations.title}
            eyebrow={current.italianOperations.eyebrow}
            contentClassName="lg:grid-cols-[minmax(0,0.24fr)_minmax(0,0.76fr)]"
            detailsClassName="lg:pt-1"
            lines={[]}
            emphasis={current.italianOperations.emphasis}
            details={
              <div className="grid gap-4 md:gap-5 lg:grid-cols-3 lg:gap-6">
                {italianOffices.map((office) => (
                  <div
                    key={[office.label ?? "", office.city ?? "", ...(office.lines ?? [])].join("-")}
                    className="rounded-[1.5rem] px-5 py-5"
                  >
                    {office.label ? (
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-secondary)]">
                        {office.label}
                      </p>
                    ) : null}
                    {office.city ? (
                      <p className={`${office.label ? "mt-3 " : ""}font-semibold text-primary`}>
                        {office.city}
                      </p>
                    ) : null}
                    <div className="mt-3 space-y-1 text-[color:var(--color-secondary)]">
                      {office.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
