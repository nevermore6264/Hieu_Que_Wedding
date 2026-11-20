import { wedding } from "@/lib/wedding";

export function Couple() {
  return (
    <section id="doi-uyen-uong" className="paper-ground px-6 py-16 text-center md:py-24">
      <div className="mx-auto max-w-5xl">
      <p className="text-[11px] tracking-[0.38em] text-gold uppercase">Đôi uyên ương</p>
      <p className="mt-4 font-serif text-3xl leading-snug italic">Một chuyện tình giản dị.</p>
      <div className="mt-12 grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-6">
        <article className="name-plaque">
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">{wedding.groom.role}</p>
          <h3 className="mt-2 font-serif text-4xl leading-tight font-medium">{wedding.groom.name}</h3>
          {wedding.groom.parents ? <p className="mt-2 text-sm leading-6 text-muted">{wedding.groom.parents}</p> : null}
          <p className="mx-auto mt-3 max-w-xs text-[15px] leading-7 text-muted">{wedding.groom.note}</p>
        </article>
        <p className="seal-chop is-small" aria-hidden>
          囍
        </p>
        <article className="name-plaque">
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">{wedding.bride.role}</p>
          <h3 className="mt-2 font-serif text-4xl leading-tight font-medium">{wedding.bride.name}</h3>
          {wedding.bride.parents ? <p className="mt-2 text-sm leading-6 text-muted">{wedding.bride.parents}</p> : null}
          <p className="mx-auto mt-3 max-w-xs text-[15px] leading-7 text-muted">{wedding.bride.note}</p>
        </article>
      </div>
      </div>
    </section>
  );
}
