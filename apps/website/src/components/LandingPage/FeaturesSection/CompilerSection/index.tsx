'use client';

import { IDE, WithResizer } from '@intlayer/design-system';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { type Framework, useFramework } from '../FrameworkContext';
import { FrameworkSelector } from '../FrameworkSelector';
import componentAngular from './content/component-angular.md';
import componentLit from './content/component-lit.md';
import componentPreact from './content/component-preact.md';
import componentReact from './content/component-react.md';
import componentSolid from './content/component-solid.md';
import componentSvelte from './content/component-svelte.md';
import componentVanilla from './content/component-vanilla.md';
import componentVue from './content/component-vue.md';
import configFile from './content/config-file.md';
import viteConfigFile from './content/vite-config.md';
import { VisualEditorSection } from './Visual';

const frameworkTabs: Record<
  Framework,
  { path: string; content: string; isOpen: boolean }[]
> = {
  next: [
    {
      path: 'src/components/Component.tsx',
      content: componentReact,
      isOpen: true,
    },
    { path: 'intlayer.config.ts', content: configFile, isOpen: false },
    { path: 'vite.config.ts', content: viteConfigFile, isOpen: false },
  ],
  react: [
    {
      path: 'src/components/Component.tsx',
      content: componentReact,
      isOpen: true,
    },
    { path: 'intlayer.config.ts', content: configFile, isOpen: false },
    { path: 'vite.config.ts', content: viteConfigFile, isOpen: false },
  ],
  vue: [
    {
      path: 'src/components/Component.vue',
      content: componentVue,
      isOpen: false,
    },
    { path: 'intlayer.config.ts', content: configFile, isOpen: false },
    { path: 'vite.config.ts', content: viteConfigFile, isOpen: false },
  ],
  svelte: [
    {
      path: 'src/components/Component.svelte',
      content: componentSvelte,
      isOpen: true,
    },
    { path: 'intlayer.config.ts', content: configFile, isOpen: false },
    { path: 'vite.config.ts', content: viteConfigFile, isOpen: false },
  ],
  lit: [
    {
      path: 'src/components/Component.ts',
      content: componentLit,
      isOpen: true,
    },
    { path: 'intlayer.config.ts', content: configFile, isOpen: false },
    { path: 'vite.config.ts', content: viteConfigFile, isOpen: false },
  ],
  angular: [
    {
      path: 'src/app/component.component.ts',
      content: componentAngular,
      isOpen: true,
    },
    { path: 'intlayer.config.ts', content: configFile, isOpen: false },
    { path: 'vite.config.ts', content: viteConfigFile, isOpen: false },
  ],
  preact: [
    {
      path: 'src/components/Component.tsx',
      content: componentPreact,
      isOpen: true,
    },
    { path: 'intlayer.config.ts', content: configFile, isOpen: false },
    { path: 'vite.config.ts', content: viteConfigFile, isOpen: false },
  ],
  solid: [
    {
      path: 'src/components/Component.tsx',
      content: componentSolid,
      isOpen: true,
    },
    { path: 'intlayer.config.ts', content: configFile, isOpen: false },
    { path: 'vite.config.ts', content: viteConfigFile, isOpen: false },
  ],
  vanilla: [
    {
      path: 'src/components/component.html',
      content: componentVanilla,
      isOpen: true,
    },
    { path: 'intlayer.config.ts', content: configFile, isOpen: false },
    { path: 'vite.config.ts', content: viteConfigFile, isOpen: false },
  ],
};

type CompilerSectionProps = {
  scrollProgress: number;
};

export const CompilerSection: FC<CompilerSectionProps> = ({
  scrollProgress,
}) => {
  const { resolvedTheme } = useTheme();
  const { framework } = useFramework();

  const tabs = frameworkTabs[framework];

  return (
    <div className="flex size-full flex-1 flex-col items-center justify-center gap-3">
      <FrameworkSelector />
      <div className="flex size-full max-h-[440px] flex-1 scale-90 flex-row rounded-3xl bg-neutral-200 [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-4xl dark:bg-neutral-950">
        <IDE
          isDarkMode={resolvedTheme === 'dark'}
          pages={tabs}
          className="mx-auto flex-1 rounded-r-none! text-xs"
          key={framework}
        />
        <WithResizer initialWidth={300} handlePosition="left">
          <VisualEditorSection scrollProgress={scrollProgress} />
        </WithResizer>
      </div>
    </div>
  );
};
