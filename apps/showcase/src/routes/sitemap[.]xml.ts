import { getIntlayerAPI } from '@intlayer/api';
import {
  Showcase_Root_Path,
  Showcase_Submit_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { generateSitemap, type SitemapUrlEntry } from 'intlayer';
import { SITE_URL } from '#/lib/site';

/** Projects requested per showcase page. */
const PROJECT_PAGE_SIZE = 100;

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
const toLastmod = (date: string | undefined): string | undefined =>
  date ? new Date(date).toISOString().split('T')[0] : undefined;

/**
 * Builds one entry per showcased project. A rescan refreshes the page, so it
 * dates the entry when there is one.
 */
const getProjectEntries = async (): Promise<SitemapUrlEntry[]> => {
  const { showcaseProject } = getIntlayerAPI();

  const projects = await fetchAllPages((page) =>
    showcaseProject.getShowcaseProjects({ page, pageSize: PROJECT_PAGE_SIZE })
  );

  return projects.map((project) => ({
    path: `/project/${project.id}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: toLastmod(project.lastScanDate ?? project.createdAt),
  }));
};

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: Showcase_Root_Path, changefreq: 'daily', priority: 1.0 },
            {
              path: Showcase_Submit_Path,
              changefreq: 'monthly',
              priority: 0.5,
            },
            ...(await getProjectEntries()),
          ],
          {
            siteUrl: SITE_URL,
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
            // Rebuilt from scratch on every request, and one entry per locale
            // makes it large — a crawler re-fetching it must not recompute it.
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
          },
        });
      },
    },
  },
});
