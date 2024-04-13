import {
  type Locales,
  intlayerIntlConfiguration,
} from '@intlayer/config/client';
import type { FC } from 'react';
import type { LocaleContextProviderProps } from '../client/LocaleContextProvider';
import { createServerContext, getServerContext } from './serverContext';

export const LocaleServerContext = createServerContext<Locales>(
  intlayerIntlConfiguration.defaultLocale
);

export const locale = getServerContext(LocaleServerContext);

export const LocaleServerContextProvider: FC<LocaleContextProviderProps> = ({
  children,
  locale,
}) => (
  <LocaleServerContext.Provider value={locale}>
    {children}
  </LocaleServerContext.Provider>
);
