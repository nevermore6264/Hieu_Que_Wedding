"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";

type Parts = {
  past: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function split(target: number, now: number): Parts {
  const diff = target - now;
  if (diff <= 0) {
    return { past: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const total = Math.floor(diff / 1000);
  return {
    past: false,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export function Countdown() {
  const iso = wedding.dateISO.trim();
  const target = iso ? new Date(iso).getTime() : NaN;
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    if (!iso || Number.isNaN(target)) return;
    const tick = () => setParts(split(target, Date.now()));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [iso, target]);

  if (!iso || Number.isNaN(target)) return null;
  if (!parts) return <div className="h-28" aria-hidden />;
  if (parts.past) {
    return <p className="text-center font-serif text-3xl">Ngày trọng đại đã đến.</p>;
  }

  const units = [
    ["Ngày", parts.days],
    ["Giờ", parts.hours],
    ["Phút", parts.minutes],
    ["Giây", parts.seconds],
  ] as const;

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {units.map(([label, value]) => (
        <div key={label} className="bg-paper px-2 py-4 text-center">
          <p className="font-serif text-3xl tabular-nums md:text-4xl">
            {label === "Ngày" ? value : String(value).padStart(2, "0")}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted">{label}</p>
        </div>
      ))}
    </div>
  );
}
