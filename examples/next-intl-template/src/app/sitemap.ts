import type { MetadataRoute } from 'next';
import { defaultLocale, locales } from '@/i18n';

const origin = 'https://example.com';

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Get a map of all locales and their localized paths
 *
 * Example output:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ['x-default', formatterLocalizedPath(defaultLocale, path)],
  ]);

// Generate sitemap with all locale variants for better SEO
// The alternates field tells search engines about language versions
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, '/'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: { languages: getLocalizedMap('/') },
    },
    {
      url: formatterLocalizedPath(defaultLocale, '/about'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages: getLocalizedMap('/about') },
    },
  ];
}
