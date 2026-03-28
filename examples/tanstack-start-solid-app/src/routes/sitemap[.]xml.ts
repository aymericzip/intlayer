import { createFileRoute } from '@tanstack/solid-router';
import { getMultilingualUrls } from 'intlayer';

const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? 'http://localhost:3000'
).replace(/\/$/, '');

const buildEntry = (
  path: string,
  opts: { changefreq: string; priority: number; lastmod?: string }
): string => {
  const fullUrl = `${SITE_URL}${path}`;
  const alternates = getMultilingualUrls(path);

  const hreflangLinks = [
    ...Object.entries(alternates).map(
      ([lang, localePath]) =>
        `    <xhtml:link rel="alternate" hrefLang="${lang}" href="${SITE_URL}${localePath}"/>`
    ),
    `    <xhtml:link rel="alternate" hrefLang="x-default" href="${fullUrl}"/>`,
  ].join('\n');

  return [
    '  <url>',
    `    <loc>${fullUrl}</loc>`,
    opts.lastmod ? `    <lastmod>${opts.lastmod}</lastmod>` : null,
    `    <changefreq>${opts.changefreq}</changefreq>`,
    `    <priority>${opts.priority}</priority>`,
    hreflangLinks,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n');
};

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries = [
          buildEntry('/', {
            changefreq: 'daily',
            priority: 1.0,
          }),
          buildEntry('/about', {
            changefreq: 'monthly',
            priority: 0.8,
          }),
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${staticEntries.join('\n')}
</urlset>`;

        return new Response(sitemap, {
          headers: { 'Content-Type': 'application/xml' },
        });
      },
    },
  },
});
