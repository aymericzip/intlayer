import { Code, DollarSign, ListTree, Pencil, Timer, Type } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
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
    <section className="flex w-full flex-col items-center justify-center gap-10 border-b py-10">
      <h2 className="text-4xl">{title}</h2>

      <div className="m-auto mt-3 grid w-full grid-cols-[auto_auto] place-items-center justify-evenly gap-x-2 gap-y-10 px-3 py-2 md:grid-cols-[1fr_1fr_1fr]">
        {content.map((asset) => {
          const Icon =
            iconKeyMap[asset.iconKey.value as keyof typeof iconKeyMap];

          return (
            <AnimatedDiv
              className="flex max-w-45 flex-col items-center gap-3 self-start p-6 text-center md:max-w-100"
              key={asset.title.value}
            >
              <div className="flex w-full flex-col items-center gap-4 md:flex-row">
                <span className="flex aspect-square size-12 items-center justify-center rounded-full border text-2xl">
                  <Icon className="size-5 text-primary" />
                </span>
                <h3 className="w-full text-left text-md leading-6">
                  {asset.title}
                </h3>
              </div>
              <AnimatedDiv>
                <p className="text-left text-muted-foreground text-sm leading-5">
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
