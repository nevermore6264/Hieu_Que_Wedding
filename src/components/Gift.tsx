"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Ribbon } from "@/components/Ribbon";
import { wedding, type GiftSide } from "@/lib/wedding";

export function Gift() {
  const [copied, setCopied] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!wedding.gift.enabled) return null;

  const copyAccount = async (side: GiftSide) => {
    if (!side.account.trim()) return;
    await navigator.clipboard.writeText(side.account.trim());
    setCopied(side.id);
  };

  const dialog = (
    <div className="gift-backdrop" role="presentation" onClick={() => setOpen(false)}>
      <div
        className="gift-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hop-qua-mung"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="gift-panel-head">
          <h3 id="hop-qua-mung">Hộp quà mừng</h3>
          <button type="button" className="gift-close" aria-label="Đóng" onClick={() => setOpen(false)}>
            ×
          </button>
        </header>
        <div className="gift-sides">
          {wedding.gift.sides.map((side) => (
            <article key={side.id} className="gift-side">
              <h4>{side.title}</h4>
              {side.qr.trim() ? (
                <div className="gift-qr">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={side.qr} alt={`Mã QR ${side.title}`} />
                </div>
              ) : (
                <div className="gift-qr grid h-44 w-44 place-items-center px-4 text-sm leading-6 text-muted">
                  Mã QR sẽ được cập nhật
                </div>
              )}
              <div className="mt-4 text-sm leading-6 text-ink">
                {side.bank.trim() ? <p>{side.bank}</p> : null}
                {side.account.trim() ? <p className="font-medium tracking-wide">{side.account}</p> : null}
                {side.owner.trim() ? <p className="mt-1">{side.owner}</p> : null}
              </div>
              {side.qr.trim() ? (
                <a className="gift-save" href={side.qr} download={`qr-${side.id}.png`}>
                  <span aria-hidden>↓</span>
                  Lưu QR
                </a>
              ) : null}
              {side.account.trim() ? (
                <button type="button" className="gift-save" onClick={() => copyAccount(side)}>
                  {copied === side.id ? "Đã sao chép" : "Sao chép số tài khoản"}
                </button>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section id="mung-cuoi" className="paper-ground pb-16">
      <Ribbon>Mừng cưới</Ribbon>
      <div className="mx-auto max-w-3xl px-5 pb-4 text-center">
        <button type="button" className="gift-open" aria-label="Mở hộp mừng cưới" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
          <GiftBox />
          <span className="gift-hint">Nhấn để mở</span>
        </button>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-muted">{wedding.gift.note}</p>
      </div>
      {open ? createPortal(dialog, document.body) : null}
    </section>
  );
}

function GiftBox() {
  return (
    <svg className="gift-art" viewBox="0 0 360 390" aria-hidden="true">
      <ellipse cx="180" cy="352" rx="108" ry="14" fill="#8e2f2b" opacity="0.12" />
      <MiniGift x={78} y={78} delay="0s" face="#f7f1e6" ribbon="#8e2f2b" />
      <Sparkle x={118} y={68} delay="0.2s" />
      <MiniGift x={236} y={62} delay="0.8s" face="#e7efe4" ribbon="#6e8f62" />
      <Sparkle x={292} y={92} delay="1.1s" />
      <MiniGift x={42} y={168} delay="0.4s" face="#8e2f2b" ribbon="#f3eee6" />
      <MiniGift x={286} y={176} delay="1.4s" face="#f7f1e6" ribbon="#c6aa74" />
      <MiniGift x={70} y={250} delay="0.6s" face="#f4efe4" ribbon="#8f7044" />
      <MiniGift x={96} y={278} delay="1.6s" face="#e7efe4" ribbon="#6e8f62" />
      <MiniGift x={262} y={268} delay="1s" face="#f6e4e2" ribbon="#8e2f2b" />

      <g filter="url(#gift-shade)">
        <polygon points="236,188 278,164 278,292 236,316" fill="#eadcc8" />
        <polygon points="92,188 236,188 236,316 92,316" fill="#f8f3ea" />
        <polygon points="92,168 236,168 278,144 134,144" fill="#fbf7f1" />
        <polygon points="92,168 236,168 236,188 92,188" fill="#f0e4d4" />
        <polygon points="152,188 176,188 176,316 152,316" fill="#8e2f2b" />
        <polygon points="92,236 236,236 236,258 92,258" fill="#8e2f2b" />
        <polygon points="236,236 278,212 278,234 236,258" fill="#6d2420" />
        <polygon points="152,168 176,168 192,144 168,144" fill="#8e2f2b" />
        <polygon points="134,156 278,156 278,168 236,180 92,180 92,168" fill="#a34742" opacity="0.95" />
      </g>

      <g>
        <path d="M164 146C146 146 112 124 124 104c10-16 34-8 40 22" fill="#8e2f2b" />
        <path d="M164 142C150 138 128 124 136 112c6-8 20-2 28 16" fill="#a85a54" />
        <path d="M164 146C182 146 216 124 204 104c-10-16-34-8-40 22" fill="#8e2f2b" />
        <path d="M164 142C178 138 200 124 192 112c-6-8-20-2-28 16" fill="#a85a54" />
        <path d="M154 152c-6 28-16 48-28 58" fill="none" stroke="#8e2f2b" strokeWidth="11" strokeLinecap="round" />
        <path d="M174 152c6 28 18 46 32 54" fill="none" stroke="#8e2f2b" strokeWidth="11" strokeLinecap="round" />
        <circle cx="164" cy="148" r="11" fill="#6d2420" />
        <circle cx="164" cy="148" r="4.5" fill="#c6aa74" />
      </g>

      <circle cx="164" cy="286" r="22" fill="#f8f3ea" stroke="#b08950" strokeWidth="2" />
      <circle cx="164" cy="286" r="17" fill="none" stroke="#8e2f2b" strokeWidth="1" />
      <text x="164" y="293" textAnchor="middle" fill="#8e2f2b" fontSize="16" fontFamily="serif">
        囍
      </text>

      <Sparkle x={214} y={118} delay="0.5s" />
      <defs>
        <filter id="gift-shade" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="6" floodColor="#3a2416" floodOpacity="0.16" />
        </filter>
      </defs>
    </svg>
  );
}

function MiniGift({
  x,
  y,
  delay,
  face,
  ribbon,
}: {
  x: number;
  y: number;
  delay: string;
  face: string;
  ribbon: string;
}) {
  return (
    <g className="gift-float" style={{ animationDelay: delay }}>
      <g transform={`translate(${x} ${y}) scale(0.72)`}>
        <rect x="0" y="16" width="52" height="36" rx="3" fill={face} stroke="#e4d3bc" strokeWidth="1" />
        <rect x="0" y="6" width="52" height="14" rx="2" fill="#fbf7f1" stroke="#e4d3bc" strokeWidth="1" />
        <rect x="22" y="6" width="8" height="46" fill={ribbon} />
        <rect x="0" y="28" width="52" height="7" fill={ribbon} />
        <circle cx="26" cy="7" r="5" fill={ribbon} />
      </g>
    </g>
  );
}

function Sparkle({ x, y, delay }: { x: number; y: number; delay: string }) {
  return (
    <text className="gift-spark" x={x} y={y} fill="#c6aa74" fontSize="16" style={{ animationDelay: delay }}>
      ✦
    </text>
  );
}
