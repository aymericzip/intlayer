import { getDocArray } from '@components/DocPage/docData';
import type { MetadataRoute } from 'next';
import { PagesRoutes } from '@/Routes';

const docs = getDocArray();

const docSitemap: MetadataRoute.Sitemap = docs.map((doc) => ({
  url: `${process.env.NEXT_PUBLIC_URL}${doc.url}`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.7,
  alternates: {
    languages: {
      es: `${process.env.NEXT_PUBLIC_URL}/es${doc.url}`,
      fr: `${process.env.NEXT_PUBLIC_URL}/fr${doc.url}`,
    },
  },
}));

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Home}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}/es${PagesRoutes.Home}`,
        fr: `${process.env.NEXT_PUBLIC_URL}/fr${PagesRoutes.Home}`,
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
        es: `${process.env.NEXT_PUBLIC_URL}/es${PagesRoutes.Demo}`,
        fr: `${process.env.NEXT_PUBLIC_URL}/fr${PagesRoutes.Demo}`,
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
        es: `${process.env.NEXT_PUBLIC_URL}/es${PagesRoutes.Doc}`,
        fr: `${process.env.NEXT_PUBLIC_URL}/fr${PagesRoutes.Doc}`,
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
        es: `${process.env.NEXT_PUBLIC_URL}/es${PagesRoutes.NotFound}`,
        fr: `${process.env.NEXT_PUBLIC_URL}/fr${PagesRoutes.NotFound}`,
      },
    },
  },
  ...docSitemap,
];

export default sitemap;
