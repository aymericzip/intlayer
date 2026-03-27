'use client';

import {
  IDE,
  SwitchSelector,
  TechLogo,
  TechLogoName,
  WithResizer,
} from '@intlayer/design-system';
import { cn } from '@intlayer/design-system/utils';
import { useTheme } from 'next-themes';
import { type FC, useState } from 'react';
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

type Framework =
  | 'react'
  | 'vue'
  | 'svelte'
  | 'lit'
  | 'angular'
  | 'preact'
  | 'solid'
  | 'vanilla';

const frameworkTabs: Record<
  Framework,
  { path: string; content: string; isOpen: boolean }[]
> = {
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
  const [framework, setFramework] = useState<Framework>('react');

  const switchChoices: { content: React.ReactNode; value: Framework }[] = [
    {
      content: (
        <TechLogo
          name={TechLogoName.React}
          className={cn(
            'size-4',
            framework !== 'react' && 'opacity-60 grayscale-60'
          )}
        />
      ),
      value: 'react',
    },
    {
      content: (
        <TechLogo
          name={TechLogoName.Vue}
          className={cn(
            'size-4',
            framework !== 'vue' && 'opacity-60 grayscale-60'
          )}
        />
      ),
      value: 'vue',
    },
    {
      content: (
        <TechLogo
          name={TechLogoName.Svelte}
          className={cn(
            'size-4',
            framework !== 'svelte' && 'opacity-60 grayscale-60'
          )}
        />
      ),
      value: 'svelte',
    },
    {
      content: (
        <TechLogo
          name={TechLogoName.Lit}
          className={cn(
            'size-4',
            framework !== 'lit' && 'opacity-60 grayscale-60'
          )}
        />
      ),
      value: 'lit',
    },
    {
      content: (
        <TechLogo
          name={TechLogoName.Angular}
          className={cn(
            'size-4',
            framework !== 'angular' && 'opacity-60 grayscale-60'
          )}
        />
      ),
      value: 'angular',
    },
    {
      content: (
        <TechLogo
          name={TechLogoName.Preact}
          className={cn(
            'size-4',
            framework !== 'preact' && 'opacity-60 grayscale-60'
          )}
        />
      ),
      value: 'preact',
    },
    {
      content: (
        <TechLogo
          name={TechLogoName.Solid}
          className={cn(
            'size-4',
            framework !== 'solid' && 'opacity-60 grayscale-60'
          )}
        />
      ),
      value: 'solid',
    },
    {
      content: (
        <TechLogo
          name={TechLogoName.Vanilla}
          className={cn(
            'size-4',
            framework !== 'vanilla' && 'opacity-60 grayscale-60'
          )}
        />
      ),
      value: 'vanilla',
    },
  ];

  const tabs = frameworkTabs[framework];

  return (
    <div className="flex size-full flex-1 flex-col items-center justify-center gap-3">
      <SwitchSelector
        choices={switchChoices}
        value={framework}
        onChange={setFramework}
        size="sm"
        color="neutral"
        itemClassName="text-nowrap"
      />
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
