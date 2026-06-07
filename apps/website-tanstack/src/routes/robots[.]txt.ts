import { Website_NotFound_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { getMultilingualUrls } from 'intlayer';

const getAllUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () => {
        const disallow = getAllUrls([Website_NotFound_Path]);
        const siteUrl = import.meta.env.VITE_URL as string;
        const cmsUrl = import.meta.env.VITE_CMS_URL as string;

        let text = 'User-agent: *\n';
        text += 'Allow: /\n';
        for (const path of disallow) {
          text += `Disallow: ${path}\n`;
        }
        if (siteUrl) text += `Host: ${siteUrl}\n`;
        text += `Sitemap: ${siteUrl}/sitemap.xml\n`;
        if (cmsUrl) text += `Sitemap: ${cmsUrl}/sitemap.xml\n`;

        return new Response(text, {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      },
    },
  },
});
