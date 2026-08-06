import type { APIEvent } from '@solidjs/start/server';
import { generateSitemap } from 'intlayer';

const SITE_URL = process.env.SITE_URL ?? 'http://localhost:3000';

/**
 * `generateSitemap` expands every path into one entry per locale and wires the
 * `xhtml:link` alternates between them, so the sitemap only has to list the
 * canonical, locale-free paths.
 */
export const GET = (_event: APIEvent) => {
  const sitemap = generateSitemap(
    [
      { path: '/', changefreq: 'daily', priority: 1.0 },
      { path: '/about', changefreq: 'monthly', priority: 0.8 },
    ],
    { siteUrl: SITE_URL }
  );

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
