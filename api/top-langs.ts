export async function handleTopLangs(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  if (!username) {
    return new Response(errorCard("Username is required."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  const layout = url.searchParams.get("layout") ?? "bar";

  const hide = url.searchParams.get("hide")?.split(",") ?? [];

  const langCount = parseInt(url.searchParams.get("langCount") ?? "6");

  const data = await fetchLanguages(username);
  if (!data) {
    return new Response(errorCard("User not found."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}

