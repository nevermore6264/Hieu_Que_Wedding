"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { gallery } from "@/lib/wedding";
import { Lightbox } from "@/components/Lightbox";
import { Ribbon } from "@/components/Ribbon";

export function Gallery() {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const drag = useRef(0);
  const dragged = useRef(false);
  const close = useCallback(() => setOpen(null), []);
  const last = gallery.length - 1;

  const go = (direction: number) => {
    setCurrent((value) => Math.min(last, Math.max(0, value + direction)));
  };

  return (
    <section id="album" className="overflow-hidden bg-[#f6f1e8] pb-12">
      <Ribbon>Album ảnh</Ribbon>
      <p className="mt-6 text-center text-sm text-muted">Chạm vào ảnh để xem lớn.</p>
      <div
        className="fan-stage relative mt-5 overflow-hidden"
        style={{ transform: "translateZ(0)" }}
        onPointerDown={(event) => {
          drag.current = event.clientX;
        }}
        onPointerUp={(event) => {
          const delta = event.clientX - drag.current;
          dragged.current = Math.abs(delta) > 48;
          if (delta > 48) go(-1);
          if (delta < -48) go(1);
        }}
      >
        {gallery.map((photo, index) => {
          const offset = index - current;
          if (Math.abs(offset) > 1) return null;
          return (
            <button
              key={photo.src}
              type="button"
              aria-label={photo.alt}
              className={`fan-card absolute top-0 left-1/2 overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-[0_22px_40px_-24px_rgba(40,24,8,0.8)] ${
                offset === 0 ? "is-center" : offset > 0 ? "is-next" : "is-prev"
              }`}
              style={{ zIndex: offset === 0 ? 2 : 1 }}
              onClick={() => {
                if (dragged.current) {
                  dragged.current = false;
                  return;
                }
                if (offset === 0) setOpen(index);
                else go(offset);
              }}
            >
              <Image
                src={photo.thumb}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="300px"
                className="aspect-[3/4] w-full object-cover"
              />
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-center gap-6">
        <button
          type="button"
          className="h-10 w-10 text-2xl text-gold disabled:opacity-30"
          aria-label="Ảnh trước"
          disabled={current === 0}
          onClick={() => go(-1)}
        >
          ‹
        </button>
        <p className="text-sm tracking-[0.18em] text-muted">
          {current + 1} / {gallery.length}
        </p>
        <button
          type="button"
          className="h-10 w-10 text-2xl text-gold disabled:opacity-30"
          aria-label="Ảnh sau"
          disabled={current === last}
          onClick={() => go(1)}
        >
          ›
        </button>
      </div>
      <Lightbox photos={gallery} index={open} onClose={close} setIndex={setOpen} />
    </section>
  );
}
