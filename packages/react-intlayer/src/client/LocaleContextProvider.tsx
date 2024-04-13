import {
  type Locales,
  intlayerIntlConfiguration,
} from '@intlayer/config/client';
import type { FC, PropsWithChildren } from 'react';
import { LocaleServerContextProvider } from '../server';
import { LocaleClientContextProvider } from '.';

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
