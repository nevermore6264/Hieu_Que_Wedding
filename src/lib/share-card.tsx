import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { wedding } from "@/lib/wedding";

export const shareSize = { width: 1200, height: 630 };

function ceremonyParts(time: string) {
  const match = time.match(/^(.+?),\s*(\d+)\s+tháng\s+(\d+),\s*(\d+)\s*$/i);
  if (!match) return null;
  return {
    weekday: match[1],
    day: match[2].padStart(2, "0"),
    month: match[3].padStart(2, "0"),
    year: match[4],
  };
}

export async function shareCard() {
  const [serif, sans] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/CormorantGaramond-SemiBold.ttf")),
    readFile(join(process.cwd(), "src/fonts/BeVietnamPro-Regular.ttf")),
  ]);
  const dates = wedding.events
    .map((event) => {
      const parts = ceremonyParts(event.time);
      return parts ? { title: event.title, ...parts } : null;
    })
    .filter((event) => event !== null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#1c1712",
          padding: 28,
          color: "#1c1712",
          fontFamily: "Be Vietnam Pro",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            background: "#f3ece2",
            border: "1px solid #c6aa74",
          }}
        >
          <div style={{ fontSize: 18, letterSpacing: 8, color: "#8f7044" }}>THIỆP MỜI LỄ CƯỚI</div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              marginTop: 18,
              fontFamily: "Cormorant Garamond",
              fontSize: 92,
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            <div>{wedding.groom.shortName}</div>
            <div style={{ marginLeft: 22, marginRight: 22, color: "#8f7044" }}>&</div>
            <div>{wedding.bride.shortName}</div>
          </div>
          <div style={{ marginTop: 14, fontSize: 24, color: "#74695e" }}>
            {`${wedding.groom.name} · ${wedding.bride.name}`}
          </div>
          <div style={{ width: 72, height: 1, marginTop: 28, background: "#c6aa74" }} />
          <div style={{ display: "flex", alignItems: "center", marginTop: 28 }}>
            {dates.map((event, index) => (
              <div
                key={event.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 280,
                  marginLeft: index > 0 ? 36 : 0,
                  paddingLeft: index > 0 ? 36 : 0,
                  borderLeft: index > 0 ? "1px solid #c6aa74" : "0 solid transparent",
                }}
              >
                <div style={{ fontSize: 16, letterSpacing: 3, color: "#8f7044" }}>{event.title.toUpperCase()}</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginTop: 8,
                    fontFamily: "Cormorant Garamond",
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  <div style={{ fontSize: 72 }}>{event.day}</div>
                  <div style={{ marginLeft: 8, marginBottom: 8, fontSize: 28 }}>{`/${event.month}`}</div>
                </div>
                <div style={{ marginTop: 8, fontSize: 20, color: "#74695e" }}>{`${event.weekday} · ${event.year}`}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...shareSize,
      fonts: [
        { name: "Be Vietnam Pro", data: sans, weight: 400, style: "normal" },
        { name: "Cormorant Garamond", data: serif, weight: 600, style: "normal" },
      ],
    },
  );
}
