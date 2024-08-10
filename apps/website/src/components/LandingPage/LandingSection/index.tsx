import { IDE } from '@components/IDE';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import { ActionButtons } from './ActionButtons';
import { AnimatedDescription } from './AnimatedDescription';
import { AnimatedTitle } from './AnimatedTitle';
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

export const LandingSection: FC = () => {
  const { title, description } = useIntlayer('landing-section');

  return (
    <div className="flex w-full flex-col gap-16 p-8 sm:p-12 md:flex-row md:p-20">
      <div className="flex h-[80vh] w-full flex-col items-center justify-between gap-6 md:h-[75vh] md:w-3/5 md:justify-center">
        <AnimatedTitle
          className="text-4xl font-bold max-md:mt-24"
          text={title.value}
        />
        <AnimatedDescription className=" text-neutral dark:text-neutral-dark">
          {description}
        </AnimatedDescription>
        <ActionButtons />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-3 md:w-2/5">
        <div className="flex max-h-full w-full max-w-full">
          <IDE pages={ideTabs} className="max-h-[550px] min-h-[550px]" />
        </div>
      </div>
    </div>
  );
};
