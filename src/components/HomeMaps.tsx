"use client";

import { useState } from "react";
import { mapsEmbed, wedding } from "@/lib/wedding";

export function HomeMaps() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openHome = wedding.homes.find((home) => home.id === openId);
  const embed = openHome ? mapsEmbed(openHome.address, openHome.map) : "";

  return (
    <div className="mt-12 border-t border-gold/30 pt-8">
      <div className="grid grid-cols-2 gap-3">
        {wedding.homes.map((home) => {
          const map = mapsEmbed(home.address, home.map);
          const open = openId === home.id;
          return (
            <article key={home.id} className="px-1 text-center">
              <p className="text-[11px] tracking-[0.28em] text-gold uppercase">{home.title}</p>
              {home.address ? (
                <p className="mt-3 text-sm leading-6">{home.address}</p>
              ) : (
                <p className="mt-3 text-sm leading-6 text-muted italic">Địa chỉ sẽ được cập nhật</p>
              )}
              {map ? (
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : home.id)}
                  className="mt-4 text-[11px] tracking-[0.18em] text-gold uppercase"
                >
                  {open ? "Đóng bản đồ" : "Xem bản đồ"}
                </button>
              ) : null}
            </article>
          );
        })}
      </div>
      {openHome && embed ? (
        <iframe
          title={`Bản đồ ${openHome.title}`}
          src={embed}
          className="mt-5 h-72 w-full border border-gold/30"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : null}
    </div>
  );
}
