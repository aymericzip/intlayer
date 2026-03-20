import configuration from '@intlayer/config/built';
import { DEFAULT_LOCALE, LOCALES } from '@intlayer/config/defaultValues';
import type { Locale } from '@intlayer/types/allLocales';
import { getLocaleFromStorage } from '../utils/localeStorage';
import { getPreferredLanguages } from './localeDetector';
import { localeResolver } from './localeResolver';

export type RequestContext = {
  getHeader?: (name: string) => string | null | undefined;
  getCookie?: (name: string) => string | null | undefined;
};

export const getLocale = async (ctx: RequestContext = {}): Promise<Locale> => {
  const defaultLocale =
    configuration?.internationalization?.defaultLocale ?? DEFAULT_LOCALE;
  const availableLocales =
    configuration?.internationalization?.locales ?? LOCALES;

  // Try locale from storage (cookie or header)
  const storedLocale = getLocaleFromStorage({
    getCookie: ctx.getCookie,
    getHeader: ctx.getHeader,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // Fallback to Accept-Language negotiation
  const acceptLanguageHeader = ctx.getHeader?.('accept-language');

  if (!acceptLanguageHeader) {
    return defaultLocale;
  }

  const preferredLocaleStrings = getPreferredLanguages(
    acceptLanguageHeader,
    availableLocales
  );

  const userFallbackLocale = localeResolver(
    preferredLocaleStrings,
    availableLocales,
    defaultLocale
  );

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // Default locale
  return defaultLocale;
};
