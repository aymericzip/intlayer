import { getStripeAPI } from '@intlayer/api';
import { cache } from 'react';

/**
 * Fetches pricing dynamically. Cached to run only once per build/request.
 */
export const getPricing = cache(async () => {
  try {
    // Force cache ensures it runs only once at build time in Next.js
    const pricingDataResponse = await getStripeAPI().getPricing(
      {},
      {
        cache: 'force-cache',
      }
    );
    return pricingDataResponse.data;
  } catch (error) {
    console.error('Failed to fetch pricing:', error);
    return null;
  }
});
