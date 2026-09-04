import {
  Website_Blog_Path,
  Website_CMS_Path,
  Website_Contributors_Path,
  Website_Demo_Path,
  Website_Doc_Path,
  Website_FrequentQuestions_Path,
  Website_Home_Path,
  Website_Markdown_Path,
  Website_MessageConverter_Path,
  Website_Playground_Path,
  Website_Scanner_Path,
  Website_TMS_Path,
} from '@intlayer/design-system/routes';
import {
  getBlogMetadataBySlug,
  getDocMetadataBySlug,
  getFrequentQuestionMetadataBySlug,
  getLegalMetadataBySlug,
} from '@intlayer/docs';
import type { SitemapUrlEntry } from 'intlayer';

const toISO = (date: Date | string): string =>
  date instanceof Date ? date.toISOString() : date;

/**
 * Keeps only the files exposed as their own page.
 *
 * A markdown file without `slugs` front matter — `readme.md`, or a page still
 * being drafted — resolves to a `relativeUrl` of `/`, which would otherwise
 * duplicate the home page in the sitemap and in the prerender list.
 *
 * @param filesMetadata - Metadata of every file of a documentation section.
 * @returns The metadata of the files owning a dedicated URL.
 */
const filterRoutableFiles = <FileMetadataType extends { slugs: string[] }>(
  filesMetadata: FileMetadataType[]
): FileMetadataType[] =>
  filesMetadata.filter((fileMetadata) => fileMetadata.slugs.length > 0);

/**
 * Drops entries whose path was already emitted, keeping the first occurrence.
 *
 * A path can legitimately appear in two sources — a static entry that is also a
 * documentation page, a doc and an FAQ resolving to the same slug — and a
 * duplicated `<loc>` makes search engines pick between two conflicting
 * `lastmod` values.
 *
 * @param entries - The concatenated sitemap entries, most authoritative first.
 * @returns The entries with a unique path each.
 */
const dedupeEntriesByPath = (entries: SitemapUrlEntry[]): SitemapUrlEntry[] => {
  const seenPaths = new Set<string>();

  return entries.filter((entry) => {
    if (seenPaths.has(entry.path)) return false;

    seenPaths.add(entry.path);
    return true;
  });
};

/**
 * Rebuilds the locale-neutral path of a content file.
 *
 * `relativeUrl` is localized as it is built — `getLocalizedUrl(path, 'en')` —
 * so it carries an `/en` prefix on every build whose default locale is not
 * English, which is the case of the Chinese deployment. The prerender list then
 * prefixes it a second time, baking `/en/doc/...` and `/en/en/doc/...` while no
 * page of the default locale is prerendered at all. Deriving the path from the
 * slugs keeps it canonical whatever the default locale of the build, which is
 * what both consumers below expect.
 *
 * @param fileMetadata - Metadata of a routable documentation file.
 * @returns The path below the site root, e.g. `/doc/environment/nextjs`.
 */
const toCanonicalPath = ({ slugs }: { slugs: string[] }): string =>
  `/${slugs.join('/')}`;

/**
 * Static sitemap entries shared between the sitemap route and prerender config.
 * `lastmod` is omitted here and added dynamically at call time.
 *
 * Deliberately absent, do not re-add:
 * - `Website_NotFound_Path` — disallowed by `routes/robots[.]txt.ts`, and a
 *   sitemap must never submit a URL robots.txt blocks.
 * - `Website_Doc_Search_Path` — an internal search result page, which Google's
 *   guidelines ask to keep out of the index.
 * - `Website_Doc_Path` — `/doc/get-started` is already emitted by the docs
 *   metadata below, with a real `lastmod` rather than the build time.
 */
