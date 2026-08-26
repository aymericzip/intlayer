import { Website_NotFound_Path } from '@intlayer/design-system/routes';
import { getMultilingualUrls } from 'intlayer';

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

const getAllUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

/**
 * Serializes the Content Signals into a single robots.txt directive.
 *
 * @returns e.g. `Content-Signal: search=yes, ai-input=yes, ai-train=yes`
 */
const getContentSignalDirective = (): string =>
  `Content-Signal: ${Object.entries(CONTENT_SIGNALS)
    .map(([signal, value]) => `${signal}=${value}`)
    .join(', ')}`;

/**
 * Serves robots.txt.
 *
 * Hand-rolled rather than generated from `MetadataRoute.Robots`, because that
 * helper can only emit the directives Next.js knows about and would silently
 * drop the `Content-Signal` line.
 *
 * @returns `text/plain` robots.txt.
 */
export const GET = (): Response => {
  const disallowedPaths = getAllUrls([Website_NotFound_Path]);
  const siteUrl = process.env.NEXT_PUBLIC_URL;
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL;

  const lines: string[] = [
    'User-agent: *',
    // Must sit inside the User-agent block it applies to.
    getContentSignalDirective(),
    'Allow: /',
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    '',
  ];

  if (siteUrl) lines.push(`Host: ${siteUrl}`);
  if (siteUrl) lines.push(`Sitemap: ${siteUrl}/sitemap.xml`);
  if (cmsUrl) lines.push(`Sitemap: ${cmsUrl}/sitemap.xml`);

  return new Response(`${lines.join('\n')}\n`, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
