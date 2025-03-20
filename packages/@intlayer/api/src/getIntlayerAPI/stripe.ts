import type {
  // @ts-ignore: @intlayer/backend is not built yet
  GetCheckoutSessionBody,
  // @ts-ignore: @intlayer/backend is not built yet
  GetCheckoutSessionResult,
  // @ts-ignore @intlayer/backend is not build yet
  GetPricingBody,
  // @ts-ignore @intlayer/backend is not build yet
  GetPricingResult,
  // @ts-ignore @intlayer/backend is not build yet
} from '@intlayer/backend';
import type { IntlayerConfig } from '@intlayer/config/client';
import configuration from '@intlayer/config/built';

import { fetcher, type FetcherOptions } from '../fetcher';

export const getStripeAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }

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
