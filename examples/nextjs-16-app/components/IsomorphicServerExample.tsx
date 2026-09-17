// Same import path as the client component next door, no `use client` here:
// the `react-server` condition resolves `useIntlayer` to the server
// implementation, which reads the ambient locale with no provider on the page.
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

export const IsomorphicServerExample: FC = () => {
  const { title } = useIntlayer('server-component-example');

  return (
    <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-900/20">
      <p data-testid="isomorphic-server">{title}</p>
    </div>
  );
};
