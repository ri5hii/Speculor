export function escapeXML(str: string): string {
  let sanitizedString: string = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  return sanitizedString;
}

export function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }
  else if (num < 1000000) {
    return (num / 1000).toFixed(1) + "k";
  }
  else if (num < 1000000000) {
    return (num / 1000000).toFixed(1) + "m";
  }

  return (num / 1000000000).toFixed(1) + "b";
}

export function measureText(text: string, fontSize: number): number {
  return text.length * fontSize * 0.6;
}

export const flexLayout = ({
  items,
  gap,
  direction,
  sizes = []
}: {
  items: string[];
  gap: number;
  direction: "column" | "row";
  sizes?: number[];
}) => {
  let lastSize = 0;
  return items.filter(Boolean).map((item, i) => {
    const size = sizes[i] || 0;
    let transform = `translate(${lastSize}, 0)`;
    if (direction === "column") {
      transform = `translate(0, ${lastSize})`;
    }
    lastSize += size + gap;
    return `<g transform="${transform}">${item}</g>`;
  });
};
