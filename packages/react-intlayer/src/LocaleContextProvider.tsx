import { intlayerIntlConfiguration } from '@intlayer/config/client';
import React, { type FC } from 'react';
import {
  LocaleClientContextProvider,
  type LocaleClientContextProviderProps,
} from './client/LocaleClientContextProvider';
import {
  LocaleServerContextProvider,
  type LocaleServerContextProviderProps,
} from './server/LocaleServerContextProvider';

const defaultLocale = intlayerIntlConfiguration.defaultLocale;

type LocaleContextProviderProps = LocaleClientContextProviderProps &
  LocaleServerContextProviderProps;

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
