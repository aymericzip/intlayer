import {
  App_Demo_Path,
  App_Origin,
  App_Pricing_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { generateSitemap, type SitemapUrlEntry } from 'intlayer';
import { IS_SELF_HOSTED } from '#utils/selfHosted';

const siteUrl = (import.meta.env.VITE_SITE_URL || App_Origin).replace(
  /\/$/,
  ''
);

/**
 * The only pages an anonymous crawler gets real content for.
 *
 * Deliberately absent, do not re-add:
 * - `App_Home_Path` — 307s to the demo (or the dashboard), and a sitemap must
 *   only submit final URLs.
 * - Auth, onboarding, affiliation, dashboard and admin pages — disallowed by
 *   `routes/robots[.]txt.ts` (an empty app shell for a signed-out crawler), and
 *   a sitemap must never submit a URL robots.txt blocks.
 *
 * Both are cloud-only: a self-hosted instance redirects them home, so its
 * sitemap is empty.
 */
const sitemapConfig: SitemapUrlEntry[] = IS_SELF_HOSTED
  ? []
  : [
      { path: App_Demo_Path, changefreq: 'monthly', priority: 1.0 },
      { path: App_Pricing_Path, changefreq: 'monthly', priority: 0.8 },
    ];

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(sitemapConfig, {
          siteUrl,
          // One `<loc>` per locale rather than alternates alone: an
          // alternate-only URL is discoverable, but Search Console reports it
          // as having no referring sitemap.
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
