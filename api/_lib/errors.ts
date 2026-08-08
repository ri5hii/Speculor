import { escapeXML } from "./utils";

export function errorCard(message: string, width?: number, height?: number): string {
  const w = width ?? 500;
  const h = height ?? Math.max(100, w * 0.3);
  const iconScale = w >= 400 ? 0.875 : w >= 200 ? 0.7 : 0.5;
  const titleX = 20 + (14 * iconScale) + 8;
  const fontSize = w >= 400 ? 14 : w >= 200 ? 12 : 10;
  const titleSize = w >= 400 ? 16 : w >= 200 ? 14 : 12;

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" role="img">
  <rect width="100%" height="100%" rx="4.5" fill="#fffefe" stroke="#e4e2e2" stroke-width="1"/>
  <g transform="translate(20, ${30 - 14 * iconScale}) scale(${iconScale})">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.56 1h.88l6.54 12.26-.44.74H1.44L1 13.26 7.56 1zM8 2.28L2.28 13H13.7L8 2.28zM8.625 12v-1h-1.25v1h1.25zm-1.25-2V6h1.25v4h-1.25z" fill="#f85149"/>
  </g>
  <text x="${titleX}" y="30" fill="#f85149" font-size="${titleSize}" font-family="Segoe UI, Ubuntu, sans-serif">Error</text>
  <text x="20" y="55" fill="#434d58" font-size="${fontSize}" font-family="Segoe UI, Ubuntu, sans-serif">${escapeXML(message)}</text>
</svg>`;

  return svgString;
}

export function sendErrorSVG(message: string, width?: number, height?: number): Response {
  return new Response(errorCard(message, width, height), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "max-age=60",
    },
  });
}