import { Ornament } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";

const links = [
  { href: "#dau-trang", label: "Đầu trang" },
  { href: "#loi-moi", label: "Lời mời" },
  { href: "#album", label: "Album" },
  { href: "#lich-trinh", label: "Lịch trình" },
  { href: "#mung-cuoi", label: "Mừng cưới" },
  { href: "#tham-du", label: "Tham dự" },
];

export function Footer() {
  return (
    <footer id="chan-trang" className="relative overflow-hidden bg-night text-ivory">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c6aa74] to-transparent" />
      <p
        className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 font-serif text-[14rem] leading-none text-white/[0.045]"
        aria-hidden
      >
        囍
      </p>
      <Reveal variant="zoom">
        <div className="relative mx-auto max-w-4xl px-5 py-16 text-center md:px-10 md:py-20">
          <p className="text-[11px] tracking-[0.42em] text-gold-2 uppercase">Thiệp mời lễ cưới</p>
          <p className="mt-4 font-serif text-6xl leading-none font-medium md:text-8xl">
            {wedding.groom.shortName} <span className="text-gold-2 italic">&</span> {wedding.bride.shortName}
          </p>
          <Ornament className="mt-6" />
          <p className="mt-5 font-serif text-2xl text-white/80">
            {wedding.groom.name}
            <span className="mx-2 text-gold-2">·</span>
            {wedding.bride.name}
          </p>

          <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
            {wedding.events.map((item) => {
              const parts = item.time.match(/^(.*?),\s*(\d+)\s+tháng\s+(\d+),\s*(\d+)/i);
              return (
                <div key={item.id} className="border border-white/15 px-5 py-5">
                  <p className="text-[11px] tracking-[0.28em] text-gold-2 uppercase">{item.eyebrow}</p>
                  <p className="mt-2 font-serif text-2xl">{item.title}</p>
                  {parts ? (
                    <p className="mt-3 font-serif text-5xl leading-none">{parts[2]}</p>
                  ) : null}
                  <p className="mt-2 text-sm text-white/65">{parts ? `tháng ${parts[3]}, ${parts[4]}` : item.time}</p>
                  {parts ? <p className="text-sm text-white/40">{parts[1]}</p> : null}
                  {item.note ? <p className="mt-2 text-sm text-white/45 italic">{item.note}</p> : null}
                </div>
              );
            })}
          </div>

          <nav className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3" aria-label="Cuối trang">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-[0.22em] text-white/55 uppercase transition hover:text-gold-2"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="mt-12 text-[11px] tracking-[0.32em] text-gold-2 uppercase">Với tất cả yêu thương</p>
        </div>
      </Reveal>
    </footer>
  );
}
