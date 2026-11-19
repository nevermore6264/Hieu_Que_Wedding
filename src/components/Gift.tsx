"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { wedding, type GiftSide } from "@/lib/wedding";

export function Gift() {
  const [copied, setCopied] = useState("");
  const [open, setOpen] = useState<GiftSide | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!wedding.gift.enabled) return null;

  const copyAccount = async (side: GiftSide) => {
    if (!side.account.trim()) return;
    await navigator.clipboard.writeText(side.account.trim());
    setCopied(side.id);
  };

  return (
    <section id="mung-cuoi" className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] uppercase tracking-[0.38em] text-gold">Mừng cưới</p>
            <h2 className="mt-3 font-serif text-[clamp(2.3rem,5vw,3.8rem)] leading-tight font-medium">
              Gửi trao yêu thương
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-muted">{wedding.gift.note}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {wedding.gift.sides.map((side, index) => {
            const ready = Boolean(side.qr.trim() || side.account.trim() || side.bank.trim() || side.owner.trim());
            return (
              <Reveal key={side.id} delay={index * 100}>
                <article className="flex h-full flex-col items-center bg-paper px-6 py-8 text-center shadow-[0_22px_50px_-38px_rgba(40,24,8,0.55)]">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-gold">{side.title}</p>
                  {side.owner.trim() ? (
                    <h3 className="mt-3 font-serif text-3xl font-medium">{side.owner}</h3>
                  ) : (
                    <h3 className="mt-3 font-serif text-3xl font-medium">{side.title === "Nhà trai" ? wedding.groom.shortName : wedding.bride.shortName}</h3>
                  )}
                  {side.qr.trim() ? (
                    <button
                      type="button"
                      className="mt-6 bg-white p-3"
                      onClick={() => setOpen(side)}
                      aria-label={`Xem lớn mã QR ${side.title}`}
                    >
                      {/* QR do gia đình tự thêm, kích thước không cố định. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={side.qr} alt={`Mã QR ${side.title}`} className="h-52 w-52 object-contain" />
                    </button>
                  ) : (
                    <div className="mt-6 grid h-52 w-52 place-items-center border border-dashed border-gold/50 bg-white px-4 text-center text-sm leading-6 text-balance text-muted">
                      Mã QR sẽ được cập nhật
                    </div>
                  )}
                  <div className="mt-6 text-sm leading-7 text-muted">
                    {side.bank.trim() ? <p className="text-ink">{side.bank}</p> : null}
                    {side.account.trim() ? <p className="font-medium tracking-wide text-ink">{side.account}</p> : null}
                    {!ready ? <p className="italic">Thông tin chuyển khoản sẽ được cập nhật</p> : null}
                  </div>
                  {side.account.trim() ? (
                    <button
                      type="button"
                      onClick={() => copyAccount(side)}
                      className="mt-5 text-[11px] uppercase tracking-[0.2em] text-gold"
                    >
                      {copied === side.id ? "Đã sao chép" : "Sao chép số tài khoản"}
                    </button>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {open?.qr ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-night/90 p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Mã QR ${open.title}`}
          onClick={() => setOpen(null)}
        >
          <div className="bg-white p-5 text-center" onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={open.qr} alt={`Mã QR ${open.title}`} className="h-[min(70vw,360px)] w-[min(70vw,360px)] object-contain" />
            <p className="mt-3 font-serif text-2xl text-ink">{open.title}</p>
            <button type="button" className="mt-3 text-[11px] uppercase tracking-[0.2em] text-gold" onClick={() => setOpen(null)}>
              Đóng
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
