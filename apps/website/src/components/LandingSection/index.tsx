import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export const LandingSection: FC = () => {
  const { title, description } = useIntlayer('landing-section');

  return (
    <div className="flex h-full flex-col p-10 md:flex-row">
      <div className="flex size-full flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold ">{title}</h1>
        <span className="text-neutral-500">{description}</span>
      </div>
      <div className="flex size-full flex-col items-center justify-center gap-3 ">
        content
      </div>
    </div>
  );
};
