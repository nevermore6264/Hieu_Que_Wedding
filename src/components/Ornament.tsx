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
      <span className="h-px w-10 bg-gold/50 sm:w-14" />
      <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-10 bg-gold/50 sm:w-14" />
    </div>
  );
}
