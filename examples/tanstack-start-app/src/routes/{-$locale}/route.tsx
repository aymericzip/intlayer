import { createFileRoute, Outlet } from '@tanstack/react-router';
import { IntlayerProvider } from 'react-intlayer';
import { useI18nHTMLAttributes } from '@/hooks/useI18nHTMLAttributes';
import { configuration } from 'intlayer';

export const Route = createFileRoute('/{-$locale}')({
  component: LayoutComponent,
});

function LayoutComponent() {
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
