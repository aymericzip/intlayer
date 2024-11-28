import { type DeclarationContent, t } from 'intlayer';
import Head from 'next/head';

const website = {
  key: 'product-structured-data',
  content: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    url: 'https://intlayer.org/dashboard',
    name: 'Intlayer CMS',
    description: t({
      en: 'Intlayer CMS is a flexible content management system for developers and content managers.',
      fr: 'Intlayer CMS est un système de gestion de contenu flexible pour les développeurs et les responsables de contenu.',
      es: 'Intlayer CMS es un sistema de gestión de contenido flexible para desarrolladores y gestores de contenido.',
    }),
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
        price: '9.99', // Monthly price for premium
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
        price: '19.99', // Monthly price for enterprise
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
        price: '95.88', // Yearly price for premium (7.99 * 12)
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
        price: '203.88', // Yearly price for enterprise (16.99 * 12)
        // priceValidUntil: '2024-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        eligibleRegion: {
          '@type': 'Place',
          name: 'US',
        },
        seller: {
          '@type': 'Organization',
          name: 'Intlayer Inc.',
          url: 'https://intlayer.org',
        },
        category: 'Enterprise Yearly Plan', // Indicating it's an Enterprise plan
      },
    ],
  },
} satisfies DeclarationContent;

export const ProductHeader = () => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(website),
      }}
    />
  </Head>
);
