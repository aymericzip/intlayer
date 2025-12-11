import configuration from '@intlayer/config/built';
import type { Locale, LocalesValues } from '@intlayer/types';

export type GetPrefixOptions = {
  defaultLocale?: LocalesValues;
  mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
};

export type GetPrefixResult = {
  /**
   * The complete base URL path with leading and trailing slashes.
   *
   * @example
   * // https://example.com/fr/about -> '/fr'
   * // https://example.com/about -> ''
   */
  prefix: string;
  /**
   * The locale identifier without slashes.
   *
   * @example
   * // https://example.com/fr/about -> 'fr'
   * // https://example.com/about -> undefined
   */
  localePrefix: Locale | undefined;
};

/**
 * Determines the URL prefix for a given locale based on the routing mode configuration.
 *
 * Example:
 *
 * ```ts
 *  // prefix-no-default mode with default locale
 *  getPrefix('en', { defaultLocale: 'en', mode: 'prefix-no-default' })
 *     // Returns { prefix: '', localePrefix: undefined }
 *
 *  // prefix-no-default mode with non-default locale
 *  getPrefix('fr', { defaultLocale: 'en', mode: 'prefix-no-default' })
 *     // Returns { prefix: '/fr', localePrefix: 'fr' }
 *
 *  // prefix-all mode
 *  getPrefix('en', { defaultLocale: 'en', mode: 'prefix-all' })
 *     // Returns { prefix: '/en', localePrefix: locale }
 *
 *  // search-params mode
 *  getPrefix('en', { defaultLocale: 'en', mode: 'search-params' })
 *     // Returns { prefix: '', localePrefix: undefined }
 *
 *  // no-prefix mode
 *  getPrefix('en', { defaultLocale: 'en', mode: 'no-prefix' })
 *     // Returns { prefix: '', localePrefix: undefined }
 * ```
 *
 * @param locale - The locale to check for prefix. If not provided, uses configured default locale.
 * @param options - Configuration options
 * @param options.defaultLocale - The default locale. Defaults to configured default locale.
 * @param options.mode - URL routing mode for locale handling. Defaults to configured mode.
 * @returns An object containing pathPrefix, prefix, and localePrefix for the given locale.
 */
export const getPrefix = (
  locale: LocalesValues | undefined,
  options: {
    defaultLocale?: LocalesValues;
    locales?: LocalesValues[];
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  } = {}
): GetPrefixResult => {
  const {
    defaultLocale = configuration?.internationalization?.defaultLocale,
    mode = configuration?.routing?.mode,
    locales = configuration?.internationalization?.locales,
  } = options;

  if (!locale || !locales.includes(locale)) {
    return {
      prefix: '',
      localePrefix: undefined,
    };
  }

  // Handle prefix-based modes (prefix-all or prefix-no-default)
  const shouldPrefix =
    mode === 'prefix-all' ||
    (mode === 'prefix-no-default' && defaultLocale !== locale);

  if (shouldPrefix) {
    return {
      prefix: `${locale}/`,
      localePrefix: locale as Locale,
    };
  }

  return {
    prefix: '',
    localePrefix: undefined,
  };
};
