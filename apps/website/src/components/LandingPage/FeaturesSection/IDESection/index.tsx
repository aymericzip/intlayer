'use client';

import {
  IDE,
  SwitchSelector,
  TechLogo,
  TechLogoName,
} from '@intlayer/design-system';
import { useTheme } from 'next-themes';
import { type FC, useState } from 'react';

import clientComponent from './content/client-component.md';
import clientComponentI18nEn from './content/client-component-i18n-en.md';
import clientComponentI18nEs from './content/client-component-i18n-es.md';
import clientComponentI18nFr from './content/client-component-i18n-fr.md';
import componentAngular from './content/component-angular.md';
import componentLit from './content/component-lit.md';
import componentPreact from './content/component-preact.md';
import componentSolid from './content/component-solid.md';
import componentSvelte from './content/component-svelte.md';
import componentVanilla from './content/component-vanilla.md';
import componentVue from './content/component-vue.md';
import configFileCentralized from './content/config-file-centralized.md';
import configFilePerComponent from './content/config-file-per-component.md';

type Framework =
  | 'vue'
  | 'svelte'
  | 'lit'
  | 'angular'
  | 'preact'
  | 'solid'
  | 'vanilla';

const frameworkComponent: Record<Framework, { path: string; content: string }> =
  {
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

const getPerComponentTabs = (framework: Framework) => [
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
  {
    path: 'intlayer.config.ts',
    content: configFileCentralized,
    isOpen: false,
  },
];

const getCentralizedTabs = (framework: Framework) => [
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
  {
    path: 'intlayer.config.ts',
    content: configFilePerComponent,
    isOpen: false,
  },
];

type Mode = 'per-component' | 'centralized';

const modeSwitchChoices: { content: string; value: Mode }[] = [
  { content: 'Per-component', value: 'per-component' },
  { content: 'Centralized', value: 'centralized' },
];

const frameworkSwitchChoices: { content: React.ReactNode; value: Framework }[] =
  [
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

type IDESectionProps = {
  scrollProgress: number;
};

export const IDESection: FC<IDESectionProps> = ({ scrollProgress }) => {
  const { resolvedTheme } = useTheme();
  const [mode, setMode] = useState<Mode>('per-component');
  const [framework, setFramework] = useState<Framework>('vue');

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
          color="text"
          itemClassName="text-nowrap"
        />
        <SwitchSelector
          choices={frameworkSwitchChoices}
          value={framework}
          onChange={setFramework}
          size="sm"
          color="text"
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
