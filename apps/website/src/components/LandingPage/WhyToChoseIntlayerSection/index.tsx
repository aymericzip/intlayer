import { Code, DollarSign, ListTree, Pencil, Timer, Type } from 'lucide-react';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import { AnimatedDiv } from './AnimatedDiv';

const iconKeyMap = {
  code: Code,
  type: Type,
  free: DollarSign,
  'file-tree': ListTree,
  timer: Timer,
  cms: Pencil,
};

export const WhyToChoseIntlayerSection: FC = () => {
  const { title, content } = useIntlayer('why-to-chose-intlayer-section');

  return (
    <section className="my-10 flex w-full flex-col items-center justify-center">
      <h2 className="text-neutral">{title}</h2>

      <div className="m-auto mt-3 grid w-full grid-cols-[auto_auto] place-items-center justify-evenly gap-x-2 gap-y-10 px-3 py-2 sm:grid-cols-[1fr_1fr_1fr]">
        {content.map((asset) => {
          const Icon =
            iconKeyMap[asset.iconKey.value as keyof typeof iconKeyMap];

          return (
            <AnimatedDiv
              className="flex max-w-[180px] flex-col items-center gap-3 self-start text-center md:max-w-[200px]"
              key={asset.title.value}
            >
              <span className="flex size-12 items-center justify-center rounded-full border-4 border-lime-300 text-2xl text-lime-800 dark:border-lime-900 dark:text-lime-600">
                <Icon className="size-5" />
              </span>
              <h3 className="md:text-md text-sm font-semibold md:text-lg">
                {asset.title}
              </h3>
              <AnimatedDiv>
                <p className="text-neutral text-xs leading-5">
                  {asset.description}
                </p>
              </AnimatedDiv>
            </AnimatedDiv>
          );
        })}
      </div>
    </section>
  );
};
