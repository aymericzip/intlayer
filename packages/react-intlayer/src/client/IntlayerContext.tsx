import { internationalization } from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { createContext, useContext } from 'react';
import { localeInStorage } from './useLocaleStorage';

type IntlayerValue = {
  locale: LocalesValues;
  setLocale: (newLocale: LocalesValues) => void;
  disableEditor?: boolean;
  isCookieEnabled?: boolean;
};

/**
 * Context that stores the current locale on the client side.
 */
export const IntlayerClientContext = createContext<IntlayerValue>({
  locale: localeInStorage ?? internationalization?.defaultLocale,
  setLocale: () => null,
  isCookieEnabled: true,
});

/**
 * Hook that provides the current Intlayer client context.
 *
 * @returns The current Intlayer context values.
 */
export const useIntlayerContext = () => useContext(IntlayerClientContext) ?? {};
