import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export const ServerComponentExample: FC = () => {
  const content = useIntlayer('server-component-example');

  return (
    <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
      <h2 className="mb-3 font-semibold text-blue-900 text-xl dark:text-blue-100">
        {content.title}
      </h2>
      <p className="mb-4 text-blue-800 dark:text-blue-200">
        {content.description}
      </p>
      <div className="space-y-2">
        <p className="font-medium text-blue-900 dark:text-blue-100">
          {content.features}
        </p>
        <ul className="list-inside list-disc space-y-1 text-blue-800 dark:text-blue-200">
          <li>{content.feature1}</li>
          <li>{content.feature2}</li>
          <li>{content.feature3}</li>
        </ul>
      </div>
    </div>
  );
};
