import { wedding } from "@/lib/wedding";
import { Ornament } from "@/components/Ornament";

export function Invitation() {
  return (
    <section id="loi-moi" className="bg-[#f6f1e8] px-5 pt-4 pb-16">
      <div className="mx-auto max-w-3xl border border-gold/45 p-1.5">
        <div className="border border-gold/30 px-6 py-14 text-center md:px-16 md:py-16">
          <p className="font-serif text-5xl leading-none text-gold/80">囍</p>
          <p className="mt-5 text-[11px] tracking-[0.38em] text-gold uppercase">Trân trọng kính mời</p>
          <p className="mx-auto mt-6 max-w-xs text-[15px] leading-8">
            Hai gia đình chúng tôi xin trân trọng kính mời quý khách đến dự lễ cưới của
          </p>
          <p className="mt-7 font-serif text-4xl leading-tight md:text-5xl">{wedding.groom.name}</p>
          {wedding.groom.parents ? <p className="mt-2 text-sm leading-6 text-muted">{wedding.groom.parents}</p> : null}
          <p className="my-1.5 font-serif text-2xl text-gold italic">&</p>
          <p className="font-serif text-4xl leading-tight md:text-5xl">{wedding.bride.name}</p>
          {wedding.bride.parents ? <p className="mt-2 text-sm leading-6 text-muted">{wedding.bride.parents}</p> : null}
          <Ornament className="mt-7" />
          <p className="mx-auto mt-6 max-w-xs text-[15px] leading-8">
            Sự hiện diện của quý khách là niềm vui, và là lời chúc phúc quý giá nhất mà chúng tôi mong được đón nhận.
          </p>
        </div>
      </div>
    </section>
  );
}
