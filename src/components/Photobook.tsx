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
    <section id="trang-album" className="bg-night py-12 text-ivory" aria-labelledby="photobook-title">
      <Reveal>
      <div className="mx-auto flex items-end justify-between gap-4 px-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.38em] text-gold-2">Album in</p>
          <h2 id="photobook-title" className="mt-2 font-serif text-4xl leading-tight font-medium">
            Lật từng trang
          </h2>
          <p className="mt-2 max-w-xs text-sm leading-6 text-white/65">
            Vuốt ngang để xem từng trang.
          </p>
        </div>
        <div className="flex gap-2">
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
            className="album-card w-[min(88vw,920px)] shrink-0 snap-center cursor-pointer overflow-hidden rounded-xl border-0 bg-transparent p-0 text-left"
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
