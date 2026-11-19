"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  };

  return (
    <footer className="bg-night px-5 py-16 text-center text-ivory">
      <Reveal variant="zoom">
      <p className="font-serif text-4xl">
        H <span className="text-gold-2 italic">&</span> Q
      </p>
      <p className="mt-3 font-serif text-xl text-white/85">
        {wedding.groom.name}
        <span className="mx-2 text-gold-2">·</span>
        {wedding.bride.name}
      </p>
      <button
        type="button"
        onClick={copyLink}
        className="mt-8 text-[11px] uppercase tracking-[0.22em] text-gold-2"
      >
        {copied ? "Đã sao chép liên kết thiệp" : "Sao chép liên kết thiệp"}
      </button>
      <p className="mt-10 text-xs leading-6 text-white/40">
        Nhạc nền: {wedding.music.title} — {wedding.music.credit}. CC BY 4.0.
      </p>
      <p className="mt-6 text-xs text-white/35">Với tất cả yêu thương</p>
      </Reveal>
    </footer>
  );
}
