'use client';

import { IDE } from '@intlayer/design-system';
import { useTheme } from 'next-themes';
import { useMemo, type FC } from 'react';

import clientComponent from './content/client-component.md';
import clientComponentContent from './content/client-content.md';
import configFile from './content/config-file.md';
import serverComponent from './content/server-component.md';
import serverComponentContent from './content/server-content.md';

export const ideTabs = [
  {
    path: 'src/components/client/component.content.ts',
    content: clientComponent,
    isOpen: true,
  },
  {
    path: 'src/components/client/Component.tsx',
    content: clientComponentContent,
    isOpen: true,
  },
  {
    path: 'src/components/server/component.content.ts',
    content: serverComponent,
    isOpen: false,
  },
  {
    path: 'src/components/server/Component.tsx',
    content: serverComponentContent,
    isOpen: false,
  },
  {
    path: 'intlayer.config.ts',
    content: configFile,
    isOpen: false,
  },
];

type IDESectionProps = {
  scrollProgress: number;
};

export const IDESection: FC<IDESectionProps> = ({ scrollProgress }) => {
  const { resolvedTheme } = useTheme();

  // Memoize `activeTab` to prevent unnecessary re-renders
  const activeTab = useMemo(
    () => Math.floor(scrollProgress * ideTabs.length),
    [scrollProgress]
  );

  // Memoize IDE props to avoid unnecessary renders
  const ideProps = useMemo(
    () => ({
      isDarkMode: resolvedTheme === 'dark',
      pages: ideTabs, // ideTabs is static, no need to memoize
      activeTab,
    }),
    [activeTab, resolvedTheme]
  );

  return (
    <IDE
      {...ideProps}
      className="mx-auto min-h-[440px] md:max-h-[440px] md:min-h-auto flex-1 scale-100 md:scale-90 text-xs"
    />
  );
};
