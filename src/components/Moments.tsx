import Image from "next/image";
import { moments } from "@/lib/wedding";
import { Reveal } from "@/components/Reveal";

export function Moments() {
  return (
    <section id="khoanh-khac" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] uppercase tracking-[0.38em] text-gold">Câu chuyện trong ảnh</p>
            <h2 className="mt-3 font-serif text-[clamp(2.3rem,5vw,3.8rem)] leading-tight font-medium text-balance">
              Những điều giản dị
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-muted">
              Ba khoảnh khắc chúng tôi muốn giữ lại.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
          {moments.map((moment, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                key={moment.index}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
              >
                <Reveal variant="wipe" className={reversed ? "md:order-2" : ""}>
                  <Image
                    src={moment.photo.src}
                    alt={moment.photo.alt}
                    width={moment.photo.width}
                    height={moment.photo.height}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="h-auto w-full"
                  />
                </Reveal>
                <Reveal variant={reversed ? "left" : "right"} delay={140} className={reversed ? "md:order-1" : ""}>
                  <p className="font-serif text-5xl text-gold/35">{moment.index}</p>
                  <h3 className="mt-2 font-serif text-4xl font-medium">{moment.title}</h3>
                  <p className="mt-4 max-w-md text-[15px] leading-8 text-muted">{moment.text}</p>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
