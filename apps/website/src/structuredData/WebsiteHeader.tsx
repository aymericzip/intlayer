import Head from 'next/head';

export const WebsiteHeader = () => {
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
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website),
        }}
      />
    </Head>
  );
};
