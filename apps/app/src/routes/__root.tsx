import { Loader } from '@intlayer/design-system/loader';
import { ReactQueryProvider } from '@intlayer/design-system/providers';
import {
  External_Github,
  Website_Doc_Search,
  Website_Home,
} from '@intlayer/design-system/routes';
import { Toaster } from '@intlayer/design-system/toaster';
import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { defaultLocale, getHTMLTextDir, getIntlayer, locales } from 'intlayer';
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
import packageJson from '../../package_mock.json' with { type: 'json' };
import { Route as LocaleRoute } from './{-$locale}/route';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  errorComponent: ErrorComponent,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(sessionQueryOptions);
  },
  head: () => {
    const websiteContent = getIntlayer(
      'website-structured-data',
      defaultLocale
    );
    const orgContent = getIntlayer(
      'organization-structured-data',
      defaultLocale
    );
    const softwareContent = getIntlayer(
      'software-application-structured-data',
      defaultLocale
    );

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
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: Website_Home,
            name: 'Intlayer',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${Website_Doc_Search}?search={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
            inLanguage: locales,
            keywords: websiteContent.keywords,
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Intlayer',
            url: Website_Home,
            logo: {
              '@type': 'ImageObject',
              url: `${Website_Home}/assets/logo.png`,
            },
            foundingDate: '2024',
            slogan: orgContent.slogan,
            knowsAbout: orgContent.knowsAbout,
            sameAs: [External_Github, 'https://twitter.com/intlayer'],
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'contact@intlayer.org',
              contactType: 'customer support',
              url: Website_Home,
              availableLanguage: locales,
            },
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Intlayer',
            url: Website_Home,
            description: softwareContent.description,
            softwareVersion: packageJson.version,
            license:
              'https://raw.githubusercontent.com/aymericzip/intlayer/refs/heads/main/LICENSE',
            author: {
              '@type': 'Organization',
              name: 'Intlayer',
              url: Website_Home,
              logo: `${Website_Home}/assets/logo.png`,
              sameAs: [External_Github],
            },
            publisher: {
              '@type': 'Organization',
              name: 'Intlayer',
              url: Website_Home,
              logo: `${Website_Home}/assets/logo.png`,
            },
            keywords: softwareContent.keywords,
            creator: {
              '@type': 'Person',
              name: 'Aymeric PINEAU',
              url: 'https://github.com/aymericzip',
            },
            applicationCategory: 'DeveloperApplication',
            applicationSubCategory: 'Developer Tools',
            image: `${Website_Home}/cover.png`,
            operatingSystem: 'Web, iOS, Android',
            datePublished: '2024-08-26',
            audience: {
              '@type': 'Audience',
              audienceType: softwareContent.audienceType,
            },
            mainEntityOfPage: Website_Home,
          }),
        },
      ],
    };
  },
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { locale = defaultLocale } = LocaleRoute.useParams();
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
