import { githubStats } from "./github";
import { formatNumber } from "./utils";

export function calculateRank(stats: githubStats): { level: string, percentile: number } {
  let score: number = Math.log10(stats.totalStars + 1) * 10 + Math.log10(stats.totalCommits + 1) * 5 + Math.log10(stats.totalPRs + 1) * 3 + Math.log10(stats.totalIssues + 1) * 2 + stats.followers * 0.5;

  if (score > 50) {
    return { level: "S", percentile: 1 };
  }
  if (score > 40) {
    return { level: "A+", percentile: 12 };
  }
  if (score > 30) {
    return { level: "A", percentile: 25 };
  }
  if (score > 20) {
    return { level: "B+", percentile: 37 };
  }
  if (score > 10) {
    return { level: "B", percentile: 50 };
  }

  return { level: "C", percentile: 75 };
}

export function calculateCircleProgress(percentile: number): { circumference: number, offset: number } {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = ((100 - percentile) / 100) * circumference;

  return { circumference, offset };
}

interface statItem {
  key: string;
  label: string;
  value: number;
}

export function filterStats(stats: githubStats, hide: string[]): statItem[] {
  const allStats = [
    { key: "stars", label: "Total Stars", value: stats.totalStars },
    { key: "commits", label: "Total Commits", value: stats.totalCommits },
    { key: "prs", label: "Total PRs", value: stats.totalPRs },
    { key: "issues", label: "Total Issues", value: stats.totalIssues },
    { key: "followers", label: "Followers", value: stats.followers },
  ];

  return allStats.filter((stats) => !hide.includes(stats.key));
}

export function createStatLine(label: string, value: number): string {
  return `
        <g transform="translate(25, 0)">
            <text fill="#333" font-family="Segoe UI, Ubuntu, sans-serif" font-size="14" font-weight="bold" y="12.5">${label}:</text>
            <text fill="#333" font-family="Segoe UI, Ubuntu, sans-serif" font-size="14" font-weight="bold" x="199.01" y="12.5">${formatNumber(value)}</text>
        </g>
    `;
}
