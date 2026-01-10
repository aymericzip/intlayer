'use client';

import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

export const ClientComponentExample: FC = () => {
  const content = useIntlayer('client-component-example');

  return (
    <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
      <h2 className="mb-3 font-semibold text-green-900 text-xl dark:text-green-100">
        {content.title.value}
      </h2>
      <p className="text-green-800 dark:text-green-200">
        {content.content.value}
      </p>
    </div>
  );
};
