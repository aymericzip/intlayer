import { fetchText, type ScanFetchOptions } from './fetchText';
import { parseRobots } from './robots';

/** A `<url>` entry of a sitemap with its hreflang alternates. */
export type SitemapEntry = {
  loc: string;
  alternates: { hreflang: string; href: string }[];
};

/** Result of {@link parseSitemap}. */
export type ParsedSitemap = {
  /** `<url>` entries (empty for a sitemap index). */
  entries: SitemapEntry[];
  /** Child sitemap URLs, when the document is a `<sitemapindex>`. */
  childSitemapUrls: string[];
};

/** Result of {@link collectSitemapEntries}. */
export type CollectedSitemaps = {
  /** Sitemap URLs that answered with a valid document. */
  fetchedSitemapUrls: string[];
  entries: SitemapEntry[];
  /** Whether the entry limit was reached before reading every sitemap. */
  isTruncated: boolean;
};

const MAX_CHILD_SITEMAPS = 5;
const MAX_ENTRIES = 5_000;

/** Decode the XML entities that can appear in sitemap URLs. */
const decodeXmlEntities = (text: string): string =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");

/** Read an attribute of an XML tag, accepting both quote styles. */
const readXmlAttribute = (tag: string, name: string): string | undefined => {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i')
  );
  return match ? decodeXmlEntities(match[2] ?? match[3] ?? '') : undefined;
};

/** Extract every `<loc>` value of an XML fragment. */
const extractLocs = (xml: string): string[] =>
  Array.from(xml.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/gi), (match) =>
    decodeXmlEntities((match[1] ?? '').replace(/^<!\[CDATA\[|\]\]>$/g, ''))
  );

/**
 * Parse a sitemap or sitemap index (regex based, no XML dependency). Handles
 * `<xhtml:link rel="alternate" hreflang>` alternates in any namespace prefix.
 */
export const parseSitemap = (xml: string): ParsedSitemap => {
  if (/<sitemapindex\b/i.test(xml)) {
    return { entries: [], childSitemapUrls: extractLocs(xml) };
  }

  const entries: SitemapEntry[] = [];
  for (const [urlBlock] of xml.matchAll(/<url\b[\s\S]*?<\/url>/gi)) {
    const loc = extractLocs(urlBlock)[0];
    if (!loc) continue;

    const alternates: SitemapEntry['alternates'] = [];
    for (const [linkTag] of urlBlock.matchAll(/<(?:\w+:)?link\b[^>]*>/gi)) {
      const hreflang = readXmlAttribute(linkTag, 'hreflang');
      const href = readXmlAttribute(linkTag, 'href');
      if (hreflang && href) alternates.push({ hreflang, href });
    }
    entries.push({ loc, alternates });
  }

  return { entries, childSitemapUrls: [] };
};

/**
 * Fetch the given sitemaps, following sitemap indexes one level deep, and
 * gather their `<url>` entries.
 *
 * @param sitemapUrls - Sitemaps to read (from `robots.txt`, else defaults).
 * @param fetchOptions - Network options, including the SSRF guard.
 */
export const collectSitemapEntries = async (
  sitemapUrls: string[],
  fetchOptions: ScanFetchOptions
): Promise<CollectedSitemaps> => {
  const fetchedSitemapUrls: string[] = [];
  const entries: SitemapEntry[] = [];
  const visitedUrls = new Set<string>();
  const queue = [...sitemapUrls];
  let childSitemapCount = 0;

  while (queue.length > 0 && entries.length < MAX_ENTRIES) {
    const sitemapUrl = queue.shift() as string;
    if (visitedUrls.has(sitemapUrl)) continue;
    visitedUrls.add(sitemapUrl);

    const response = await fetchText(sitemapUrl, fetchOptions);
    if (!response?.ok || !/<(urlset|sitemapindex)\b/i.test(response.text)) {
      continue;
    }

    fetchedSitemapUrls.push(sitemapUrl);
    const parsedSitemap = parseSitemap(response.text);
    entries.push(...parsedSitemap.entries);

    for (const childUrl of parsedSitemap.childSitemapUrls) {
      if (childSitemapCount >= MAX_CHILD_SITEMAPS) break;
      childSitemapCount++;
      queue.push(childUrl);
    }
  }

  return {
    fetchedSitemapUrls,
    entries: entries.slice(0, MAX_ENTRIES),
    isTruncated: entries.length >= MAX_ENTRIES || queue.length > 0,
  };
};

/** Default sitemap locations tried when `robots.txt` declares none. */
export const getDefaultSitemapUrls = (origin: string): string[] => [
  `${origin}/sitemap.xml`,
  `${origin}/sitemap_index.xml`,
];

/**
 * List the page URLs of a site from its sitemaps (primary `<loc>` and every
 * hreflang alternate), used to seed a multi-page audit.
 *
 * @returns De-duplicated URLs, or `[targetUrl]` when no sitemap is found.
 */
export const discoverSitemapUrls = async (
  targetUrl: string,
  fetchOptions: ScanFetchOptions
): Promise<string[]> => {
  const { origin } = new URL(targetUrl);
  const robots = await fetchText(`${origin}/robots.txt`, fetchOptions);
  const declaredSitemaps = robots?.ok
    ? parseRobots(robots.text).sitemapUrls
    : [];

  const { entries } = await collectSitemapEntries(
    declaredSitemaps.length > 0
      ? declaredSitemaps
      : getDefaultSitemapUrls(origin),
    fetchOptions
  );

  const urls = new Set<string>();
  for (const { loc, alternates } of entries) {
    urls.add(loc);
    for (const { href } of alternates) urls.add(href);
  }

  return urls.size > 0 ? Array.from(urls) : [targetUrl];
};
