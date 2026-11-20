"use client";

import { useEffect, useState } from "react";

export function PageLoader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wait = reduce ? 0 : 880;
    const fade = window.setTimeout(() => setDone(true), wait);
    const remove = window.setTimeout(() => setGone(true), wait + (reduce ? 0 : 620));
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(remove);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`page-loader ${done ? "is-done" : ""}`} role="status" aria-live="polite" aria-label="Đang mở thiệp">
      <p className="page-loader-seal" aria-hidden>
        囍
      </p>
      <p className="page-loader-names">Hiếu & Quế</p>
    </div>
  );
}
