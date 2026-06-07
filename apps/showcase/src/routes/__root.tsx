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
import { IntlayerProvider } from 'react-intlayer';
import { BackgroundLayout } from '#/components/BackgroundLayout';
import { ErrorComponent } from '#/components/ErrorComponent';
import { Footer } from '#/components/Footer';
import Header from '#/components/Header';
import { IntlayerMarkdownProvider } from '#/components/IntlayerMarkdownProvider';
import { ThemeProvider } from '#/components/ThemeProvider';
import PostHogProvider from '#/integrations/posthog/provider';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '#/lib/site';
import appCss from '#/styles.css?url';
import packageJson from '../../package_mock.json' with { type: 'json' };
import { Route as LocaleRoute } from './{-$locale}/route';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  errorComponent: ErrorComponent,
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
  // Try to find locale in params of any active match
  const { locale = defaultLocale } = LocaleRoute.useParams();

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="relative flex min-h-screen flex-col overflow-x-clip scroll-smooth bg-background text-text leading-8 transition md:flex">
        <IntlayerProvider locale={locale}>
          <Toaster />
          <ThemeProvider>
            <IntlayerMarkdownProvider>
              <PostHogProvider>
                <ReactQueryProvider>
                  <BackgroundLayout>
                    <Header />
                    {children}
                    <Footer />
                  </BackgroundLayout>
                </ReactQueryProvider>
              </PostHogProvider>
            </IntlayerMarkdownProvider>
          </ThemeProvider>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
