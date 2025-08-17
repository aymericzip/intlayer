import configuration from '@intlayer/config/built';
import { type LocalesValues } from '@intlayer/config/client';

type FormatKey = string;

/**
 * Generates a unique cache key for an Intl formatter using locale and options.
 *
 * Useful for memoization so that identical locale + options combinations reuse formatters.
 *
 * @param locale - The BCP 47 locale string (e.g., "en-US").
 * @param options - Intl formatter options.
 * @returns A JSON string representing a unique cache key.
 */
const getCacheKey = (locale: LocalesValues, options: object): FormatKey =>
  JSON.stringify([locale, options]);

/**
 * Ensures a valid locale is always passed to formatters by falling back to the default.
 *
 * @param locale - A potentially undefined locale.
 * @returns The provided locale or the default one from configuration.
 */
const resolveLocale = (locale: LocalesValues): LocalesValues =>
  locale ?? configuration.internationalization.defaultLocale;

/**
 * Creates a cached formatter factory that avoids recreating Intl formatters
 * for identical locale + options combinations.
 *
 * @template T - The type of the formatter (e.g., Intl.NumberFormat).
 * @template O - The type of the formatter's options.
 *
 * @param factory - A function that constructs a formatter.
 * @returns A function that returns a cached formatter instance.
 */
const cacheIntlFormatter = <T, O extends object>(
  factory: (locale: LocalesValues, options: O) => T
): ((locale: LocalesValues, options?: O) => T) => {
  const cache = new Map<FormatKey, T>();

  return (locale, options = {} as O) => {
    const key = getCacheKey(resolveLocale(locale), options);
    if (!cache.has(key)) {
      cache.set(key, factory(locale, options));
    }
    return cache.get(key) as T;
  };
};

/**
 * A centralized, memoized collection of `Intl` formatter instances.
 *
 * Each formatter is cached by locale + options, reducing redundant instantiations
 * and improving performance in locale-heavy applications.
 */
export const CachedIntl = {
  /** Caches `Intl.NumberFormat` instances */
  numberFormat: cacheIntlFormatter<Intl.NumberFormat, Intl.NumberFormatOptions>(
    (locale, options) => new Intl.NumberFormat(locale, options)
  ),

  /** Caches `Intl.DateTimeFormat` instances */
  dateTimeFormat: cacheIntlFormatter<
    Intl.DateTimeFormat,
    Intl.DateTimeFormatOptions
  >((locale, options) => new Intl.DateTimeFormat(locale, options)),

  /** Caches `Intl.RelativeTimeFormat` instances */
  relativeTimeFormat: cacheIntlFormatter<
    Intl.RelativeTimeFormat,
    Intl.RelativeTimeFormatOptions
  >((locale, options) => new Intl.RelativeTimeFormat(locale, options)),

  /** Caches `Intl.ListFormat` instances */
  listFormat: cacheIntlFormatter<Intl.ListFormat, Intl.ListFormatOptions>(
    (locale, options) => new Intl.ListFormat(locale, options)
  ),

  /** Caches `Intl.PluralRules` instances */
  pluralRules: cacheIntlFormatter<Intl.PluralRules, Intl.PluralRulesOptions>(
    (locale, options) => new Intl.PluralRules(locale, options)
  ),

  /**
   * Caches `Intl.DisplayNames` instances or falls back to raw locale string.
   * Displays a warning in development mode if not supported.
   */
  displayNames: (() => {
    const cache = new Map<FormatKey, Intl.DisplayNames>();

    return (
      locale: LocalesValues,
      options: Intl.DisplayNamesOptions & { fallback?: 'code' | 'none' }
    ) => {
      if (typeof (Intl as any)?.DisplayNames !== 'function') {
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            `Intl.DisplayNames is not supported; falling back to raw locale (${locale}). ` +
              `Consider adding a polyfill: https://formatjs.io/docs/polyfills/intl-displaynames/`
          );
        }
        return locale;
      }

      const key = getCacheKey(locale, options);
      if (!cache.has(key)) {
        cache.set(key, new Intl.DisplayNames(locale, options));
      }
      return cache.get(key)!;
    };
  })(),

  /**
   * Caches `Intl.NumberFormat` instances specifically for unit formatting.
   *
   * @example
   * ```ts
   * CachedIntl.UnitFormat("en-US", "kilometer", { maximumFractionDigits: 2 });
   * ```
   */
  unitFormat: (() => {
    const cache = new Map<FormatKey, Intl.NumberFormat>();

    return (
      locale: LocalesValues,
      unit: Intl.NumberFormatOptions['unit'],
      options: Omit<Intl.NumberFormatOptions, 'style' | 'unit'> = {}
    ) => {
      const mergedOptions: Intl.NumberFormatOptions = {
        style: 'unit',
        unit,
        ...options,
      };
      const key = getCacheKey(locale, mergedOptions);
      if (!cache.has(key)) {
        cache.set(key, new Intl.NumberFormat(locale, mergedOptions));
      }
      return cache.get(key)!;
    };
  })(),
};
