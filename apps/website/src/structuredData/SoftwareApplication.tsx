import { useIntlayer } from 'next-intlayer/server';
import Script from 'next/script';
import { type FC } from 'react';
import packageJson from '../../../../package.json' with { type: 'json' };

export const SoftwareApplicationHeader: FC = () => {
  const { description, keywords, audienceType } = useIntlayer(
    'software-application-structured-data'
  );

  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Intlayer',
    url: 'https://www.votresite.com',
    description: description.value,
    softwareVersion: packageJson.version,
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
    keywords: keywords.map((keyword) => keyword.value),
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
      audienceType: audienceType.value,
    },
    mainEntityOfPage: 'https://intlayer.org',
  };

  return (
    <Script
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(softwareApplication),
      }}
    />
  );
};
