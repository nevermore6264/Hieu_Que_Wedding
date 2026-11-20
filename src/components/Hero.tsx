import Image from "next/image";
import { couplePhoto, wedding } from "@/lib/wedding";

export function Hero() {
  const weddingDay = wedding.events.find((event) => event.id === "le-cuoi");

  return (
    <section
      id="dau-trang"
      className="grid min-h-[100svh] items-center gap-8 bg-[#f6f1e8] px-5 pt-24 pb-12 text-ink md:grid-cols-2 md:gap-12 md:px-12 lg:px-20"
    >
      <div
        className="hero-in relative mx-auto aspect-[3/4] h-[min(78svh,740px)] w-auto max-w-[92vw] overflow-hidden rounded-t-[240px] rounded-b-3xl shadow-[0_28px_50px_-30px_rgba(40,24,8,0.75)]"
        style={{ animationDelay: "0.12s" }}
      >
        <Image
          src={couplePhoto.src}
          alt={couplePhoto.alt}
          width={couplePhoto.width}
          height={couplePhoto.height}
          priority
          sizes="(max-width: 768px) 90vw, 560px"
          className="h-full w-full object-cover object-[center_18%]"
        />
      </div>
      <div className="text-center md:text-left">
        <p className="hero-in text-[11px] tracking-[0.42em] text-gold uppercase" style={{ animationDelay: "0.2s" }}>
          Thiệp mời lễ cưới
        </p>
        <h1 className="hero-in mt-4 font-serif text-[clamp(3.4rem,7vw,6.5rem)] leading-none font-medium" style={{ animationDelay: "0.32s" }}>
          <span className="block">{wedding.groom.shortName}</span>
          <span className="my-2 block font-serif text-[clamp(2rem,4vw,3.2rem)] leading-none text-gold italic">&</span>
          <span className="block">{wedding.bride.shortName}</span>
        </h1>
        <p className="hero-in mt-5 text-base leading-7 text-muted" style={{ animationDelay: "0.5s" }}>
          {wedding.groom.name}
          <br />
          {wedding.bride.name}
        </p>
        {weddingDay ? (
          <p className="hero-in mt-5 text-sm tracking-wide text-ink" style={{ animationDelay: "0.66s" }}>
            {weddingDay.time}
          </p>
        ) : null}
      </div>
    </section>
  );
}
