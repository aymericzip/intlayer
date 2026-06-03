import type {
  AcceptAffiliateInvitationResult,
  CreatePortalSessionResult,
  CreatePromoCodeBody,
  CreatePromoCodeResult,
  DeletePromoCodeResult,
  GetAffiliateAccountSessionResult,
  GetAffiliateByIdResult,
  GetAffiliateInvitationResult,
  GetAffiliateInvitationsResult,
  GetAffiliateOnboardingLinkResult,
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
  GetPromoCodeByIdResult,
  GetPromoCodesResult,
  GrantAffiliateAccessBody,
  GrantAffiliateAccessResult,
  SendAffiliateInvitationBody,
  SendAffiliateInvitationResult,
  UpdateAffiliateStatusBody,
  UpdateAffiliateStatusResult,
  UpdatePromoCodeBody,
  UpdatePromoCodeResult,
} from '@intlayer/backend';
import { editor } from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type FetcherOptions, fetcher } from '../fetcher';

export const getStripeAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL = intlayerConfig?.editor?.backendURL ?? editor.backendURL;

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
      { method: 'GET', params: params as Record<string, string> }
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
   * Returns a Stripe-hosted onboarding URL for the authenticated affiliate.
   */
  const getAffiliateOnboardingLink = async (
    params?: { returnUrl?: string },
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetAffiliateOnboardingLinkResult>(
      `${STRIPE_API_ROUTE}/affiliate/onboarding-link`,
      authAPIOptions,
      otherOptions,
      { method: 'GET', params }
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
   * Admin-only: returns a paginated list of all affiliate invitations.
   */
  const getAffiliateInvitations = async (
    params: GetAffiliatesParams = {},
    otherOptions: FetcherOptions = {}
  ) => {
    const qs = new URLSearchParams();
    if (params.page) qs.set('page', String(params.page));
    if (params.pageSize) qs.set('pageSize', String(params.pageSize));
    if (params.search) qs.set('search', params.search);
    const query = qs.toString() ? `?${qs.toString()}` : '';
    return await fetcher<GetAffiliateInvitationsResult>(
      `${STRIPE_API_ROUTE}/affiliate/invitations${query}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );
  };

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
   * Admin-only: updates an affiliate's status and/or category.
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
    {
      token,
      country,
      stripeAccountType,
    }: {
      token: string;
      country?: string;
      stripeAccountType?: 'express' | 'standard';
    },
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AcceptAffiliateInvitationResult>(
      `${STRIPE_API_ROUTE}/affiliate/invitation/${token}/accept`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body: { country, stripeAccountType } }
    );

  /**
   * Admin-only: returns a paginated list of all promo codes.
   */
  const getPromoCodeById = async (
    id: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetPromoCodeByIdResult>(
      `${STRIPE_API_ROUTE}/promo-codes/${id}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  const getPromoCodes = async (
    params: { affiliateId?: string } = {},
    otherOptions: FetcherOptions = {}
  ) => {
    const qs = params.affiliateId
      ? `?affiliateId=${encodeURIComponent(params.affiliateId)}`
      : '';
    return await fetcher<GetPromoCodesResult>(
      `${STRIPE_API_ROUTE}/promo-codes${qs}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );
  };

  /**
   * Admin-only: creates a new promo code (Stripe coupon + promotion code).
   */
  const createPromoCode = async (
    body: CreatePromoCodeBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<CreatePromoCodeResult>(
      `${STRIPE_API_ROUTE}/promo-codes`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
    );

  /**
   * Admin-only: updates a promo code.
   */
  const updatePromoCode = async (
    { id, ...body }: { id: string } & UpdatePromoCodeBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdatePromoCodeResult>(
      `${STRIPE_API_ROUTE}/promo-codes/${id}`,
      authAPIOptions,
      otherOptions,
      { method: 'PATCH', body }
    );

  /**
   * Admin-only: deactivates a promo code (sets active=false, disables Stripe promotion code).
   */
  const deletePromoCode = async (
    { id }: { id: string },
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<DeletePromoCodeResult>(
      `${STRIPE_API_ROUTE}/promo-codes/${id}`,
      authAPIOptions,
      otherOptions,
      { method: 'DELETE' }
    );

  /**
   * Retrieves the active promo code associated with a given affiliate referral code.
   */
  const getAffiliatePromoCode = async (
    referralCode: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<any>(
      `${STRIPE_API_ROUTE}/affiliate-promo-code/${referralCode}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
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
    getAffiliateOnboardingLink,
    getAffiliateStats,
    getAffiliateInvitations,
    sendAffiliateInvitation,
    getAffiliateInvitation,
    acceptAffiliateInvitation,
    updateAffiliateStatus,
    getPromoCodeById,
    getPromoCodes,
    createPromoCode,
    updatePromoCode,
    deletePromoCode,
    getAffiliatePromoCode,
  };
};
