import { Loader } from '@intlayer/design-system/loader';
import { ReactQueryProvider } from '@intlayer/design-system/providers';
import { Toaster } from '@intlayer/design-system/toaster';
import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useParams,
} from '@tanstack/react-router';
import { defaultLocale, getHTMLTextDir } from 'intlayer';
import { Suspense } from 'react';
import { IntlayerProvider } from 'react-intlayer';
import { AnimatePresenceProvider } from '#/providers/AnimatePresenceProvider';
import { IntlayerMarkdownProvider } from '#/providers/IntlayerMarkdownProvider';
import { PostHogProvider } from '#/providers/PostHogProvider';
import { ThemeProvider } from '#/providers/ThemeProvider';
import { SoftwareApplicationHeader } from '#/structuredData/SoftwareApplication';
import { WebsiteHeader } from '#/structuredData/WebsiteHeader';
import appCss from '#/styles.css?url';
import { ErrorComponent } from '#components/ErrorComponent';
import { ServiceWorkerSubscriber } from '#components/ServiceWorker/ServiceWorkerSubscriber';
import { sessionQueryOptions } from '#utils/auth.tsx';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  errorComponent: ErrorComponent,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(sessionQueryOptions);
  },
  head: () => ({
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
      { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
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
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { locale = defaultLocale } = useParams({ strict: false }) as any;
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
                    <WebsiteHeader />
                    <SoftwareApplicationHeader />
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
