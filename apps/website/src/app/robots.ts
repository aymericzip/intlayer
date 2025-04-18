import { getMultilingualUrls } from 'intlayer';
import type { MetadataRoute } from 'next';
import { PagesRoutes } from '@/Routes';

const getAllUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: ['/', ...getAllUrls([PagesRoutes.Dashboard])],
    disallow: getAllUrls([
      PagesRoutes.NotFound,
      PagesRoutes.Auth_ResetPassword,
      PagesRoutes.Auth_ChangePassword,
      `${PagesRoutes.Dashboard}/`,
    ]),
  },
  host: process.env.NEXT_PUBLIC_URL,
  sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
});

export default robots;
