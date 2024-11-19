'use client';

import { useIsMounted } from '@intlayer/design-system/hooks';
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from 'next-themes';
import type { FC } from 'react';

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  ...props
}) => {
  const isMounded = useIsMounted();

  if (!isMounded) {
    return children;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
