import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { configuration } from 'intlayer';
import { IntlayerProvider, useLocale } from 'react-intlayer';

import { useI18nHTMLAttributes } from '@/hooks/useI18nHTMLAttributes';

export const Route = createFileRoute('/{-$locale}')({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes();

  const { locale } = Route.useParams();
  const { locale: selectedLocale } = useLocale();
  const { defaultLocale } = configuration.internationalization;
  const { prefixDefault } = configuration.middleware;

  // Redirect to the default locale if no locale is present in the URL when prefixDefault is true
  if (selectedLocale === defaultLocale && !locale && prefixDefault) {
    return <Navigate replace to={defaultLocale} />;
  }

  // Redirect to the selected locale if the locale in the URL does not match the selected locale
  if (selectedLocale !== defaultLocale && !locale) {
    return <Navigate replace to={selectedLocale} />;
  }

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
