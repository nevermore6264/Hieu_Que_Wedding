"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { gallery } from "@/lib/wedding";
import { Lightbox } from "@/components/Lightbox";
import { Reveal } from "@/components/Reveal";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);

  return (
    <section id="album" className="bg-paper px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] uppercase tracking-[0.38em] text-gold">Album ảnh</p>
            <h2 className="mt-3 font-serif text-[clamp(2.3rem,5vw,3.8rem)] leading-tight font-medium">
              Hiếu & Quế
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-muted">Chạm vào ảnh để xem lớn.</p>
          </div>
        </Reveal>

        <div className="mt-12 masonry">
          {gallery.map((photo, photoIndex) => (
            <Reveal key={photo.src} delay={(photoIndex % 4) * 80}>
              <button
                type="button"
                aria-label={photo.alt}
                className="group relative block w-full cursor-pointer overflow-hidden border-0 bg-transparent p-0 text-left"
                onClick={() => setIndex(photoIndex)}
              >
                <Image
                  src={photo.thumb}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className="h-auto w-full transition duration-700 group-hover:scale-[1.05]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gold/0 transition duration-500 group-hover:bg-gold/20" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <Lightbox photos={gallery} index={index} onClose={close} setIndex={setIndex} />
    </section>
  );
}
