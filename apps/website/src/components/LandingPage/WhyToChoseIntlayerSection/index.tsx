import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export const WhyToChoseIntlayerSection: FC = () => {
  const { title, content } = useIntlayer('why-to-chose-intlayer-section');

  return (
    <div className="my-10 flex w-full flex-col items-center justify-center">
      <span className="text-neutral">{title}</span>

      <div className="m-auto mt-3 flex flex-wrap justify-evenly gap-3 px-10 py-2">
        {content.map((asset, index) => (
          <div
            className="flex max-w-[200px] flex-col items-center gap-3 text-center"
            key={index}
          >
            <span className="flex size-10 items-center justify-center rounded-full border-4 border-lime-300 text-2xl text-lime-800 dark:border-lime-900 dark:text-lime-600">
              {index}
            </span>
            <h3 className="text-xl">{asset.title}</h3>
            <p className="text-neutral text-xs">{asset.descrition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};