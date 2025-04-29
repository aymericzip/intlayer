import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import { localeList } from '@intlayer/core';
import { computed, inject, ref, watch } from 'vue';
import { INTLAYER_SYMBOL } from '../constants';
import type { IntlayerProvider } from '../types/intlayer';
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
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);
  const { setLocaleCookie } = useLocaleCookie();

  // Create a reactive reference for the locale
  const currentLocale = ref(intlayer?.locale?.value ?? defaultLocale);

  // Watch for changes in the intlayer locale and update our local state
  if (intlayer?.locale) {
    watch(
      () => intlayer.locale.value,
      (newLocale) => {
        if (newLocale) {
          currentLocale.value = newLocale;
        }
      },
      { immediate: true }
    );
  }

  // Exported computed value based on our local reactive reference
  const locale = computed(() => currentLocale.value);

  const setLocale = (newLocale: LocalesValues) => {
    if (!availableLocales?.map(String).includes(newLocale)) {
      console.error(`Locale ${newLocale} is not available`);
      return;
    }

    // Update both the local ref and intlayer
    currentLocale.value = newLocale;
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
    localeList, // List of all available locales
    setLocale, // Function to set the locale
  };
};
