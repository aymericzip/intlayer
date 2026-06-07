import { Website_Doc_Search, Website_Home, External_Github } from '@intlayer/design-system/routes';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { defaultLocale, getIntlayer, locales } from 'intlayer';

function getRedirectUrl(_pathname: string): string | null {
  return null;
}

export const Route = createFileRoute('/{-$locale}')({
  beforeLoad: ({ location }) => {
    const pathname = location.pathname;

    if (pathname.includes('/assets/') && !pathname.startsWith('/assets/')) {
      const newPathname = pathname.substring(pathname.indexOf('/assets/'));
      throw redirect({ to: newPathname + location.searchStr, statusCode: 301 });
    }

    const redirectUrl = getRedirectUrl(pathname);
    if (redirectUrl) {
      throw redirect({ to: redirectUrl, statusCode: 301 });
    }
  },
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const orgData = getIntlayer('organization-structured-data', locale);
    const websiteData = getIntlayer('website-structured-data', locale);

    const organization = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Intlayer',
      url: Website_Home,
      logo: {
        '@type': 'ImageObject',
        url: `${Website_Home}/assets/logo.png`,
      },
      foundingDate: '2024',
      slogan: orgData.slogan,
      knowsAbout: orgData.knowsAbout,
      sameAs: [External_Github, 'https://twitter.com/intlayer'],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'contact@intlayer.org',
        contactType: 'customer support',
        url: Website_Home,
        availableLanguage: ['en', 'fr', 'es', 'de', 'ja', 'ko', 'zh', 'it', 'pt'],
      },
    };

    const website = {
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
      keywords: websiteData.keywords,
    };

    return {
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(organization),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(website),
        },
      ],
    };
  },
  component: () => <Outlet />,
});
