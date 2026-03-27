'use client';

import {
  IDE,
  SwitchSelector,
  TechLogo,
  TechLogoName,
} from '@intlayer/design-system';
import { cn } from '@intlayer/design-system/utils';
import { useTheme } from 'next-themes';
import { type FC, useState } from 'react';

import clientComponent from './content/client-component.md';
import clientComponentI18nEn from './content/client-component-i18n-en.md';
import clientComponentI18nEs from './content/client-component-i18n-es.md';
import clientComponentI18nFr from './content/client-component-i18n-fr.md';
import componentAngular from './content/component-angular.md';
import componentLit from './content/component-lit.md';
import componentNextClient from './content/component-next-client.md';
import componentNextServer from './content/component-next-server.md';
import componentPreact from './content/component-preact.md';
import componentReact from './content/component-react.md';
import componentSolid from './content/component-solid.md';
import componentSvelte from './content/component-svelte.md';
import componentVanilla from './content/component-vanilla.md';
import componentVue from './content/component-vue.md';
import configFileCentralized from './content/config-file-centralized.md';
import configFilePerComponent from './content/config-file-per-component.md';
import serverComponent from './content/server-component.md';
import serverComponentI18nEn from './content/server-component-i18n-en.md';
import serverComponentI18nEs from './content/server-component-i18n-es.md';
import serverComponentI18nFr from './content/server-component-i18n-fr.md';

type Framework =
  | 'next'
  | 'react'
  | 'vue'
  | 'svelte'
  | 'lit'
  | 'angular'
  | 'preact'
  | 'solid'
  | 'vanilla';

const frameworkComponent: Record<
  Exclude<Framework, 'next'>,
  { path: string; content: string }
> = {
  react: { path: 'src/components/Component.tsx', content: componentReact },
  vue: { path: 'src/components/Component.vue', content: componentVue },
  svelte: {
    path: 'src/components/Component.svelte',
    content: componentSvelte,
  },
  lit: { path: 'src/components/Component.ts', content: componentLit },
  angular: {
    path: 'src/app/component.component.ts',
    content: componentAngular,
  },
  preact: { path: 'src/components/Component.tsx', content: componentPreact },
  solid: { path: 'src/components/Component.tsx', content: componentSolid },
  vanilla: { path: 'src/components/component.js', content: componentVanilla },
};

const getPerComponentTabs = (framework: Framework) => {
  if (framework === 'next') {
    return [
      {
        path: 'src/components/server/component.content.ts',
        content: serverComponent,
        isOpen: true,
      },
      {
        path: 'src/components/server/Component.tsx',
        content: componentNextServer,
        isOpen: true,
      },
      {
        path: 'src/components/client/component.content.ts',
        content: clientComponent,
        isOpen: false,
      },
      {
        path: 'src/components/client/Component.tsx',
        content: componentNextClient,
        isOpen: false,
      },
      {
        path: 'intlayer.config.ts',
        content: configFileCentralized,
        isOpen: false,
      },
    ];
  }

  return [
    {
      path: 'src/components/component.content.ts',
      content: clientComponent,
      isOpen: true,
    },
    {
      path: frameworkComponent[framework].path,
      content: frameworkComponent[framework].content,
      isOpen: true,
    },
  ];
};

const getCentralizedTabs = (framework: Framework) => {
  if (framework === 'next') {
    return [
      {
        path: 'i18n/en/component.json',
        content: clientComponentI18nEn,
        isOpen: true,
      },
      {
        path: 'i18n/es/component.json',
        content: clientComponentI18nEs,
        isOpen: false,
      },
      {
        path: 'i18n/fr/component.json',
        content: clientComponentI18nFr,
        isOpen: false,
      },
      {
        path: 'src/components/server/Component.tsx',
        content: componentNextServer,
        isOpen: true,
      },
      {
        path: 'src/components/client/Component.tsx',
        content: componentNextClient,
        isOpen: false,
      },
      {
        path: 'intlayer.config.ts',
        content: configFilePerComponent,
        isOpen: false,
      },
    ];
  }

  return [
    {
      path: 'i18n/en/component.json',
      content: clientComponentI18nEn,
      isOpen: true,
    },
    {
      path: 'i18n/es/component.json',
      content: clientComponentI18nEs,
      isOpen: false,
    },
    {
      path: 'i18n/fr/component.json',
      content: clientComponentI18nFr,
      isOpen: false,
    },
    {
      path: frameworkComponent[framework].path,
      content: frameworkComponent[framework].content,
      isOpen: true,
    },
  ];
};

type Mode = 'per-component' | 'centralized';

const modeSwitchChoices: { content: string; value: Mode }[] = [
  { content: 'Per-component', value: 'per-component' },
  { content: 'Centralized', value: 'centralized' },
];

type IDESectionProps = {
  scrollProgress: number;
};

export const IDESection: FC<IDESectionProps> = ({ scrollProgress }) => {
  const { resolvedTheme } = useTheme();
  const [mode, setMode] = useState<Mode>('per-component');
  const [framework, setFramework] = useState<Framework>('next');

  const frameworkSwitchChoices: {
    content: React.ReactNode;
    value: Framework;
  }[] = [
    {
      content: (
        <TechLogo
          name={TechLogoName.Nextjs}
          className={cn(
            'size-4 text-text',
            framework !== 'next' && 'opacity-60 grayscale-60'
          )}
        />
      ),
      value: 'next',
    },
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

  const tabs =
    mode === 'per-component'
      ? getPerComponentTabs(framework)
      : getCentralizedTabs(framework);

  const activeTab = Math.floor(scrollProgress * tabs.length);

  return (
    <div className="flex size-full flex-1 flex-col items-center justify-center gap-3">
      <div className="flex flex-row flex-wrap items-center justify-center gap-3">
        <SwitchSelector
          choices={modeSwitchChoices}
          value={mode}
          onChange={setMode}
          size="sm"
          color="neutral"
          itemClassName="text-nowrap"
        />
        <SwitchSelector
          choices={frameworkSwitchChoices}
          value={framework}
          onChange={setFramework}
          size="sm"
          color="neutral"
        />
      </div>
      <IDE
        isDarkMode={resolvedTheme === 'dark'}
        pages={tabs}
        activeTab={activeTab}
        className="mx-auto max-h-[440px] flex-1 scale-90 text-xs"
        key={`${mode}-${framework}`}
      />
    </div>
  );
};
