"use client";

import { useEffect, useRef } from "react";

export function SiteMotion() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = bar.current;
    if (!node) return;
    let frame = 0;
    const paint = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      node.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };
    const markScroll = () => {
      document.documentElement.classList.toggle("is-scrolled", window.scrollY > 28);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        paint();
        markScroll();
      });
    };
    paint();
    markScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.documentElement.classList.remove("is-scrolled");
    };
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("main > section:not(#dau-trang), #chan-trang");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      nodes.forEach((node) => node.classList.add("is-seen"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-seen");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <div ref={bar} className="scroll-progress" aria-hidden />;
}
