import { handleCard } from "./card";
import { handleTopLangs } from "./top-langs";
import { handleMini } from "./mini";

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    switch (url.pathname) {
      case "/api/card":
        return handleCard(request);
      case "/api/top-langs":
        return handleTopLangs(request);
      case "/api/mini":
        return handleMini(request);
      default:
        return new Response("Speculor", { status: 200 });
    }
  },
};
