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
  App_NotFound_Path,
  App_Onboarding_Path,
} from '@intlayer/design-system/routes';
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
      GET: () => {
        const siteUrl = (
          import.meta.env.VITE_SITE_URL ?? 'https://app.intlayer.org'
        ).replace(/\/$/, '');

        // Kept in path order — every locale of a path listed together — so the
        // file stays readable next to `PRIVATE_PATHS`.
        const disallowedUrls = [...new Set(getAllUrls(PRIVATE_PATHS))];

        let text = 'User-agent: *\n';
        text += 'Allow: /\n';
        for (const url of disallowedUrls) {
          text += `Disallow: ${url}\n`;
        }
        text += `Host: ${siteUrl}\n`;
        text += `Sitemap: ${siteUrl}/sitemap.xml\n`;

        return new Response(text, {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      },
    },
  },
});
