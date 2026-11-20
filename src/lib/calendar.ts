import { wedding } from "@/lib/wedding";

function ceremonyDate(time: string) {
  const match = time.match(/(\d+)\s+tháng\s+(\d+),\s*(\d+)/i);
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  if (!day || !month || !year) return null;
  return { day, month, year };
}

function calendarStamp(year: number, month: number, day: number) {
  const date = new Date(Date.UTC(year, month - 1, day));
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function foldCalendarLine(line: string) {
  const parts: string[] = [];
  let current = "";
  let size = 0;
  const encoder = new TextEncoder();
  for (const char of line) {
    const charSize = encoder.encode(char).length;
    if (current && size + charSize > 73) {
      parts.push(current);
      current = ` ${char}`;
      size = 1 + charSize;
    } else {
      current += char;
      size += charSize;
    }
  }
  if (current) parts.push(current);
  return parts.join("\r\n");
}

function calendarText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

/** Lịch cả ngày. Giờ lễ chưa chốt nên không ghi giờ. */
export function weddingCalendar() {
  const lines = wedding.events.flatMap((event) => {
    const date = ceremonyDate(event.time);
    if (!date) return [];
    const summary = `${event.title} của ${wedding.groom.shortName} và ${wedding.bride.shortName}`;
    const description = [event.note.trim(), "Giờ và địa điểm sẽ được cập nhật"].filter(Boolean).join(". ") + ".";
    return [
      "BEGIN:VEVENT",
      `UID:${event.id}@hieu-que-wedding`,
      "DTSTAMP:20261120T000000Z",
      `DTSTART;VALUE=DATE:${calendarStamp(date.year, date.month, date.day)}`,
      `DTEND;VALUE=DATE:${calendarStamp(date.year, date.month, date.day + 1)}`,
      foldCalendarLine(`SUMMARY:${calendarText(summary)}`),
      foldCalendarLine(`DESCRIPTION:${calendarText(description)}`),
      "END:VEVENT",
    ];
  });
  if (lines.length === 0) return "";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Hieu va Que//Thiep cuoi//VI",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...lines,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
