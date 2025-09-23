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

  const activeTab = useMemo(() => {
    const index = Math.floor(scrollProgress * ideTabs.length);
    const throttledIndex = Math.floor(index / 2) * 2;
    return Math.min(throttledIndex, ideTabs.length - 1);
  }, [scrollProgress]);

  const ideProps = useMemo(
    () => ({
      isDarkMode: resolvedTheme === 'dark',
      pages: ideTabs,
      activeTab,
    }),
    [activeTab, resolvedTheme]
  );

  return (
    <section
      className="
        w-full 
        px-3 sm:px-4 md:px-0
        flex flex-col md:flex-row 
        items-stretch md:items-center 
        justify-center 
        gap-3 sm:gap-4 md:gap-8
      "
    >
      <div className="w-full md:flex-1">
        <IDE
          {...ideProps}
          className="
            mx-auto 
            w-full 
            max-h-[400px] sm:max-h-[420px] md:max-h-[440px] 
            flex-1 
            scale-100 sm:scale-100 md:scale-95 
            text-xs sm:text-sm
          "
        />
      </div>
    </section>
  );
};
