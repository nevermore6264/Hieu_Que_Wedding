"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Ornament } from "@/components/Ornament";
import { wedding } from "@/lib/wedding";

const marks = [
  { top: "7%", left: "6%", size: "2.6rem", delay: "0s", duration: "15s", dx: "22px", dy: "-42px", spin: "10deg" },
  { top: "16%", left: "78%", size: "3.2rem", delay: "-4s", duration: "18s", dx: "-26px", dy: "-34px", spin: "-8deg" },
  { top: "28%", left: "18%", size: "1.7rem", delay: "-7s", duration: "13s", dx: "16px", dy: "-28px", spin: "14deg" },
  { top: "34%", left: "90%", size: "2.1rem", delay: "-2s", duration: "17s", dx: "-18px", dy: "-46px", spin: "6deg" },
  { top: "48%", left: "3%", size: "2.8rem", delay: "-9s", duration: "19s", dx: "20px", dy: "-30px", spin: "-12deg" },
  { top: "58%", left: "88%", size: "1.8rem", delay: "-5s", duration: "14s", dx: "-14px", dy: "-38px", spin: "9deg" },
  { top: "70%", left: "12%", size: "3.4rem", delay: "-11s", duration: "20s", dx: "24px", dy: "-32px", spin: "-7deg" },
  { top: "78%", left: "70%", size: "2.2rem", delay: "-3s", duration: "16s", dx: "-22px", dy: "-40px", spin: "11deg" },
  { top: "88%", left: "40%", size: "1.9rem", delay: "-8s", duration: "15s", dx: "12px", dy: "-26px", spin: "-9deg" },
  { top: "12%", left: "42%", size: "1.5rem", delay: "-6s", duration: "12s", dx: "-10px", dy: "-22px", spin: "7deg" },
  { top: "62%", left: "46%", size: "1.4rem", delay: "-1s", duration: "18s", dx: "18px", dy: "-24px", spin: "-6deg" },
  { top: "22%", left: "58%", size: "1.6rem", delay: "-10s", duration: "21s", dx: "14px", dy: "-36px", spin: "12deg" },
];

export function InvitationCover() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const weddingDay = wedding.events.find((event) => event.id === "le-cuoi");
  const welcome = wedding.events.find((event) => event.id === "an-hoi");

  useEffect(() => {
    if (opened) return;
    const root = document.documentElement;
    const previousHtml = root.style.overflow;
    const previousBody = document.body.style.overflow;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousHtml;
      document.body.style.overflow = previousBody;
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
          style={
            {
              top: mark.top,
              left: mark.left,
              fontSize: mark.size,
              animationDelay: mark.delay,
              animationDuration: mark.duration,
              "--dx": mark.dx,
              "--dy": mark.dy,
              "--spin": mark.spin,
            } as CSSProperties
          }
          aria-hidden
        >
          囍
        </span>
      ))}

      <div className="cover-card">
        <span className="cover-watermark-float is-left" aria-hidden>
          <span className="cover-watermark">囍</span>
        </span>
        <span className="cover-watermark-float is-right" aria-hidden>
          <span className="cover-watermark">囍</span>
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
          <button type="button" onClick={open} className="cover-open">
            <span className="cover-open-ring" aria-hidden />
            <span className="cover-open-ring is-late" aria-hidden />
            Mở thiệp
          </button>
        </div>
      </div>
    </div>
  );
}
