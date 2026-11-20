export function Ornament({
  className = "",
  align = "center",
}: {
  className?: string;
  align?: "center" | "start";
}) {
  return (
    <div
      className={`flex items-center gap-3 text-gold ${align === "center" ? "justify-center" : "justify-start"} ${className}`}
      aria-hidden
    >
      <span className="ornament-line h-px w-10 bg-gold/50 sm:w-14" />
      <svg viewBox="0 0 36 14" className="h-3 w-8" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M2 10.5c1.4-3.2 4-4.4 6.2-3.2C9.2 4.4 11.6 3 14.2 3c2.8 0 5 1.7 5.6 4 1.5-.7 3.6-.2 4.6 1.4 1.5.5 2.6 1.8 2.6 3.4" />
        <path d="M6 12h24" />
      </svg>
      <span className="ornament-line h-px w-10 bg-gold/50 sm:w-14" />
    </div>
  );
}
