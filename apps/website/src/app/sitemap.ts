import {
  getBlogMetadataBySlug,
  getDocMetadataBySlug,
  getFrequentQuestionMetadataBySlug,
  getLegalMetadataBySlug,
} from '@intlayer/docs';
import { getMultilingualUrls } from 'intlayer';
import type { MetadataRoute } from 'next';
import { PagesRoutes } from '@/Routes';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const docs = await getDocMetadataBySlug([]);
  const blob = await getBlogMetadataBySlug([]);
  const legal = await getLegalMetadataBySlug([]);
  const frequentQuestions = await getFrequentQuestionMetadataBySlug([]);

  const legalSitemap: MetadataRoute.Sitemap = legal.map((legal) => ({
    url: legal.url,
    lastModified: legal.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.1,
    alternates: {
      languages: {
        ...getMultilingualUrls(legal.url),
        'x-default': legal.url,
      },
    },
  }));

  const docSitemap: MetadataRoute.Sitemap = docs.map((doc) => ({
    url: doc.url,
    lastModified: doc.updatedAt,
    changeFrequency: 'monthly',
    priority: 1,
    alternates: {
      languages: {
        ...getMultilingualUrls(doc.url),
        'x-default': doc.url,
      },
    },
  }));

  const blogSitemap: MetadataRoute.Sitemap = blob.map((blog) => ({
    url: blog.url,
    lastModified: blog.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        ...getMultilingualUrls(blog.url),
        'x-default': blog.url,
      },
    },
  }));

  const frequentQuestionSitemap: MetadataRoute.Sitemap = frequentQuestions.map(
    (frequentQuestion) => ({
      url: frequentQuestion.url,
      lastModified: frequentQuestion.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.4,
      alternates: {
        languages: {
          ...getMultilingualUrls(frequentQuestion.url),
          'x-default': frequentQuestion.url,
        },
      },
    })
  );

  return [
    {
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Home}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Home}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Home}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Contributors}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.2,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Contributors}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Contributors}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.CMS}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.CMS}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.CMS}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Demo}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Demo}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Demo}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Playground}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Playground}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Playground}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Scanner}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Scanner}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Scanner}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.FrequentQuestions}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.FrequentQuestions}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.FrequentQuestions}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.NotFound}`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.NotFound}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.NotFound}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Search}`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Search}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Search}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Blog_Search}`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Blog_Search}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Blog_Search}`,
        },
      },
    },
    ...legalSitemap,
    ...docSitemap,
    ...blogSitemap,
    ...frequentQuestionSitemap,
  ];
};

export default sitemap;
