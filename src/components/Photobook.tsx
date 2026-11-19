"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { albumSpreads } from "@/lib/wedding";
import { Lightbox } from "@/components/Lightbox";
import { Reveal } from "@/components/Reveal";

export function Photobook() {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);

  const slide = (direction: number) => {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.min(node.clientWidth * 0.85, 720), behavior: "smooth" });
  };

  return (
    <section id="trang-album" className="bg-night py-20 text-ivory md:py-28" aria-labelledby="photobook-title">
      <Reveal>
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.38em] text-gold-2">Album in</p>
          <h2 id="photobook-title" className="mt-3 font-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-tight font-medium">
            Lật từng trang
          </h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/65">
            Vuốt ngang để xem từng trang, hoặc dùng mũi tên.
          </p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            className="h-11 w-11 border border-white/30 text-xl transition duration-300 hover:bg-white/10"
            aria-label="Trang trước"
            onClick={() => slide(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="h-11 w-11 border border-white/30 text-xl transition duration-300 hover:bg-white/10"
            aria-label="Trang sau"
            onClick={() => slide(1)}
          >
            ›
          </button>
        </div>
      </div>
      </Reveal>

      <div
        ref={scroller}
        className="album-scroll mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4"
      >
        {albumSpreads.map((photo, photoIndex) => (
          <button
            key={photo.src}
            type="button"
            aria-label={photo.alt}
            className="album-card w-[86vw] shrink-0 snap-center cursor-pointer border-0 bg-transparent p-0 text-left sm:w-[640px]"
            onClick={() => setIndex(photoIndex)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 640px) 86vw, 640px"
              className="h-auto w-full bg-white"
            />
            <span className="mt-3 block text-[11px] tracking-[0.22em] text-white/50">
              {String(photoIndex + 1).padStart(2, "0")} / {String(albumSpreads.length).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
      <Lightbox photos={albumSpreads} index={index} onClose={close} setIndex={setIndex} />
    </section>
  );
}
