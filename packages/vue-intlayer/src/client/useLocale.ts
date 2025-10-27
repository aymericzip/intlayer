import configuration from '@intlayer/config/built';
import type { DeclaredLocales, LocalesValues } from '@intlayer/types';
import { type ComputedRef, computed, inject } from 'vue';
import { INTLAYER_SYMBOL, type IntlayerProvider } from './installIntlayer';
import { setLocaleInStorage } from './useLocaleStorage';

type useLocaleProps = {
  isCookieEnabled?: boolean;
  onLocaleChange?: (locale: LocalesValues) => void;
};

type UseLocaleResult = {
  locale: ComputedRef<DeclaredLocales>;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
  setLocale: (locale: LocalesValues) => void;
};

/**
 * On the client side, composable to get the current locale and all related fields
 */
export const useLocale = ({
  isCookieEnabled,
  onLocaleChange,
}: useLocaleProps = {}): UseLocaleResult => {
  const { defaultLocale, locales: availableLocales } =
    configuration?.internationalization ?? {};
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  // Create a reactive reference for the locale
  const locale = computed(
    () => (intlayer?.locale?.value ?? defaultLocale) as DeclaredLocales
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
      isCookieEnabled ?? intlayer?.isCookieEnabled ?? true
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
