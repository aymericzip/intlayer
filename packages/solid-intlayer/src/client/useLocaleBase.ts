import configuration from '@intlayer/config/built';
import type { DeclaredLocales, LocalesValues } from '@intlayer/types';
import { useContext } from 'solid-js';
import { IntlayerClientContext } from './IntlayerProvider';

const { defaultLocale, locales: availableLocales } =
  configuration.internationalization;

type UseLocaleBaseResult = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
  setLocale: (locale: LocalesValues) => void;
};

/**
 * On the client side, hook to get the current locale and all related fields
 */
export const useLocaleBase = (): UseLocaleBaseResult => {
  const { locale, setLocale } = useContext(IntlayerClientContext);

  return {
    locale, // Current locale
    defaultLocale, // Principal locale defined in config
    availableLocales, // List of the available locales defined in config
    setLocale, // Function to set the locale
  } as unknown as UseLocaleBaseResult;
};
