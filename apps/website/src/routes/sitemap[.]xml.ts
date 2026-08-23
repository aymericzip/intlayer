import { createFileRoute } from '@tanstack/react-router';
import { generateSitemap } from 'intlayer';
import { buildSitemapEntries } from '~/siteRoutes';

const siteUrl = (
  import.meta.env.VITE_SITE_URL ??
  import.meta.env.VITE_URL ??
  'https://intlayer.org'
).replace(/\/$/, '');

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const data = await buildSitemapEntries();
        // One `<loc>` per locale rather than alternates alone: an
        // alternate-only URL is discoverable, but Search Console reports it as
        // having no referring sitemap, which weakens the discovery signal for
        // every non-default locale.
        const xml = generateSitemap(data, { siteUrl, entryPerLocale: true });
        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'X-Robots-Tag': 'noindex, follow',
            // Rebuilt from scratch on every request, and one entry per locale
            // makes it large — a crawler re-fetching it must not recompute it.
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
          },
        });
      },
    },
  },
});
