import {
  TREE_SHAKE_NO_PREFIX,
  TREE_SHAKE_SEARCH_PARAMS,
} from '@intlayer/config/envVars';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import {
  getPrefix,
  type RoutingOptions,
  resolveRoutingConfig,
} from './getPrefix';

export type ValidatePrefixResult = {
  isValid: boolean;
  localePrefix: string | undefined;
};

/**
 * Checks whether a given locale is valid based on the configured locales.
 *
 * @param locale - The locale value to validate. Can be `undefined` or `null`.
 * @param options - Optional configuration to override default settings.
 * @param options.locales - Array of valid locales. Defaults to the configured internationalization locales.
 * @param options.defaultLocale - The default locale to use as fallback. Defaults to the configured default locale.
 * @param options.mode - The routing mode (`'prefix'`, `'prefix-all'`, or `'no-prefix'`). Defaults to the configured routing mode.
 * @returns An object containing the validation result and the locale prefix.
 *
 * @example
 * // Check if 'en' is a valid locale
 * const { isValid, localePrefix } = validatePrefix('en');
 *
 * @example
 * // Check with custom options
 * const { isValid, localePrefix } = validatePrefix('fr', {
 *   locales: ['en', 'fr', 'es'],
 *   defaultLocale: 'en',
 *   mode: 'prefix-all',
 * });
 */
export const validatePrefix = (
  locale: LocalesValues | undefined | null,
  options?: RoutingOptions
): ValidatePrefixResult => {
  const { defaultLocale, mode, locales } = resolveRoutingConfig(options);

  if (
    (!TREE_SHAKE_NO_PREFIX && mode === 'no-prefix') ||
    (!TREE_SHAKE_SEARCH_PARAMS && mode === 'search-params')
  ) {
    return { isValid: true, localePrefix: undefined };
  }

  const { localePrefix } = getPrefix(locale || defaultLocale, {
    mode,
    locales,
    defaultLocale,
  });

  if (localePrefix === locale && locale === undefined) {
    return { isValid: true, localePrefix: undefined };
  }

  const isValid = locales.some((localeEl) => localeEl === locale);

  return { isValid, localePrefix };
};
