import { Loader } from '@intlayer/design-system/loader';
import { ReactQueryProvider } from '@intlayer/design-system/providers';
import { Toaster } from '@intlayer/design-system/toaster';
import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  getRouteApi,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { defaultLocale, getHTMLTextDir } from 'intlayer';
import { Suspense } from 'react';
import { IntlayerProvider } from 'react-intlayer';
import { AnimatePresenceProvider } from '#/providers/AnimatePresenceProvider';
import { IntlayerMarkdownProvider } from '#/providers/IntlayerMarkdownProvider';
import { PostHogProvider } from '#/providers/PostHogProvider';
import { ThemeProvider } from '#/providers/ThemeProvider';
import appCss from '#/styles.css?url';
import { ErrorComponent } from '#components/ErrorComponent';
import { ServiceWorkerSubscriber } from '#components/ServiceWorker/ServiceWorkerSubscriber';
import { sessionQueryOptions } from '#utils/auth.tsx';
import { getRootStructuredDataScripts } from '#utils/structuredData';

const localeRoute = getRouteApi('/{-$locale}');

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  errorComponent: ErrorComponent,
  loader: async ({ context: { queryClient } }) => {
    const [, structuredDataScripts] = await Promise.all([
      queryClient.query(sessionQueryOptions),
      getRootStructuredDataScripts(),
    ]);

    return { structuredDataScripts };
  },
  head: ({ loaderData }) => {
    const structuredDataScripts = loaderData?.structuredDataScripts ?? [];

    return {
      title: 'Intlayer',
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Intlayer - Developer-friendly internationalization & multilingual CMS',
        },
        { name: 'application-name', content: 'Intlayer' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:site_name', content: 'Intlayer' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@Intlayer183096' },
        { name: 'twitter:creator', content: '@aymericzip' },
        { name: 'author', content: 'Intlayer' },
        { name: 'author', content: 'Aymeric PINEAU' },
        { name: 'creator', content: 'Aymeric PINEAU' },
        { name: 'publisher', content: 'Intlayer' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-title', content: 'Intlayer' },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
        {
          name: 'format-detection',
          content: 'telephone=yes, date=yes, email=yes, address=yes',
        },
        {
          name: 'theme-color',
          content: '#FFFFFF',
          media: '(prefers-color-scheme: light)',
        },
        {
          name: 'theme-color',
          content: '#000000',
          media: '(prefers-color-scheme: dark)',
        },
        { name: 'color-scheme', content: 'light dark' },
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'preconnect',
          href: import.meta.env.VITE_POSTHOG_HOST,
        },
        {
          rel: 'preconnect',
          href: import.meta.env.VITE_BACKEND_URL,
        },
      ],
      scripts: [...structuredDataScripts],
    };
  },
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { locale = defaultLocale } = localeRoute.useParams();
  const { queryClient } = Route.useRouteContext();

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="relative flex size-full min-h-screen flex-col overflow-auto overflow-x-clip scroll-smooth text-text leading-6 transition md:flex">
        <IntlayerProvider locale={locale}>
          <PostHogProvider>
            <AnimatePresenceProvider>
              <ThemeProvider>
                <IntlayerMarkdownProvider>
                  <ReactQueryProvider client={queryClient}>
                    <Toaster />
                    <ServiceWorkerSubscriber />
                    <Suspense fallback={<Loader />}>{children}</Suspense>
                  </ReactQueryProvider>
                </IntlayerMarkdownProvider>
              </ThemeProvider>
            </AnimatePresenceProvider>
          </PostHogProvider>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
