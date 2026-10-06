import {
  App_Admin_Path,
  App_Affiliation_Path,
  App_Auth_Path,
  App_Dashboard_Analytics_Path,
  App_Dashboard_Assets_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_IDE_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Profile_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Scanner_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_Translate_Path,
  App_Init_Path,
  App_NotFound_Path,
  App_Onboarding_Path,
  App_Origin,
} from '@intlayer/design-system/routes';
import { buildRobotsTxt } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { getMultilingualUrls } from 'intlayer';

/**
 * Paths a signed-out crawler can only ever receive an empty app shell for.
 *
 * Leaving them crawlable produced hundreds of near-duplicate, content-less URLs
 * — every dashboard route answers with the same `Project | Dashboard` title —
 * which is why none of them belongs in `routes/sitemap[.]xml.ts` either.
 */
const PRIVATE_PATHS = [
  App_NotFound_Path,
  App_Init_Path,
  App_Auth_Path,
  App_Admin_Path,
  App_Onboarding_Path,
  App_Affiliation_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_Translate_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Profile_Path,
  App_Dashboard_IDE_Path,
  App_Dashboard_Scanner_Path,
  App_Dashboard_Assets_Path,
  App_Dashboard_Analytics_Path,
];

/** Absolute origin of the dashboard, without a trailing slash. */
const SITE_URL = (import.meta.env.VITE_SITE_URL || App_Origin).replace(
  /\/$/,
  ''
);

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
