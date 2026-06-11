import {
  Website_Blog_Search_Path,
  Website_CMS_Path,
  Website_Contributors_Path,
  Website_Demo_Path,
  Website_Doc_Path,
  Website_Doc_Search_Path,
  Website_FrequentQuestions_Path,
  Website_Home_Path,
  Website_NotFound_Path,
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
 * Static sitemap entries shared between the sitemap route and prerender config.
 * `lastmod` is omitted here and added dynamically at call time.
 */
export const staticSitemapEntries: Omit<SitemapUrlEntry, 'lastmod'>[] = [
  { path: Website_Home_Path, changefreq: 'monthly', priority: 1 },
  { path: '/llms.txt', changefreq: 'monthly', priority: 0.1 },
  { path: Website_Contributors_Path, changefreq: 'weekly', priority: 0.2 },
  { path: Website_CMS_Path, changefreq: 'monthly', priority: 0.8 },
  { path: Website_TMS_Path, changefreq: 'monthly', priority: 0.8 },
  { path: Website_Demo_Path, changefreq: 'monthly', priority: 0.8 },
  { path: Website_Playground_Path, changefreq: 'monthly', priority: 0.8 },
  { path: Website_Scanner_Path, changefreq: 'monthly', priority: 0.8 },
  { path: Website_Doc_Path, changefreq: 'monthly', priority: 0.8 },
  {
    path: Website_FrequentQuestions_Path,
    changefreq: 'monthly',
    priority: 0.8,
  },
  { path: Website_NotFound_Path, changefreq: 'never', priority: 0.1 },
  { path: Website_Doc_Search_Path, changefreq: 'never', priority: 0.1 },
  { path: Website_Blog_Search_Path, changefreq: 'weekly', priority: 0.7 },
];

/**
 * Static paths eligible for prerendering (excludes utility / error pages).
 * These are paths without a locale prefix — localeFlatMap adds prefixes in vite.config.ts.
 */
export const staticPrerenderPaths: string[] = [
  Website_Home_Path,
  Website_CMS_Path,
  Website_TMS_Path,
  Website_Demo_Path,
  Website_Playground_Path,
  Website_Scanner_Path,
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
    getDocMetadataBySlug([]),
    getBlogMetadataBySlug([]),
    getLegalMetadataBySlug([]),
    getFrequentQuestionMetadataBySlug([]),
  ]);

  return [
    ...staticSitemapEntries.map((e) => ({ ...e, lastmod: now })),
    ...legal.map((legalEl) => ({
      path: legalEl.relativeUrl,
      lastmod: toISO(legalEl.updatedAt),
      changefreq: 'monthly',
      priority: 0.1,
    })),
    ...docs.map((doc) => ({
      path: doc.relativeUrl,
      lastmod: toISO(doc.updatedAt),
      changefreq: 'monthly',
      priority: 1,
    })),
    ...blogs.map((blog) => ({
      path: blog.relativeUrl,
      lastmod: toISO(blog.updatedAt),
      changefreq: 'monthly',
      priority: 0.8,
    })),
    ...frequentQuestions.map((faq) => ({
      path: faq.relativeUrl,
      lastmod: toISO(faq.updatedAt),
      changefreq: 'monthly',
      priority: 0.4,
    })),
  ];
}

/**
 * Returns all dynamic route paths (docs, blogs, FAQ, legal) for use in vite.config.ts prerendering.
 * Paths use the default locale (no prefix) — localeFlatMap adds locale prefixes.
 */
export async function buildDynamicPrerenderPaths(): Promise<string[]> {
  const [docs, blogs, legal, frequentQuestions] = await Promise.all([
    getDocMetadataBySlug([]),
    getBlogMetadataBySlug([]),
    getLegalMetadataBySlug([]),
    getFrequentQuestionMetadataBySlug([]),
  ]);

  return [
    ...docs.map((d) => d.relativeUrl),
    ...blogs.map((b) => b.relativeUrl),
    ...legal.map((l) => l.relativeUrl),
    ...frequentQuestions.map((f) => f.relativeUrl),
  ];
}
