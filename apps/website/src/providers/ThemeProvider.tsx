'use client';

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes';
import type { FC, PropsWithChildren } from 'react';

export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  ...props
}) => <NextThemesProvider {...props}>{children}</NextThemesProvider>;
