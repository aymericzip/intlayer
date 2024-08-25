import type { MetadataRoute } from 'next';
import { locales } from '../../../intlayer.config';
import { PagesRoutes } from '@/Routes';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: [
      PagesRoutes.NotFound,
      ...locales.map((locale) => `/${locale}${PagesRoutes.NotFound}`),
      PagesRoutes.Auth_SignIn,
      ...locales.map((locale) => `/${locale}${PagesRoutes.Auth_SignIn}`),
      PagesRoutes.Auth_SignUp,
      ...locales.map((locale) => `/${locale}${PagesRoutes.Auth_SignUp}`),
      PagesRoutes.Auth_ResetPassword,
      ...locales.map((locale) => `/${locale}${PagesRoutes.Auth_ResetPassword}`),
    ],
  },
  sitemap: 'https://acme.com/sitemap.xml',
});

export default robots;
