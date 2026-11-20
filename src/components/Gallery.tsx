"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gallery } from "@/lib/wedding";
import { Lightbox } from "@/components/Lightbox";
import { Ornament } from "@/components/Ornament";
import { Ribbon } from "@/components/Ribbon";

export function Gallery() {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const drag = useRef(0);
  const dragged = useRef(false);
  const rail = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(null), []);
  const count = gallery.length;
  const last = count - 1;

  const go = (direction: number) => {
    setCurrent((value) => (value + direction + count) % count);
  };

  useEffect(() => {
    const railEl = rail.current;
    const thumb = railEl?.querySelector<HTMLElement>("[aria-current='true']");
    if (!railEl || !thumb) return;
    railEl.scrollTo({
      left: thumb.offsetLeft - railEl.clientWidth / 2 + thumb.clientWidth / 2,
      behavior: "smooth",
    });
  }, [current]);

  const slots = [-1, 0, 1].map((delta) => {
    const index = (current + delta + count) % count;
    return { delta, index, photo: gallery[index] };
  });

  return (
    <section id="album" className="overflow-hidden bg-[#f6f1e8] pb-16">
      <Ribbon>Album ảnh</Ribbon>
      <div className="mx-auto max-w-[1440px] px-4 pt-8 md:px-8 lg:px-12">
        <div className="mx-auto mb-6 max-w-xl text-center">
          <p className="text-[11px] tracking-[0.38em] text-gold uppercase">
            {String(count).padStart(2, "0")} khoảnh khắc
          </p>
          <p className="mt-2 font-serif text-3xl leading-tight font-medium md:text-4xl">
            Chạm vào ảnh để xem lớn
          </p>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-x-[6%] top-8 bottom-8 rounded-[2.8rem] bg-[radial-gradient(ellipse_at_center,rgba(198,170,116,0.18),transparent_70%)]"
            aria-hidden
          />
          <div
            className="album-stage relative"
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
            {slots.map(({ delta, index, photo }) => {
              const center = delta === 0;
              return (
                <button
                  key={`${delta}-${photo.src}`}
                  type="button"
                  aria-label={center ? photo.alt : delta < 0 ? "Ảnh trước" : "Ảnh sau"}
                  className={`album-slot border-0 bg-transparent p-0 ${center ? "is-center" : "is-side"}`}
                  onClick={() => {
                    if (dragged.current) {
                      dragged.current = false;
                      return;
                    }
                    if (center) setOpen(index);
                    else go(delta);
                  }}
                >
                  <span className={center ? "album-mat" : "album-side"}>
                    <Image
                      src={photo.thumb}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      sizes={center ? "(max-width: 800px) 88vw, 520px" : "380px"}
                      className="album-shot"
                    />
                    {center ? (
                      <>
                        <span className="album-corner is-tl" />
                        <span className="album-corner is-tr" />
                        <span className="album-corner is-bl" />
                        <span className="album-corner is-br" />
                      </>
                    ) : (
                      <span className="album-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <Ornament className="mt-7" />
        <p className="mx-auto mt-4 max-w-lg text-center font-serif text-2xl leading-snug italic text-ink">
          {gallery[current].alt}
        </p>
        <div className="mt-5 flex items-center justify-center gap-5">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-2xl text-gold transition hover:bg-gold hover:text-ivory"
            aria-label="Ảnh trước"
            onClick={() => go(-1)}
          >
            ‹
          </button>
          <p className="min-w-24 text-center text-sm tracking-[0.28em] text-ink">
            {String(current + 1).padStart(2, "0")}
            <span className="text-gold"> / </span>
            {String(last + 1).padStart(2, "0")}
          </p>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-2xl text-gold transition hover:bg-gold hover:text-ivory"
            aria-label="Ảnh sau"
            onClick={() => go(1)}
          >
            ›
          </button>
        </div>
        <div className="mx-auto mt-4 h-px w-36 bg-line" aria-hidden>
          <div
            className="h-px bg-gold transition-[width] duration-500"
            style={{ width: `${((current + 1) / count) * 100}%` }}
          />
        </div>

        <div ref={rail} className="album-thumbs mt-8 flex gap-2 overflow-x-auto px-1 pb-2">
          {gallery.map((photo, index) => {
            const active = index === current;
            return (
              <button
                key={photo.src}
                type="button"
                aria-label={photo.alt}
                aria-current={active ? "true" : undefined}
                className={`album-thumb ${active ? "is-active" : ""}`}
                onClick={() => setCurrent(index)}
              >
                <Image
                  src={photo.thumb}
                  alt=""
                  width={120}
                  height={160}
                  sizes="72px"
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
      <Lightbox photos={gallery} index={open} onClose={close} setIndex={setOpen} />
    </section>
  );
}
