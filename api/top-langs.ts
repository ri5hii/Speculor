import { errorCard } from "@/errors";
import { fetchLanguages } from "@/github";

export async function handleTopLangs(params: URLSearchParams): Promise<Response> {
  const username = params.get("username");

  if (!username) {
    return new Response(errorCard("Username is required."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  const layout = params.get("layout") ?? "bar";

  const hide = params.get("hide")?.split(",") ?? [];

  const langCount = parseInt(params.get("langCount") ?? "6");

  const data = await fetchLanguages(username);
  if (!data) {
    return new Response(errorCard("User not found."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}

