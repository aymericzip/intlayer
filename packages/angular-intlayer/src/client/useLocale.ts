import { computed, inject } from '@angular/core';
import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types';
import { INTLAYER_TOKEN, type IntlayerProvider } from './installIntlayer';
import { setLocaleInStorage } from './useLocaleStorage';

type useLocaleProps = {
  isCookieEnabled?: boolean;
  onLocaleChange?: (locale: LocalesValues) => void;
};

/**
 * On the client side, composable to get the current locale and all related fields
 */
export const useLocale = ({
  isCookieEnabled,
  onLocaleChange,
}: useLocaleProps = {}) => {
  const { defaultLocale, locales: availableLocales } =
    configuration?.internationalization ?? {};
  const intlayer = inject<IntlayerProvider>(INTLAYER_TOKEN);

  // Create a reactive reference for the locale
  const locale = computed(() => intlayer?.locale() ?? defaultLocale);
  const isCookieEnabledContext = computed(
    () => intlayer?.isCookieEnabled() ?? true
  );

  const setLocale = (newLocale: LocalesValues) => {
    if (!availableLocales?.map(String).includes(newLocale)) {
      console.error(`Locale ${newLocale} is not available`);
      return;
    }

    if (intlayer) {
      intlayer.setLocale(newLocale);
    }
    setLocaleInStorage(
      newLocale,
      isCookieEnabled ?? isCookieEnabledContext() ?? true
    );
    onLocaleChange?.(newLocale);
  };

  return {
    locale, // Current locale
    defaultLocale, // Principal locale defined in config
    availableLocales, // List of the available locales defined in config
    setLocale, // Function to set the locale
  };
};
