import configuration from '@intlayer/config/built';
import {
  getLocaleFromStorage,
  localeDetector,
} from '@intlayer/core/localization';
import { type Locale, Locales } from '@intlayer/types';
import { cookies, headers } from 'next/headers.js';

// Helper function to extract locale from headers/cookies
/**
 * Helper function to extract the current locale from Next.js headers and cookies.
 *
 * This function is designed to be used in Server Components, Server Actions, or Route Handlers
 * to determine the locale preferred by the user or stored in their preferences.
 *
 * @returns A promise that resolves to the detected `Locale`.
 *
 * @example
 * ```tsx
 * import { getLocale } from 'next-intlayer/server';
 *
 * export default async function MyServerComponent() {
 *   const locale = await getLocale();
 *   // ...
 * }
 * ```
 */
export const getLocale = async (): Promise<Locale> => {
  const defaultLocale =
    configuration?.internationalization?.defaultLocale ?? Locales.ENGLISH;

  // Try locale from header
  const headersList = await headers();
  const cookiesList = await cookies();

  const storedLocale = getLocaleFromStorage({
    getCookie: (name: string) => cookiesList.get(name)?.value ?? null,
    getHeader: (name: string) => headersList.get(name) ?? null,
  });

  if (storedLocale) return storedLocale as Locale;

  // Fallback to Accept-Language negotiation
  const negotiatorHeaders: Record<string, string> = {};
  headersList.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const userFallbackLocale = localeDetector(negotiatorHeaders);
  if (userFallbackLocale) return userFallbackLocale as Locale;

  // Default locale
  return defaultLocale;
};
