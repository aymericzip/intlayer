import type { Locales } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import { localeDetector } from '@intlayer/core';
import { cookies, headers } from 'next/headers.js';

// Helper function to extract locale from referer URL
export const getLocale = async (): Promise<Locales> => {
  const { defaultLocale } = configuration.internationalization;
  const { headerName, cookieName } = configuration.middleware;

  // 1 - Try to pick the locale selected using the headers
  const headersList = await headers();

  const headerLocale = headersList.get(headerName) as Locales | undefined;

  if (headerLocale) return headerLocale;

  // 2 - Try to pick the locale selected using the cookies
  const cookiesList = await cookies();
  const cookieLocale = cookiesList.get(cookieName)?.value as
    | Locales
    | undefined;
  if (cookieLocale) return cookieLocale;

  // 3 - Try to pick the locale selected using the browser language preference
  const negotiatorHeaders: Record<string, string> = {};

  headersList.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const userFallbackLocale = localeDetector(negotiatorHeaders);

  // 4 - Fallback to default locale
  if (userFallbackLocale) return userFallbackLocale as Locales;

  return defaultLocale;
};
