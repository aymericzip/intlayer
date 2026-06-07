import { internationalization } from '@intlayer/config/built';
import {
  External_Github,
  Website_Doc_Search,
  Website_Home,
} from '@intlayer/design-system/routes';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import type { FC } from 'react';
import { useHotDataLoading } from '#hooks/useHotDataLoading.tsx';
import { useSessionRouterListener } from '#hooks/useSessionRouterListener.ts';
import packageJson from '../../../package_mock.json' with { type: 'json' };

const LocaleLayout: FC = () => {
  useHotDataLoading();
  useSessionRouterListener();

  return <Outlet />;
};

export const Route = createFileRoute('/{-$locale}')({
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;

    const websiteData = getIntlayer('website-structured-data', locale);
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
      inLanguage: internationalization.locales,
      keywords: websiteData.keywords,
    };

    const softwareData = getIntlayer(
      'software-application-structured-data',
      locale
    );
    const softwareApplication = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Intlayer',
      url: Website_Home,
      description: softwareData.description,
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
      keywords: softwareData.keywords,
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
        audienceType: softwareData.audienceType,
      },
      mainEntityOfPage: Website_Home,
    };

    return {
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(website),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(softwareApplication),
        },
      ],
    };
  },
  component: LocaleLayout,
});
