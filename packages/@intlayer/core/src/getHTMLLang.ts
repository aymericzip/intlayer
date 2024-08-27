import type { Locales } from '@intlayer/config/client';

/**
 * Returns the language code of the given locale for locales including the country code.
 *
 * Example:
 *
 * getHTMLLang('en-US') // 'en'
 * getHTMLLang('en') // 'en'
 * getHTMLLang('fr-CA') // 'fr'
 * getHTMLLang('fr') // 'fr'
 *
 * @param locale The locale to get the language code for.
 * @returns The language code of the given locale.
 */
export const getHTMLLang = (locale?: Locales): string =>
  locale?.split('-')[0] ?? '';
