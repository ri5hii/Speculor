import { errorCard } from "@/errors";
import { fetchMiniMetric } from "@/github";

export async function handleMini(params: URLSearchParams): Promise<Response> {
  const username = params.get("username");
  const metric = params.get("metric");

  if (!username || !metric) {
    return new Response(errorCard("Username and metric are required."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  const label = params.get("label") ?? metric;

  const color = params.get("color") ?? undefined;

  const style = params.get("style") ?? "flat";

  const data = await fetchMiniMetric(username, metric);
  if (data == null) {
    return new Response(errorCard("User not found."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}

