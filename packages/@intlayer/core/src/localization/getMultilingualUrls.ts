import configuration from '@intlayer/config/built';
import { DefaultValues } from '@intlayer/config/client';
import type {
  LocalesValues,
  RoutingConfig,
  StrictModeLocaleMap,
} from '@intlayer/types';
import { getLocalizedUrl } from './getLocalizedUrl';

/**
 * Generates multilingual URLs by prefixing the given URL with each supported locale
 * or adding search parameters based on the routing mode.
 * Handles both absolute and relative URLs appropriately.
 *
 * This function gets the locales, default locale, and routing mode from the configuration if not provided.
 *
 * Example:
 *
 * ```ts
 *  // prefix-no-default mode
 *  getMultilingualUrls('/dashboard', { locales: ['en', 'fr'], defaultLocale: 'en', mode: 'prefix-no-default' })
 *     // Returns { en: '/dashboard', fr: '/fr/dashboard' }
 *
 *  // prefix-all mode
 *  getMultilingualUrls('/dashboard', { locales: ['en', 'fr'], defaultLocale: 'en', mode: 'prefix-all' })
 *     // Returns { en: '/en/dashboard', fr: '/fr/dashboard' }
 *
 *  // search-params mode
 *  getMultilingualUrls('/dashboard', { locales: ['en', 'fr'], defaultLocale: 'en', mode: 'search-params' })
 *     // Returns { en: '/dashboard?locale=en', fr: '/dashboard?locale=fr' }
 *
 *  // no-prefix mode
 *  getMultilingualUrls('/dashboard', { locales: ['en', 'fr'], defaultLocale: 'en', mode: 'no-prefix' })
 *     // Returns { en: '/dashboard', fr: '/dashboard' }
 * ```
 *
 * @param url - The original URL string to be processed.
 * @param options - Configuration options
 * @param options.locales - Optional array of supported locales. Defaults to configured locales.
 * @param options.defaultLocale - The default locale. Defaults to configured default locale.
 * @param options.mode - URL routing mode for locale handling. Defaults to configured mode.
 * @returns An object mapping each locale to its corresponding multilingual URL.
 */
export const getMultilingualUrls = (
  url: string,
  options: {
    locales?: LocalesValues[];
    defaultLocale?: LocalesValues;
    mode?: RoutingConfig['mode'];
  } = {}
): StrictModeLocaleMap<string> => {
  const { defaultLocale, mode, locales } = {
    defaultLocale:
      configuration?.internationalization?.defaultLocale ??
      DefaultValues.Internationalization.DEFAULT_LOCALE,
    mode: configuration?.routing?.mode ?? DefaultValues.Routing.ROUTING_MODE,
    locales:
      configuration?.internationalization?.locales ??
      DefaultValues.Internationalization.LOCALES,
    ...options,
  };

  // Generate multilingual URLs by iterating over each locale and calling getLocalizedUrl
  const multilingualUrls = (locales ?? []).reduce<StrictModeLocaleMap<string>>(
    (acc, locale) => {
      // Get the localized URL for this locale
      const localizedUrl = getLocalizedUrl(url, locale, {
        locales,
        defaultLocale,
        mode,
      });

      // Assign the constructed URL to the corresponding locale key
      acc[locale as unknown as keyof typeof acc] = localizedUrl;

      return acc;
    },
    {} as StrictModeLocaleMap<string>
  );

  return multilingualUrls;
};
