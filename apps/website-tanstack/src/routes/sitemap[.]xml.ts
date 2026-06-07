import { createFileRoute } from '@tanstack/react-router';
import { generateSitemap } from 'intlayer';
import { buildSitemapEntries } from '~/siteRoutes';

const siteUrl = (import.meta.env.VITE_URL as string).replace(/\/$/, '');

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const data = await buildSitemapEntries();
        const xml = generateSitemap(data, { siteUrl });
        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'X-Robots-Tag': 'noindex, follow',
          },
        });
      },
    },
  },
});
