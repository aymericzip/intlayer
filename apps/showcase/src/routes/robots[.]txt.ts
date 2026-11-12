import { App_NotFound_Path } from '@intlayer/design-system/routes';
import { buildRobotsTxt } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { getMultilingualUrls } from 'intlayer';
import { SITE_URL } from '#/lib/site';

/** Paths kept out of the index: the not-found page shares the app's `/404`. */
const PRIVATE_PATHS = [App_NotFound_Path];

/**
 * Expands every path into its localized variants, so `/fr/404` is disallowed
 * alongside `/404` — a `Disallow` matches a URL prefix, not a route.
 *
 * @param paths - The unprefixed paths to disallow.
 * @returns Every localized URL to list under `Disallow`.
 */
const getAllUrls = (paths: string[]): string[] =>
  paths.flatMap((path) => Object.values(getMultilingualUrls(path)) as string[]);

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () =>
        new Response(
          buildRobotsTxt({
            disallowedPaths: getAllUrls(PRIVATE_PATHS),
            sitemapUrl: `${SITE_URL}/sitemap.xml`,
          }),
          { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
        ),
    },
  },
});
