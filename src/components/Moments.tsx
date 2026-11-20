import Image from "next/image";
import { moments } from "@/lib/wedding";
import { Ribbon } from "@/components/Ribbon";

export function Moments() {
  return (
    <section id="khoanh-khac" className="paper-ground pb-12">
      <Ribbon>Khoảnh khắc</Ribbon>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-10 md:grid-cols-3 md:gap-8">
        {moments.map((moment) => (
          <article key={moment.index}>
            <Image
              src={moment.photo.src}
              alt={moment.photo.alt}
              width={moment.photo.width}
              height={moment.photo.height}
              sizes="440px"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <p className="mt-4 text-[11px] tracking-[0.28em] text-gold">{moment.index}</p>
            <h3 className="mt-1 font-serif text-3xl font-medium">{moment.title}</h3>
            <p className="mt-2 text-[15px] leading-7 text-muted">{moment.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
