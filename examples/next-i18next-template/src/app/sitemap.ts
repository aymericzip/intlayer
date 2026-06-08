import type { MetadataRoute } from 'next';
import { absoluteUrl, defaultLocale, locales } from '@/i18n.config';

/**
 * Generate XML sitemap for SEO
 * Helps search engines discover and index all locale versions of pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Define all pages that should be in the sitemap
  const pages = ['/', '/about'];

  // Generate sitemap entries for each page
  return pages.map((page) => {
    const languages = Object.fromEntries(
      locales.map((locale) => [locale, absoluteUrl(locale, page)])
    );

    return {
      url: absoluteUrl(defaultLocale, page),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '/' ? 1.0 : 0.7,
      alternates: {
        languages: {
          ...languages,
          'x-default': absoluteUrl(defaultLocale, page),
        },
      },
    };
  });
}
