import {
  App_Auth_AskResetPassword_Path,
  App_Auth_SignIn_Path,
  App_Auth_SignUp_Path,
  App_Home_Path,
  App_NotFound_Path,
  App_Onboarding_Path,
  App_Pricing_Path,
} from '@intlayer/design-system/routes';
import { getMultilingualUrls } from 'intlayer';
import type { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_URL}${App_Home_Path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${App_Home_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${App_Home_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${App_Pricing_Path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${App_Pricing_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${App_Pricing_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${App_Onboarding_Path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${App_Onboarding_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${App_Onboarding_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${App_Auth_SignIn_Path}`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.3,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${App_Auth_SignIn_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${App_Auth_SignIn_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${App_Auth_SignUp_Path}`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.3,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${App_Auth_SignUp_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${App_Auth_SignUp_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${App_Auth_AskResetPassword_Path}`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${App_Auth_AskResetPassword_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${App_Auth_AskResetPassword_Path}`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}${App_NotFound_Path}`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
      alternates: {
        languages: {
          ...getMultilingualUrls(
            `${process.env.NEXT_PUBLIC_URL}${App_NotFound_Path}`
          ),
          'x-default': `${process.env.NEXT_PUBLIC_URL}${App_NotFound_Path}`,
        },
      },
    },
  ];
};

export default sitemap;
