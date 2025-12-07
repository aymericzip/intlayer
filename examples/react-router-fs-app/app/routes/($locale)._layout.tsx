import { IntlayerProvider } from 'react-intlayer';
import { Outlet } from 'react-router';

import { useI18nHTMLAttributes } from '~/hooks/useI18nHTMLAttributes';

import type { Route } from './+types/($locale)._layout';

export default function RootLayout({ params }: Route.ComponentProps) {
  useI18nHTMLAttributes();

  const { locale } = params;

  console.log({ params });

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
