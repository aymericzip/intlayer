import type { LocalesValues } from '@intlayer/config/client';
import { Accessor, createContext, createSignal, useContext } from 'solid-js';

export interface IntlayerProvider {
  locale: Accessor<LocalesValues>;
  setLocale: (locale: LocalesValues) => void;
}

export const INTLAYER_SYMBOL = Symbol('intlayer');

export const IntlayerContext = createContext<IntlayerProvider>();

export const useIntlayerContext = (): IntlayerProvider => {
  const context = useContext(IntlayerContext);
  if (!context) {
    throw new Error(
      'useIntlayerContext must be used within an IntlayerProvider'
    );
  }
  return context;
};

export const createIntlayerProvider = (
  initialLocale: LocalesValues
): IntlayerProvider => {
  const [locale, setLocale] = createSignal<LocalesValues>(initialLocale);

  return {
    locale,
    setLocale,
  };
};
