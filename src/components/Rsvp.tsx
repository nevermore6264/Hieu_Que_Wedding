"use client";

import { FormEvent, useEffect, useState } from "react";
import { Ornament } from "@/components/Ornament";
import { Ribbon } from "@/components/Ribbon";
import { wedding, zaloHref } from "@/lib/wedding";

type Attendance = "yes" | "no" | "later";

type Entry = {
  id: string;
  name: string;
  phone: string;
  attendance: Attendance;
  guests: number;
  events: string[];
  message: string;
  createdAt: string;
};

const STORAGE_KEY = "hieu-que-rsvp";

const attendanceLabel: Record<Attendance, string> = {
  yes: "Sẽ đến",
  no: "Chưa sắp xếp được",
  later: "Sẽ trả lời sau",
};

function readEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Entry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function Rsvp() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [ready, setReady] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("yes");
  const [guests, setGuests] = useState(1);
  const [events, setEvents] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [latest, setLatest] = useState<Entry | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setEntries(readEntries());
    setReady(true);
  }, []);

  const toggleEvent = (id: string) => {
    setEvents((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const summaryOf = (entry: Entry) => {
    const chosen = wedding.events
      .filter((event) => entry.events.includes(event.id))
      .map((event) => event.time || event.title)
      .join(", ");
    return [
      `Xác nhận tham dự ${wedding.groom.shortName} & ${wedding.bride.shortName}`,
      `Họ tên: ${entry.name}`,
      entry.phone ? `Điện thoại: ${entry.phone}` : "",
      `Tham dự: ${attendanceLabel[entry.attendance]}`,
      entry.attendance === "yes" ? `Số người: ${entry.guests}` : "",
      chosen ? `Buổi lễ: ${chosen}` : "",
      entry.message ? `Lời chúc: ${entry.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Quý khách cho biết họ tên để hai gia đình còn ghi nhận.");
      return;
    }
    const entry: Entry = {
      id: `${Date.now()}`,
      name: trimmed,
      phone: phone.trim(),
      attendance,
      guests: attendance === "yes" ? guests : 0,
      events,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    const next = [entry, ...entries].slice(0, 30);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setEntries(next);
    setLatest(entry);
    setCopied(false);
    setError("");
    setName("");
    setPhone("");
    setMessage("");
    setEvents([]);
    setGuests(1);
    setAttendance("yes");
  };

  const copyLatest = async () => {
    if (!latest) return;
    await navigator.clipboard.writeText(summaryOf(latest));
    setCopied(true);
  };

  const groomZalo = zaloHref(wedding.contact.groomPhone);
  const brideZalo = zaloHref(wedding.contact.bridePhone);
  const wishes = entries.filter((entry) => entry.message);
  const fieldClass =
    "mt-2 w-full border-0 border-b border-gold/35 bg-transparent py-3 font-serif text-2xl outline-none focus:border-gold";

  return (
    <section id="tham-du" className="bg-[#f6f1e8] pb-16">
      <Ribbon>Tham dự</Ribbon>
      <div className="mx-auto grid max-w-[1180px] gap-5 px-4 pt-8 md:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <aside className="relative overflow-hidden bg-night px-7 py-10 text-ivory md:px-10">
          <div className="pointer-events-none absolute inset-3 border border-white/10" aria-hidden />
          <p className="pointer-events-none absolute -top-8 right-1 font-serif text-[9rem] leading-none text-white/[0.07]" aria-hidden>
            囍
          </p>
          <div className="relative">
            <p className="text-[11px] tracking-[0.38em] text-gold-2 uppercase">Lời hồi đáp</p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.05] font-medium md:text-5xl">
              Cho chúng tôi biết quý khách sẽ đến
            </h2>
            <p className="mt-4 font-serif text-3xl">
              {wedding.groom.shortName} <span className="text-gold-2 italic">&</span> {wedding.bride.shortName}
            </p>
            <Ornament className="mt-6" align="start" />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              Lời xác nhận được lưu trên trình duyệt này. Hãy sao chép và gửi qua Zalo để hai gia đình nhận được.
            </p>
            {(groomZalo || brideZalo) && (
              <div className="mt-5 flex flex-wrap gap-4">
                {groomZalo ? (
                  <a href={groomZalo} className="text-[11px] tracking-[0.18em] text-gold-2 uppercase" target="_blank" rel="noreferrer">
                    Zalo chú rể
                  </a>
                ) : null}
                {brideZalo ? (
                  <a href={brideZalo} className="text-[11px] tracking-[0.18em] text-gold-2 uppercase" target="_blank" rel="noreferrer">
                    Zalo cô dâu
                  </a>
                ) : null}
              </div>
            )}
          </div>
          <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
            {wedding.events.map((item) => {
              const parts = item.time.match(/^(.*?),\s*(\d+)\s+tháng\s+(\d+),\s*(\d+)/i);
              return (
                <div key={item.id} className="border border-white/15 px-4 py-4">
                  <p className="text-[11px] tracking-[0.28em] text-gold-2 uppercase">{item.eyebrow}</p>
                  {parts ? (
                    <p className="mt-2 flex items-end gap-3">
                      <span className="font-serif text-5xl leading-none">{parts[2]}</span>
                      <span className="pb-1 text-sm text-white/70">
                        tháng {parts[3]}
                        <span className="mt-0.5 block text-white/45">{parts[1]}</span>
                      </span>
                    </p>
                  ) : (
                    <p className="mt-2 font-serif text-2xl">{item.title}</p>
                  )}
                  {item.note ? <p className="mt-2 text-sm text-white/55 italic">{item.note}</p> : null}
                </div>
              );
            })}
          </div>
        </aside>

        <form onSubmit={onSubmit} className="border border-gold/40 bg-paper p-2" noValidate>
          <div className="border border-gold/20 px-5 py-7 md:px-7">
            <label className="block text-[11px] tracking-[0.28em] text-gold uppercase" htmlFor="rsvp-name">
              Họ và tên
            </label>
            <input id="rsvp-name" value={name} onChange={(event) => setName(event.target.value)} className={fieldClass} autoComplete="name" />

            <label className="mt-7 block text-[11px] tracking-[0.28em] text-gold uppercase" htmlFor="rsvp-phone">
              Số điện thoại
            </label>
            <input
              id="rsvp-phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={fieldClass}
              inputMode="tel"
              autoComplete="tel"
            />

            <fieldset className="mt-8">
              <legend className="text-[11px] tracking-[0.28em] text-gold uppercase">Quý khách</legend>
              <div className="mt-3 grid gap-2">
                {(
                  [
                    ["yes", "Sẽ đến chung vui"],
                    ["later", "Sẽ trả lời sau"],
                    ["no", "Rất tiếc, chưa sắp xếp được"],
                  ] as const
                ).map(([value, label]) => {
                  const selected = attendance === value;
                  return (
                    <label
                      key={value}
                      className={`flex cursor-pointer items-center justify-between gap-3 border px-4 py-3 transition ${
                        selected ? "border-gold bg-[#f8f1e4]" : "border-line hover:border-gold/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        checked={selected}
                        onChange={() => setAttendance(value)}
                        className="sr-only"
                      />
                      <span className="font-serif text-xl">{label}</span>
                      <span className={`h-2.5 w-2.5 rotate-45 ${selected ? "bg-gold" : "border border-gold/40"}`} aria-hidden />
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {attendance === "yes" ? (
              <fieldset className="mt-7">
                <legend className="text-[11px] tracking-[0.28em] text-gold uppercase">Số người đến</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6].map((count) => {
                    const selected = guests === count;
                    return (
                      <label
                        key={count}
                        className={`grid h-11 w-11 cursor-pointer place-items-center border font-serif text-xl transition ${
                          selected ? "border-gold bg-ink text-ivory" : "border-line text-ink hover:border-gold/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="guests"
                          checked={selected}
                          onChange={() => setGuests(count)}
                          className="sr-only"
                        />
                        {count}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ) : null}

            <fieldset className="mt-8">
              <legend className="text-[11px] tracking-[0.28em] text-gold uppercase">Buổi lễ dự kiến tham dự</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {wedding.events.map((item) => {
                  const selected = events.includes(item.id);
                  return (
                    <label
                      key={item.id}
                      className={`cursor-pointer border px-4 py-4 transition ${
                        selected ? "border-gold bg-[#f8f1e4]" : "border-line hover:border-gold/50"
                      }`}
                    >
                      <input type="checkbox" checked={selected} onChange={() => toggleEvent(item.id)} className="sr-only" />
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-[11px] tracking-[0.22em] text-gold uppercase">{item.eyebrow}</span>
                        <span className={`h-2.5 w-2.5 rotate-45 ${selected ? "bg-gold" : "border border-gold/40"}`} aria-hidden />
                      </span>
                      <span className="mt-2 block font-serif text-2xl">{item.title}</span>
                      <span className="mt-1 block text-sm text-muted">{item.time}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <label className="mt-8 block text-[11px] tracking-[0.28em] text-gold uppercase" htmlFor="rsvp-message">
              Lời chúc
            </label>
            <textarea
              id="rsvp-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={4}
              className="mt-3 w-full resize-y border border-gold/25 bg-ivory/70 px-4 py-3 font-serif text-xl outline-none focus:border-gold"
            />

            {error ? <p className="mt-4 text-sm text-[#8a3d32]">{error}</p> : null}

            <button
              type="submit"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center bg-ink text-[11px] tracking-[0.28em] text-ivory uppercase transition hover:bg-gold"
            >
              Gửi lời xác nhận
            </button>

            {latest ? (
              <div className="mt-6 border border-gold/35 bg-[#f8f1e4] px-4 py-4 text-sm leading-7">
                <p className="font-serif text-2xl">Cảm ơn {latest.name}.</p>
                <p className="mt-1 text-muted">
                  {attendanceLabel[latest.attendance]}
                  {latest.attendance === "yes" ? ` · ${latest.guests} người` : ""}
                  {latest.message ? ` · “${latest.message}”` : ""}
                </p>
                <button type="button" onClick={copyLatest} className="mt-3 text-[11px] tracking-[0.18em] text-gold uppercase">
                  {copied ? "Đã sao chép nội dung" : "Sao chép để gửi qua Zalo"}
                </button>
              </div>
            ) : null}
          </div>
        </form>
      </div>

      {ready && wishes.length > 0 ? (
        <div className="mx-auto mt-12 max-w-[1180px] px-4 md:px-8">
          <p className="text-center text-[11px] tracking-[0.38em] text-gold uppercase">Lời chúc trên máy này</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {wishes.map((entry) => (
              <blockquote key={entry.id} className="border border-line bg-paper px-6 py-6">
                <p className="font-serif text-2xl leading-snug">“{entry.message}”</p>
                <footer className="mt-4 text-[11px] tracking-[0.22em] text-gold uppercase">{entry.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
