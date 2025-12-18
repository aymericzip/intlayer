import { Locales, type LocalesValues } from '@intlayer/types';

type Dir = 'ltr' | 'rtl' | 'auto';

/**
 * Returns the text direction of the given locale.
 *
 * Example:
 *
 * getHTMLTextDir('en-US') // 'ltr'
 * getHTMLTextDir('en') // 'ltr'
 * getHTMLTextDir('fr-CA') // 'ltr'
 * getHTMLTextDir('fr') // 'ltr'
 *
 * @param locale The locale to get the text direction for.
 * @returns The text direction of the given locale.
 */
export const getHTMLTextDir = (locale?: LocalesValues): Dir => {
  switch (locale) {
    case Locales.HEBREW:
    case Locales.HEBREW_ISRAEL:
    case Locales.ARABIC:
    case Locales.FARSI:
    case Locales.URDU:
    case Locales.PASHTO:
    case Locales.SYRIAC:
    case Locales.ARABIC_UNITED_ARAB_EMIRATES:
    case Locales.ARABIC_BAHRAIN:
    case Locales.ARABIC_ALGERIA:
    case Locales.ARABIC_EGYPT:
    case Locales.ARABIC_IRAQ:
    case Locales.ARABIC_JORDAN:
    case Locales.ARABIC_KUWAIT:
    case Locales.ARABIC_LEBANON:
    case Locales.ARABIC_LIBYA:
    case Locales.ARABIC_MOROCCO:
    case Locales.ARABIC_OMAN:
    case Locales.ARABIC_QATAR:
    case Locales.ARABIC_SAUDI_ARABIA:
    case Locales.ARABIC_SYRIA:
    case Locales.ARABIC_TUNISIA:
    case Locales.ARABIC_YEMEN:
    case Locales.FARSI_IRAN:
    case Locales.URDU_ISLAMIC_REPUBLIC_OF_PAKISTAN:
    case Locales.PASHTO_AFGHANISTAN:
    case Locales.SYRIAC_SYRIA:
      return 'rtl';

    default:
      return 'ltr';
  }
};
