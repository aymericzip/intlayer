'use client';

import {
  intlayerIntlConfiguration,
  type Locales,
} from '@intlayer/config/client';
import {
  type PropsWithChildren,
  createContext,
  useContext,
  type FC,
} from 'react';
import { localeCookie } from './useLocaleCookie';

type IntlayerValue = {
  locale: Locales;
};

/**
 * Context that store the current locale on the client side
 */
export const IntlayerClientContext = createContext<IntlayerValue>({
  locale: localeCookie ?? intlayerIntlConfiguration.defaultLocale,
});

/**
 * Hook that provides the current locale
 */
export const useIntlayerContext = () => useContext(IntlayerClientContext);

export type IntlayerClientProviderProps = PropsWithChildren & {
  locale: Locales;
};

/**
 * Provider that store the current locale on the client side
 */
export const IntlayerClientProvider: FC<IntlayerClientProviderProps> = ({
  locale,
  children,
}) => (
  <IntlayerClientContext.Provider value={{ locale }}>
    {children}
  </IntlayerClientContext.Provider>
);
