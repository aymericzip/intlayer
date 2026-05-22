import type {
  AcceptAffiliateInvitationResult,
  CreatePortalSessionResult,
  GetAffiliateAccountSessionResult,
  GetAffiliateByIdResult,
  GetAffiliateInvitationResult,
  GetAffiliateResult,
  GetAffiliateStatsResult,
  GetAffiliatesParams,
  GetAffiliatesResult,
  GetCheckoutSessionBody,
  GetCheckoutSessionResult,
  GetInvoicesResult,
  GetPaymentMethodResult,
  GetPricingBody,
  GetPricingResult,
  GrantAffiliateAccessBody,
  GrantAffiliateAccessResult,
  SendAffiliateInvitationBody,
  SendAffiliateInvitationResult,
  UpdateAffiliateStatusBody,
  UpdateAffiliateStatusResult,
} from '@intlayer/backend';
import defaultConfiguration from '@intlayer/config/built';
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

  /**
   * Admin-only: grants affiliate access to a user by creating their Stripe Connect account.
   */
  const grantAffiliateAccess = async (
    body: GrantAffiliateAccessBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GrantAffiliateAccessResult>(
      `${STRIPE_API_ROUTE}/affiliate/grant`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
    );

  /**
   * Admin-only: returns a paginated list of all affiliates.
   */
  const getAffiliates = async (
    params?: GetAffiliatesParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetAffiliatesResult>(
      `${STRIPE_API_ROUTE}/affiliates`,
      authAPIOptions,
      otherOptions,
      { method: 'GET', params }
    );

  /**
   * Admin-only: returns a single affiliate by ID.
   */
  const getAffiliateById = async (
    { id }: { id: string },
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetAffiliateByIdResult>(
      `${STRIPE_API_ROUTE}/affiliates/${id}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  /**
   * Returns the affiliate record for the authenticated user (null if not an affiliate).
   */
  const getAffiliate = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetAffiliateResult>(
      `${STRIPE_API_ROUTE}/affiliate`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  /**
   * Creates a Stripe Connect account session for the authenticated affiliate (embedded onboarding).
   */
  const getAffiliateAccountSession = async (
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetAffiliateAccountSessionResult>(
      `${STRIPE_API_ROUTE}/affiliate/account-session`,
      authAPIOptions,
      otherOptions,
      { method: 'POST' }
    );

  /**
   * Returns referral stats for the authenticated affiliate.
   */
  const getAffiliateStats = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetAffiliateStatsResult>(
      `${STRIPE_API_ROUTE}/affiliate/stats`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  /**
   * Sends an affiliate invitation email to the given address (admin only).
   */
  const sendAffiliateInvitation = async (
    body: SendAffiliateInvitationBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<SendAffiliateInvitationResult>(
      `${STRIPE_API_ROUTE}/affiliate/invite`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
    );

  /**
   * Retrieves an affiliate invitation by token (public — no auth required).
   */
  const getAffiliateInvitation = async (
    { token }: { token: string },
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetAffiliateInvitationResult>(
      `${STRIPE_API_ROUTE}/affiliate/invitation/${token}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  /**
   * Admin-only: sets an affiliate's status to active or suspended.
   */
  const updateAffiliateStatus = async (
    { id }: { id: string },
    body: UpdateAffiliateStatusBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdateAffiliateStatusResult>(
      `${STRIPE_API_ROUTE}/affiliates/${id}/status`,
      authAPIOptions,
      otherOptions,
      { method: 'PATCH', body }
    );

  /**
   * Accepts an affiliate invitation and creates the affiliate account.
   */
  const acceptAffiliateInvitation = async (
    { token, country }: { token: string; country?: string },
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AcceptAffiliateInvitationResult>(
      `${STRIPE_API_ROUTE}/affiliate/invitation/${token}/accept`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body: { country } }
    );

  return {
    getPricing,
    getSubscription,
    cancelSubscription,
    getInvoices,
    getPaymentMethod,
    createPortalSession,
    grantAffiliateAccess,
    getAffiliates,
    getAffiliateById,
    getAffiliate,
    getAffiliateAccountSession,
    getAffiliateStats,
    sendAffiliateInvitation,
    getAffiliateInvitation,
    acceptAffiliateInvitation,
    updateAffiliateStatus,
  };
};
