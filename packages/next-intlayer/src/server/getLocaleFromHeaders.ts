import { Locales } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import { localeDetector } from '@intlayer/core';
import { headers } from 'next/headers';

// Helper function to extract locale from referer URL
export const getLocaleFromHeaders = async (): Promise<Locales> => {
  const { defaultLocale } = configuration.internationalization;
  const { headerName } = configuration.middleware;

  const headersList = await headers();

  const currentLocale = headersList.get(headerName) as Locales | undefined;

  if (currentLocale) return currentLocale;

  const negotiatorHeaders: Record<string, string> = {};

  headersList.forEach((value, key) => (negotiatorHeaders[key] = value));

  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) return userFallbackLocale as Locales;

  return defaultLocale;
};
