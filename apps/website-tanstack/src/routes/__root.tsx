import { ReactQueryProvider } from '@intlayer/design-system/providers';
import { Toaster } from '@intlayer/design-system/toaster';
import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { defaultLocale, getHTMLTextDir } from 'intlayer';
import { Suspense } from 'react';
import { IntlayerProvider } from 'react-intlayer';
import { ChunkErrorListener } from '~/components/ChunkErrorListener';
import { ServiceWorkerSubscriber } from '~/components/ServiceWorker/ServiceWorkerSubscriber';
import appCss from '~/globals.css?url';
import { AnimatePresenceProvider } from '~/providers/AnimatePresenceProvider';
import { FirstConsultationProvider } from '~/providers/FirstConsultationProvider';
import { Route as LocaleRoute } from './{-$locale}/route';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        title: 'i18n Solution & CMS for React, Next.js, Vue, Svelte | Intlayer',
      },
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          'Intlayer - Developer-friendly internationalization & multilingual CMS',
      },
      {
        name: 'application-name',
        content:
          'i18n Solution & CMS for React, Next.js, Vue, Svelte | Intlayer',
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
      {
        name: 'format-detection',
        content: 'telephone=no, address=no, email=no',
      },
      { property: 'og:site_name', content: 'Intlayer' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@Intlayer183096' },
      { name: 'twitter:creator', content: '@aymericzip' },
      { name: 'twitter:image', content: '/github-social-preview.png' },
      { property: 'og:image', content: '/github-social-preview.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Intlayer' },
    ],
    links: [
      { rel: 'preload', as: 'style', href: appCss },
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
      },
      { rel: 'preconnect', href: 'https://api.github.com' },
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
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'alternate', type: 'application/rss+xml', href: '/feed.xml' },
      {
        rel: 'preconnect',
        href: import.meta.env.VITE_BACKEND_URL,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { locale = defaultLocale } = LocaleRoute.useParams();

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="relative flex size-full min-h-screen flex-col overflow-auto overflow-x-clip scroll-smooth bg-background leading-8 transition md:flex">
        <IntlayerProvider locale={locale}>
          <AnimatePresenceProvider>
            <ReactQueryProvider>
              <Toaster />
              <ChunkErrorListener />
              <ServiceWorkerSubscriber />
              {import.meta.env.VITE_AHREFS_KEY && (
                <script
                  async
                  src="https://analytics.ahrefs.com/analytics.js"
                  data-key={import.meta.env.VITE_AHREFS_KEY}
                />
              )}
              <FirstConsultationProvider>
                <Suspense>{children}</Suspense>
              </FirstConsultationProvider>
            </ReactQueryProvider>
          </AnimatePresenceProvider>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
