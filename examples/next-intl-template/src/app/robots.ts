import type { MetadataRoute } from 'next';
import { defaultLocale, locales } from '@/i18n';

const origin = 'https://example.com';

// Generate paths for all locales (e.g., /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales('/dashboard'), ...withAllLocales('/admin')];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: ['/'], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
