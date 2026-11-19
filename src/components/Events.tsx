import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";
import { mapsHref, wedding } from "@/lib/wedding";

export function Events() {
  return (
    <section id="lich-trinh" className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] uppercase tracking-[0.38em] text-gold">Lịch trình</p>
            <h2 className="mt-3 font-serif text-[clamp(2.3rem,5vw,3.8rem)] leading-tight font-medium">
              Dạm ngõ và lễ cưới
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-muted">
              Giờ và địa điểm từng buổi sẽ được cập nhật.
            </p>
            {wedding.weddingPlace.trim() ? <p className="mt-2">{wedding.weddingPlace.trim()}</p> : null}
          </div>
        </Reveal>

        {wedding.dateISO.trim() ? (
          <div className="mx-auto mt-12 max-w-xl">
            <p className="mb-4 text-center text-[11px] uppercase tracking-[0.28em] text-gold">Đến lễ cưới</p>
            <Countdown />
          </div>
        ) : null}

        <div
          className={`mx-auto mt-14 grid max-w-4xl gap-5 ${
            wedding.events.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          {wedding.events.map((event, index) => {
            const filled = Boolean(event.time || event.venue || event.address);
            const map = mapsHref(event.address || event.venue);
            return (
              <Reveal key={event.id} delay={index * 90}>
                <article className="flex h-full flex-col bg-paper px-7 py-8 shadow-[0_22px_50px_-38px_rgba(40,24,8,0.55)] transition duration-500 hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-gold">{event.eyebrow}</p>
                    <span className="font-serif text-4xl leading-none text-gold/25">0{index + 1}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-3xl font-medium">{event.title}</h3>
                  <div className="mt-6 flex-1 text-sm leading-7 text-muted">
                    {filled ? (
                      <>
                        {event.time ? <p className="text-ink">{event.time}</p> : null}
                        {event.note ? <p className="italic">{event.note}</p> : null}
                        {event.venue ? <p>{event.venue}</p> : null}
                        {event.address ? <p>{event.address}</p> : null}
                        {!event.venue && !event.address ? (
                          <p className="italic">Địa điểm sẽ được cập nhật</p>
                        ) : null}
                      </>
                    ) : (
                      <p className="italic">Thông tin sẽ được cập nhật</p>
                    )}
                  </div>
                  {map ? (
                    <a
                      href={map}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 text-[11px] uppercase tracking-[0.2em] text-gold"
                    >
                      Xem bản đồ
                    </a>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>

        {wedding.timeline.length > 0 ? (
          <ol className="mx-auto mt-16 max-w-xl border-l border-gold/40">
            {wedding.timeline.map((item) => (
              <li key={`${item.time}-${item.title}`} className="relative pb-10 pl-8 last:pb-0">
                <span className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-ivory" />
                <p className="text-xs tracking-[0.2em] text-gold">{item.time}</p>
                <h3 className="mt-1 font-serif text-2xl">{item.title}</h3>
                {item.detail ? <p className="mt-1 text-sm leading-6 text-muted">{item.detail}</p> : null}
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}
