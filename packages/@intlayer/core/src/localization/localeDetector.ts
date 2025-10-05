import type { Locales } from '@intlayer/config/client';
import Negotiator from 'negotiator';
import { localeResolver } from './localeResolver';

/**
 * Detects the locale from the request headers
 *
 * Headers are provided by the browser and can be used to determine the user's preferred language
 */
export const localeDetector = (
  headers: Record<string, string | undefined>,
  locales?: Locales[],
  defaultLocale?: Locales
): Locales => {
  const languages = new Negotiator({ headers }).languages();

  return localeResolver(languages as Locales[], locales, defaultLocale);
};
