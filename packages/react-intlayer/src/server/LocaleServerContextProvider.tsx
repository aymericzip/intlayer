import {
  type Locales,
  intlayerIntlConfiguration,
} from '@intlayer/config/client';
import type { FC, PropsWithChildren } from 'react';
import { createServerContext, getServerContext } from './serverContext';

export const LocaleServerContext = createServerContext<Locales>(
  intlayerIntlConfiguration.defaultLocale
);

export const locale = getServerContext(LocaleServerContext);

export type LocaleServerContextProviderProps = PropsWithChildren & {
  locale: Locales;
};

export const LocaleServerContextProvider: FC<
  LocaleServerContextProviderProps
> = ({ children, locale }) => (
  <LocaleServerContext.Provider value={locale}>
    {children}
  </LocaleServerContext.Provider>
);
