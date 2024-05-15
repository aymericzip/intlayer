'use client';

import { useIsMounted } from '@intlayer/design-system/hooks';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
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
