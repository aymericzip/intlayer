import { getMultilingualUrls } from 'intlayer';
import type { MetadataRoute } from 'next';
import { PagesRoutes } from '@/Routes';

const getAllUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: ['/'],
    disallow: getAllUrls([PagesRoutes.NotFound]),
  },
  host: process.env.NEXT_PUBLIC_URL,
  sitemap: [
    `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
    `${process.env.NEXT_PUBLIC_CMS_URL}/sitemap.xml`,
  ],
});

export default robots;
