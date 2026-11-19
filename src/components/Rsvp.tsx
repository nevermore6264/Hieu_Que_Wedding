"use client";

import { FormEvent, useEffect, useState } from "react";
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
      .map((event) => event.title)
      .join(", ");
    return [
      `Xác nhận tham dự lễ cưới ${wedding.groom.shortName} & ${wedding.bride.shortName}`,
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

  return (
    <section id="tham-du" className="px-5 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <p className="text-[11px] uppercase tracking-[0.38em] text-gold">Tham dự</p>
          <h2 className="mt-3 font-serif text-[clamp(2.3rem,5vw,3.8rem)] leading-tight font-medium">
            Cho chúng tôi biết quý khách sẽ đến
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-muted">
            Lời xác nhận được lưu trên trình duyệt này. Hãy sao chép và gửi qua Zalo để hai gia đình nhận được.
          </p>
          {(groomZalo || brideZalo) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {groomZalo ? (
                <a href={groomZalo} className="text-[11px] uppercase tracking-[0.18em] text-gold" target="_blank" rel="noreferrer">
                  Zalo chú rể
                </a>
              ) : null}
              {brideZalo ? (
                <a href={brideZalo} className="text-[11px] uppercase tracking-[0.18em] text-gold" target="_blank" rel="noreferrer">
                  Zalo cô dâu
                </a>
              ) : null}
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="border border-line bg-paper px-6 py-8 sm:px-8" noValidate>
          <label className="block text-[11px] uppercase tracking-[0.2em] text-muted" htmlFor="rsvp-name">
            Họ và tên
          </label>
          <input
            id="rsvp-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full border-0 border-b border-ink/20 bg-transparent py-3 outline-none focus:border-gold"
            autoComplete="name"
          />

          <label className="mt-6 block text-[11px] uppercase tracking-[0.2em] text-muted" htmlFor="rsvp-phone">
            Số điện thoại
          </label>
          <input
            id="rsvp-phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-2 w-full border-0 border-b border-ink/20 bg-transparent py-3 outline-none focus:border-gold"
            inputMode="tel"
            autoComplete="tel"
          />

          <fieldset className="mt-7">
            <legend className="text-[11px] uppercase tracking-[0.2em] text-muted">Quý khách</legend>
            <div className="mt-3 grid gap-2">
              {(
                [
                  ["yes", "Sẽ đến chung vui"],
                  ["later", "Sẽ trả lời sau"],
                  ["no", "Rất tiếc, chưa sắp xếp được"],
                ] as const
              ).map(([value, label]) => (
                <label key={value} className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="radio"
                    name="attendance"
                    checked={attendance === value}
                    onChange={() => setAttendance(value)}
                    className="accent-[#8f7044]"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          {attendance === "yes" ? (
            <label className="mt-6 block text-[11px] uppercase tracking-[0.2em] text-muted" htmlFor="rsvp-guests">
              Số người đến
              <select
                id="rsvp-guests"
                value={guests}
                onChange={(event) => setGuests(Number(event.target.value))}
                className="mt-2 block w-full border-0 border-b border-ink/20 bg-transparent py-3 outline-none"
              >
                {[1, 2, 3, 4, 5, 6].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <fieldset className="mt-7">
            <legend className="text-[11px] uppercase tracking-[0.2em] text-muted">Buổi lễ dự kiến tham dự</legend>
            <div className="mt-3 grid gap-2">
              {wedding.events.map((item) => (
                <label key={item.id} className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={events.includes(item.id)}
                    onChange={() => toggleEvent(item.id)}
                    className="accent-[#8f7044]"
                  />
                  {item.title}
                  <span className="text-muted">· {item.eyebrow}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mt-7 block text-[11px] uppercase tracking-[0.2em] text-muted" htmlFor="rsvp-message">
            Lời chúc
          </label>
          <textarea
            id="rsvp-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={4}
            className="mt-2 w-full resize-y border border-ink/15 bg-ivory/60 px-3 py-3 outline-none focus:border-gold"
          />

          {error ? <p className="mt-4 text-sm text-[#8a3d32]">{error}</p> : null}

          <button
            type="submit"
            className="mt-7 inline-flex min-h-11 items-center bg-ink px-6 text-[11px] uppercase tracking-[0.22em] text-ivory"
          >
            Gửi lời xác nhận
          </button>

          {latest ? (
            <div className="mt-8 border border-gold/30 bg-ivory px-4 py-4 text-sm leading-7">
              <p className="font-medium">Cảm ơn {latest.name}.</p>
              <p className="mt-1 text-muted">
                {attendanceLabel[latest.attendance]}
                {latest.attendance === "yes" ? ` · ${latest.guests} người` : ""}
                {latest.message ? ` · “${latest.message}”` : ""}
              </p>
              <button
                type="button"
                onClick={copyLatest}
                className="mt-3 text-[11px] uppercase tracking-[0.18em] text-gold"
              >
                {copied ? "Đã sao chép nội dung" : "Sao chép để gửi qua Zalo"}
              </button>
            </div>
          ) : null}
        </form>
      </div>

      {ready && entries.some((entry) => entry.message) ? (
        <div className="mx-auto mt-16 max-w-6xl">
          <h3 className="font-serif text-3xl">Lời chúc trên máy này</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entries
              .filter((entry) => entry.message)
              .map((entry) => (
                <blockquote key={entry.id} className="bg-paper px-5 py-5">
                  <p className="text-[15px] leading-7">“{entry.message}”</p>
                  <footer className="mt-3 text-xs tracking-[0.16em] text-muted uppercase">{entry.name}</footer>
                </blockquote>
              ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
