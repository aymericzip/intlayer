import type { GetPricingResult } from '@intlayer/backend';
import { App_Dashboard } from '@intlayer/design-system/routes';
import { getIntlayer, type Locales } from 'intlayer';
import { formatStructuredDataOffers } from './utils/stripe';

export const getTMSProductHeader = ({
  pricings,
  locale,
}: {
  pricings: GetPricingResult['data'];
  locale: Locales;
}) => {
  const { description } = getIntlayer('tms-product-header-structured-data', locale);

  const offers = formatStructuredDataOffers(pricings);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    url: App_Dashboard,
    name: 'Intlayer TMS',
    description: description.value,
    image:
      'https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/CMS.png',
    brand: {
      '@type': 'Brand',
      name: 'Intlayer',
    },
    offers,
  };
};
