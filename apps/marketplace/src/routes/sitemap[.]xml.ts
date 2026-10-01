import { getIntlayerAPI } from '@intlayer/api';
import {
  getMarketplaceReviewerRoute,
  Marketplace_Origin,
  Marketplace_Root_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { generateSitemap, type SitemapUrlEntry } from 'intlayer';

/**
 * Canonical marketplace origin. Not read from `VITE_SITE_URL`: production
 * builds were baked with a local value (`http://localhost:3300`).
 */
const siteUrl = Marketplace_Origin;

/** Reviewer profiles requested per marketplace page. */
const REVIEWER_PAGE_SIZE = 100;

/** A page of a paginated backend listing, as the sitemap reads it. */
type PaginatedItems<Item> = {
  data: Item[] | null;
  total_pages: number | null;
};

/**
 * Collects every item of a paginated backend listing.
 *
 * A failing page stops the walk and keeps what was already collected: a
 * partial sitemap beats a 500 that drops every URL.
 *
 * @param fetchPage - Fetches one 1-indexed page.
 * @returns The items of every page fetched.
 */
const fetchAllPages = async <Item>(
  fetchPage: (page: number) => Promise<PaginatedItems<Item>>
): Promise<Item[]> => {
  const items: Item[] = [];

  for (let page = 1; ; page++) {
    try {
      const result = await fetchPage(page);

      items.push(...(result.data ?? []));

      if (page >= (result.total_pages ?? 1)) return items;
    } catch {
      return items;
    }
  }
};

/** Converts a backend date to the `YYYY-MM-DD` form of `<lastmod>`. */
const toLastmod = (date: Date | string | undefined): string | undefined =>
  date ? new Date(date).toISOString().split('T')[0] : undefined;

/**
 * Builds one entry per public reviewer profile.
 *
 * The dashboard is absent on purpose: it is disallowed by
 * `routes/robots[.]txt.ts`, and a sitemap must never submit a URL robots.txt
 * blocks.
 */
const getReviewerEntries = async (): Promise<SitemapUrlEntry[]> => {
  const { reviewer } = getIntlayerAPI();

  const reviewers = await fetchAllPages((page) =>
    reviewer.getMarketplace({ page, pageSize: REVIEWER_PAGE_SIZE })
  );

  return reviewers.map((reviewerProfile) => ({
    path: getMarketplaceReviewerRoute(reviewerProfile.id),
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: toLastmod(reviewerProfile.updatedAt),
  }));
};

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: Marketplace_Root_Path, changefreq: 'daily', priority: 1.0 },
            ...(await getReviewerEntries()),
          ],
          {
            siteUrl,
            // One `<loc>` per locale rather than alternates alone: an
            // alternate-only URL is discoverable, but Search Console reports
            // it as having no referring sitemap.
            entryPerLocale: true,
          }
        );

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'X-Robots-Tag': 'noindex, follow',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
          },
        });
      },
    },
  },
});
