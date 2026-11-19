import { ParallaxPhoto } from "@/components/ParallaxPhoto";
import { displayDate, heroPhoto, wedding } from "@/lib/wedding";

export function Hero() {
  const date = displayDate();
  const place = wedding.weddingPlace.trim();

  return (
    <section id="dau-trang" className="relative flex min-h-[100svh] items-end overflow-hidden bg-night text-white">
      <ParallaxPhoto
        src={heroPhoto.src}
        alt={heroPhoto.alt}
        priority
        className="hero-drift object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 pb-36 md:pb-40">
        <p className="hero-in text-[11px] uppercase tracking-[0.42em] text-gold-2" style={{ animationDelay: "0.15s" }}>
          Thiệp mời lễ cưới
        </p>
        <h1 className="mt-4 max-w-4xl font-serif font-medium leading-[0.98]">
          <span className="hero-in block text-[clamp(2.7rem,6.4vw,5.5rem)]" style={{ animationDelay: "0.32s" }}>
            {wedding.groom.name}
          </span>
          <span
            className="hero-in my-1 block font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none text-gold-2 italic"
            style={{ animationDelay: "0.5s" }}
          >
            &
          </span>
          <span className="hero-in block text-[clamp(2.7rem,6.4vw,5.5rem)]" style={{ animationDelay: "0.64s" }}>
            {wedding.bride.name}
          </span>
        </h1>
        <div className="hero-in mt-6 max-w-md space-y-3 text-sm leading-7 text-white/80 md:text-base" style={{ animationDelay: "0.84s" }}>
          {wedding.events.map((event) => (
            <p key={event.id}>
              <span className="text-gold-2">{event.title}</span>
              {" · "}
              {event.time}
              {event.note ? <span className="block text-white/65">{event.note}</span> : null}
            </p>
          ))}
          {place ? <p>{place}</p> : null}
          {!wedding.events.length && !date ? <p>Ngày lành sẽ được cập nhật</p> : null}
        </div>
        <div className="hero-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: "1.02s" }}>
          <a
            href="#album"
            className="inline-flex min-h-11 items-center border border-white/50 px-5 text-[11px] uppercase tracking-[0.22em] transition duration-300 hover:bg-white hover:text-ink"
          >
            Xem album
          </a>
          <a
            href="#tham-du"
            className="inline-flex min-h-11 items-center bg-gold px-5 text-[11px] uppercase tracking-[0.22em] text-ivory transition duration-300 hover:bg-[#755832]"
          >
            Xác nhận tham dự
          </a>
        </div>
      </div>
      <a href="#loi-moi" className="scroll-cue">
        Cuộn
        <span />
      </a>
    </section>
  );
}
