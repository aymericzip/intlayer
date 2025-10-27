import { DefaultValues } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import { getLocaleFromStorage, localeDetector } from '@intlayer/core';
import { type Locale, Locales } from '@intlayer/types';
import { cookies, headers } from 'next/headers.js';

// Helper function to extract locale from headers/cookies
export const getLocale = async (): Promise<Locale> => {
  const defaultLocale =
    configuration?.internationalization?.defaultLocale ?? Locales.ENGLISH;
  const headerName =
    configuration?.routing?.headerName ?? DefaultValues.Routing.HEADER_NAME;

  // 1 - Try locale from header
  const headersList = await headers();
  const headerLocale = headersList.get(headerName) as Locale | undefined;
  if (headerLocale) return headerLocale;

  // 2 - Try locale from cookie via universal storage
  const cookiesList = await cookies();

  const cookieLocale = getLocaleFromStorage({
    getCookie: (name: string) => cookiesList.get(name)?.value ?? null,
  });

  if (cookieLocale) return cookieLocale as Locale;

  // 3 - Fallback to Accept-Language negotiation
  const negotiatorHeaders: Record<string, string> = {};
  headersList.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const userFallbackLocale = localeDetector(negotiatorHeaders);
  if (userFallbackLocale) return userFallbackLocale as Locale;

  // 4 - Default locale
  return defaultLocale;
};
