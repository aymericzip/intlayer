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
import { generateSitemap, type SitemapUrlEntry } from 'intlayer';

const siteUrl = (
  import.meta.env?.VITE_SITE_URL ??
  import.meta.env.VITE_SITE_URL ??
  import.meta.env.VITE_URL ??
  'https://intlayer.org'
).replace(/\/$/, '');

const sitemap = async (): Promise<SitemapUrlEntry[]> => {
  const docs = await getDocMetadataBySlug([]);
  const blob = await getBlogMetadataBySlug([]);
  const legal = await getLegalMetadataBySlug([]);
  const frequentQuestions = await getFrequentQuestionMetadataBySlug([]);

  const legalSitemap: SitemapUrlEntry[] = legal.map((legal) => ({
    path: legal.relativeUrl,
    lastmod:
      (legal.updatedAt as Date | string) instanceof Date
        ? (legal.updatedAt as any as Date).toISOString()
        : legal.updatedAt,
    changefreq: 'monthly',
    priority: 0.1,
  }));

  const docSitemap: SitemapUrlEntry[] = docs.map((doc) => ({
    path: doc.relativeUrl,
    lastmod:
      (doc.updatedAt as Date | string) instanceof Date
        ? (doc.updatedAt as any as Date).toISOString()
        : doc.updatedAt,
    changefreq: 'monthly',
    priority: 1,
  }));

  const blogSitemap: SitemapUrlEntry[] = blob.map((blog) => ({
    path: blog.relativeUrl,
    lastmod:
      (blog.updatedAt as Date | string) instanceof Date
        ? (blog.updatedAt as any as Date).toISOString()
        : blog.updatedAt,
    changefreq: 'monthly',
    priority: 0.8,
  }));

  const frequentQuestionSitemap: SitemapUrlEntry[] = frequentQuestions.map(
    (frequentQuestion) => ({
      path: frequentQuestion.relativeUrl,
      lastmod:
        (frequentQuestion.updatedAt as Date | string) instanceof Date
          ? (frequentQuestion.updatedAt as any as Date).toISOString()
          : frequentQuestion.updatedAt,
      changefreq: 'monthly',
      priority: 0.4,
    })
  );

  const now = new Date().toISOString();

  return [
    {
      path: Website_Home_Path,
      lastmod: now,
      changefreq: 'monthly',
      priority: 1,
    },
    {
      path: '/llms.txt',
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.1,
    },
    {
      path: Website_Contributors_Path,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.2,
    },
    {
      path: Website_CMS_Path,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      path: Website_TMS_Path,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      path: Website_Demo_Path,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      path: Website_Playground_Path,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      path: Website_Scanner_Path,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      path: Website_Doc_Path,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      path: Website_FrequentQuestions_Path,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      path: Website_NotFound_Path,
      lastmod: now,
      changefreq: 'never',
      priority: 0.1,
    },
    {
      path: Website_Doc_Search_Path,
      lastmod: now,
      changefreq: 'never',
      priority: 0.1,
    },
    {
      path: Website_Blog_Search_Path,
      lastmod: now,
      changefreq: 'never',
      priority: 0.1,
    },
    ...legalSitemap,
    ...docSitemap,
    ...blogSitemap,
    ...frequentQuestionSitemap,
  ];
};

export async function loader() {
  const data = await sitemap();
  const xml = generateSitemap(data, { siteUrl });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Robots-Tag': 'noindex, follow',
    },
  });
}
