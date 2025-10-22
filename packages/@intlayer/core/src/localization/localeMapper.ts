import configuration from '@intlayer/config/built';
import { type Locale, Locales, type LocalesValues } from '@intlayer/types';

export type LocaleData = {
  locale: Locale;
  defaultLocale: Locale;
  isDefault: boolean;
  locales: Locale[];
  urlPrefix: string;
};

/**
 * Determine if the locale should be prefixed in the URL based on routing mode
 */
const shouldPrefixLocale = (
  locale: LocalesValues,
  defaultLocale: LocalesValues,
  mode: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'
): boolean => {
  if (mode === 'no-prefix' || mode === 'search-params') {
    return false;
  }
  if (mode === 'prefix-all') {
    return true;
  }
  // 'prefix-no-default'
  return locale !== defaultLocale;
};

/**
 * Map the locale data to an array of objects
 *
 * @example
 * ```ts
 * const routes = localeMap((localizedData) =>
 * ({
 *    path: localizedData.urlPrefix,
 *    name: localizedData.locale,
 *    isDefault: localizedData.isDefault,
 *    locales: localizedData.locales,
 *    defaultLocale: localizedData.defaultLocale,
 *  }),
 * );
 *
 * // Result
 * [
 *   { path: '/', name: 'en', isDefault: true, locales: ['en'], defaultLocale: 'en', urlPrefix: '' },
 *   { path: '/fr', name: 'fr', isDefault: false, locales: ['fr'], defaultLocale: 'en', urlPrefix: '/fr' },
 *   { path: '/es', name: 'es', isDefault: false, locales: ['es'], defaultLocale: 'en', urlPrefix: '/es' },
 * ]
 * ```
 *
 * @param mapper - The mapper function that returns an object
 * @returns An array of objects
 */
export const localeMap = <T>(
  mapper: (locale: LocaleData) => T,
  locales: LocalesValues[] = configuration?.internationalization.locales ?? [],
  defaultLocale: LocalesValues = configuration?.internationalization
    .defaultLocale ?? Locales.ENGLISH,
  mode:
    | 'prefix-no-default'
    | 'prefix-all'
    | 'no-prefix'
    | 'search-params' = configuration?.routing?.mode ?? 'prefix-no-default'
): T[] =>
  (locales ?? []).map((locale) =>
    mapper({
      locale,
      defaultLocale,
      locales,
      isDefault: locale === defaultLocale,
      urlPrefix: shouldPrefixLocale(locale, defaultLocale, mode)
        ? `/${locale}`
        : '',
    } as LocaleData)
  );

/**
 * Flatten the locale map into a single array of objects
 *
 * @example
 * ```ts
 * const routes = localeMap((localizedData) =>
 * [{
 *    path: localizedData.urlPrefix,
 *    name: localizedData.locale,
 *    isDefault: localizedData.isDefault,
 *    locales: localizedData.locales,
 *    defaultLocale: localizedData.defaultLocale,
 *  }],
 * );
 *
 * // Result
 * [
 *   path: '/', name: 'en', isDefault: true, locales: ['en'], defaultLocale: 'en', urlPrefix: '' ,
 *   path: '/fr', name: 'fr', isDefault: false, locales: ['fr'], defaultLocale: 'en', urlPrefix: '/fr' ,
 *   path: '/es', name: 'es', isDefault: false, locales: ['es'], defaultLocale: 'en', urlPrefix: '/es' ,
 * ]
 * ```
 *
 * @param mapper - The mapper function that returns an array of objects
 * @returns An array of objects
 */
export const localeFlatMap = <T>(
  mapper: (locale: LocaleData) => T[],
  locales: LocalesValues[] = configuration?.internationalization.locales ?? [],
  defaultLocale: LocalesValues = configuration?.internationalization
    .defaultLocale ?? Locales.ENGLISH,
  mode:
    | 'prefix-no-default'
    | 'prefix-all'
    | 'no-prefix'
    | 'search-params' = configuration?.routing?.mode ?? 'prefix-no-default'
): T[] =>
  locales.flatMap((locale) =>
    mapper({
      locale,
      defaultLocale,
      locales,
      isDefault: locale === defaultLocale,
      urlPrefix: shouldPrefixLocale(locale, defaultLocale, mode)
        ? `/${locale}`
        : '',
    } as LocaleData)
  );

/**
 * Creates a record object mapping locales to values transformed by the mapper function
 *
 * @example
 * ```ts
 * const translations = localeRecord(({ locale }) =>
 *   require(`./translations/${locale}.json`)
 * );
 *
 * // Result
 *
 *   en: ... , // Content of translations/en.json
 *   fr: ... , // Content of translations/fr.json
 *   es: ...
 *
 * ```
 *
 * @param mapper - Function that takes locale data and returns a value for that locale
 * @param locales - Array of locale codes to map over (defaults to configured locales)
 * @param defaultLocale - The default locale (defaults to configured default)
 * @param mode - URL routing mode for locale handling (defaults to configured value)
 * @returns Record mapping locale codes to mapped values
 */
export const localeRecord = <T>(
  mapper: (locale: LocaleData) => T,
  locales: LocalesValues[] = configuration?.internationalization.locales ?? [],
  defaultLocale: LocalesValues = configuration?.internationalization
    .defaultLocale ?? Locales.ENGLISH,
  mode:
    | 'prefix-no-default'
    | 'prefix-all'
    | 'no-prefix'
    | 'search-params' = configuration?.routing?.mode ?? 'prefix-no-default'
): Record<LocalesValues, T> =>
  (locales ?? []).reduce(
    (acc, locale) => {
      acc[locale] = mapper({
        locale,
        defaultLocale,
        locales,
        isDefault: locale === defaultLocale,
        urlPrefix: shouldPrefixLocale(locale, defaultLocale, mode)
          ? `/${locale}`
          : '',
      } as LocaleData);
      return acc;
    },
    {} as Record<LocalesValues, T>
  );
