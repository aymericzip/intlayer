import {
  ThemeProvider as DesignSystemThemeProvider,
  useTheme,
} from '@intlayer/design-system/providers';
import type { FC, ReactNode } from 'react';

export { useTheme };

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <DesignSystemThemeProvider storageKey="intlayer-theme">
    {children}
  </DesignSystemThemeProvider>
);
