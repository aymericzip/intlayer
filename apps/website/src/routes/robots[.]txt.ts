import { Website_NotFound_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { getMultilingualUrls } from 'intlayer';

const getAllUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

/**
 * Content Signals declaring how Intlayer's content may be reused.
 *
 * The documentation is Apache-2.0 licensed and deliberately published for
 * machine consumption (llms.txt, the MCP server and the agent skills index), so
 * every signal is granted. Flip a value to `no` here to withdraw a permission.
 *
 * - `search`   — indexing for traditional search results.
 * - `ai-input` — retrieval to ground an AI answer (RAG, AI Overviews, chat).
 * - `ai-train` — retention in a generative model's training corpus.
 *
 * @see https://contentsignals.org/
 */
const CONTENT_SIGNALS = {
  search: 'yes',
  'ai-input': 'yes',
  'ai-train': 'yes',
} as const;

/**
 * Serializes the Content Signals into a single robots.txt directive.
 *
 * @returns e.g. `Content-Signal: search=yes, ai-input=yes, ai-train=yes`
 */
const getContentSignalDirective = (): string =>
  `Content-Signal: ${Object.entries(CONTENT_SIGNALS)
    .map(([signal, value]) => `${signal}=${value}`)
    .join(', ')}`;

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () => {
        const disallow = getAllUrls([Website_NotFound_Path]);
        const siteUrl =
          import.meta.env.VITE_URL ?? import.meta.env.VITE_SITE_URL ?? '';
        const cmsUrl = import.meta.env.VITE_CMS_URL ?? '';

        let text = 'User-agent: *\n';
        // Must sit inside the User-agent block it applies to.
        text += `${getContentSignalDirective()}\n`;
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
