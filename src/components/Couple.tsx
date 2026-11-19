import Image from "next/image";
import { couplePhoto, wedding } from "@/lib/wedding";
import { Ornament } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";

function Person({
  role,
  name,
  parents,
  note,
}: {
  role: string;
  name: string;
  parents: string;
  note: string;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.32em] text-gold">{role}</p>
      <h3 className="mt-2 font-serif text-4xl leading-tight font-medium md:text-5xl">{name}</h3>
      {parents ? <p className="mt-3 text-sm leading-6 text-muted">{parents}</p> : null}
      <p className="mt-3 max-w-sm text-[15px] leading-7 text-muted">{note}</p>
    </div>
  );
}

export function Couple() {
  return (
    <section id="doi-uyen-uong" className="px-5 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
        <Reveal>
          <figure className="mx-auto max-w-md bg-paper p-3 shadow-[0_28px_70px_-40px_rgba(40,24,8,0.6)] md:p-4">
            <Image
              src={couplePhoto.src}
              alt={couplePhoto.alt}
              width={couplePhoto.width}
              height={couplePhoto.height}
              sizes="(max-width: 768px) 90vw, 420px"
              className="h-auto w-full"
            />
            <figcaption className="flex items-center justify-between px-1 pt-3 text-[10px] uppercase tracking-[0.28em] text-muted">
              <span>
                {wedding.groom.shortName} & {wedding.bride.shortName}
              </span>
              <span>{wedding.photo.title}</span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-[11px] uppercase tracking-[0.38em] text-gold">Đôi uyên ương</p>
          <p className="mt-4 max-w-md font-serif text-3xl leading-snug italic md:text-4xl">
            Một chuyện tình gọi là {wedding.photo.title}.
          </p>
          <div className="mt-10">
            <Person
              role={wedding.groom.role}
              name={wedding.groom.name}
              parents={wedding.groom.parents}
              note={wedding.groom.note}
            />
          </div>
          <Ornament align="start" className="my-8" />
          <Person
            role={wedding.bride.role}
            name={wedding.bride.name}
            parents={wedding.bride.parents}
            note={wedding.bride.note}
          />
        </Reveal>
      </div>
    </section>
  );
}
