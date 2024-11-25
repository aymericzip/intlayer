import type {
  GetCheckoutSessionBody,
  GetCheckoutSessionResult,
} from '@intlayer/backend';
import { getConfiguration, type IntlayerConfig } from '@intlayer/config/client';
import { fetcher, type FetcherOptions } from './fetcher';

export const getStripeAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL = (intlayerConfig ?? getConfiguration()).editor.backendURL;
  const STRIPE_API_ROUTE = `${backendURL}/api/stripe`;

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
    getSubscription,
    cancelSubscription,
  };
};
