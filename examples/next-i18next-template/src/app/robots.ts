import type { MetadataRoute } from 'next';
import {
  absoluteUrl,
  defaultLocale,
  locales,
  localizedPath,
} from '@/i18n.config';

/**
 * Helper function to expand a path to all locale versions
 * Example: expandAllLocales("/dashboard") returns ["/dashboard", "/fr/dashboard"]
 * This ensures robots.txt blocks all locale versions of protected routes
 */
const expandAllLocales = (path: string) => [
  // Include default locale path (no prefix)
  localizedPath(defaultLocale, path),
  // Include all other locale-prefixed paths
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

/**
 * Generate robots.txt file
 * Controls which pages search engines can crawl
 */
export default function robots(): MetadataRoute.Robots {
  // List all paths that should be blocked for all locales
  // Prevents indexing of admin/dashboard pages in any language
  const disallow = [
    ...expandAllLocales('/dashboard'),
    ...expandAllLocales('/admin'),
  ];

  return {
    rules: {
      userAgent: '*', // Apply rules to all crawlers
      allow: ['/'], // Allow root path
      disallow, // Block specified paths
    },
    host: absoluteUrl(defaultLocale, '/'), // Canonical hostname
    sitemap: absoluteUrl(defaultLocale, '/sitemap.xml'), // Sitemap location
  };
}
