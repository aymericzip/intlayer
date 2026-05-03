import type {
  CreatePortalSessionResult,
  GetCheckoutSessionBody,
  GetCheckoutSessionResult,
  GetInvoicesResult,
  GetPaymentMethodResult,
  GetPricingBody,
  GetPricingResult,
} from '@intlayer/backend';
import { default as defaultConfiguration } from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type FetcherOptions, fetcher } from '../fetcher';

export const getStripeAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig: IntlayerConfig = defaultConfiguration
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

  /**
   * Lists invoices for the authenticated organization's Stripe customer.
   */
  const getInvoices = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetInvoicesResult>(
      `${STRIPE_API_ROUTE}/invoices`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  /**
   * Returns the first card payment method for the authenticated organization's
   * Stripe customer (or null if none).
   */
  const getPaymentMethod = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetPaymentMethodResult>(
      `${STRIPE_API_ROUTE}/payment-method`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  /**
   * Creates a Stripe Billing Portal session for the authenticated organization.
   */
  const createPortalSession = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<CreatePortalSessionResult>(
      `${STRIPE_API_ROUTE}/portal-session`,
      authAPIOptions,
      otherOptions,
      { method: 'POST' }
    );

  return {
    getPricing,
    getSubscription,
    cancelSubscription,
    getInvoices,
    getPaymentMethod,
    createPortalSession,
  };
};
