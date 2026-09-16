const EXCLUDED = new Set(["card", "theme", "options"]);

export function parseOptions(raw: string | null): Map<string, string> {
  const options = new Map<string, string>();

  if (!raw) {
    return options;
  }
  let lastKey: string | null = null;
  for (const token of raw.split(",")) {
    const index = token.indexOf(":");
    if (index === -1) {
      if (lastKey) {
        options.set(lastKey, `${options.get(lastKey)},${token}`);
      }
      continue;
    }
    lastKey = token.slice(0, index).trim();
    options.set(lastKey, token.slice(index + 1));
  }
  return options;
}

export function buildParams(url: URL): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of parseOptions(url.searchParams.get("options"))) {
    params.set(key, value);
  }
  for (const [key, value] of url.searchParams) {
    if (!EXCLUDED.has(key)) {
      params.set(key, value);
    }
  }
  return params;
}
