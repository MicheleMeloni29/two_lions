import ShinyText from "./ShinyText";

type ScrollIndicatorProps = {
  href?: string;
  className?: string;
  label?: string;
};

export default function ScrollIndicator({
  href,
  className = "",
  label = "scroll",
}: ScrollIndicatorProps) {
  const baseClassName = `absolute bottom-8 left-1/2 z-[60] -translate-x-1/2 text-primary sm:bottom-10 lg:bottom-8 xl:bottom-6 2xl:bottom-8 ${className}`.trim();
  const indicator = (
    <span
      className="scroll-indicator-float flex flex-col items-center gap-0.5 sm:gap-1 lg:gap-1.5"
      aria-hidden="true"
    >
      <ShinyText
        text={label}
        speed={2.1}
        spread={135}
        delay={0.4}
        className="font-change-serif-bold text-[8px] uppercase tracking-[0.18em] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm 2xl:text-sm"
        color="var(--color-secondary)"
        shineColor="var(--color-white)"
      />
      <span className="flex items-center justify-center">
        <svg
          viewBox="0 0 20 12"
          className="h-5 w-18 sm:h-6 sm:w-24 lg:h-7 lg:w-28 xl:h-8 xl:w-32"
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3.5 10 9l7-5.5" />
        </svg>
      </span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClassName}
        aria-label="Scroll to next section"
      >
        {indicator}
      </a>
    );
  }

  return <div className={baseClassName}>{indicator}</div>;
}
