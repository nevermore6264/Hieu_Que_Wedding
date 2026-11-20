"use client";

import { useEffect, useState } from "react";
import { Ornament } from "@/components/Ornament";
import { wedding } from "@/lib/wedding";

const marks = [
  { top: "8%", left: "7%", size: "1.1rem", delay: "0s" },
  { top: "18%", left: "86%", size: "1.6rem", delay: "1.2s" },
  { top: "72%", left: "10%", size: "1.8rem", delay: "0.6s" },
  { top: "80%", left: "82%", size: "1.15rem", delay: "2s" },
  { top: "42%", left: "4%", size: "0.9rem", delay: "1.6s" },
  { top: "36%", left: "92%", size: "1.25rem", delay: "0.4s" },
  { top: "90%", left: "46%", size: "1rem", delay: "2.4s" },
  { top: "14%", left: "48%", size: "0.85rem", delay: "3s" },
];

export function InvitationCover() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const weddingDay = wedding.events.find((event) => event.id === "le-cuoi");
  const welcome = wedding.events.find((event) => event.id === "an-hoi");

  useEffect(() => {
    if (opened) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [opened]);

  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(() => setOpened(true), 1000);
    return () => window.clearTimeout(timer);
  }, [opening]);

  if (opened) return null;

  const open = () => {
    if (opening) return;
    window.dispatchEvent(new Event("hieu-que-open"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpened(true);
      return;
    }
    setOpening(true);
  };

  return (
    <div
      className={`cover ${opening ? "is-opening" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Thiệp mời"
      onAnimationEnd={(event) => {
        if (event.animationName === "cover-away") setOpened(true);
      }}
    >
      {marks.map((mark) => (
        <span
          key={`${mark.top}-${mark.left}`}
          className="cover-mark"
          style={{ top: mark.top, left: mark.left, fontSize: mark.size, animationDelay: mark.delay }}
          aria-hidden
        >
          囍
        </span>
      ))}

      <div className="cover-card">
        <span className="cover-watermark cover-watermark-left" aria-hidden>
          囍
        </span>
        <span className="cover-watermark cover-watermark-right" aria-hidden>
          囍
        </span>

        <div className="relative z-10 text-center text-ivory">
          <div className="cover-seal mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-2/70 font-serif text-2xl text-gold-2">
            囍
          </div>
          <p className="mt-8 font-serif text-[clamp(1.7rem,4vw,2.35rem)] leading-tight">
            {wedding.groom.name}
          </p>
          <p className="my-1 font-serif text-2xl text-gold-2 italic">&</p>
          <p className="font-serif text-[clamp(1.7rem,4vw,2.35rem)] leading-tight">{wedding.bride.name}</p>
          <Ornament className="mt-5" />
          <p className="mt-5 text-sm tracking-wide text-white/85">{weddingDay?.time || wedding.dateLabel}</p>
          {wedding.lunarLabel.trim() ? (
            <p className="mt-1 text-sm text-white/55 italic">{wedding.lunarLabel}</p>
          ) : null}
          {welcome ? (
            <p className="mt-3 text-xs tracking-wide text-white/55">
              {welcome.title} · {welcome.time.replace(/^Thứ \S+, /, "")}
            </p>
          ) : null}
          <p className="mt-5 text-[11px] uppercase tracking-[0.42em] text-gold-2">Thân mời</p>
          <button
            type="button"
            onClick={open}
            className="mt-5 inline-flex min-h-11 items-center rounded-full bg-ivory px-7 text-[13px] text-ink transition duration-300 hover:bg-gold-2"
          >
            Mở thiệp
          </button>
        </div>
      </div>
    </div>
  );
}
