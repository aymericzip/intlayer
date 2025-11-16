import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types';

/**
 * Determines the URL prefix for a given locale based on the routing mode configuration.
 *
 * Example:
 *
 * ```ts
 *  // prefix-no-default mode with default locale
 *  getPrefix('en', { defaultLocale: 'en', mode: 'prefix-no-default' })
 *     // Returns ''
 *
 *  // prefix-no-default mode with non-default locale
 *  getPrefix('fr', { defaultLocale: 'en', mode: 'prefix-no-default' })
 *     // Returns 'en/'
 *
 *  // prefix-all mode
 *  getPrefix('en', { defaultLocale: 'en', mode: 'prefix-all' })
 *     // Returns 'en/'
 *
 *  // search-params mode
 *  getPrefix('en', { defaultLocale: 'en', mode: 'search-params' })
 *     // Returns ''
 *
 *  // no-prefix mode
 *  getPrefix('en', { defaultLocale: 'en', mode: 'no-prefix' })
 *     // Returns ''
 * ```
 *
 * @param locale - The locale to check for prefix. If not provided, uses configured default locale.
 * @param options - Configuration options
 * @param options.defaultLocale - The default locale. Defaults to configured default locale.
 * @param options.mode - URL routing mode for locale handling. Defaults to configured mode.
 * @param options.addSlash - Whether to add a trailing slash to the prefix. Defaults to true.
 * @returns The prefix string for the given locale (e.g., 'en/', 'fr/') or an empty string.
 */
export const getPrefix = (
  locale?: LocalesValues,
  options: {
    defaultLocale?: LocalesValues;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
    addSlash?: boolean;
  } = {}
): string => {
  const {
    defaultLocale = configuration?.internationalization?.defaultLocale,
    mode = configuration?.routing?.mode,
    addSlash = true,
  } = options;

  // Handle prefix-based modes (prefix-all or prefix-no-default)
  const shouldPrefix =
    mode === 'prefix-all' ||
    (mode === 'prefix-no-default' && defaultLocale !== locale);

  return shouldPrefix ? `${defaultLocale}${addSlash ? '/' : ''}` : '';
};
