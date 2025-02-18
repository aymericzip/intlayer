'use client';

import { IDE } from '@intlayer/design-system';
import { useTheme } from 'next-themes';
import { type FC } from 'react';

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

export const IDESection: FC = () => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  return (
    <IDE
      isDarkMode={isDarkMode}
      pages={ideTabs}
      className="mx-auto max-h-[440px] flex-1 text-xs"
    />
  );
};
