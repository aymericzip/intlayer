'use client';

import { IDE, WithResizer } from '@intlayer/design-system';
import { useTheme } from 'next-themes';
import { type FC, useMemo } from 'react';
import componentContent from './content/component-content.md';
import configFile from './content/config-file.md';
import viteConfigFile from './content/vite-config.md';
import { VisualEditorSection } from './Visual';

export const ideTabs = [
  {
    path: 'src/components/Component.tsx',
    content: componentContent,
    isOpen: true,
  },
  {
    path: 'intlayer.config.ts',
    content: configFile,
    isOpen: false,
  },
  {
    path: 'vite.config.ts',
    content: viteConfigFile,
    isOpen: false,
  },
];

type CompilerSectionProps = {
  scrollProgress: number;
};

export const CompilerSection: FC<CompilerSectionProps> = ({
  scrollProgress,
}) => {
  const { resolvedTheme } = useTheme();

  // Memoize IDE props to avoid unnecessary renders
  const ideProps = useMemo(
    () => ({
      isDarkMode: resolvedTheme === 'dark',
      pages: ideTabs, // ideTabs is static, no need to memoize
    }),
    [resolvedTheme]
  );

  return (
    <div className="flex size-full max-h-[440px] flex-1 scale-90 flex-row rounded-3xl bg-neutral-200 [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-4xl dark:bg-neutral-950">
      <WithResizer initialWidth={300}>
        <IDE {...ideProps} className="mx-auto flex-1 rounded-r-none! text-xs" />
      </WithResizer>
      <VisualEditorSection scrollProgress={scrollProgress} />
    </div>
  );
};
