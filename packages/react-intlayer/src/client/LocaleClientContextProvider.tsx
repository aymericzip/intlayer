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

type LocaleContextValue = {
  locale: Locales;
};

/**
 * Context that store the current locale on the client side
 */
export const LocaleClientContext = createContext<LocaleContextValue>({
  locale: localeCookie ?? intlayerIntlConfiguration.defaultLocale,
});

/**
 * Hook that provides the current locale
 */
export const useLocaleContext = () => useContext(LocaleClientContext);

export type LocaleClientContextProviderProps = PropsWithChildren & {
  locale: Locales;
};

/**
 * Provider that store the current locale on the client side
 */
export const LocaleClientContextProvider: FC<
  LocaleClientContextProviderProps
> = ({ locale, children }) => (
  <LocaleClientContext.Provider value={{ locale }}>
    {children}
  </LocaleClientContext.Provider>
);
