import { match } from '@formatjs/intl-localematcher';
import { getConfiguration, type Locales } from '@intlayer/config/client';
import Negotiator from 'negotiator';

const { locales: envLocales, defaultLocale: defaultLocaleEnv } =
  getConfiguration().internationalization;

/**
 * Detects the locale from the request headers
 *
 * Headers are provided by the browser and can be used to determine the user's preferred language
 */
export const localeDetector = (
  headers: Record<string, string | undefined>,
  locales: Locales[] = envLocales,
  defaultLocale: Locales = defaultLocaleEnv
): Locales => {
  const languages = new Negotiator({ headers }).languages();

  // match can only use specifically formatted locales
  // https://stackoverflow.com/questions/76447732/nextjs-13-i18n-incorrect-locale-information-provided
  try {
    return match(languages, locales, defaultLocale) as Locales;
  } catch (_error) {
    return defaultLocale;
  }
};
