import { getMultilingualUrls } from 'intlayer';

const SITE_URL = process.env.SITE_URL ?? 'http://localhost:3000';

/**
 * `getMultilingualUrls` expands each sensitive path into every localized
 * spelling, so a `Disallow` rule cannot be bypassed through a locale prefix.
 */
const disallowedPaths = ['/admin', '/private'].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      '',
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain' } }
  );
