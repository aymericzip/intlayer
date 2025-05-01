import configuration from '@intlayer/config/built';
import { LocalesValues } from '@intlayer/config/client';

const { internationalization, middleware } = configuration;
const { prefixDefault } = middleware;
const { locales, defaultLocale } = internationalization;

export type LocaleData = {
  locale: LocalesValues;
  defaultLocale: LocalesValues;
  isDefault: boolean;
  locales: LocalesValues[];
  urlPrefix: string;
};

const baseLocaleData = {
  defaultLocale: defaultLocale,
  locales,
} satisfies Partial<LocaleData>;

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
  mapper: (locale: LocaleData) => T
): T[] =>
  locales.map((locale) =>
    mapper({
      ...baseLocaleData,
      locale,
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
export const localeFlatMap = <T>(mapper: (locale: LocaleData) => T[]): T[] =>
  locales.flatMap((locale) =>
    mapper({
      ...baseLocaleData,
      locale,
      isDefault: locale === defaultLocale,
      urlPrefix: locale === defaultLocale && !prefixDefault ? '' : `/${locale}`,
    })
  );
