import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import { AnimatedDiv } from './AnimatedDiv';
import { AnimatedTitle } from './AnimatedTitle';
import { AsideImage } from './AsideImage';

export const DemoPage: FC = () => {
  const { title, landingParagraph, tutoParagraphs } = useIntlayer('demo-page');

  return (
    <div className="m-auto flex w-full flex-col p-8 sm:p-12 md:size-full md:p-20">
      <div className="flex h-[70vh] w-full flex-col items-center gap-10">
        <div className="max-w-[500px]">
          <AsideImage />
        </div>
        <div>
          <AnimatedTitle className="mb-3 mt-24 text-4xl font-bold">
            {title}
          </AnimatedTitle>
          <p className="text-md text-neutral dark:text-neutral-dark">
            {landingParagraph}
          </p>
        </div>
      </div>
      <div className="relative mx-auto my-10 flex max-w-[700px] flex-col gap-28">
        {tutoParagraphs.map((paragraph, index) => (
          <AnimatedDiv key={paragraph.title.value} className="flex gap-10">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-4 border-lime-300 text-xl font-black text-lime-800 dark:border-lime-900 dark:text-lime-600">
              <span>{index + 1}</span>
            </span>
            <div>
              <h3 className="mb-2 text-lg font-semibold">{paragraph.title}</h3>
              <p className="text-neutral dark:text-neutral-dark text-sm leading-7">
                {paragraph.description}
              </p>
            </div>
          </AnimatedDiv>
        ))}
      </div>

      {/* <h2>{tryItByYourself.title}</h2> */}
    </div>
  );
};
