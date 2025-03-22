import { type IntlayerNode } from 'next-intlayer';
import { useIntlayer } from 'next-intlayer/server';
import type { FC, ReactNode } from 'react';
import { AnimatedDiv } from './AnimatedDiv';

const Item: FC<{
  index: number;
  title: IntlayerNode;
  description: ReactNode;
}> = ({ index, title, description }) => (
  <AnimatedDiv key={title.value} className="flex gap-10">
    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-4 border-lime-300 text-xl font-black text-lime-800 dark:border-lime-900 dark:text-lime-600">
      <span>{index + 1}</span>
    </span>
    <div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-neutral text-sm leading-7">{description}</p>
    </div>
  </AnimatedDiv>
);

export const DemoPage: FC = () => {
  const { title, landingParagraph, tutoParagraphs } = useIntlayer('demo-page');

  return (
    <div className="m-auto flex w-full max-w-3xl flex-col p-8 sm:p-12 md:size-full md:p-10">
      <h1 className="mb-3 mt-14 text-4xl font-bold">{title}</h1>
      <div className="text-md text-neutral py-10">{landingParagraph}</div>
      <div className="relative mx-auto my-10 flex max-w-[700px] flex-col gap-28">
        <Item
          index={0}
          title={tutoParagraphs.selection.title}
          description={tutoParagraphs.selection.description}
        />
        <Item
          index={1}
          title={tutoParagraphs.edition.title}
          description={tutoParagraphs.edition.description}
        />
        <Item
          index={2}
          title={tutoParagraphs.validation.title}
          description={tutoParagraphs.validation.description}
        />
      </div>
    </div>
  );
};
