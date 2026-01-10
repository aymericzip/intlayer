import configuration from '@intlayer/config/built';
import { getLocaleFromStorage, localeDetector } from '@intlayer/core';
import { type Locale, Locales } from '@intlayer/types';
import { cookies, headers } from 'next/headers.js';

// Helper function to extract locale from headers/cookies
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
