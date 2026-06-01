/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */

import type { GetPricingResult } from '@intlayer/backend';
import { App_Dashboard } from '@intlayer/design-system/routes';
import { useIntlayer } from 'react-intlayer';
import { formatStructuredDataOffers } from '../utils/stripe';

export const ProductHeader = ({
  pricings,
}: {
  pricings: GetPricingResult['data'];
}) => {
  const { description } = useIntlayer('product-header-structured-data');

  const offers = formatStructuredDataOffers(pricings);

  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    url: App_Dashboard,
    name: 'Intlayer CMS',
    description: description.value,
    image:
      'https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/CMS.png',
    brand: {
      '@type': 'Brand',
      name: 'Intlayer',
    },
    offers,
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

const Script = (props: any) => <script {...props} />;
