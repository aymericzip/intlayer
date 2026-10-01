import {
  Marketplace_Dashboard_Path,
  Marketplace_Root_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { generateSitemap, type SitemapUrlEntry } from 'intlayer';

const siteUrl = (
  import.meta.env.VITE_SITE_URL ?? 'https://marketplace.intlayer.org'
).replace(/\/$/, '');

const sitemapConfig: SitemapUrlEntry[] = [
  { path: Marketplace_Root_Path, changefreq: 'daily', priority: 1.0 },
  { path: Marketplace_Dashboard_Path, changefreq: 'weekly', priority: 0.8 },
];

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(sitemapConfig, {
          siteUrl,
          entryPerLocale: true,
        });

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'X-Robots-Tag': 'noindex, follow',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
          },
        });
      },
    },
  },
});
