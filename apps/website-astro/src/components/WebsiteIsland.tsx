/** @jsxImportSource react */

import type { LocalesValues } from 'intlayer';
import type { FC, ReactNode } from 'react';
import { IntlayerProvider } from 'react-intlayer';
import { AppProviders } from '@/providers/AppProviders';
import { ThemeProvider } from '@/providers/ThemeProvider';

export const WebsiteIsland: FC<{
  locale: LocalesValues;
  children: ReactNode;
}> = ({ locale, children }) => (
  <IntlayerProvider locale={locale}>
    <ThemeProvider>
      <AppProviders>{children}</AppProviders>
    </ThemeProvider>
  </IntlayerProvider>
);
