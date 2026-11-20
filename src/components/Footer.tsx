import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";

export function Footer() {
  return (
    <footer className="bg-night px-5 py-16 text-center text-ivory">
      <Reveal variant="zoom">
        <p className="font-serif text-4xl">
          H <span className="text-gold-2 italic">&</span> Q
        </p>
        <p className="mt-3 font-serif text-xl text-white/85">
          {wedding.groom.name}
          <span className="mx-2 text-gold-2">·</span>
          {wedding.bride.name}
        </p>
        <p className="mt-10 text-xs leading-6 text-white/40">
          Nhạc cưới Việt Nam, phát từ YouTube.
        </p>
        <p className="mt-6 text-xs text-white/35">Với tất cả yêu thương</p>
      </Reveal>
    </footer>
  );
}
