import { getStripeAPI } from '@intlayer/api';
import type { GetPricingResult } from '@intlayer/backend';
import {
  App_Dashboard,
  App_Pricing,
  Website_Home,
} from '@intlayer/design-system/routes';
import { createServerFn } from '@tanstack/react-start';
import { IS_SELF_HOSTED } from '#utils/selfHosted';

/**
 * Shared server function that fetches pricing from the backend.
 * Runs only once per request (server-side) and is cached by TanStack Start.
 */
export const getPricingData = createServerFn().handler(async () => {
  // No billing on self-hosted instances → no pricing to fetch.
  if (
    IS_SELF_HOSTED ||
    !process.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    process.env.VITE_STRIPE_PUBLISHABLE_KEY.length === 0
  ) {
    return null;
  }

  const pricingDataResponse = await getStripeAPI().getPricing();
  return pricingDataResponse.data ?? null;
});

type Pricings = GetPricingResult['data'];

/**
 * Formatter utility to format the pricing data into Schema.org Offer objects.
 * Mirrors the logic in apps/website/src/utils/stripe.ts.
 */
export const formatStructuredDataOffers = (pricings: Pricings) => {
  const dynamicOffers: any[] = [];

  if (pricings) {
    for (const [_, pricing] of Object.entries(pricings)) {
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

      dynamicOffers.push({
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
      });
    }
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
