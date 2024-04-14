import {
  type Locales,
  intlayerIntlConfiguration,
} from '@intlayer/config/client';
import React, { type FC, type PropsWithChildren } from 'react';
import { LocaleServerContextProvider } from '../server/LocaleServerContextProvider';
import { LocaleClientContextProvider } from './LocaleClientContextProvider';

const defaultLocale = intlayerIntlConfiguration.defaultLocale;

export type LocaleContextProviderProps = PropsWithChildren & {
  locale: Locales;
};

export const LocaleContextProvider: FC<LocaleContextProviderProps> = ({
  children,
  locale = defaultLocale,
}) => (
  <LocaleServerContextProvider locale={locale}>
    <LocaleClientContextProvider locale={locale}>
      {children}
    </LocaleClientContextProvider>
  </LocaleServerContextProvider>
);
