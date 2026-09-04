import type { APIRoute } from 'astro';
import { generateSitemap, type SitemapUrlEntry } from 'intlayer';

const pathList: SitemapUrlEntry[] = [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/lit', changefreq: 'monthly', priority: 0.7 },
  { path: '/preact', changefreq: 'monthly', priority: 0.7 },
  { path: '/react', changefreq: 'monthly', priority: 0.7 },
  { path: '/solid', changefreq: 'monthly', priority: 0.7 },
  { path: '/svelte', changefreq: 'monthly', priority: 0.7 },
  { path: '/vanilla', changefreq: 'monthly', priority: 0.7 },
  { path: '/vue', changefreq: 'monthly', priority: 0.7 },
];

export const GET: APIRoute = async ({ site }) => {
  const SITE_URL = (
    import.meta.env.SITE ??
    site?.href ??
    'http://localhost:4321'
  ).replace(/\/$/, '');

  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
