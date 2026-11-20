"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#loi-moi", label: "Lời mời" },
  { href: "#doi-uyen-uong", label: "Uyên ương" },
  { href: "#khoanh-khac", label: "Khoảnh khắc" },
  { href: "#album", label: "Album" },
  { href: "#lich-trinh", label: "Lịch trình" },
  { href: "#tham-du", label: "Tham dự" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 w-full text-ink ${
        open ? "h-svh bg-[#f6f1e8]" : scrolled ? "bg-[#f6f1e8]/95 shadow-[0_1px_0_rgba(28,23,18,0.06)] backdrop-blur-md" : ""
      }`}
    >
      <a
        href="#loi-moi"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
      >
        Đến nội dung
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#dau-trang" className="font-serif text-xl tracking-wide" onClick={() => setOpen(false)}>
          H <span className="text-gold italic">&</span> Q
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Mục lục">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[0.22em] uppercase opacity-80 transition hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 h-px w-5 bg-current transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute top-1.5 left-0 h-px w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-px w-5 bg-current transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {open ? (
        <nav className="menu-panel mx-auto flex w-full max-w-6xl flex-col gap-5 px-8 pt-8 lg:hidden" aria-label="Mục lục">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="menu-link font-serif text-4xl"
              style={{ animationDelay: `${index * 70}ms` }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
