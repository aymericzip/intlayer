import { IDE } from '@components/IDE';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
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
    <div className="flex size-full flex-col gap-16 p-20 md:w-full md:flex-row">
      <div className="flex size-full flex-col items-center justify-center gap-6 md:w-1/2">
        <h1 className="text-4xl font-bold ">{title}</h1>
        <span className="text-neutral-500">{description}</span>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-3 md:w-1/2">
        <div className="flex max-h-full w-full max-w-full">
          <IDE tabs={ideTabs} />
        </div>
      </div>
    </div>
  );
};
