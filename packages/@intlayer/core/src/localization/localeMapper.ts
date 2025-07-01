import configuration from '@intlayer/config/built';
import { Locales, LocalesValues } from '@intlayer/config/client';

export type LocaleData = {
  locale: LocalesValues;
  defaultLocale: LocalesValues;
  isDefault: boolean;
  locales: LocalesValues[];
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
export const localeMap = <T extends object>(
  mapper: (locale: LocaleData) => T,
  locales: LocalesValues[] = configuration.internationalization.locales,
  defaultLocale: LocalesValues = configuration.internationalization
    .defaultLocale,
  prefixDefault: boolean = configuration.middleware.prefixDefault
): T[] =>
  locales.map((locale) =>
    mapper({
      locale,
      defaultLocale,
      locales,
      isDefault: locale === defaultLocale,
      urlPrefix: locale === defaultLocale && !prefixDefault ? '' : `/${locale}`,
    })
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
 *   { path: '/', name: 'en', isDefault: true, locales: ['en'], defaultLocale: 'en', urlPrefix: '' },
 *   { path: '/fr', name: 'fr', isDefault: false, locales: ['fr'], defaultLocale: 'en', urlPrefix: '/fr' },
 *   { path: '/es', name: 'es', isDefault: false, locales: ['es'], defaultLocale: 'en', urlPrefix: '/es' },
 * ]
 * ```
 *
 * @param mapper - The mapper function that returns an array of objects
 * @returns An array of objects
 */
export const localeFlatMap = <T>(
  mapper: (locale: LocaleData) => T[],
  locales: LocalesValues[] = configuration.internationalization.locales,
  defaultLocale: LocalesValues = configuration.internationalization
    .defaultLocale,
  prefixDefault: boolean = configuration.middleware.prefixDefault
): T[] =>
  locales.flatMap((locale) =>
    mapper({
      locale,
      defaultLocale,
      locales,
      isDefault: locale === defaultLocale,
      urlPrefix: locale === defaultLocale && !prefixDefault ? '' : `/${locale}`,
    })
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
 * {
 *   en: { ... }, // Content of translations/en.json
 *   fr: { ... }, // Content of translations/fr.json
 *   es: { ... }  // Content of translations/es.json
 * }
 * ```
 *
 * @param mapper - Function that takes locale data and returns a value for that locale
 * @param locales - Array of locale codes to map over (defaults to configured locales)
 * @param defaultLocale - The default locale (defaults to configured default)
 * @param prefixDefault - Whether to prefix the default locale in URLs (defaults to configured value)
 * @returns Record mapping locale codes to mapped values
 */
export const localeRecord = <T>(
  mapper: (locale: LocaleData) => T,
  locales: Locales[] = configuration.internationalization.locales,
  defaultLocale: Locales = configuration.internationalization.defaultLocale,
  prefixDefault: boolean = configuration.middleware.prefixDefault
): Record<Locales, T> =>
  locales.reduce(
    (acc, locale) => {
      acc[locale] = mapper({
        locale,
        defaultLocale,
        locales,
        isDefault: locale === defaultLocale,
        urlPrefix:
          locale === defaultLocale && !prefixDefault ? '' : `/${locale}`,
      });
      return acc;
    },
    {} as Record<Locales, T>
  );
