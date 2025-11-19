import configuration from '@intlayer/config/built';
import { derived } from 'svelte/store';
import { getIntlayerContext } from './intlayerContext';
import { intlayerStore } from './intlayerStore';

/**
 * Hook to get and set the current locale in Svelte applications
 * @returns Readable store with current locale and setter function
 */
export const useLocale = () => {
  const context = getIntlayerContext();
  const { defaultLocale, locales: availableLocales } =
    configuration?.internationalization ?? {};

  if (context) {
    // Use context if available
    return {
      locale: derived(
        [intlayerStore],
        ([$store]) => context.locale || $store.locale
      ),
      setLocale: context.setLocale,
    };
  }

  // Fallback to global store
  return {
    locale: intlayerStore.getLocale(),
    setLocale: intlayerStore.setLocale,
    defaultLocale,
    availableLocales,
  };
};
