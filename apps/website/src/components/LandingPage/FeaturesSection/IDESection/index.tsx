'use client';

import { IDE, SwitchSelector } from '@intlayer/design-system';
import { useTheme } from 'next-themes';
import { type FC, useState } from 'react';

import clientComponent from './content/client-component.md';
import clientComponentI18nEn from './content/client-component-i18n-en.md';
import clientComponentI18nEs from './content/client-component-i18n-es.md';
import clientComponentI18nFr from './content/client-component-i18n-fr.md';
import clientComponentContent from './content/client-content.md';
import configFileCentralized from './content/config-file-centralized.md';
import configFilePerComponent from './content/config-file-per-component.md';
import serverComponent from './content/server-component.md';
import serverComponentI18nEn from './content/server-component-i18n-en.md';
import serverComponentI18nEs from './content/server-component-i18n-es.md';
import serverComponentI18nFr from './content/server-component-i18n-fr.md';
import serverComponentContent from './content/server-content.md';

const intlayerTabs = [
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
    content: configFileCentralized,
    isOpen: false,
  },
];

const i18nTabs = [
  {
    path: 'i18n/en/client-component.json',
    content: clientComponentI18nEn,
    isOpen: true,
  },
  {
    path: 'i18n/en/server-component.json',
    content: serverComponentI18nEn,
    isOpen: false,
  },
  {
    path: 'i18n/es/client-component.json',
    content: clientComponentI18nEs,
    isOpen: true,
  },
  {
    path: 'i18n/es/server-component.json',
    content: serverComponentI18nEs,
    isOpen: false,
  },
  {
    path: 'i18n/fr/client-component.json',
    content: clientComponentI18nFr,
    isOpen: true,
  },
  {
    path: 'i18n/fr/server-component.json',
    content: serverComponentI18nFr,
    isOpen: false,
  },
  {
    path: 'src/components/client/Component.tsx',
    content: clientComponentContent,
    isOpen: true,
  },
  {
    path: 'src/components/server/Component.tsx',
    content: serverComponentContent,
    isOpen: false,
  },
  {
    path: 'intlayer.config.ts',
    content: configFilePerComponent,
    isOpen: false,
  },
];

type Mode = 'per-component' | 'centralized';

const switchChoices: { content: string; value: Mode }[] = [
  { content: 'Per-component', value: 'per-component' },
  { content: 'Centralized', value: 'centralized' },
];

type IDESectionProps = {
  scrollProgress: number;
};

export const IDESection: FC<IDESectionProps> = ({ scrollProgress }) => {
  const { resolvedTheme } = useTheme();
  const [mode, setMode] = useState<Mode>('per-component');

  const tabs = mode === 'per-component' ? intlayerTabs : i18nTabs;

  const activeTab = Math.floor(scrollProgress * tabs.length);

  const ideProps = {
    isDarkMode: resolvedTheme === 'dark',
    pages: tabs,
    activeTab,
  };

  return (
    <div className="flex size-full flex-1 flex-col items-center justify-center gap-3">
      <SwitchSelector
        choices={switchChoices}
        value={mode}
        onChange={setMode}
        size="sm"
        color="text"
        itemClassName="text-nowrap"
      />
      <IDE
        {...ideProps}
        className="mx-auto max-h-[440px] flex-1 scale-90 text-xs"
        key={mode}
      />
    </div>
  );
};
