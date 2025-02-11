import Script from 'next/script';
import { useIntlayer } from 'next-intlayer/server';
import { FC } from 'react';

export const ProductHeader: FC = () => {
  const { description } = useIntlayer('product-header-structured-data');
  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    url: 'https://intlayer.org/dashboard',
    name: 'Intlayer CMS',
    description,
    image:
      'https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png', // Example image URL for the product
    // sku: 'INTLAYER-CMS-001', // Example SKU (replace with actual)
    brand: {
      '@type': 'Brand',
      name: 'Intlayer',
    },
    offers: [
      // Free Pricing Offer
      {
        '@type': 'Offer',
        url: 'https://intlayer.org/pricing',
        priceCurrency: 'USD',
        price: '0.00',
        // priceValidUntil: '2024-08-26',
        availability: 'http://schema.org/InStock',
        itemCondition: 'http://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: 'Intlayer',
          url: 'https://intlayer.org',
        },
        category: 'Free Plan', // Indicating it's a Free plan
      },
      // Monthly Pricing Offer
      {
        '@type': 'Offer',
        url: 'https://intlayer.org/dashboard',
        priceCurrency: 'USD',
        price: '18.99', // Monthly price for premium
        // priceValidUntil: '2024-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        // eligibleRegion: {
        //   '@type': 'Place',
        //   name: 'US',
        // },
        seller: {
          '@type': 'Organization',
          name: 'Intlayer Inc.',
          url: 'https://intlayer.org',
        },
        category: 'Premium Monthly Plan', // Indicating it's a Premium plan
      },
      {
        '@type': 'Offer',
        url: 'https://intlayer.org/dashboard',
        priceCurrency: 'USD',
        price: '34.99', // Monthly price for enterprise
        // priceValidUntil: '2024-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        // eligibleRegion: {
        //   '@type': 'Place',
        //   name: 'US',
        // },
        seller: {
          '@type': 'Organization',
          name: 'Intlayer Inc.',
          url: 'https://intlayer.org',
        },
        category: 'Enterprise Monthly Plan', // Indicating it's an Enterprise plan
      },
      // Yearly Pricing Offer
      {
        '@type': 'Offer',
        url: 'https://intlayer.org/dashboard',
        priceCurrency: 'USD',
        price: '178.88', // Yearly price for premium (7.99 * 12)
        // priceValidUntil: '2024-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        // eligibleRegion: {
        //   '@type': 'Place',
        //   name: 'US',
        // },
        seller: {
          '@type': 'Organization',
          name: 'Intlayer Inc.',
          url: 'https://intlayer.org',
        },
        category: 'Premium Yearly Plan', // Indicating it's a Premium plan
      },
      {
        '@type': 'Offer',
        url: 'https://intlayer.org/dashboard',
        priceCurrency: 'USD',
        price: '359.88', // Yearly price for enterprise (16.99 * 12)
        // priceValidUntil: '2024-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        // eligibleRegion: {
        //   '@type': 'Place',
        //   name: 'US',
        // },
        seller: {
          '@type': 'Organization',
          name: 'Intlayer Inc.',
          url: 'https://intlayer.org',
        },
        category: 'Enterprise Yearly Plan', // Indicating it's an Enterprise plan
      },
    ],
  };

  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(product),
      }}
    />
  );
};
