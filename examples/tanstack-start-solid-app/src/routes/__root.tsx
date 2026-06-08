import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/solid-router';
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools';
import { defaultLocale, getHTMLTextDir } from 'intlayer';
import { IntlayerProvider } from 'solid-intlayer';
import { Suspense } from 'solid-js';
import { HydrationScript } from 'solid-js/web';
import Header from '../components/Header';
import styleCss from '../styles.css?url';
import { Route as LocaleRoute } from './{-$locale}/route';

export const Route = createRootRouteWithContext()({
  head: () => ({
    links: [{ rel: 'stylesheet', href: styleCss }],
  }),
  shellComponent: RootComponent,
});

function RootComponent() {
  const params = LocaleRoute.useParams();
  const locale = params().locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <IntlayerProvider locale={locale}>
          <Suspense>
            <Header />
            <Outlet />
            <TanStackRouterDevtools />
          </Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
