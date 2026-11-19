"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Photo } from "@/lib/wedding";

export function Lightbox({
  photos,
  index,
  onClose,
  setIndex,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  setIndex: (index: number) => void;
}) {
  const startX = useRef(0);

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((index + 1) % photos.length);
      if (event.key === "ArrowLeft") setIndex((index - 1 + photos.length) % photos.length);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onClose, photos.length, setIndex]);

  if (index === null) return null;
  const photo = photos[index];
  if (!photo) return null;

  const go = (direction: number) => {
    setIndex((index + direction + photos.length) % photos.length);
  };

  return createPortal(
    <div
      className="lightbox-backdrop fixed inset-0 z-[80] flex items-center justify-center bg-night/95 p-4 text-white"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
      onTouchStart={(event) => {
        startX.current = event.changedTouches[0]?.clientX ?? 0;
      }}
      onTouchEnd={(event) => {
        const endX = event.changedTouches[0]?.clientX ?? 0;
        const delta = endX - startX.current;
        if (delta > 48) go(-1);
        if (delta < -48) go(1);
      }}
    >
      <button
        type="button"
        className="absolute top-4 right-4 z-10 px-3 py-2 text-[11px] uppercase tracking-[0.22em]"
        onClick={onClose}
      >
        Đóng
      </button>
      <button
        type="button"
        className="absolute top-1/2 left-2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 text-2xl sm:flex"
        aria-label="Ảnh trước"
        onClick={(event) => {
          event.stopPropagation();
          go(-1);
        }}
      >
        ‹
      </button>
      <button
        type="button"
        className="absolute top-1/2 right-2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 text-2xl sm:flex"
        aria-label="Ảnh sau"
        onClick={(event) => {
          event.stopPropagation();
          go(1);
        }}
      >
        ›
      </button>
      <figure key={photo.src} className="lightbox-frame max-h-[86vh] max-w-6xl" onClick={(event) => event.stopPropagation()}>
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="100vw"
          className="mx-auto max-h-[78vh] w-auto max-w-full object-contain"
        />
        <figcaption className="mt-3 text-center text-xs tracking-[0.18em] text-white/70">
          {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          <span className="mx-2">·</span>
          {photo.alt}
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}
