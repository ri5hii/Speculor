import { errorCard } from "@/errors";
import { fetchMiniMetric, githubStats } from "@/github";
import { formatNumber } from "@/utils";

const mockMetricValues: githubStats = {
  totalStars: 1234,
  totalCommits: 5678,
  totalPRs: 89,
  totalIssues: 23,
  totalContributions: 2400,
  followers: 156,
  rank: 0,
}

export async function handleMini(params: URLSearchParams): Promise<Response> {
  const type = params.get("type");

  if (type === "label") {
    return serveLabel(params);
  }

  if (type === "githubStat") {
    return serveGithubStat(params);
  }

  return new Response(errorCard("Unknown badge type."), {
    headers: { "Content-Type": "image/svg+xml" },
  });
}

function serveGithubStat(params: URLSearchParams): Response {
  const username = params.get("username");
  if (!username) {
    return new Response(errorCard("Username is required."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  const metric = params.get("metric");
  if (!metric) {
    return new Response(errorCard("Metric is required."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  const value = mockMetricValues[metric] //await fetchMiniMetric(username, metric);
  if (value === undefined) {
    return new Response(errorCard("Unknown metric."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  const label = params.get("label") ?? metric;
  const color = params.get("color") ?? undefined;

  return new Response(statsMini(label, formatNumber(value), { color }), {
    headers: { "Content-Type": "image/svg+xml" },
  });
}

function serveLabel(params: URLSearchParams): Response {
  const lang = params.get("lang");
  if (!lang) {
    return new Response(errorCard("Language is required."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  const icon = getLanguageIcon(lang);
  if (!icon) {
    return new Response(errorCard("Unknown language."), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  const color = params.get("color") ?? undefined;
  return Response(langMini(lang, icon, { color }). {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
