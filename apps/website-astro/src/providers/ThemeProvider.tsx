import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes';
import type { FC, PropsWithChildren } from 'react';

export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  ...props
}) => (
  <NextThemesProvider
    attribute="data-theme"
    storageKey="intlayer-theme" // Limit issue with children app in iframe
    {...props}
  >
    {children}
  </NextThemesProvider>
);
