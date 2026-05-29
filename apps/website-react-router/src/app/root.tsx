import {
  App_Admin,
  App_Auth_ChangePassword,
  App_Auth_ResetPassword,
  App_Auth_SignIn,
  App_Auth_SignUp,
  App_Dashboard,
  App_Onboarding,
  App_Pricing,
} from '@intlayer/design-system/routes';
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
import { getDefaultHeaders } from '~/app/security-headers';

import type { Route } from './+types/root';

import '~/globals.css';
import '~/shiki.css';
import { AppProviders } from '~/providers/AppProviders';

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
  { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
  {
    rel: 'icon',
    href: '/favicon-16x16.png',
    type: 'image/png',
    sizes: '16x16',
  },
  {
    rel: 'icon',
    href: '/favicon-32x32.png',
    type: 'image/png',
    sizes: '32x32',
  },
  { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' },
  {
    rel: 'apple-touch-icon',
    href: '/apple-touch-icon.png',
    sizes: '180x180',
    type: 'image/png',
  },
  { rel: 'manifest', href: '/manifest.json' },
  { rel: 'alternate', type: 'application/rss+xml', href: '/feed.xml' },
];

export const meta: Route.MetaFunction = () => [
  {
    name: 'application-name',
    content: 'i18n Solution & CMS for React, Next.js, Vue, Svelte | Intlayer',
  },
  { name: 'author', content: 'Intlayer' },
  { name: 'creator', content: 'Aymeric PINEAU' },
  { name: 'robots', content: 'index, follow' },
  { name: 'baidu-site-verification', content: 'codeva-RLm6YdPzvy' },
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-title', content: 'Intlayer' },
  {
    name: 'apple-mobile-web-app-status-bar-style',
    content: 'black-translucent',
  },
  { name: 'format-detection', content: 'telephone=no, address=no, email=no' },
  { property: 'og:site_name', content: 'Intlayer' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:site', content: '@Intlayer183096' },
  { name: 'twitter:creator', content: '@aymericzip' },
  { name: 'twitter:image', content: '/github-social-preview.png' },
  { property: 'og:image', content: '/github-social-preview.png' },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  { property: 'og:image:alt', content: 'Intlayer' },
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

function getRedirectUrl(pathname: string): string | null {
  const localeMatch = pathname.match(/^\/([a-z]{2}(-[A-Z]{2})?)(\/.*)?$/);
  const hasLocale = !!localeMatch;
  const strippedPath = hasLocale ? localeMatch[3] || '/' : pathname;

  // Removed blog pages
  const blogRedirectMatch = strippedPath.match(
    /^\/blog\/i18n-technologies\/(CMS\/wix|CMS\/wordpress|CMS\/drupal|frameworks\/flutter)(\/.*)?$/
  );
  if (blogRedirectMatch) {
    return hasLocale ? `/${localeMatch[1]}/blog` : '/blog';
  }

  // Removed tanstack-start doc pages
  if (strippedPath === '/doc/environment/vite-and-react/tanstack-start') {
    return hasLocale
      ? `/${localeMatch[1]}/doc/environment/tanstack-start`
      : '/doc/environment/tanstack-start';
  }

  // Pricing
  if (strippedPath === '/pricing') {
    return App_Pricing;
  }

  // Onboarding
  if (strippedPath === '/onboarding') {
    return App_Onboarding;
  }

  // Dashboard
  if (strippedPath === '/dashboard') {
    return App_Dashboard;
  }
  if (strippedPath.startsWith('/dashboard/')) {
    const remaining = strippedPath.substring('/dashboard/'.length);
    return `${App_Dashboard}/${remaining}`;
  }

  // Admin
  if (strippedPath === '/admin') {
    return App_Admin;
  }
  if (strippedPath.startsWith('/admin/')) {
    const remaining = strippedPath.substring('/admin/'.length);
    return `${App_Admin}/${remaining}`;
  }

  // Auth pages
  if (strippedPath === '/auth/login') {
    return App_Auth_SignIn;
  }
  if (strippedPath === '/auth/register') {
    return App_Auth_SignUp;
  }
  if (strippedPath === '/auth/password/reset') {
    return App_Auth_ResetPassword;
  }
  if (strippedPath === '/auth/password/change') {
    return App_Auth_ChangePassword;
  }

  // Rewrite /doc/getting-started.md -> /en/doc/raw/getting-started?format=txt
  const mdDocMatch = strippedPath.match(/^\/doc\/(.+)\.md$/);
  if (mdDocMatch) {
    const docSlug = mdDocMatch[1];
    const targetLocale = hasLocale ? localeMatch[1] : 'en';
    return `/${targetLocale}/doc/raw/${docSlug}?format=txt`;
  }

  return null;
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname.includes('/assets/') && !pathname.startsWith('/assets/')) {
    const newPathname = pathname.substring(pathname.indexOf('/assets/'));
    throw redirect(newPathname + url.search + url.hash, 301);
  }

  const redirectUrl = getRedirectUrl(pathname);
  if (redirectUrl) {
    throw redirect(redirectUrl + url.search + url.hash, 301);
  }

  const isResourceRoute =
    pathname.endsWith('.xml') ||
    pathname.endsWith('.json') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/assets/') ||
    pathname === '/robots.txt';

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
