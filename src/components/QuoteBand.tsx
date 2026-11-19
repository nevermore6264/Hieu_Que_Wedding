import Image from "next/image";
import { quotePhoto, wedding } from "@/lib/wedding";

export function QuoteBand() {
  return (
    <section className="relative min-h-[78vh] bg-night text-white">
      <Image
        src={quotePhoto.src}
        alt={quotePhoto.alt}
        fill
        sizes="100vw"
        className="object-cover object-[center_45%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25" />
      <div className="relative flex min-h-[78vh] items-end px-6 pb-16 md:pb-20">
        <blockquote className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-[clamp(1.9rem,4.4vw,3.5rem)] leading-snug italic text-balance">
            Chọn nhau, giữa những điều giản dị.
          </p>
          <footer className="mt-5 text-[11px] uppercase tracking-[0.35em] text-white/75">
            {wedding.groom.shortName} & {wedding.bride.shortName}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
