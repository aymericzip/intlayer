import { Globe } from '@components/Globe/Globe';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import { ActionButtons } from './ActionButtons';
import { AnimatedDescription } from './AnimatedDescription';

export const LandingSection: FC = () => {
  const { title, description } = useIntlayer('landing-section');

  return (
    <section className="flex min-h-[calc(100vh-64px)] w-full flex-col gap-16 md:flex-row md:p-10 md:pr-0">
      <div className="relative flex w-full flex-1 flex-col items-center justify-between md:justify-center">
        <div className="flex md:flex-auto md:items-center">
          <div className="relative z-10 flex flex-col md:w-3/5">
            <div className="dark:bg-background-dark/90 bg-background/95 relative z-10 flex w-full flex-col justify-evenly gap-12 md:!bg-transparent">
              <h1 className="mt-20 px-8 text-4xl font-bold md:mt-10 md:w-[120%]">
                {title}
              </h1>
              <AnimatedDescription className="text-neutral inset-x-0 w-full px-8">
                {description}
              </AnimatedDescription>
            </div>
            <div className="dark:from-background-dark/90 from-background/95 relative z-10 flex h-20 flex-col gap-10 bg-gradient-to-b from-0% to-100% md:hidden md:w-3/5"></div>
            <ActionButtons className="mt-12 px-8 max-md:hidden" />
          </div>
          <div className="relative z-0 flex size-full max-w-full flex-1 justify-end overflow-hidden max-md:absolute max-md:bottom-28">
            <div className="absolute bottom-0 left-0 w-[170%]">
              <Globe />
            </div>
          </div>
        </div>
        <ActionButtons className="z-10 mb-5 p-8 pt-0 md:hidden" />
      </div>
    </section>
  );
};