export const staticSitemapEntries: Omit<SitemapUrlEntry, 'lastmod'>[] = [
  { path: Website_Home_Path, changefreq: 'monthly', priority: 1 },
  { path: '/llms.txt', changefreq: 'monthly', priority: 0.1 },
  { path: Website_Contributors_Path, changefreq: 'weekly', priority: 0.2 },
  { path: Website_CMS_Path, changefreq: 'monthly', priority: 0.8 },
  { path: Website_TMS_Path, changefreq: 'monthly', priority: 0.8 },
  { path: Website_Markdown_Path, changefreq: 'monthly', priority: 0.8 },
  { path: Website_Demo_Path, changefreq: 'monthly', priority: 0.8 },
  { path: Website_Playground_Path, changefreq: 'monthly', priority: 0.8 },
  { path: Website_Scanner_Path, changefreq: 'monthly', priority: 0.8 },
  { path: Website_MessageConverter_Path, changefreq: 'monthly', priority: 0.8 },
  {
    path: Website_FrequentQuestions_Path,
    changefreq: 'monthly',
    priority: 0.8,
  },
  { path: Website_Blog_Path, changefreq: 'weekly', priority: 0.7 },
];

/**
 * Static paths eligible for prerendering (excludes utility / error pages).
 * These are paths without a locale prefix — localeFlatMap adds prefixes in vite.config.ts.
 */
export const staticPrerenderPaths: string[] = [
  Website_Home_Path,
  Website_CMS_Path,
  Website_TMS_Path,
  Website_Markdown_Path,
  Website_Demo_Path,
  Website_Playground_Path,
  Website_Scanner_Path,
  Website_MessageConverter_Path,
  Website_Doc_Path,
  Website_FrequentQuestions_Path,
  Website_Contributors_Path,
];

/**
 * Builds the full list of sitemap entries including dynamic docs / blog / FAQ / legal pages.
 */
export async function buildSitemapEntries(): Promise<SitemapUrlEntry[]> {
  const now = new Date().toISOString();

  const [docs, blogs, legal, frequentQuestions] = await Promise.all([
    getDocMetadataBySlug([]).then(filterRoutableFiles),
    getBlogMetadataBySlug([]).then(filterRoutableFiles),
    getLegalMetadataBySlug([]).then(filterRoutableFiles),
    getFrequentQuestionMetadataBySlug([]).then(filterRoutableFiles),
  ]);

  return dedupeEntriesByPath([
    ...staticSitemapEntries.map((e) => ({ ...e, lastmod: now })),
    ...legal.map((legalEl) => ({
      path: toCanonicalPath(legalEl),
      lastmod: toISO(legalEl.updatedAt),
      changefreq: 'monthly',
      priority: 0.1,
    })),
    ...docs.map((doc) => ({
      path: toCanonicalPath(doc),
      lastmod: toISO(doc.updatedAt),
      changefreq: 'monthly',
      priority: 1,
    })),
    ...blogs.map((blog) => ({
      path: toCanonicalPath(blog),
      lastmod: toISO(blog.updatedAt),
      changefreq: 'monthly',
      priority: 0.8,
    })),
    ...frequentQuestions.map((faq) => ({
      path: toCanonicalPath(faq),
      lastmod: toISO(faq.updatedAt),
      changefreq: 'monthly',
      priority: 0.4,
    })),
  ]);
}

/**
 * Returns all dynamic route paths (docs, blogs, FAQ, legal) for use in vite.config.ts prerendering.
 * Paths are canonical — no locale prefix — as `localeFlatMap` in
 * `vite.config.ts` prefixes each of them once per locale.
 */
export async function buildDynamicPrerenderPaths(): Promise<string[]> {
  const [docs, blogs, legal, frequentQuestions] = await Promise.all([
    getDocMetadataBySlug([]).then(filterRoutableFiles),
    getBlogMetadataBySlug([]).then(filterRoutableFiles),
    getLegalMetadataBySlug([]).then(filterRoutableFiles),
    getFrequentQuestionMetadataBySlug([]).then(filterRoutableFiles),
  ]);

  return [
    ...docs.map(toCanonicalPath),
    ...blogs.map(toCanonicalPath),
    ...legal.map(toCanonicalPath),
    ...frequentQuestions.map(toCanonicalPath),
  ];
}
