import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types';
import { derived } from 'svelte/store';
import { getIntlayerContext } from './intlayerContext';
import { intlayerStore } from './intlayerStore';
import { setLocaleInStorage } from './useLocaleStorage';

type useLocaleProps = {
  isCookieEnabled?: boolean;
  onLocaleChange?: (locale: LocalesValues) => void;
};

/**
 * Hook to get and set the current locale in Svelte applications
 * @returns Readable store with current locale and setter function
 */
export const useLocale = ({
  isCookieEnabled,
  onLocaleChange,
}: useLocaleProps = {}) => {
  const context = getIntlayerContext();
  const { defaultLocale, locales: availableLocales } =
    configuration?.internationalization ?? {};

  if (context) {
    // Use context if available
    return {
      locale: derived(
        [intlayerStore],
        ([$store]) => context.locale ?? $store.locale
      ),
      setLocale: (locale: LocalesValues) => {
        context.setLocale(locale);

        setLocaleInStorage(
          locale,
          isCookieEnabled ?? context?.isCookieEnabled ?? true
        );

        onLocaleChange?.(locale);
      },
      defaultLocale,
      availableLocales,
    };
  }

  // Fallback to global store
  return {
    locale: intlayerStore.getLocale(),
    setLocale: (locale: LocalesValues) => {
      intlayerStore.setLocale(locale);

      setLocaleInStorage(locale, isCookieEnabled ?? true);

      onLocaleChange?.(locale);
    },
    defaultLocale,
    availableLocales,
  };
};
