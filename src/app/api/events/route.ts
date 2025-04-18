import { NextRequest } from "next/server";
import EventItem from "../dto/EventItem";


export async function GET(request: NextRequest) {
  const GITLAB_API = process.env.GITLAB_URL;
  const PRIVATE_TOKEN = process.env.GITLAB_PRIVATE_KEY;
  const USER_ID = 10;
  const since = request.nextUrl.searchParams.get("since") || "2025-01-01";

  const events: EventItem[] = [];

  let page = 1;
  let hasMore = true;

  try {
    while (hasMore) {
      const url = `${GITLAB_API}/v4/users/${USER_ID}/events?` +
        new URLSearchParams({
          action: "pushed",
          after: since,
          per_page: "100",
          page: page.toString()
        });

      const res = await fetch(url, {
        headers: {
          "PRIVATE-TOKEN": PRIVATE_TOKEN!,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        return Response.json({ error: "Erro ao buscar eventos." }, { status: res.status });
      }

      const data = await res.json();
      data.forEach((e: any) => {
        events.push(new EventItem(e));
      });

      hasMore = data.length === 100;
      page++;
    }

    return Response.json(events);
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
