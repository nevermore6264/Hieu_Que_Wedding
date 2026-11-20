import { weddingCalendar } from "@/lib/calendar";

export function GET() {
  const body = weddingCalendar();
  if (!body) return new Response("Chưa có ngày lễ.", { status: 404 });
  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="hieu-que.ics"',
    },
  });
}
