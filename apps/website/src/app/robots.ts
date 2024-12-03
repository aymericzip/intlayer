import type { MetadataRoute } from 'next';
import { defaultLocale, locales } from '../../intlayer.config';
import { PagesRoutes } from '@/Routes';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: [
      '/',
      ...locales.map((locale) =>
        locale.toString() === defaultLocale.toString()
          ? `${PagesRoutes.Dashboard}$`
          : `/${locale}${PagesRoutes.Dashboard}$`
      ),
    ],
    disallow: [
      ...locales.map((locale) =>
        locale.toString() === defaultLocale.toString()
          ? PagesRoutes.NotFound
          : `/${locale}${PagesRoutes.NotFound}`
      ),
      ...locales.map((locale) =>
        locale.toString() === defaultLocale.toString()
          ? PagesRoutes.Auth_SignIn
          : `/${locale}${PagesRoutes.Auth_SignIn}`
      ),
      ...locales.map((locale) =>
        locale.toString() === defaultLocale.toString()
          ? PagesRoutes.Auth_SignUp
          : `/${locale}${PagesRoutes.Auth_SignUp}`
      ),
      ...locales.map((locale) =>
        locale.toString() === defaultLocale.toString()
          ? PagesRoutes.Auth_ResetPassword
          : `/${locale}${PagesRoutes.Auth_ResetPassword}`
      ),
      ...locales.map((locale) =>
        locale.toString() === defaultLocale.toString()
          ? PagesRoutes.Auth_ChangePassword
          : `/${locale}${PagesRoutes.Auth_ChangePassword}`
      ),
      ...locales.map((locale) =>
        locale.toString() === defaultLocale.toString()
          ? `${PagesRoutes.Dashboard}/`
          : `/${locale}${PagesRoutes.Dashboard}/`
      ),
    ],
  },
  host: process.env.NEXT_PUBLIC_URL,
  sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
});

export default robots;
