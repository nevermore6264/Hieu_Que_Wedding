"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#loi-moi", label: "Lời mời" },
  { href: "#doi-uyen-uong", label: "Uyên ương" },
  { href: "#khoanh-khac", label: "Khoảnh khắc" },
  { href: "#album", label: "Album" },
  { href: "#lich-trinh", label: "Lịch trình" },
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

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? "bg-ivory/95 text-ink shadow-[0_1px_0_rgba(28,23,18,0.06)] backdrop-blur-md" : "bg-transparent text-white"
      }`}
    >
      <a
        href="#loi-moi"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
      >
        Đến nội dung
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[4.5rem]">
        <a href="#dau-trang" className="font-serif text-xl tracking-wide">
          H <span className={solid ? "italic text-gold" : "italic text-gold-2"}>&</span> Q
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Mục lục">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[11px] uppercase tracking-[0.22em] opacity-80 transition duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:opacity-100 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#tham-du"
            className={`px-4 py-2 text-[11px] uppercase tracking-[0.2em] ${
              solid ? "bg-ink text-ivory" : "bg-white text-ink"
            }`}
          >
            Tham dự
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-current transition ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span className={`absolute top-1.5 left-0 h-px w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`absolute left-0 h-px w-5 bg-current transition ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <nav className="menu-panel flex min-h-[calc(100svh-4rem)] flex-col justify-center gap-6 px-8 pb-16 lg:hidden" aria-label="Menu">
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
          <a
            href="#tham-du"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex w-fit bg-ink px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-ivory"
          >
            Xác nhận tham dự
          </a>
        </nav>
      ) : null}
    </header>
  );
}
