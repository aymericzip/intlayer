import type {
  GetCheckoutSessionBody,
  GetCheckoutSessionResult,
  GetPricingBody,
  GetPricingResult,
} from '@intlayer/backend';
import builtConfiguration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type FetcherOptions, fetcher } from '../fetcher';

export const getStripeAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig: IntlayerConfig = builtConfiguration
) => {
  const backendURL = intlayerConfig?.editor?.backendURL;

  const STRIPE_API_ROUTE = `${backendURL}/api/stripe`;

  /**
   * Get a pricing plan calculated for a given promotion code.
   * @param body - Pricing plan body.
   */
  const getPricing = async (
    body?: GetPricingBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetPricingResult>(
      `${STRIPE_API_ROUTE}/pricing`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body,
      }
    );

  /**
   * Retrieves a checkout session.
   * @param body - Checkout session body.
   */
  const getSubscription = async (
    body?: GetCheckoutSessionBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetCheckoutSessionResult>(
      `${STRIPE_API_ROUTE}/create-subscription`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body,
      }
    );

  /**
   * Cancels a subscription.
   * @param body - Checkout session body.
   */
  const cancelSubscription = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetCheckoutSessionResult>(
      `${STRIPE_API_ROUTE}/cancel-subscription`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
      }
    );

  return {
    getPricing,
    getSubscription,
    cancelSubscription,
  };
};
