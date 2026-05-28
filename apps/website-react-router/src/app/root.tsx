import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from 'intlayer';
import { IntlayerProvider } from 'react-intlayer';
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router';
import { getDefaultHeaders } from '@/security-headers';

import type { Route } from './+types/root';

import '@/globals.css';
import '@/shiki.css';
import { AppProviders } from '@/providers/AppProviders';

/**
 * Global HTTP response headers — mirrors next.config.ts `headers()` for the
 * catch-all page routes.  Route-specific files (e.g. scanner) override these
 * by exporting their own `headers` function.
 */
export function headers(): Record<string, string> {
  return getDefaultHeaders();
}

export const links: Route.LinksFunction = () => [
  { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
  {
    crossOrigin: 'anonymous',
    href: 'https://fonts.gstatic.com',
    rel: 'preconnect',
  },
  {
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    rel: 'stylesheet',
  },
];

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname.includes('/assets/') && !pathname.startsWith('/assets/')) {
    const newPathname = pathname.substring(pathname.indexOf('/assets/'));
    throw redirect(newPathname + url.search + url.hash, 301);
  }

  const isResourceRoute =
    pathname.endsWith('.xml') ||
    pathname.endsWith('.json') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/assets/');

  const locale = getLocaleFromPath(request.url);

  if (!locale && !isResourceRoute) {
    throw data('Language not supported', { status: 404 });
  }

  return { locale: locale || defaultLocale };
}

export function Layout({
  children,
}: { children: React.ReactNode } & Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const { locale } = data ?? {};

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)} suppressHydrationWarning>
      <head>
        {/* Preconnect and DNS Prefetch for Google Tag Manager */}
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Preconnect and DNS Prefetch for your first-party backend */}
        <link
          rel="preconnect"
          href={import.meta.env.VITE_BACKEND_URL}
          crossOrigin=""
        />
        <link rel="dns-prefetch" href={import.meta.env.VITE_BACKEND_URL} />
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>

      <body className="relative flex size-full min-h-screen flex-col overflow-auto overflow-x-clip scroll-smooth bg-background leading-8 transition md:flex">
        <IntlayerProvider locale={locale}>
          <AppProviders>{children}</AppProviders>
        </IntlayerProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
