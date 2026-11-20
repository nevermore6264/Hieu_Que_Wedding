import { wedding } from "@/lib/wedding";
import { Ornament } from "@/components/Ornament";

export function Couple() {
  return (
    <section id="doi-uyen-uong" className="paper-ground px-6 py-16 text-center md:py-24">
      <div className="mx-auto max-w-5xl">
      <p className="text-[11px] tracking-[0.38em] text-gold uppercase">Đôi uyên ương</p>
      <p className="mt-4 font-serif text-3xl leading-snug italic">Một chuyện tình giản dị.</p>
      <div className="mt-10">
        <p className="text-[11px] tracking-[0.32em] text-gold uppercase">{wedding.groom.role}</p>
        <h3 className="mt-2 font-serif text-4xl leading-tight font-medium">{wedding.groom.name}</h3>
        {wedding.groom.parents ? <p className="mt-2 text-sm leading-6 text-muted">{wedding.groom.parents}</p> : null}
        <p className="mx-auto mt-3 max-w-xs text-[15px] leading-7 text-muted">{wedding.groom.note}</p>
      </div>
      <Ornament className="my-8" />
      <div>
        <p className="text-[11px] tracking-[0.32em] text-gold uppercase">{wedding.bride.role}</p>
        <h3 className="mt-2 font-serif text-4xl leading-tight font-medium">{wedding.bride.name}</h3>
        {wedding.bride.parents ? <p className="mt-2 text-sm leading-6 text-muted">{wedding.bride.parents}</p> : null}
        <p className="mx-auto mt-3 max-w-xs text-[15px] leading-7 text-muted">{wedding.bride.note}</p>
      </div>
      </div>
    </section>
  );
}
