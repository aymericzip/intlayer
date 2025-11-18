import { createFileRoute, Outlet } from '@tanstack/react-router';
import { IntlayerProvider, useLocale } from 'react-intlayer';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { useI18nHTMLAttributes } from '@/hooks/useI18nHTMLAttributes';

export const Route = createFileRoute('/{-$locale}')({
  component: RouteComponent,
});

function RouteComponent() {
  const { locale } = Route.useParams();
  const { defaultLocale } = useLocale();

  useI18nHTMLAttributes();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
      <LocaleSwitcher />
    </IntlayerProvider>
  );
}
