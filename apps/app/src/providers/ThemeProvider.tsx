import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextTheme,
} from 'next-themes';
import type { FC, ReactNode } from 'react';

export const useTheme = useNextTheme;

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <NextThemeProvider
    attribute="data-theme"
    defaultTheme="system"
    enableSystem
    enableColorScheme
    disableTransitionOnChange
    storageKey="intlayer-theme"
  >
    {children}
  </NextThemeProvider>
);
