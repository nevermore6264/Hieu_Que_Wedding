export function Ribbon({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="section-ribbon bg-night px-4 py-3.5 text-center text-[12px] font-medium tracking-[0.32em] text-ivory uppercase"
    >
      <span className="ribbon-rule" aria-hidden />
      {children}
      <span className="ribbon-rule is-flip" aria-hidden />
    </h2>
  );
}
