import { getStripeAPI } from '@intlayer/api';

/**
 * Fetches pricing dynamically at build time.
 */
export const getPricing = async () => {
  try {
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
};
