import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";
import { displayDate, mapsHref, wedding } from "@/lib/wedding";

export function Events() {
  const date = displayDate();

  return (
    <section id="lich-trinh" className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] uppercase tracking-[0.38em] text-gold">Lịch trình</p>
            <h2 className="mt-3 font-serif text-[clamp(2.3rem,5vw,3.8rem)] leading-tight font-medium">
              Ngày trọng đại
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-muted">
              {date
                ? date
                : "Giờ lành, địa điểm nhà gái, nhà trai và tiệc cưới sẽ được điền vào đây khi hai gia đình chốt lịch."}
            </p>
            {wedding.lunarLabel.trim() ? (
              <p className="mt-2 text-sm text-muted italic">{wedding.lunarLabel.trim()}</p>
            ) : null}
            {wedding.weddingPlace.trim() ? <p className="mt-2">{wedding.weddingPlace.trim()}</p> : null}
          </div>
        </Reveal>

        {wedding.dateISO.trim() ? (
          <div className="mx-auto mt-12 max-w-xl">
            <Countdown />
          </div>
        ) : null}

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {wedding.events.map((event, index) => {
            const filled = Boolean(event.time || event.venue || event.address);
            const map = mapsHref(event.address || event.venue);
            return (
              <Reveal key={event.id} delay={index * 90}>
                <article className="flex h-full flex-col bg-paper px-7 py-8 shadow-[0_22px_50px_-38px_rgba(40,24,8,0.55)]">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-gold">{event.eyebrow}</p>
                    <span className="font-serif text-4xl leading-none text-gold/25">0{index + 1}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-3xl font-medium">{event.title}</h3>
                  <div className="mt-6 flex-1 text-sm leading-7 text-muted">
                    {filled ? (
                      <>
                        {event.time ? <p className="text-ink">{event.time}</p> : null}
                        {event.venue ? <p>{event.venue}</p> : null}
                        {event.address ? <p>{event.address}</p> : null}
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
