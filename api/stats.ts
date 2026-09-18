import { statsCard } from "@/cards/stats-card";
import { errorCard } from "@/errors";
import { githubStats } from "@/github";

const mockData: githubStats = {
  totalStars: 1234,
  totalCommits: 5678,
  totalPRs: 89,
  totalIssues: 23,
  totalContributions: 2400,
  followers: 156,
  rank: 0,
};

export async function handleStatsCard(params: URLSearchParams): Promise<Response> {
  const username = params.get("username");

  if (!username) {
    return new Response(errorCard("Username is required."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
  const hide = params.get("hide")?.split(",") ?? [];
  const hideBorder = params.get("hideBorder") == "true";
  const hideTitle = params.get("hideTitle") == "true";
  const borderRadius = Number(params.get("borderRadius")) || 4.5;

  const data = mockData; //await fetchStats(username);
  if (!data) {
    return new Response(errorCard("User not found."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  } else {
    return new Response(
      statsCard(data, { hide, hideTitle, hideBorder, borderRadius, username }),
      { headers: { "Content-Type": "image/svg+xml" } }
    );
  }
}


