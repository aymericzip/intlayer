import { createFileRoute } from '@tanstack/react-router';
import { generateSitemap } from 'intlayer';
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

/** URL of the child sitemap holding one section. `&` never appears in it. */
const getSectionSitemapUrl = (section: SitemapSection): string =>
  `${siteUrl}/sitemap.xml?section=${section}`;

/**
 * Builds the sitemap index pointing at each section's child sitemap, with the
 * most recent `lastmod` of that section.
 */
const generateSitemapIndex = (
  lastmodBySection: Record<SitemapSection, string | undefined>
): string => {
  const sitemaps = sitemapSections
    .map((section) => {
      const lastmod = lastmodBySection[section];
      return [
        '  <sitemap>',
        `    <loc>${getSectionSitemapUrl(section)}</loc>`,
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
        const section = new URL(request.url).searchParams.get('section');
        const entriesBySection = await buildSitemapEntriesBySection();

        if (isSitemapSection(section)) {
          // One `<loc>` per locale rather than alternates alone: an
          // alternate-only URL is discoverable, but Search Console reports it
          // as having no referring sitemap, which weakens the discovery signal
          // for every non-default locale.
          const xml = generateSitemap(entriesBySection[section], {
            siteUrl,
            entryPerLocale: true,
          });
          return new Response(xml, { headers: xmlHeaders });
        }

        const lastmodBySection = Object.fromEntries(
          sitemapSections.map((sitemapSection) => [
            sitemapSection,
            entriesBySection[sitemapSection]
              .map((entry) => entry.lastmod)
              .filter((lastmod): lastmod is string => Boolean(lastmod))
              .sort()
              .at(-1),
          ])
        ) as Record<SitemapSection, string | undefined>;

        return new Response(generateSitemapIndex(lastmodBySection), {
          headers: xmlHeaders,
        });
      },
    },
  },
});
