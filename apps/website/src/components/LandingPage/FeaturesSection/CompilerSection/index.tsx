'use client';

import {
  IDE,
  SwitchSelector,
  TechLogo,
  TechLogoName,
  WithResizer,
} from '@intlayer/design-system';
import { useTheme } from 'next-themes';
import { type FC, useState } from 'react';
import componentAngular from './content/component-angular.md';
import componentLit from './content/component-lit.md';
import componentPreact from './content/component-preact.md';
import componentSolid from './content/component-solid.md';
import componentSvelte from './content/component-svelte.md';
import componentVanilla from './content/component-vanilla.md';
import componentVue from './content/component-vue.md';
import configFile from './content/config-file.md';
import viteConfigFile from './content/vite-config.md';
import { VisualEditorSection } from './Visual';

type Framework =
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
  vue: [
    {
      path: 'src/components/Component.vue',
      content: componentVue,
      isOpen: true,
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

const switchChoices: { content: React.ReactNode; value: Framework }[] = [
  {
    content: <TechLogo name={TechLogoName.Vue} className="size-4" />,
    value: 'vue',
  },
  {
    content: <TechLogo name={TechLogoName.Svelte} className="size-4" />,
    value: 'svelte',
  },
  {
    content: <TechLogo name={TechLogoName.Lit} className="size-4" />,
    value: 'lit',
  },
  {
    content: <TechLogo name={TechLogoName.Angular} className="size-4" />,
    value: 'angular',
  },
  {
    content: <TechLogo name={TechLogoName.Preact} className="size-4" />,
    value: 'preact',
  },
  {
    content: <TechLogo name={TechLogoName.Solid} className="size-4" />,
    value: 'solid',
  },
  {
    content: <TechLogo name={TechLogoName.Vanilla} className="size-4" />,
    value: 'vanilla',
  },
];

type CompilerSectionProps = {
  scrollProgress: number;
};

export const CompilerSection: FC<CompilerSectionProps> = ({
  scrollProgress,
}) => {
  const { resolvedTheme } = useTheme();
  const [framework, setFramework] = useState<Framework>('vue');

  const tabs = frameworkTabs[framework];

  return (
    <div className="flex size-full flex-1 flex-col items-center justify-center gap-3">
      <SwitchSelector
        choices={switchChoices}
        value={framework}
        onChange={setFramework}
        size="sm"
        color="text"
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
