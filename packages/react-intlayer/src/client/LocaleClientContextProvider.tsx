'use client';

import {
  intlayerIntlConfiguration,
  type Locales,
} from '@intlayer/config/client';
import { createContext, useContext, type FC } from 'react';
import type { LocaleContextProviderProps } from './LocaleContextProvider';

type LocaleContextValue = {
  locale: Locales;
};

export const LocaleContext = createContext<LocaleContextValue>({
  locale: intlayerIntlConfiguration.defaultLocale,
});

export const useLocaleContext = () => useContext(LocaleContext);

export const LocaleClientContextProvider: FC<LocaleContextProviderProps> = ({
  locale,
  children,
}) => (
  <LocaleContext.Provider value={{ locale }}>{children}</LocaleContext.Provider>
);
