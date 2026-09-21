'use client';

// `next-intlayer` is the isomorphic import path: the `react-server` condition
// gives server components the ambient-locale implementation, while the client
// layer — here — gets the context-backed one. Same call either way.
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

export const IsomorphicComponentExample: FC = () => {
  const { title } = useIntlayer('client-component-example');

  return (
    <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-900/20">
      <p data-testid="isomorphic-client">{title}</p>
    </div>
  );
};
