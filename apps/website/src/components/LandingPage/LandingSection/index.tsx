import { Globe } from '@components/Globe/Globe';
import { Check } from 'lucide-react';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import { ActionButtons } from './ActionButtons';
import { AnimatedDescription } from './AnimatedDescription';

export const LandingSection: FC = () => {
  const { title, description, keyPoints } = useIntlayer('landing-section');

  return (
    <section className="flex min-h-[calc(100vh-64px)] w-full flex-col gap-16 md:flex-row md:px-10 md:pr-0">
      <div className="relative flex w-full flex-1 flex-col items-center justify-between md:justify-center">
        <div className="flex w-full md:flex-auto md:items-center">
          <div className="relative z-10 flex flex-col md:w-3/5">
            <div className="/90 bg-background/90 relative z-10 flex w-full flex-col justify-evenly gap-4 md:gap-16 md:!bg-transparent">
              <h1 className="mt-5 px-8 text-4xl font-light leading-[3rem] md:w-[120%] md:text-6xl md:leading-[4rem]">
                {title}
              </h1>
              <div className="flex flex-col gap-4">
                {description.map((el) => (
                  <AnimatedDescription
                    className="text-neutral inset-x-0 w-full px-8 leading-7 max-md:text-sm"
                    key={el.value}
                  >
                    {el}
                  </AnimatedDescription>
                ))}
              </div>
              <div className="ml-8 flex flex-col gap-3 px-8">
                {keyPoints.map((el) => (
                  <div
                    className="flex items-center gap-2 text-sm"
                    key={el.value}
                  >
                    <Check className="size-3 text-lime-800 dark:text-lime-600" />

                    <span className="text-neutral">{el}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="from-background/90 relative z-10 flex h-20 flex-col gap-10 bg-gradient-to-b from-0% to-100% md:hidden md:w-3/5"></div>
            <ActionButtons className="mt-10 px-8 max-md:hidden lg:mt-[15vh]" />
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
