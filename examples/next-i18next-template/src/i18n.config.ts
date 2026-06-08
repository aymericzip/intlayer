// Define supported locales as a const array for type safety
// The 'as const' assertion makes TypeScript infer literal types instead of string[]
export const locales = ['en', 'fr', 'es'] as const;

// Extract the Locale type from the locales array
// This creates a union type: "en" | "fr"
export type Locale = (typeof locales)[number];

// Set the default locale used when no locale is specified
export const defaultLocale: Locale = 'en';

// Check if a locale requires RTL (right-to-left) text direction
// Used for languages like Arabic, Hebrew, Persian, and Urdu
export const isRtl = (locale: string) =>
  /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);

// Generate a localized path for a given locale and path
// Default locale paths don't have a prefix (e.g., "/about" instead of "/en/about")
// Other locales are prefixed (e.g., "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// Base URL for absolute URLs (used in sitemaps, metadata, etc.)
const ORIGIN = 'https://example.com';

// Generate an absolute URL with locale prefix
// Used for SEO metadata, sitemaps, and canonical URLs
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    'Path=/',
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 year
    'SameSite=Lax',
  ].join('; ');
}
