import Script from 'next/script';
import { useIntlayer } from 'next-intlayer/server';
import { type FC } from 'react';

export const SoftwareApplicationHeader: FC = () => {
  const { description, keywords, audienceType } = useIntlayer(
    'software-application-structured-data',
    undefined,
    false
  );

  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Intlayer',
    url: 'https://www.votresite.com',
    description,
    softwareVersion: '3.5.6',
    license:
      'https://raw.githubusercontent.com/aymericzip/intlayer/refs/heads/main/LICENSE',
    author: {
      '@type': 'Organization',
      name: 'Intlayer',
      url: 'https://www.votresite.com',
      logo: 'https://www.votresite.com/assets/logo.png',
      sameAs: ['https://github.com/aymericzip'],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Intlayer',
      url: 'https://www.votresite.com',
      logo: 'https://www.votresite.com/assets/logo.png',
    },
    keywords,
    creator: {
      '@type': 'Person',
      name: 'Aymeric PINEAU',
      url: 'https://github.com/aymericzip',
    },
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Developer Tools',
    image: 'https://intlayer.org/cover.png',
    operatingSystem: 'Web, iOS, Android',
    platform: 'Web, React, nextjs, Vite',
    datePublished: '2024-08-26',
    audience: {
      '@type': 'Audience',
      audienceType,
    },
    mainEntityOfPage: 'https://intlayer.org',
  };

  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(softwareApplication),
      }}
    />
  );
};
