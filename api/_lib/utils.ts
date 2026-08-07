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


