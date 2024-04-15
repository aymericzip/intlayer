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

type LocaleContextValue = {
  locale: Locales;
};

export const LocaleClientContext = createContext<LocaleContextValue>({
  locale: intlayerIntlConfiguration.defaultLocale,
});

export const useLocaleContext = () => useContext(LocaleClientContext);

export type LocaleClientContextProviderProps = PropsWithChildren & {
  locale: Locales;
};

export const LocaleClientContextProvider: FC<
  LocaleClientContextProviderProps
> = ({ locale, children }) => (
  <LocaleClientContext.Provider value={{ locale }}>
    {children}
  </LocaleClientContext.Provider>
);
