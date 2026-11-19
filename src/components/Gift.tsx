"use client";

import { useState } from "react";
import { wedding } from "@/lib/wedding";

export function Gift() {
  const [copied, setCopied] = useState(false);
  if (!wedding.gift.enabled) return null;

  const copyAccount = async () => {
    if (!wedding.gift.account) return;
    await navigator.clipboard.writeText(wedding.gift.account);
    setCopied(true);
  };

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-xl border border-line bg-paper px-7 py-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.38em] text-gold">Mừng cưới</p>
        <h2 className="mt-3 font-serif text-4xl font-medium">Gửi trao yêu thương</h2>
        <p className="mt-4 text-sm leading-7 text-muted">{wedding.gift.note}</p>
        <dl className="mt-8 space-y-2 text-sm">
          {wedding.gift.bank ? (
            <div>
              <dt className="text-[11px] uppercase tracking-[0.2em] text-muted">Ngân hàng</dt>
              <dd className="mt-1">{wedding.gift.bank}</dd>
            </div>
          ) : null}
          {wedding.gift.owner ? (
            <div>
              <dt className="mt-3 text-[11px] uppercase tracking-[0.2em] text-muted">Chủ tài khoản</dt>
              <dd className="mt-1">{wedding.gift.owner}</dd>
            </div>
          ) : null}
          {wedding.gift.account ? (
            <div>
              <dt className="mt-3 text-[11px] uppercase tracking-[0.2em] text-muted">Số tài khoản</dt>
              <dd className="mt-1 font-medium tracking-wide">{wedding.gift.account}</dd>
            </div>
          ) : null}
        </dl>
        {wedding.gift.account ? (
          <button
            type="button"
            onClick={copyAccount}
            className="mt-8 inline-flex min-h-11 items-center border border-ink px-5 text-[11px] uppercase tracking-[0.2em]"
          >
            {copied ? "Đã sao chép" : "Sao chép số tài khoản"}
          </button>
        ) : null}
      </div>
    </section>
  );
}
