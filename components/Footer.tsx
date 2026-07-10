const offices = [
  { label: "Delaware", href: "#office-delaware" },
  { label: "Cagliari", href: "#office-cagliari" },
  { label: "Olbia", href: "#office-cagliari" },
  { label: "Roma", href: "#office-cagliari" },
];

const corporateLinks = [
  { label: "Contact", href: "#contact" },
  { label: "Offices", href: "#offices" },
  { label: "Privacy Policy", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[color:rgba(197,160,89,0.28)] bg-[color:var(--color-primary)] text-[color:var(--color-white)]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(197,160,89,0),rgba(197,160,89,0.92),rgba(197,160,89,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(197,160,89,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-9 sm:px-5 sm:py-10 md:px-8 md:py-11 xl:px-14 xl:py-12">
        <div className="grid gap-8 border-b border-[color:rgba(255,255,255,0.12)] pb-7 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-8 md:pb-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.42fr)_minmax(0,0.42fr)] xl:gap-10">
          <div className="max-w-lg">
            <p className="text-[9px] uppercase tracking-[0.28em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
              Two Lions International
            </p>
            <h2 className="mt-3 font-change-serif-bold text-[1.45rem] leading-[1.02] uppercase tracking-[0.03em] text-[color:var(--color-white)] sm:text-[1.6rem] md:text-[1.85rem] xl:text-[2rem]">
              Institutional capital, composed international presence.
            </h2>
            <p className="mt-4 max-w-md text-[13px] leading-6 text-[color:rgba(248,248,248,0.76)] sm:text-[14px] md:text-[15px]">
              Corporate positioning across infrastructure, energy and luxury
              ventures.
            </p>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
              Offices
            </p>
            <nav className="mt-4 space-y-2 text-[14px] leading-6 text-[color:var(--color-white)] md:text-[15px]">
              {offices.map((office) => (
                <a
                  key={office.label}
                  href={office.href}
                  className="group flex items-center justify-between border-b border-[color:rgba(255,255,255,0.08)] pb-2 transition-colors hover:text-[color:var(--color-thirdary)]"
                >
                  <span>{office.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[color:rgba(248,248,248,0.42)] transition-colors group-hover:text-[color:var(--color-thirdary)]">
                    View
                  </span>
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-thirdary)] sm:text-[10px] md:text-[11px]">
              Corporate
            </p>
            <nav className="mt-4 space-y-2 text-[14px] leading-6 text-[color:var(--color-white)] md:text-[15px]">
              {corporateLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center justify-between border-b border-[color:rgba(255,255,255,0.08)] pb-2 transition-colors hover:text-[color:var(--color-thirdary)]"
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[color:rgba(248,248,248,0.42)] transition-colors group-hover:text-[color:var(--color-thirdary)]">
                    Open
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4 text-[11px] uppercase tracking-[0.18em] text-[color:rgba(248,248,248,0.54)] sm:flex-row sm:items-center sm:justify-between sm:text-[12px]">
          <p>{year} Two Lions International</p>
          <p>All rights reserved</p>
          <p>Chairman Office: Delaware, United States</p>
        </div>
      </div>
    </footer>
  );
}
