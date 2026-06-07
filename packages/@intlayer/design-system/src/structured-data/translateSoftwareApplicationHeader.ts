import { External_Github, Website_Home } from '@intlayer/design-system/routes';
import { getIntlayer, type Locales } from 'intlayer';
import packageJson from './package_mock.json' with { type: 'json' };

export const getTranslateSoftwareApplicationHeader = ({ locale }: { locale: Locales }) => {
  const { description } = getIntlayer('translate-software-structured-data', locale);
  const { keywords, audienceType } = getIntlayer(
    'software-application-structured-data',
    locale
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Intlayer Translate CLI',
    url: `${Website_Home}/translate`,
    description: description.value,
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
    keywords: keywords.map((keyword) => keyword.value),
    creator: {
      '@type': 'Person',
      name: 'Aymeric PINEAU',
      url: 'https://github.com/aymericzip',
    },
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: 'Developer Tools',
    image: `${Website_Home}/cover.png`,
    operatingSystem: 'Mac, Windows, Linux',
    datePublished: '2024-08-26',
    audience: {
      '@type': 'Audience',
      audienceType: audienceType.value,
    },
    mainEntityOfPage: `${Website_Home}/translate`,
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
  };
};
