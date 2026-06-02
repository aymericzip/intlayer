/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */

import { External_Github, Website_Home } from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

export const OrganizationHeader: FC = () => {
  const { slogan, knowsAbout } = useIntlayer('organization-structured-data');

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
    slogan: slogan.value,
    knowsAbout: knowsAbout.map((keyword) => keyword.value),
    sameAs: [External_Github, 'https://twitter.com/intlayer'],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@intlayer.org',
      contactType: 'customer support',
      url: Website_Home,
      availableLanguage: ['en', 'fr', 'es', 'de', 'ja', 'ko', 'zh', 'it', 'pt'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organization),
      }}
    />
  );
};
