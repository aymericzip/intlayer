import configuration from '@intlayer/config/built';
import { DefaultValues } from '@intlayer/config/client';
import type { LocalesValues } from '@intlayer/types';
import { getPrefix } from './getPrefix';

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
  options?: {
    locales?: LocalesValues[];
    defaultLocale?: LocalesValues;
    mode?: typeof configuration.routing.mode;
  }
): ValidatePrefixResult => {
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

  // If no locale provided (optional param), will use default
  // In `routing.mode = 'prefix-all'`, the locale is required to be a valid locale
  const { localePrefix } = getPrefix(locale || defaultLocale, {
    mode,
    locales,
    defaultLocale,
  });

  if (localePrefix === locale && locale === undefined) {
    return { isValid: true, localePrefix: undefined };
  }

  // Check if the provided locale is valid
  const isValid: boolean = locales.some((localeEl) => localeEl === locale);

  return { isValid: isValid, localePrefix };
};
