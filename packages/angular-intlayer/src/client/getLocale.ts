import type { Locales } from '@intlayer/config';

/**
 * Get the current locale
 * This is a basic implementation that can be extended with Angular services
 */
export const getLocale = (): Locales => {
  // This is a placeholder implementation
  // In a real Angular app, this would likely use a service or injection
  return 'en' as Locales;
};
