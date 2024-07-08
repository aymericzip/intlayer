import { IDE } from '@components/IDE';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import { ActionButtons } from './ActionButtons';
import { AnimatedDescription } from './AnimatedDescription';
import { AnimatedTitle } from './AnimatedTitle';
import tab1Content from './tab1.md';
import tab2Content from './tab2.md';

export const ideTabs = [
  {
    title: 'component.content.ts',
    content: tab1Content,
  },
  {
    title: 'Component.tsx',
    content: tab2Content,
  },
];

export const LandingSection: FC = () => {
  const { title, description } = useIntlayer('landing-section');

  return (
    <div className="flex w-full flex-col gap-16 p-8 sm:p-12 md:flex-row md:p-20">
      <div className="flex w-full flex-col items-center justify-center gap-6 md:h-[75vh] md:w-3/5">
        <AnimatedTitle className="text-4xl font-bold" text={title.value} />
        <AnimatedDescription className=" text-neutral dark:text-neutral-dark">
          {description}
        </AnimatedDescription>
        <ActionButtons />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-3 md:w-2/5">
        <div className="flex max-h-full w-full max-w-full">
          <IDE tabs={ideTabs} />
        </div>
      </div>
    </div>
  );
};
