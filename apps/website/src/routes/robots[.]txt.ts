import {
  Website_Domain,
  Website_NotFound_Path,
  Website_Origin,
  WellKnown_AiCatalog_Path,
} from '@intlayer/design-system/routes';
import { buildRobotsTxt } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { getMultilingualUrls } from 'intlayer';

const getAllUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () => {
        const siteUrl = (
          import.meta.env.VITE_URL ||
          import.meta.env.VITE_SITE_URL ||
          Website_Origin
        ).replace(/\/$/, '');

        const robotsTxt = buildRobotsTxt({
          disallowedPaths: getAllUrls([Website_NotFound_Path]),
          // Only this host's sitemap: a sitemap may only submit URLs of its
          // own host, and every subdomain advertises its own in its robots.txt.
          sitemapUrl: `${siteUrl}/sitemap.xml`,
          trailingLines: [
            // Points agents at the ARD capability manifest. Kept a comment:
            // unlike `Content-Signal`, nothing consumes an `Agentmap` directive,
            // and the manifest is already advertised by the
            // `Link: rel="ai-catalog"` header and its well-known path.
            `# Agentmap: https://${Website_Domain}${WellKnown_AiCatalog_Path}`,
          ],
        });

        return new Response(robotsTxt, {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      },
    },
  },
});
