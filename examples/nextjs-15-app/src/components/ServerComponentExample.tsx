import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

/**
 * Server component reading its content through the ambient locale seeded by the
 * single `IntlayerProvider` in the layout — no provider around this page.
 */
export const ServerComponentExample: FC = () => {
  const { title, description } = useIntlayer('server-component-example');

  return (
    <div className="mt-8 rounded border p-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2">{description}</p>
    </div>
  );
};
