import { errorCard } from "@/errors";
import { fetchStats } from "@/github";

export async function handleCard(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  if (!username) {
    return new Response(errorCard("Username is required."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  const hide = url.searchParams.get("hide")?.split(",") ?? [];

  const show = url.searchParams.get("show")?.split(",") ?? [];

  const showIcons = url.searchParams.get("showIcons") == "true";

  const data = await fetchStats(username);
  if (!data) {
    return new Response(errorCard("User not found."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}


