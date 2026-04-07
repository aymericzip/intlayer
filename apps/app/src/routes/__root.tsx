import { ReactQueryProvider } from '@intlayer/design-system/providers';
import { Toaster } from '@intlayer/design-system/toaster';
import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { defaultLocale, getHTMLTextDir } from 'intlayer';
import { IntlayerProvider } from 'react-intlayer';
import { AnimatePresenceProvider } from '#/providers/AnimatePresenceProvider';
import { IntlayerMarkdownProvider } from '#/providers/IntlayerMarkdownProvider';
import { ThemeProvider } from '#/providers/ThemeProvider';
import appCss from '#/styles.css?url';
import { BaiduAutoPushSubscriber } from '#components/BaiduAutoPush/BaiduAutoPushSubscriber';
import { ErrorComponent } from '#components/ErrorComponent';
import { Route as LocaleRoute } from './{-$locale}/route';

interface MyRouterContext {
  queryClient: QueryClient;
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('intlayer-theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRouteWithContext<MyRouterContext>()({
  errorComponent: ErrorComponent,
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
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { locale = defaultLocale } = LocaleRoute.useParams();

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale} suppressHydrationWarning>
      <head>
        {/** biome-ignore lint/security/noDangerouslySetInnerHtml: Theme initialization script */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="relative flex size-full min-h-screen flex-col overflow-auto overflow-x-clip scroll-smooth bg-background leading-6 transition md:flex">
        <IntlayerProvider locale={locale}>
          <AnimatePresenceProvider>
            <ThemeProvider>
              <IntlayerMarkdownProvider>
                <ReactQueryProvider>
                  <Toaster />
                  <BaiduAutoPushSubscriber />
                  {children}
                </ReactQueryProvider>
              </IntlayerMarkdownProvider>
            </ThemeProvider>
          </AnimatePresenceProvider>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
