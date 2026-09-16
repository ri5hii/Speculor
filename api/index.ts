import { buildParams } from "@/params";
import { handleStatsCard } from "./stats";
import { handleTopLangs } from "./top-langs";
import { handleMini } from "./mini";

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    switch (url.pathname) {
      case "/api":
        const card = url.searchParams.get("card");
        const theme = url.searchParams.get("theme");
        const params = buildParams(url);

        switch (card) {
          case "stats":
            return handleStatsCard(params);
          case "top-langs":
            return handleTopLangs(params);
          case "mini":
            return handleMini(params);
          default:
            return new Response("Speculor", { status: 200 });
        }
      default:
        return new Response("Speculor", { status: 200 });
    }
  },
};
