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
    // Arabic (uses Arabic script)
    case Locales.ARABIC:
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
    case Locales.ARABIC_MAURITANIA:
    case Locales.ARABIC_PALESTINE:
    case Locales.ARABIC_SUDAN:
    case Locales.ARABIC_DJIBOUTI:
    case Locales.ARABIC_SOMALIA:
    case Locales.ARABIC_CHAD:
    case Locales.ARABIC_COMOROS:
    // Hebrew (uses Hebrew script)
    case Locales.HEBREW:
    case Locales.HEBREW_ISRAEL:
    // Farsi/Persian (uses Arabic script)
    case Locales.FARSI:
    case Locales.FARSI_IRAN:
    // Urdu (uses Arabic script)
    case Locales.URDU:
    case Locales.URDU_ISLAMIC_REPUBLIC_OF_PAKISTAN:
    // Pashto (uses Arabic script)
    case Locales.PASHTO:
    case Locales.PASHTO_AFGHANISTAN:
    // Syriac (uses Syriac script)
    case Locales.SYRIAC:
    case Locales.SYRIAC_SYRIA:
    // Divehi (uses Thaana script)
    case Locales.DIVEHI:
    case Locales.DIVEHI_MALDIVES:
    // Yiddish (uses Hebrew script)
    case Locales.YIDDISH:
    case Locales.YIDDISH_WORLD:
      return 'rtl';

    default:
      return 'ltr';
  }
};
