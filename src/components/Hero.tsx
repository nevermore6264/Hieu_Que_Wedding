import Image from "next/image";
import { displayDate, heroPhoto, wedding } from "@/lib/wedding";

export function Hero() {
  const date = displayDate();
  const place = wedding.weddingPlace.trim();

  return (
    <section id="dau-trang" className="relative flex min-h-[100svh] items-end overflow-hidden bg-night text-white">
      <Image
        src={heroPhoto.src}
        alt={heroPhoto.alt}
        fill
        priority
        sizes="100vw"
        className="hero-drift object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
      <p className="pointer-events-none absolute top-1/2 right-6 hidden -translate-y-1/2 rotate-90 text-[11px] tracking-[0.55em] text-white/70 xl:block">
        SIMPLE THING
      </p>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 pb-36 md:pb-40">
        <p className="text-[11px] uppercase tracking-[0.42em] text-gold-2">Thiệp mời thành hôn</p>
        <h1 className="mt-4 max-w-4xl font-serif font-medium leading-[0.98]">
          <span className="block text-[clamp(2.7rem,6.4vw,5.5rem)]">{wedding.groom.name}</span>
          <span className="my-1 block font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none text-gold-2 italic">
            &
          </span>
          <span className="block text-[clamp(2.7rem,6.4vw,5.5rem)]">{wedding.bride.name}</span>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-7 text-white/80 md:text-base">
          {date || "Ngày lành sẽ được cập nhật"}
          {place ? ` · ${place}` : ""}
          {wedding.lunarLabel.trim() ? ` · ${wedding.lunarLabel.trim()}` : ""}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#album"
            className="inline-flex min-h-11 items-center border border-white/50 px-5 text-[11px] uppercase tracking-[0.22em] transition hover:bg-white hover:text-ink"
          >
            Xem album
          </a>
          <a
            href="#tham-du"
            className="inline-flex min-h-11 items-center bg-gold px-5 text-[11px] uppercase tracking-[0.22em] text-ivory transition hover:bg-[#755832]"
          >
            Xác nhận tham dự
          </a>
        </div>
      </div>
    </section>
  );
}
