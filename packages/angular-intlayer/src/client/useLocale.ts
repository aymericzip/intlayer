import { computed, inject } from '@angular/core';
import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import { INTLAYER_TOKEN, IntlayerProvider } from './installIntlayer';
import { useLocaleCookie } from './useLocaleCookie';

type useLocaleProps = {
  onLocaleChange?: (locale: LocalesValues) => void;
};

/**
 * On the client side, composable to get the current locale and all related fields
 */
export const useLocale = ({ onLocaleChange }: useLocaleProps = {}) => {
  const { defaultLocale, locales: availableLocales } =
    configuration?.internationalization ?? {};
  const intlayer = inject<IntlayerProvider>(INTLAYER_TOKEN);
  const { setLocaleCookie } = useLocaleCookie();

  // Create a reactive reference for the locale
  const locale = computed(() => intlayer?.locale() ?? defaultLocale);

  const setLocale = (newLocale: LocalesValues) => {
    if (!availableLocales?.map(String).includes(newLocale)) {
      console.error(`Locale ${newLocale} is not available`);
      return;
    }

    if (intlayer) {
      intlayer.setLocale(newLocale);
    }
    setLocaleCookie(newLocale);
    onLocaleChange?.(newLocale);
  };

  return {
    locale, // Current locale
    defaultLocale, // Principal locale defined in config
    availableLocales, // List of the available locales defined in config
    setLocale, // Function to set the locale
  };
};
