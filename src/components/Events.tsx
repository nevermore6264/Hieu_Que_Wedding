import { Countdown } from "@/components/Countdown";
import { HomeMaps } from "@/components/HomeMaps";
import { Ribbon } from "@/components/Ribbon";
import { wedding, type Ceremony } from "@/lib/wedding";

function Calendar({ event, featured }: { event: Ceremony; featured?: boolean }) {
  const match = event.time.match(/^(.+?),\s*(\d+)\s+tháng\s+(\d+),\s*(\d+)\s*$/i);
  const place = event.venue || event.address;

  return (
    <article className="text-center">
      <p className="text-[11px] tracking-[0.32em] text-gold uppercase">{event.title}</p>
      {match ? (
        <>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="text-[11px] tracking-[0.14em] whitespace-nowrap uppercase">{match[1]}</span>
            <span className="h-12 w-px bg-gold/40" />
            <span className={`font-serif leading-none ${featured ? "text-6xl" : "text-5xl"}`}>{match[2]}</span>
            <span className="h-12 w-px bg-gold/40" />
            <span className="text-[11px] tracking-[0.14em] whitespace-nowrap uppercase">Tháng {match[3]}</span>
          </div>
          <p className="mt-3 text-sm tracking-[0.28em]">{match[4]}</p>
        </>
      ) : (
        <p className="mt-3 text-sm">{event.time}</p>
      )}
      {event.note ? <p className="mt-1 text-sm text-muted italic">{event.note}</p> : null}
      <p className="mt-2 text-sm text-muted italic">{place || "Địa điểm sẽ được cập nhật"}</p>
    </article>
  );
}

export function Events() {
  const weddingDay = wedding.events.find((event) => event.id === "le-cuoi");
  const others = wedding.events.filter((event) => event.id !== "le-cuoi");

  return (
    <section id="lich-trinh" className="bg-[#f6f1e8] pb-12">
      <Ribbon>Lịch trình</Ribbon>
      <div className="mx-auto max-w-5xl px-5 pt-10">
        <p className="text-center text-sm leading-7 text-muted">Giờ và địa điểm từng buổi sẽ được cập nhật.</p>
        {wedding.weddingPlace.trim() ? <p className="mt-2 text-center text-sm">{wedding.weddingPlace.trim()}</p> : null}

        <div className="mt-10 grid gap-12 md:grid-cols-2 md:items-start">
          {others.map((event) => (
            <Calendar key={event.id} event={event} />
          ))}
          {weddingDay ? <Calendar event={weddingDay} featured /> : null}
        </div>

        {wedding.dateISO.trim() ? (
          <div className="mt-10">
            <p className="mb-4 text-center text-[11px] tracking-[0.28em] text-gold uppercase">Đến lễ cưới</p>
            <Countdown />
          </div>
        ) : null}

        <HomeMaps />

        {wedding.timeline.length > 0 ? (
          <ol className="mt-12 border-l border-gold/40">
            {wedding.timeline.map((item) => (
              <li key={`${item.time}-${item.title}`} className="relative pb-8 pl-8 last:pb-0">
                <span className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-[#f6f1e8]" />
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
