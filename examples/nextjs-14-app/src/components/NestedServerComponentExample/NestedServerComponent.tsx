import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export const NestedServerComponent: FC = () => {
  const content = useIntlayer('nested-server-component-example');

  return (
    <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      <h2 className={`mb-3 text-2xl font-semibold`}>{content.title} </h2>
      <p className={`m-0 max-w-[30ch] text-balance text-sm opacity-50`}>
        {content.content}
      </p>
    </div>
  );
};
