import { createFileRoute, Outlet } from '@tanstack/react-router';
import { IntlayerProvider, useLocale } from 'react-intlayer';
import { useI18nHTMLAttributes } from '@/hooks/useI18nHTMLAttributes';

export const Route = createFileRoute('/{-$locale}')({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes();

  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
