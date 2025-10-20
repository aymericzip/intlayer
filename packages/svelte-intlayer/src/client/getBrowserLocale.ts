import type { LocalesValues } from '@intlayer/types';

/**
 * Gets the user's preferred locale from browser settings
 * @returns The detected browser locale or 'en' as fallback
 */
export const getBrowserLocale = (): LocalesValues => {
  if (typeof navigator === 'undefined') {
    return 'en' as LocalesValues;
  }

  // Get the first preferred language
  const browserLocale = navigator.language || navigator.languages?.[0];

  if (!browserLocale) {
    return 'en' as LocalesValues;
  }

  // Extract language code (e.g., 'en-US' -> 'en')
  const languageCode = browserLocale.split('-')[0];

  return (languageCode || 'en') as LocalesValues;
};
