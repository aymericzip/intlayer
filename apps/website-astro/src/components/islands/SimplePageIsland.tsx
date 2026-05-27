/** @jsxImportSource react */

import type { LocalesValues } from 'intlayer';
import type { FC, ReactNode } from 'react';
import { IntlayerProvider } from 'react-intlayer';
import { AppProviders } from '@/providers/AppProviders';
import { ThemeProvider } from '@/providers/ThemeProvider';

// For pages that only need locale + provider wrapping, with React children
// Note: children here are React elements, not Astro slots
export const SimplePageIsland: FC<{
  locale: LocalesValues;
  children: ReactNode;
}> = ({ locale, children }) => (
  <IntlayerProvider locale={locale}>
    <ThemeProvider>
      <AppProviders>{children}</AppProviders>
    </ThemeProvider>
  </IntlayerProvider>
);
