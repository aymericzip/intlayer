import {
  App_Dashboard,
  App_Pricing,
  Website_Home,
} from '@intlayer/design-system/routes';
/**
 * Formatter utility to format the pricing data into Schema.org Offer objects.
 */
export const formatStructuredDataOffers = (pricings: any) => {
  let dynamicOffers: any[] = [];

  if (pricings) {
    dynamicOffers = Object.entries(pricings).map(
      ([_, pricing]: [string, any]) => {
        let category = 'Premium Plan';
        if (pricing.planType === 'enterprise') {
          category = 'Enterprise Plan';
        } else if (pricing.planType === 'one_time') {
          category = 'Lifetime Plan';
        }

        // Build the Schema.org UnitPriceSpecification for recurrence
        // unitCode: MON = month, ANN = year (UN/CEFACT codes)
        let priceSpecification: Record<string, unknown> = {
          '@type': 'UnitPriceSpecification',
          price: (pricing.finalTotal / 100).toFixed(2),
          priceCurrency: pricing.currency.toUpperCase(),
        };

        if (pricing.period === 'monthly') {
          priceSpecification = {
            ...priceSpecification,
            billingIncrement: 1,
            unitCode: 'MON',
            referenceQuantity: {
              '@type': 'QuantitativeValue',
              value: 1,
              unitCode: 'MON',
            },
          };
        } else if (pricing.period === 'yearly') {
          priceSpecification = {
            ...priceSpecification,
            billingIncrement: 1,
            unitCode: 'ANN',
            referenceQuantity: {
              '@type': 'QuantitativeValue',
              value: 1,
              unitCode: 'ANN',
            },
          };
        }

        return {
          '@type': 'Offer',
          url: App_Dashboard,
          priceCurrency: pricing.currency.toUpperCase(),
          price: (pricing.finalTotal / 100).toFixed(2),
          priceSpecification,
          itemCondition: 'https://schema.org/NewCondition',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'Intlayer Inc.',
            url: Website_Home,
          },
          category,
        };
      }
    );
  }

  return [
    // Free Pricing Offer
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
    ...dynamicOffers,
  ];
};
