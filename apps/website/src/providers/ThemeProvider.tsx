'use client';

import {
  type ThemeProviderProps,
  ThemeProvider as NextThemesProvider,
} from 'next-themes';
import type { FC } from 'react';

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  ...props
}) => <NextThemesProvider {...props}>{children}</NextThemesProvider>;
