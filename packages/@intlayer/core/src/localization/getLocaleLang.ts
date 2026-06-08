import type {
  GetLocaleLang,
  LocalesValues,
} from '@intlayer/types/module_augmentation';

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
export const getLocaleLang = <const L extends LocalesValues>(
  locale?: L
): GetLocaleLang<L & string> =>
  (locale?.split('-')[0] ?? '') as GetLocaleLang<L & string>;
