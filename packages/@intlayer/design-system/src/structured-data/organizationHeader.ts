import { External_Github, Website_Home } from '@intlayer/design-system/routes';
import { getIntlayer, type Locales, locales } from 'intlayer';

export const getOrganizationHeader = ({ locale }: { locale: Locales }) => {
  const { slogan, knowsAbout } = getIntlayer(
    'organization-structured-data',
    locale
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Intlayer',
    url: Website_Home,
    logo: {
      '@type': 'ImageObject',
      url: `${Website_Home}/assets/logo.png`,
    },
    foundingDate: '2024',
    slogan: slogan.value,
    knowsAbout: knowsAbout.map((keyword) => keyword.value),
    sameAs: [External_Github, 'https://twitter.com/intlayer'],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@intlayer.org',
      contactType: 'customer support',
      url: Website_Home,
      availableLanguage: locales,
    },
  };
};
