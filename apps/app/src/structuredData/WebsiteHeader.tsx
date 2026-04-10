import { internationalization } from '@intlayer/config/built';

import { useIntlayer } from 'react-intlayer';

export const WebsiteHeader = () => {
  const { keywords } = useIntlayer('website-structured-data');

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://intlayer.org',
    name: 'Intlayer',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${import.meta.env.VITE_SITE_URL}/doc/search?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    inLanguage: internationalization.locales,
    keywords: keywords.map((keyword) => keyword.value),
  };

  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(website),
      }}
    />
  );
};
