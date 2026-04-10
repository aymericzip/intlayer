import { ReactQueryProvider } from '@intlayer/design-system/providers';
import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { defaultLocale, getHTMLTextDir } from 'intlayer';
import { IntlayerProvider } from 'react-intlayer';
import { SoftwareApplicationHeader } from '#/structuredData/SoftwareApplication';
import { WebsiteHeader } from '#/structuredData/WebsiteHeader';
import { BackgroundLayout } from '#/components/BackgroundLayout';
import { ServiceWorkerSubscriber } from '#components/ServiceWorker/ServiceWorkerSubscriber.tsx';
import { BaiduAutoPushSubscriber } from '../components/BaiduAutoPush/BaiduAutoPushSubscriber';
import { IntlayerMarkdownProvider } from '../components/IntlayerMarkdownProvider';
import { Navbar } from '../components/Navbar';
import PostHogProvider from '../integrations/posthog/provider';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../lib/site';
import appCss from '../styles.css?url';
import { Route as LocaleRoute } from './{-$locale}/route';

interface MyRouterContext {
  queryClient: QueryClient;
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: SITE_TITLE },
      { name: 'description', content: SITE_DESCRIPTION },
      { name: 'application-name', content: SITE_TITLE },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:site_name', content: 'Intlayer' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:image',
        content: `${SITE_URL}/github-social-preview.png`,
      },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@Intlayer183096' },
      { name: 'twitter:creator', content: '@aymericzip' },
      {
        name: 'twitter:image',
        content: `${SITE_URL}/github-social-preview.png`,
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      { rel: 'icon', type: 'image/x-icon', href: `${SITE_URL}/favicon.ico` },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `${SITE_URL}/favicon-16x16.png`,
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `${SITE_URL}/favicon-32x32.png`,
      },
      { rel: 'icon', type: 'image/svg+xml', href: `${SITE_URL}/logo.svg` },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: `${SITE_URL}/apple-touch-icon.png`,
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
      <body className="relative flex min-h-screen flex-col overflow-x-clip scroll-smooth bg-background text-text leading-8 transition md:flex">
        <IntlayerProvider locale={locale}>
          <WebsiteHeader />
          <SoftwareApplicationHeader />
          <IntlayerMarkdownProvider>
            <PostHogProvider>
              <ReactQueryProvider>
                <ServiceWorkerSubscriber />
                <BaiduAutoPushSubscriber />
                <BackgroundLayout>
                  <Navbar />
                  {children}
                </BackgroundLayout>
              </ReactQueryProvider>
            </PostHogProvider>
          </IntlayerMarkdownProvider>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
