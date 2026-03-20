import configuration from '@intlayer/config/built';
import { DEFAULT_LOCALE } from '@intlayer/config/defaultValues';
import type { Locale } from '@intlayer/types/allLocales';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { getPrefix } from './getPrefix';

export type LocaleData = {
  locale: Locale;
  defaultLocale: Locale;
  isDefault: boolean;
  locales: Locale[];
  urlPrefix: string;
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
    .defaultLocale ?? DEFAULT_LOCALE,
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
      urlPrefix: getPrefix(locale, { defaultLocale, mode, locales })
        .localePrefix
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
    .defaultLocale ?? DEFAULT_LOCALE,
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
      urlPrefix: getPrefix(locale, { defaultLocale, mode, locales })
        .localePrefix
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
    .defaultLocale ?? DEFAULT_LOCALE,
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
        urlPrefix: getPrefix(locale, { defaultLocale, mode, locales })
          .localePrefix
          ? `/${locale}`
          : '',
      } as LocaleData);
      return acc;
    },
    {} as Record<LocalesValues, T>
  );
