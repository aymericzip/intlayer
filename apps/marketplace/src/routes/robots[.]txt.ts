import {
  App_NotFound_Path,
  Marketplace_Dashboard_Path,
  Marketplace_Origin,
} from '@intlayer/design-system/routes';
import { buildRobotsTxt } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { getMultilingualUrls } from 'intlayer';

const PRIVATE_PATHS = [App_NotFound_Path, Marketplace_Dashboard_Path];

/**
 * Canonical marketplace origin. Not read from `VITE_SITE_URL`: production
 * builds were baked with a local value (`http://localhost:3300`).
 */
const SITE_URL = Marketplace_Origin;

/**
 * Expands every path into its localized variants, so `/fr/admin` is disallowed
 * alongside `/admin` — a `Disallow` matches a URL prefix, not a route.
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
