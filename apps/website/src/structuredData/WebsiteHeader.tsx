/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */

import { internationalization } from '@intlayer/config/built';
import {
  Website_Doc_Search,
  Website_Home,
} from '@intlayer/design-system/routes';
import Script from 'next/script';
import { useIntlayer } from 'next-intlayer/server';

export const WebsiteHeader = () => {
  const { keywords } = useIntlayer('website-structured-data');

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
    keywords: keywords.map((keyword) => keyword.value),
  };

  return (
    <Script
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(website),
      }}
    />
  );
};
