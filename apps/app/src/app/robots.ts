import { getMultilingualUrls } from 'intlayer';
import type { MetadataRoute } from 'next';
import { PagesRoutes } from '@/Routes';

const getAllUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: getAllUrls([
      PagesRoutes.Home,
      PagesRoutes.Pricing,
      PagesRoutes.Onboarding,
      PagesRoutes.Auth_SignIn,
      PagesRoutes.Auth_SignUp,
      PagesRoutes.Auth_AskResetPassword,
    ]),
    disallow: getAllUrls([
      // Dashboards
      PagesRoutes.Dashboard_Editor,
      PagesRoutes.Dashboard_Translate,
      PagesRoutes.Dashboard_Dictionaries,
      PagesRoutes.Dashboard_Projects,
      PagesRoutes.Dashboard_Tags,
      PagesRoutes.Dashboard_Organization,
      PagesRoutes.Dashboard_Profile,

      // Admin Area
      PagesRoutes.Admin,
      PagesRoutes.Admin_Users,
      PagesRoutes.Admin_Organizations,
      PagesRoutes.Admin_Projects,
      PagesRoutes.Admin_Dashboard,
      PagesRoutes.Admin_Management,
      PagesRoutes.Admin_Discussions,

      // Internal Auth Flows (Non-public entry points)
      PagesRoutes.Auth_TwoFactor,
      PagesRoutes.Auth_ResetPassword,
      PagesRoutes.Auth_ChangePassword,

      // Utilities
      PagesRoutes.NotFound,
    ]),
  },
  host: process.env.NEXT_PUBLIC_URL,
  sitemap: [
    `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
    `${process.env.NEXT_PUBLIC_DOMAIN}/sitemap.xml`,
  ],
});

export default robots;
