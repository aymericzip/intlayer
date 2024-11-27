import { type DeclarationContent } from 'intlayer';
import { Head } from 'next/document';

const website = {
  key: 'website-structured-data',
  content: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://intlayer.org',
    name: 'Intlayer',
    //   potentialAction: {
    //     '@type': 'SearchAction',
    //     target: 'https://www.votresite.com/?q={search_term_string}',
    //     'query-input': 'required name=search_term_string',
    //   },
  },
} satisfies DeclarationContent;

export const WebsiteHeader = () => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(website),
      }}
    />
  </Head>
);
