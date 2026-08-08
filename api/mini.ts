import { errorCard } from "@/errors";
import { fetchMiniMetric } from "@/github";

export async function handleMini(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");
  const metric = url.searchParams.get("metric");

  if (!username || !metric) {
    return new Response(errorCard("Username and metric are required."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  const label = url.searchParams.get("label") ?? metric;

  const color = url.searchParams.get("color") ?? undefined;

  const style = url.searchParams.get("style") ?? "flat";

  const data = await fetchMiniMetric(username, metric);
  if (data == null) {
    return new Response(errorCard("User not found."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}

