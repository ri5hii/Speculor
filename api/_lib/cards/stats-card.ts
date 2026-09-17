import { githubStats } from "@/github";
import { flexLayout } from "@/utils";
import { calculateCircleProgress, calculateRank, createStatLine, filterStats } from "@/statsUtils";

interface statCardOptions {
  hide: string[];
  hideTitle: boolean;
  hideBorder: boolean;
  borderRadius: number;
  username: string;
}

export function statsCard(stats: githubStats, options: statCardOptions): string {
  const {
    hide = [],
    hideTitle = false,
    hideBorder = false,
    borderRadius = 4.5,
    username,
  } = options;

  const rank = calculateRank(stats);
  const visibleStats = filterStats(stats, hide);
  const lheight = 25;

  const statItems = visibleStats.map((stat) => {
    return createStatLine(stat.label, stat.value);
  });

  const height = Math.max(
    45 + (statItems.length + 1) * lheight,
    statItems.length ? 150 : 180,
  );

  const width = 450;

  const { circumference, offset } = calculateCircleProgress(rank.percentile);

  const rankX = 365;

  const bodyY = hideTitle ? 25 : 55;

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="descId">
  <title id="titleId">${username}'s GitHub Stats</title>
  <desc id="descId">GitHub stats card for ${username}</desc>
  <rect data-testid="card-bg" x="0.5" y="0.5" rx="${borderRadius}" height="99%" stroke="#e4e2e2" width="${width - 1}" fill="#fffefe" stroke-opacity="${hideBorder ? 0 : 1}" />
  ${!hideTitle ? `
    <g data-testid="card-title" transform="translate(25, 35)">
      <text x="0" y="0" fill="#2f80ed" font-family="Segoe UI, Ubuntu, sans-serif" font-size="18" font-weight="600" data-testid="header">${username}'s GitHub Stats</text>
    </g>
  ` : ""}
  <g data-testid="main-card-body" transform="translate(0, ${bodyY})">
    <g data-testid="rank-circle" transform="translate(${rankX}, ${height / 2 - 50})">
      <circle cx="-10" cy="8" r="40" fill="none" stroke="#2f80ed" stroke-width="6" opacity="0.2" />
      <circle cx="-10" cy="8" r="40" fill="none" stroke="#2f80ed" stroke-width="6" stroke-linecap="round" opacity="0.8" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" transform="rotate(-90, -10, 8)" />
      <text text-anchor="middle" dominant-baseline="central" x="-10" y="8" fill="#333" font-family="Segoe UI, Ubuntu, sans-serif" font-size="24" font-weight="800">${rank.level}</text>
    </g>
    <svg data-testid="lang-items" x="25" y="0">
      ${flexLayout({ items: statItems, gap: lheight, direction: "column" }).join("")}
    </svg>
  </g>
</svg>
`;
}
