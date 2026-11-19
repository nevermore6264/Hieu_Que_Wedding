"use client";

import { useEffect, useRef, useState } from "react";

export function SiteMotion() {
  const bar = useRef<HTMLDivElement>(null);
  const [wipe, setWipe] = useState(0);

  useEffect(() => {
    const node = bar.current;
    if (!node) return;
    let frame = 0;
    const paint = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      node.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sections = [...document.querySelectorAll("main > section")];
    let current = "";
    let armed = false;
    const arm = window.setTimeout(() => {
      armed = true;
    }, 800);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit) return;
        const id = hit.target.id || "scene";
        if (id === current) return;
        current = id;
        if (!armed) return;
        setWipe((value) => value + 1);
      },
      { threshold: [0.42, 0.62] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.clearTimeout(arm);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={bar} className="scroll-progress" aria-hidden />
      {wipe > 0 ? <span key={wipe} className="scene-wipe" aria-hidden /> : null}
    </>
  );
}
