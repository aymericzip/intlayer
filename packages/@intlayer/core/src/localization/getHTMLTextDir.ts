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
  if (!locale) return 'ltr';

  try {
    const localeInfo = new Intl.Locale(locale);

    // Check for the 'textInfo' property (part of the Intl Enumeration API)
    // Most modern browsers support 'direction' via 'getTextInfo()' or 'textInfo'
    if ('getTextInfo' in localeInfo) {
      return (localeInfo as any).getTextInfo().direction as Dir;
    }

    // Fallback for environments supporting 'textInfo' property
    if ('textInfo' in localeInfo) {
      return (localeInfo as any).textInfo.direction as Dir;
    }

    // Manual fallback for older environments using script detection
    const maximized = localeInfo.maximize();
    const rtlScripts = [
      'Arab',
      'Hebr',
      'Thaa',
      'Syrc',
      'Mand',
      'Adlm',
      'Rohg',
      'Nkoo',
    ];

    return rtlScripts.includes(maximized.script ?? '') ? 'rtl' : 'ltr';
  } catch {
    return 'ltr';
  }
};
