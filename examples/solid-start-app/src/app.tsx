import { MetaProvider } from '@solidjs/meta';
import { Router, useLocation } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from 'intlayer';
import { IntlayerProvider } from 'solid-intlayer';
import { createEffect, type ParentProps, Suspense } from 'solid-js';
import { isServer } from 'solid-js/web';
import { Nav } from '~/components/Nav';
import './app.css';

/**
 * The URL is the single source of truth for the locale: the middleware has
 * already redirected the request to its localized path, so reading the path
 * here keeps the server render and the client hydration in agreement, and
 * makes every client-side navigation update the locale for free.
 */
const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // The server renders <html> in entry-server.tsx; client-side navigations
  // between locales have to update the attributes themselves.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
