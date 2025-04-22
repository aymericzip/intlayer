import { getConfiguration } from 'intlayer';
import { useIntlayer } from 'next-intlayer/server';
import Script from 'next/script';

export const WebsiteHeader = () => {
  const { keywords } = useIntlayer('website-structured-data');
  const { internationalization } = getConfiguration();
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://intlayer.org',
    name: 'Intlayer',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${process.env.NEXT_PUBLIC_URL}/doc/search?search={search_term_string}`,
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
