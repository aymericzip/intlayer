/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */

import type { GetPricingResult } from '@intlayer/backend';
import { App_Dashboard } from '@intlayer/design-system/routes';
import { buildProductJsonLd } from '@intlayer/design-system/structured-data';
import Script from 'next/script';
import { useIntlayer } from 'next-intlayer/server';
import { formatStructuredDataOffers } from '../utils/stripe';

export const TranslateProductHeader = ({
  pricings,
}: {
  pricings: GetPricingResult['data'];
}) => {
  const { description } = useIntlayer(
    'translate-product-header-structured-data'
  );

  const offers = formatStructuredDataOffers(pricings);

  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          buildProductJsonLd({
            url: App_Dashboard,
            name: 'Intlayer Translate',
            description: description.value,
            imageUrl:
              'https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/CMS.png',
            offers,
          })
        ),
      }}
    />
  );
};
