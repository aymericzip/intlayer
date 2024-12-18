import type { Locales } from '@intlayer/config/client';

/**
 * Returns the language code of the given locale for locales including the country code.
 *
 * Example:
 *
 * getLocaleLang('en-US') // 'en'
 * getLocaleLang('en') // 'en'
 * getLocaleLang('fr-CA') // 'fr'
 * getLocaleLang('fr') // 'fr'
 *
 * @param locale The locale to get the language code for.
 * @returns The language code of the given locale.
 */
export const getLocaleLang = (locale?: Locales): string =>
  locale?.split('-')[0] ?? '';
