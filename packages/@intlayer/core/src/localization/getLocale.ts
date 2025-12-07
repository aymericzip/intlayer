import configuration from '@intlayer/config/built';
import { DefaultValues } from '@intlayer/config/client';
import { getLocaleFromStorage, localeResolver } from '@intlayer/core';
import type { Locale } from '@intlayer/types';
import { getPreferredLanguages } from './localeDetector';

export type RequestContext = {
  getHeader?: (name: string) => string | null | undefined;
  getCookie?: (name: string) => string | null | undefined;
};

export const getLocale = async (ctx: RequestContext = {}): Promise<Locale> => {
  const defaultLocale =
    configuration?.internationalization?.defaultLocale ??
    DefaultValues.Internationalization.DEFAULT_LOCALE;
  const availableLocales =
    configuration?.internationalization?.locales ??
    DefaultValues.Internationalization.LOCALES;

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
