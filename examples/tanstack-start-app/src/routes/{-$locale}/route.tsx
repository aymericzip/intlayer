import { createFileRoute, Outlet } from '@tanstack/react-router';
import { configuration } from 'intlayer';
import { IntlayerProvider } from 'react-intlayer';

import { useI18nHTMLAttributes } from '@/hooks/useI18nHTMLAttributes';

export const Route = createFileRoute('/{-$locale}')({
  component: RouteComponent,
});

function RouteComponent() {
  useI18nHTMLAttributes();

  const { locale } = Route.useParams();

  return (
    <IntlayerProvider
      locale={locale ?? configuration.internationalization.defaultLocale}
    >
      <Outlet />
    </IntlayerProvider>
  );
}
