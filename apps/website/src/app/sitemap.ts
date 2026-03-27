import {
  Website_Blog_Search_Path,
  Website_CMS_Path,
  Website_Contributors_Path,
  Website_Demo_Path,
  Website_Doc_Path,
  Website_Doc_Search,
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
import { getMultilingualUrls } from 'intlayer';
import type { MetadataRoute } from 'next';

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
      url: `${process.env.NEXT_PUBLIC_URL}${Website_Home_Path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${Website_Home_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${Website_Home_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${Website_Contributors_Path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.2,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${Website_Contributors_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${Website_Contributors_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${Website_CMS_Path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${Website_CMS_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${Website_CMS_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${Website_TMS_Path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${Website_TMS_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${Website_TMS_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${Website_Demo_Path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${Website_Demo_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${Website_Demo_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${Website_Playground_Path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${Website_Playground_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${Website_Playground_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${Website_Scanner_Path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${Website_Scanner_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${Website_Scanner_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${Website_Doc_Path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${Website_Doc_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${Website_Doc_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${Website_FrequentQuestions_Path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${Website_FrequentQuestions_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${Website_FrequentQuestions_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${Website_NotFound_Path}`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${Website_NotFound_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${Website_NotFound_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${Website_Doc_Search}`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${Website_Doc_Search}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${Website_Doc_Search}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${Website_Blog_Search_Path}`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${Website_Blog_Search_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${Website_Blog_Search_Path}`,
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
