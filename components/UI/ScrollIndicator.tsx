type ScrollIndicatorProps = {
  href?: string;
  className?: string;
};

export default function ScrollIndicator({
  href,
  className = "",
}: ScrollIndicatorProps) {
  const baseClassName = `absolute bottom-8 left-1/2 z-[60] -translate-x-1/2 text-primary md:bottom-10 ${className}`.trim();
  const indicator = (
    <span
      className="scroll-indicator-float flex flex-col items-center gap-2"
      aria-hidden="true"
    >
      <span className="flex items-center justify-center">
        <svg
          viewBox="0 0 20 12"
          className="h-6 w-24"
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth="2.1"
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
