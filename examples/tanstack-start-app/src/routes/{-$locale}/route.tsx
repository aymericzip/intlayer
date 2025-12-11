import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createFileRoute,
  HeadContent,
  Outlet,
  redirect,
  Scripts,
} from '@tanstack/react-router';
import { configuration } from 'intlayer';
import { IntlayerProvider } from 'react-intlayer';

import Header from '@/components/Header';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { useI18nHTMLAttributes } from '@/hooks/useI18nHTMLAttributes';
import { NotFoundComponent } from './404';

const queryClient = new QueryClient();

const { locales, defaultLocale } = configuration.internationalization;

export const Route = createFileRoute('/{-$locale}')({
  beforeLoad: async ({ params }) => {
    // Get locale from route params (not from server headers, as beforeLoad runs on both client and server)
    const locale = params.locale;

    // If no locale provided (optional param), it's valid (will use default)
    if (!locale) return;
    if (locale.startsWith('.')) return;

    // Check if the provided locale is valid
    const isValidLocale = locales.some((localeEl) => localeEl === locale);

    if (!isValidLocale) {
      throw redirect({
        to: '/{-$locale}/404',
        params: { locale: undefined }, // Locale param is undefined in routing.mode = 'prefix-no-default', but can be changed by defaultLocale in routing.mode = 'prefix-all'
      });
    }
  },
  component: RouteComponent,
  notFoundComponent: NotFoundComponent,
});

function RouteComponent() {
  const { locale } = Route.useParams();

  useI18nHTMLAttributes();

  return (
    <html lang={locale ?? defaultLocale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />

        <IntlayerProvider locale={locale ?? defaultLocale}>
          <QueryClientProvider client={queryClient}>
            <Outlet />
            <LocaleSwitcher />
          </QueryClientProvider>
        </IntlayerProvider>

        <Scripts />
      </body>
    </html>
  );
}
