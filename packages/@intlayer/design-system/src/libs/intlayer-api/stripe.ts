import type {
  GetCheckoutSessionBody,
  GetCheckoutSessionResult,
} from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config/client';
import { fetcher, type FetcherOptions } from './fetcher';

const backendURL = getConfiguration().editor.backendURL;
const STRIPE_API_ROUTE = `${backendURL}/api/stripe`;

export const getStripeAPI = (authAPIOptions: FetcherOptions = {}) => {
  /**
   * Retrieves a checkout session.
   * @param body - Checkout session body.
   */
  const getCheckoutSession = async (
    body?: GetCheckoutSessionBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetCheckoutSessionResult>(
      `${STRIPE_API_ROUTE}/create-checkout-session`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body,
      }
    );

  return {
    getCheckoutSession,
  };
};
