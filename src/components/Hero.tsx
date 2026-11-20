import Image from "next/image";
import { Ornament } from "@/components/Ornament";
import { couplePhoto, wedding } from "@/lib/wedding";

export function Hero() {
  const weddingDay = wedding.events.find((event) => event.id === "le-cuoi");
  const asking = wedding.events.find((event) => event.id === "an-hoi");

  return (
    <section
      id="dau-trang"
      className="hero-ground relative grid min-h-[100svh] items-center gap-10 px-5 pt-24 pb-12 text-ink md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-8 md:px-10 lg:px-16"
    >
      <div className="hero-glow hero-glow-photo" aria-hidden />
      <div className="hero-glow hero-glow-names" aria-hidden />
      <span className="hero-corner is-tr" aria-hidden />
      <span className="hero-corner is-bl" aria-hidden />
      <div
        className="moon-gate hero-in relative z-10 mx-auto aspect-[3/4] h-[min(76svh,720px)] w-auto max-w-[92vw]"
        style={{ animationDelay: "0.12s" }}
      >
        <Image
          src={couplePhoto.src}
          alt={couplePhoto.alt}
          width={couplePhoto.width}
          height={couplePhoto.height}
          priority
          sizes="(max-width: 768px) 90vw, 640px"
          className="h-full w-full object-cover object-[center_18%]"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <span aria-hidden className="pointer-events-none absolute font-serif text-[clamp(10rem,22vw,18rem)] leading-none text-cinnabar/15">
          囍
        </span>
        <div className="relative w-full max-w-xl">
          <p className="hero-in text-[11px] tracking-[0.42em] text-gold uppercase" style={{ animationDelay: "0.2s" }}>
            Thiệp mời lễ cưới
          </p>
          <h1
            className="hero-in mt-4 font-serif text-[clamp(4.6rem,8vw,8rem)] leading-[0.9] font-medium"
            style={{ animationDelay: "0.32s" }}
          >
            <span className="block">{wedding.groom.shortName}</span>
            <span className="my-1 block font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-none text-gold italic">&</span>
            <span className="block">{wedding.bride.shortName}</span>
          </h1>
          <p className="hero-in mt-6 text-lg leading-8 text-muted" style={{ animationDelay: "0.5s" }}>
            {wedding.groom.name}
            <span className="mx-2 text-gold">·</span>
            {wedding.bride.name}
          </p>
          <Ornament className="hero-in mt-6" />
          {weddingDay ? (
            <p className="hero-in mt-6 text-base tracking-wide text-ink" style={{ animationDelay: "0.66s" }}>
              {weddingDay.time}
            </p>
          ) : null}
          {wedding.lunarLabel.trim() ? (
            <p className="hero-in mt-1 text-sm text-muted italic" style={{ animationDelay: "0.74s" }}>
              {wedding.lunarLabel}
            </p>
          ) : null}
          {asking ? (
            <p className="hero-in mt-4 text-sm tracking-wide text-muted" style={{ animationDelay: "0.82s" }}>
              {asking.title} · {asking.time.replace(/^Thứ \S+, /, "")}
            </p>
          ) : null}
        </div>
      </div>
      <p className="scroll-cue" aria-hidden>
        <span />
      </p>
    </section>
  );
}
