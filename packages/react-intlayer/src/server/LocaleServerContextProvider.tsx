import {
  type Locales,
  intlayerIntlConfiguration,
} from '@intlayer/config/client';
import type { FC, PropsWithChildren } from 'react';
import { createServerContext, getServerContext } from './serverContext';

/**
 * Context that store the current locale on the server side
 */
export const LocaleServerContext = createServerContext<Locales>(
  intlayerIntlConfiguration.defaultLocale
);

/**
 * Hook that provides the current locale
 */
export const useLocaleContext = () => getServerContext(LocaleServerContext);

/**
 * Get the current locale
 */
export const locale = getServerContext(LocaleServerContext);

export type LocaleServerContextProviderProps = PropsWithChildren & {
  locale: Locales;
};

/**
 * Provider that store the current locale on the server side
 */
export const LocaleServerContextProvider: FC<
  LocaleServerContextProviderProps
> = ({ children, locale }) => (
  <LocaleServerContext.Provider value={locale}>
    {children}
  </LocaleServerContext.Provider>
);
