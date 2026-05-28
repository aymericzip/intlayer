/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */

import {
  App_Dashboard,
  App_Pricing,
  Website_Home,
} from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

export const TranslateProductHeader: FC = () => {
  const { description } = useIntlayer(
    'translate-product-header-structured-data'
  );
  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    url: App_Dashboard,
    name: 'Intlayer Translate',
    description: description.value,
    image:
      'https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/CMS.png',
    brand: {
      '@type': 'Brand',
      name: 'Intlayer',
    },
    offers: [
      {
        '@type': 'Offer',
        url: App_Pricing,
        priceCurrency: 'USD',
        price: '0.00',
        availability: 'http://schema.org/InStock',
        itemCondition: 'http://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: 'Intlayer',
          url: Website_Home,
        },
        category: 'Free Plan',
      },
      {
        '@type': 'Offer',
        url: App_Dashboard,
        priceCurrency: 'USD',
        price: '18.99',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'Intlayer Inc.',
          url: Website_Home,
        },
        category: 'Premium Monthly Plan',
      },
      {
        '@type': 'Offer',
        url: App_Dashboard,
        priceCurrency: 'USD',
        price: '34.99',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'Intlayer Inc.',
          url: Website_Home,
        },
        category: 'Enterprise Monthly Plan',
      },
    ],
  };

  return (
    <Script
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(product),
      }}
    />
  );
};

const Script = (props: any) => <script {...props} />;
