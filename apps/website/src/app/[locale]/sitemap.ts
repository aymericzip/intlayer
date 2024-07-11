import type { MetadataRoute } from 'next';
import { PagesRoutes } from '@/Routes';

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
];

export default sitemap;
