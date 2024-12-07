import { getDocArray } from '@components/DocPage/docData';
import type { MetadataRoute } from 'next';
import { PagesRoutes } from '@/Routes';

const docs = getDocArray();

const docSitemap: MetadataRoute.Sitemap = docs.map((doc) => ({
  url: `${process.env.NEXT_PUBLIC_URL}${doc.url}`,
  lastModified: doc.updatedAt,
  changeFrequency: 'monthly',
  priority: 0.7,
  alternates: {
    languages: {
      en: `${process.env.NEXT_PUBLIC_URL}${doc.url}`,
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
        en: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Home}`,
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
        en: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Demo}`,
        es: `${process.env.NEXT_PUBLIC_URL}/es${PagesRoutes.Demo}`,
        fr: `${process.env.NEXT_PUBLIC_URL}/fr${PagesRoutes.Demo}`,
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
        en: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Pricing}`,
        es: `${process.env.NEXT_PUBLIC_URL}/es${PagesRoutes.Pricing}`,
        fr: `${process.env.NEXT_PUBLIC_URL}/fr${PagesRoutes.Pricing}`,
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
        en: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Onboarding}`,
        es: `${process.env.NEXT_PUBLIC_URL}/es${PagesRoutes.Onboarding}`,
        fr: `${process.env.NEXT_PUBLIC_URL}/fr${PagesRoutes.Onboarding}`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Dashboard}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        en: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Dashboard}`,
        es: `${process.env.NEXT_PUBLIC_URL}/es${PagesRoutes.Dashboard}`,
        fr: `${process.env.NEXT_PUBLIC_URL}/fr${PagesRoutes.Dashboard}`,
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
        en: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc}`,
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
        en: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.NotFound}`,
        es: `${process.env.NEXT_PUBLIC_URL}/es${PagesRoutes.NotFound}`,
        fr: `${process.env.NEXT_PUBLIC_URL}/fr${PagesRoutes.NotFound}`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_SignIn}`,
    lastModified: new Date(),
    changeFrequency: 'never',
    priority: 0.1,
    alternates: {
      languages: {
        en: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_SignIn}`,
        es: `${process.env.NEXT_PUBLIC_URL}/es${PagesRoutes.Auth_SignIn}`,
        fr: `${process.env.NEXT_PUBLIC_URL}/fr${PagesRoutes.Auth_SignIn}`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_SignUp}`,
    lastModified: new Date(),
    changeFrequency: 'never',
    priority: 0.1,
    alternates: {
      languages: {
        en: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_SignUp}`,
        es: `${process.env.NEXT_PUBLIC_URL}/es${PagesRoutes.Auth_SignUp}`,
        fr: `${process.env.NEXT_PUBLIC_URL}/fr${PagesRoutes.Auth_SignUp}`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_ResetPassword}`,
    lastModified: new Date(),
    changeFrequency: 'never',
    priority: 0.1,
    alternates: {
      languages: {
        en: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_ResetPassword}`,
        es: `${process.env.NEXT_PUBLIC_URL}/es${PagesRoutes.Auth_ResetPassword}`,
        fr: `${process.env.NEXT_PUBLIC_URL}/fr${PagesRoutes.Auth_ResetPassword}`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_ChangePassword}`,
    lastModified: new Date(),
    changeFrequency: 'never',
    priority: 0.1,
    alternates: {
      languages: {
        en: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_ChangePassword}`,
        es: `${process.env.NEXT_PUBLIC_URL}/es${PagesRoutes.Auth_ChangePassword}`,
        fr: `${process.env.NEXT_PUBLIC_URL}/fr${PagesRoutes.Auth_ChangePassword}`,
      },
    },
  },
  ...docSitemap,
];

export default sitemap;
