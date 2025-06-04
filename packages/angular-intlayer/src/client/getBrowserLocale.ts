import { Locales } from '@intlayer/config';

/**
 * Get the locale from the browser
 */
export const getBrowserLocale = (): Locales | undefined => {
  if (typeof window !== 'undefined' && window.navigator) {
    return window.navigator.language.split('-')[0] as Locales;
  }
  return undefined;
};
