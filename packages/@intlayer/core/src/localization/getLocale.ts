import configuration from '@intlayer/config/built';
import { getLocaleFromStorage, localeDetector } from '@intlayer/core';
import { type Locale, Locales } from '@intlayer/types';

export type RequestContext = {
  getHeader?: (name: string) => string | null | undefined;
  getCookie?: (name: string) => string | null | undefined;
  getAllHeaders?: () =>
    | Record<string, string>
    | Promise<Record<string, string>>;
};

export const getLocale = async (ctx: RequestContext = {}): Promise<Locale> => {
  const defaultLocale =
    configuration?.internationalization?.defaultLocale ?? Locales.ENGLISH;

  // Try locale from storage (cookie or header)
  const storedLocale = getLocaleFromStorage({
    getCookie: ctx.getCookie,
    getHeader: ctx.getHeader,
  });

  if (storedLocale) return storedLocale as Locale;

  // Fallback to Accept-Language negotiation
  const allHeaders = (await ctx.getAllHeaders?.()) ?? (ctx.getHeader ? {} : {}); // fallback empty object if none provided

  const userFallbackLocale = localeDetector(allHeaders);
  if (userFallbackLocale) return userFallbackLocale as Locale;

  // Default locale
  return defaultLocale;
};
