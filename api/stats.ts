import { errorCard } from "@/errors";
import { fetchStats } from "@/github";

export async function handleStatsCard(params: URLSearchParams): Promise<Response> {
  const username = params.get("username");

  if (!username) {
    return new Response(errorCard("Username is required."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  const hide = params.get("hide")?.split(",") ?? [];

  const show = params.get("show")?.split(",") ?? [];

  const showIcons = params.get("showIcons") == "true";

  const data = await fetchStats(username);
  if (!data) {
    return new Response(errorCard("User not found."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}


