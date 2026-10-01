import { createFileRoute } from '@tanstack/react-router';
import { generateSitemap, type SitemapUrlEntry } from 'intlayer';
import {
  buildSitemapEntriesBySection,
  isSitemapSection,
  type SitemapSection,
  sitemapSections,
} from '~/siteRoutes';

const siteUrl = (
  import.meta.env.VITE_SITE_URL ??
  import.meta.env.VITE_URL ??
  'https://intlayer.org'
).replace(/\/$/, '');

const xmlHeaders = {
  'Content-Type': 'application/xml; charset=utf-8',
  'X-Robots-Tag': 'noindex, follow',
  // Rebuilt from scratch on every request, and one entry per locale makes it
  // large — a crawler re-fetching it must not recompute it.
  'Cache-Control': 'public, max-age=3600, s-maxage=3600',
};

/**
 * Paths per child sitemap. Every path expands into one `<url>` per locale, each
 * repeating the whole alternate set (~40 KB per path), so 40 paths keep a file
 * near 1.6 MB. Search engines accept 50 MB, but audit tools stop reading a few
 * MB in and report the rest of a section as missing.
 */
const PATHS_PER_SITEMAP = 40;

/** One child sitemap: a section, and its 1-indexed page within it. */
type SitemapChunk = {
  section: SitemapSection;
  page: number;
  entries: SitemapUrlEntry[];
};

/**
 * Splits every section into pages of `PATHS_PER_SITEMAP` entries.
 *
 * @param entriesBySection - The sitemap entries of every section.
 * @returns The child sitemaps, in section order.
 */
const getSitemapChunks = (
  entriesBySection: Record<SitemapSection, SitemapUrlEntry[]>
): SitemapChunk[] =>
  sitemapSections.flatMap((section) => {
    const entries = entriesBySection[section];
    const pageCount = Math.max(
      1,
      Math.ceil(entries.length / PATHS_PER_SITEMAP)
    );

    return Array.from({ length: pageCount }, (_, pageIndex) => ({
      section,
      page: pageIndex + 1,
      entries: entries.slice(
        pageIndex * PATHS_PER_SITEMAP,
        (pageIndex + 1) * PATHS_PER_SITEMAP
      ),
    }));
  });

/**
 * URL of one child sitemap, escaped for an XML text node. The first page omits
 * `page`, so the `?section=…` URLs already known to search engines still serve
 * the start of their section.
 */
const getChunkSitemapUrl = ({ section, page }: SitemapChunk): string =>
  page === 1
    ? `${siteUrl}/sitemap.xml?section=${section}`
    : `${siteUrl}/sitemap.xml?section=${section}&amp;page=${page}`;

/** Most recent `lastmod` of a chunk, if any of its entries has one. */
const getLatestLastmod = (entries: SitemapUrlEntry[]): string | undefined =>
  entries
    .map((entry) => entry.lastmod)
    .filter((lastmod): lastmod is string => Boolean(lastmod))
    .sort()
    .at(-1);

/**
 * Builds the sitemap index pointing at each child sitemap, with the most recent
 * `lastmod` of its entries.
 */
const generateSitemapIndex = (chunks: SitemapChunk[]): string => {
  const sitemaps = chunks
    .map((chunk) => {
      const lastmod = getLatestLastmod(chunk.entries);
      return [
        '  <sitemap>',
        `    <loc>${getChunkSitemapUrl(chunk)}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : undefined,
        '  </sitemap>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps}\n</sitemapindex>`;
};

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const searchParams = new URL(request.url).searchParams;
        const section = searchParams.get('section');
        const page = Number(searchParams.get('page') ?? '1');
        const chunks = getSitemapChunks(await buildSitemapEntriesBySection());

        if (!isSitemapSection(section)) {
          return new Response(generateSitemapIndex(chunks), {
            headers: xmlHeaders,
          });
        }

        const chunk = chunks.find(
          (candidate) =>
            candidate.section === section && candidate.page === page
        );

        if (!chunk) {
          return new Response('Sitemap not found', {
            status: 404,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          });
        }

        // One `<loc>` per locale rather than alternates alone: an alternate-only
        // URL is discoverable, but Search Console reports it as having no
        // referring sitemap, which weakens the discovery signal for every
        // non-default locale.
        const xml = generateSitemap(chunk.entries, {
          siteUrl,
          entryPerLocale: true,
        });
        return new Response(xml, { headers: xmlHeaders });
      },
    },
  },
});
