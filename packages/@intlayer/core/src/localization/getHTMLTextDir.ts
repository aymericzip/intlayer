import {
  ARABIC,
  ARABIC_ALGERIA,
  ARABIC_BAHRAIN,
  ARABIC_CHAD,
  ARABIC_COMOROS,
  ARABIC_DJIBOUTI,
  ARABIC_EGYPT,
  ARABIC_IRAQ,
  ARABIC_JORDAN,
  ARABIC_KUWAIT,
  ARABIC_LEBANON,
  ARABIC_LIBYA,
  ARABIC_MAURITANIA,
  ARABIC_MOROCCO,
  ARABIC_OMAN,
  ARABIC_PALESTINE,
  ARABIC_QATAR,
  ARABIC_SAUDI_ARABIA,
  ARABIC_SOMALIA,
  ARABIC_SUDAN,
  ARABIC_SYRIA,
  ARABIC_TUNISIA,
  ARABIC_UNITED_ARAB_EMIRATES,
  ARABIC_YEMEN,
  DIVEHI,
  DIVEHI_MALDIVES,
  FARSI,
  FARSI_IRAN,
  HEBREW,
  HEBREW_ISRAEL,
  PASHTO,
  PASHTO_AFGHANISTAN,
  SYRIAC,
  SYRIAC_SYRIA,
  URDU,
  URDU_ISLAMIC_REPUBLIC_OF_PAKISTAN,
  YIDDISH,
  YIDDISH_WORLD,
} from '@intlayer/types/locales';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

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
    case ARABIC:
    case ARABIC_UNITED_ARAB_EMIRATES:
    case ARABIC_BAHRAIN:
    case ARABIC_ALGERIA:
    case ARABIC_EGYPT:
    case ARABIC_IRAQ:
    case ARABIC_JORDAN:
    case ARABIC_KUWAIT:
    case ARABIC_LEBANON:
    case ARABIC_LIBYA:
    case ARABIC_MOROCCO:
    case ARABIC_OMAN:
    case ARABIC_QATAR:
    case ARABIC_SAUDI_ARABIA:
    case ARABIC_SYRIA:
    case ARABIC_TUNISIA:
    case ARABIC_YEMEN:
    case ARABIC_MAURITANIA:
    case ARABIC_PALESTINE:
    case ARABIC_SUDAN:
    case ARABIC_DJIBOUTI:
    case ARABIC_SOMALIA:
    case ARABIC_CHAD:
    case ARABIC_COMOROS:
    // Hebrew (uses Hebrew script)
    case HEBREW:
    case HEBREW_ISRAEL:
    // Farsi/Persian (uses Arabic script)
    case FARSI:
    case FARSI_IRAN:
    // Urdu (uses Arabic script)
    case URDU:
    case URDU_ISLAMIC_REPUBLIC_OF_PAKISTAN:
    // Pashto (uses Arabic script)
    case PASHTO:
    case PASHTO_AFGHANISTAN:
    // Syriac (uses Syriac script)
    case SYRIAC:
    case SYRIAC_SYRIA:
    // Divehi (uses Thaana script)
    case DIVEHI:
    case DIVEHI_MALDIVES:
    // Yiddish (uses Hebrew script)
    case YIDDISH:
    case YIDDISH_WORLD:
      return 'rtl';

    default:
      return 'ltr';
  }
};
