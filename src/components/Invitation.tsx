import { displayDate, wedding } from "@/lib/wedding";
import { Ornament } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";

export function Invitation() {
  const date = displayDate();
  const place = wedding.weddingPlace.trim();
  const lunar = wedding.lunarLabel.trim();
  const hasPlan = Boolean(date || place);

  return (
    <section id="loi-moi" className="relative z-10 -mt-20 px-5 pb-8 md:-mt-24">
      <Reveal variant="zoom">
        <div className="mx-auto max-w-3xl border border-gold/35 bg-paper p-2 shadow-[0_30px_80px_-40px_rgba(50,30,10,0.55)]">
          <div className="border border-gold/25 px-6 py-14 text-center sm:px-12 md:py-16">
            <p className="text-[11px] uppercase tracking-[0.38em] text-gold">Lời mời</p>
            <h2 className="mt-4 font-serif text-[clamp(2.3rem,5vw,3.6rem)] leading-tight font-medium text-balance">
              Trân trọng kính mời
            </h2>
            <Ornament className="mt-6" />
            <p className="mx-auto mt-8 max-w-md text-[15px] leading-8 text-ink/85">
              Hai gia đình chúng tôi xin trân trọng kính mời quý khách đến dự lễ cưới của
            </p>
            <p className="mt-7 font-serif text-3xl md:text-4xl">{wedding.groom.name}</p>
            {wedding.groom.parents ? (
              <p className="mt-2 text-sm leading-6 text-muted">{wedding.groom.parents}</p>
            ) : null}
            <p className="my-2 font-serif text-2xl text-gold italic">&</p>
            <p className="font-serif text-3xl md:text-4xl">{wedding.bride.name}</p>
            {wedding.bride.parents ? (
              <p className="mt-2 text-sm leading-6 text-muted">{wedding.bride.parents}</p>
            ) : null}
            <p className="mx-auto mt-8 max-w-md text-[15px] leading-8">
              Sự hiện diện của quý khách là niềm vui, và là lời chúc phúc quý giá nhất mà chúng tôi mong được đón nhận.
            </p>
            {wedding.events.length ? (
              <div className="mt-8 space-y-5 text-[15px] leading-7">
                {wedding.events.map((event) => (
                  <div key={event.id}>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-gold">{event.title}</p>
                    <p className="mt-1 font-medium">{event.time}</p>
                    {event.note ? <p className="text-muted italic">{event.note}</p> : null}
                  </div>
                ))}
                {wedding.homes
                  .filter((home) => home.address.trim())
                  .map((home) => (
                    <div key={home.id}>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-gold">{home.title}</p>
                      <p className="mt-1">{home.address}</p>
                    </div>
                  ))}
                {place ? <p>{place}</p> : null}
              </div>
            ) : hasPlan ? (
              <div className="mt-8 space-y-1 text-[15px] leading-7">
                {date ? <p className="font-medium">{date}</p> : null}
                {lunar ? <p className="text-muted italic">{lunar}</p> : null}
                {place ? <p>{place}</p> : null}
              </div>
            ) : (
              <p className="mx-auto mt-8 max-w-sm text-sm leading-7 text-muted italic">
                Thời gian và địa điểm sẽ được cập nhật, rồi gửi đến quý khách trong thời gian sớm nhất.
              </p>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
