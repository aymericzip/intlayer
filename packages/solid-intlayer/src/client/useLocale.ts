import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types';
import { createEffect, useContext } from 'solid-js';
import { IntlayerClientContext } from './IntlayerProvider';
import { useLocaleCookie } from './useLocaleCookie';

type useLocaleProps = {
  onLocaleChange?: (locale: LocalesValues) => void;
};

/**
 * On the client side, hook to get the current locale and all related fields
 */
export const useLocale = ({ onLocaleChange }: useLocaleProps = {}) => {
  const { defaultLocale, locales: availableLocales } =
    configuration?.internationalization ?? {};

  const context = useContext(IntlayerClientContext);
  const { setLocaleCookie } = useLocaleCookie();

  const setLocale = (locale: LocalesValues) => {
    if (!availableLocales?.map(String).includes(locale)) {
      console.error(`Locale ${locale} is not available`);
      return;
    }

    context?.setLocale(locale);
    setLocaleCookie(locale);
    onLocaleChange?.(locale);
  };

  // Create effect to trigger onLocaleChange when locale changes
  createEffect(() => {
    if (onLocaleChange && context?.locale) {
      const currentLocale = context.locale();
      onLocaleChange(currentLocale);
    }
  });

  return {
    locale: context?.locale, // Current locale (signal accessor)
    defaultLocale, // Principal locale defined in config
    availableLocales, // List of the available locales defined in config
    setLocale, // Function to set the locale
  };
};
