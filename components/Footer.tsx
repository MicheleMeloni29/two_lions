export default function Footer() {
  return (
    <footer className="bg-[color:var(--color-primary)] text-[color:var(--color-white)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-12 xl:px-14 xl:py-14">
        <div className="grid gap-10 md:gap-12 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:items-start">
          <div className="max-w-md">
            <h2 className="font-change-serif-bold text-[1.8rem] leading-[1.02] text-[color:var(--color-white)] sm:text-[2rem] md:text-[2.2rem] xl:text-[2.35rem]">
            Two Lions International
            </h2>
            <p className="mt-4 max-w-sm text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-[14px] md:mt-5 md:text-[15px] md:leading-7">
              Strategically positioning capital and intellectual property across
              energy, infrastructure, and luxury lifestyle sectors globally.
            </p>
          </div>

          <div className="grid gap-8 border-t border-[color:var(--color-white)]/12 pt-8 sm:grid-cols-2 md:pt-10 xl:justify-self-end xl:border-t-0 xl:pt-1">
            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-white)] sm:text-[10px] md:text-[11px]">
                Offices
              </p>
              <div className="mt-4 space-y-3 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-[14px] md:mt-5 md:text-[15px]">
                <a
                  href="#office-delaware"
                  className="block transition-opacity hover:opacity-80"
                >
                  Delaware Office
                </a>
                <a
                  href="#office-cagliari"
                  className="block transition-opacity hover:opacity-80"
                >
                  Cagliari Office
                </a>
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-white)] sm:text-[10px] md:text-[11px]">
                Corporate
              </p>
              <div className="mt-4 space-y-3 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-[14px] md:mt-5 md:text-[15px]">
                <span className="block">Privacy Policy</span>
                <span className="block">Investor Relations</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[color:var(--color-white)]/12 pt-6 md:mt-10 md:pt-7">
          <p className="text-[12px] leading-6 text-[color:var(--color-secondary)] md:text-[13px]">
            Copyright 2024 Two Lions International Corporation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
