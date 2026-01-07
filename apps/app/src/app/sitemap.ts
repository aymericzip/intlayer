import { getMultilingualUrls } from 'intlayer';
import type { MetadataRoute } from 'next';
import { PagesRoutes } from '@/Routes';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
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
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Pricing}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Pricing}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Pricing}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Onboarding}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Onboarding}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Onboarding}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_SignIn}`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.3,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_SignIn}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_SignIn}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_SignUp}`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.3,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_SignUp}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_SignUp}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_AskResetPassword}`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_AskResetPassword}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_AskResetPassword}`,
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
  ];
};

export default sitemap;
