const fetchWithTimeout = (url: string, timeout = 5000): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return fetch(url, { signal: controller.signal }).finally(() =>
    clearTimeout(id)
  );
};

const parseLocs = (xml: string): string[] => {
  const matches = xml.match(/<loc>([\s\S]*?)<\/loc>/g) ?? [];
  return matches.map((m) => m.replace(/<\/?loc>/g, '').trim()).filter(Boolean);
};

const fetchSitemapUrls = async (
  sitemapUrl: string,
  visited: Set<string>
): Promise<string[]> => {
  if (visited.has(sitemapUrl)) return [];
  visited.add(sitemapUrl);

  try {
    const res = await fetchWithTimeout(sitemapUrl);
    if (!res.ok) return [];
    const xml = await res.text();

    if (xml.includes('<sitemapindex')) {
      const childUrls = parseLocs(xml);
      const results = await Promise.all(
        childUrls.map((url) => fetchSitemapUrls(url, visited))
      );
      return results.flat();
    }

    return parseLocs(xml);
  } catch {
    return [];
  }
};

export const extractUrlFromSitemap = async (
  pageUrl: string
): Promise<string[]> => {
  const origin = new URL(pageUrl).origin;
  const candidateUrls: string[] = [];

  try {
    const res = await fetchWithTimeout(`${origin}/robots.txt`, 3000);
    if (res.ok) {
      const text = await res.text();
      const matches = text.match(/^Sitemap:\s*(.+)$/gim) ?? [];
      matches.forEach((m) => {
        const url = m.replace(/^Sitemap:\s*/i, '').trim();
        if (url) candidateUrls.push(url);
      });
    }
  } catch {
    // Ignore network / CORS errors for robots.txt
  }

  if (candidateUrls.length === 0) {
    candidateUrls.push(`${origin}/sitemap.xml`);
  }

  const visited = new Set<string>();
  const results = await Promise.all(
    candidateUrls.map((url) => fetchSitemapUrls(url, visited))
  );

  return Array.from(new Set(results.flat())).sort();
};
