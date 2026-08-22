'use client';

import {
  ThemeProvider as DesignSystemThemeProvider,
  useTheme,
} from '@intlayer/design-system/providers';
import type { FC, PropsWithChildren } from 'react';

export { useTheme };

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <DesignSystemThemeProvider>{children}</DesignSystemThemeProvider>
);
