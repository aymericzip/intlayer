'use client';

import { IDE as IDEUI, type IDEProps } from '@intlayer/design-system';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

export const IDE: FC<Omit<IDEProps, 'isDarkMode'>> = (props) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  return <IDEUI {...props} isDarkMode={isDarkMode} />;
};
