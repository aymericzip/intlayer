import { getMultilingualUrls } from 'intlayer';
import type { MetadataRoute } from 'next';
import { PagesRoutes } from '@/Routes';

const getAllUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: getAllUrls([
      PagesRoutes.Auth_SignIn,
      PagesRoutes.Auth_SignUp,
      PagesRoutes.Auth_TwoFactor,
      PagesRoutes.Auth_AskResetPassword,
      PagesRoutes.Auth_ResetPassword,
      PagesRoutes.Auth_ChangePassword,
    ]),
    disallow: getAllUrls([
      PagesRoutes.Home,
      PagesRoutes.NotFound,
      PagesRoutes.Auth_ResetPassword,
      PagesRoutes.Auth_ChangePassword,
      PagesRoutes.Admin,
    ]),
  },
  host: process.env.NEXT_PUBLIC_URL,
  sitemap: [
    `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
    `${process.env.NEXT_PUBLIC_DOMAIN}/sitemap.xml`,
  ],
});

export default robots;
