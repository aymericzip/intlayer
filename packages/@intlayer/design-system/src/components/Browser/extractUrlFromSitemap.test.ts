import { describe, expect, it } from 'vitest';
import {
  extractUrlFromSitemap,
  type SitemapTextFetcher,
} from './extractUrlFromSitemap';

/** Serves canned bodies by URL; unknown URLs behave like failed requests. */
const createFetcher =
  (bodies: Record<string, string>): SitemapTextFetcher =>
  async (url) =>
    bodies[url] ?? null;

describe('extractUrlFromSitemap', () => {
  it('follows robots.txt sitemaps and nested sitemap indexes', async () => {
    const fetchText = createFetcher({
      'https://example.com/robots.txt':
        'User-agent: *\nSitemap: https://example.com/sitemap-index.xml',
      'https://example.com/sitemap-index.xml':
        '<sitemapindex><sitemap><loc>https://example.com/pages.xml</loc></sitemap></sitemapindex>',
      'https://example.com/pages.xml':
        '<urlset><url><loc>https://example.com/fr</loc></url><url><loc> https://example.com/ </loc></url></urlset>',
    });

    const urls = await extractUrlFromSitemap('https://example.com/about', {
      fetchText,
    });

    expect(urls).toEqual(['https://example.com/', 'https://example.com/fr']);
  });

  it('falls back to /sitemap.xml and dedupes urls', async () => {
    const fetchText = createFetcher({
      'https://example.com/sitemap.xml':
        '<urlset><url><loc>https://example.com/a</loc></url><url><loc>https://example.com/a</loc></url></urlset>',
    });

    const urls = await extractUrlFromSitemap('https://example.com', {
      fetchText,
    });

    expect(urls).toEqual(['https://example.com/a']);
  });

  it('returns an empty list when no sitemap can be read', async () => {
    const urls = await extractUrlFromSitemap('https://example.com', {
      fetchText: createFetcher({}),
    });

    expect(urls).toEqual([]);
  });
});
