/**
 * Fetches the body of a URL as text, or `null` when the request fails.
 * Injectable so callers that cannot `fetch` cross-origin directly (e.g. a
 * browser extension popup) can proxy the request through the inspected page.
 */
export type SitemapTextFetcher = (
  url: string,
  timeoutInMilliseconds: number
) => Promise<string | null>;

export type ExtractUrlFromSitemapOptions = {
  /** Defaults to a plain `fetch` with an abort timeout. */
  fetchText?: SitemapTextFetcher;
};

const fetchTextWithTimeout: SitemapTextFetcher = async (
  url,
  timeoutInMilliseconds
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutInMilliseconds);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
};

const parseLocs = (xml: string): string[] => {
  const matches = xml.match(/<loc>([\s\S]*?)<\/loc>/g) ?? [];
  return matches.map((m) => m.replace(/<\/?loc>/g, '').trim()).filter(Boolean);
};

const fetchSitemapUrls = async (
  sitemapUrl: string,
  visited: Set<string>,
  fetchText: SitemapTextFetcher
): Promise<string[]> => {
  if (visited.has(sitemapUrl)) return [];
  visited.add(sitemapUrl);

  const xml = await fetchText(sitemapUrl, 5000);
  if (!xml) return [];

  if (xml.includes('<sitemapindex')) {
    const childUrls = parseLocs(xml);
    const results = await Promise.all(
      childUrls.map((url) => fetchSitemapUrls(url, visited, fetchText))
    );
    return results.flat();
  }

  return parseLocs(xml);
};

/**
 * Lists every page URL of the site hosting `pageUrl`, following the sitemaps
 * declared in `robots.txt` (or `/sitemap.xml`) and nested sitemap indexes.
 */
export const extractUrlFromSitemap = async (
  pageUrl: string,
  { fetchText = fetchTextWithTimeout }: ExtractUrlFromSitemapOptions = {}
): Promise<string[]> => {
  const origin = new URL(pageUrl).origin;
  const candidateUrls: string[] = [];

  const robotsText = await fetchText(`${origin}/robots.txt`, 3000);
  if (robotsText) {
    const matches = robotsText.match(/^Sitemap:\s*(.+)$/gim) ?? [];
    matches.forEach((m) => {
      const url = m.replace(/^Sitemap:\s*/i, '').trim();
      if (url) candidateUrls.push(url);
    });
  }

  if (candidateUrls.length === 0) {
    candidateUrls.push(`${origin}/sitemap.xml`);
  }

  const visited = new Set<string>();
  const results = await Promise.all(
    candidateUrls.map((url) => fetchSitemapUrls(url, visited, fetchText))
  );

  return Array.from(new Set(results.flat())).sort();
};
