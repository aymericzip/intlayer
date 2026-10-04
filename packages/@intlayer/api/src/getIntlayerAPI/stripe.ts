import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
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
  StripeRoutes,
  stripeContract,
  UpdateAffiliateStatusBody,
  UpdateAffiliateStatusResult,
  UpdatePromoCodeBody,
  UpdatePromoCodeResult,
} from '@intlayer/backend-contract/stripe';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

/** Prefix of the routes, checked against the backend contract. */
const stripeGroup = {
  prefix: '/api/stripe',
} as const satisfies Pick<typeof stripeContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const stripeEndpoints = {
  getPricing: { method: 'POST', path: '/pricing' },
  createSubscription: { method: 'POST', path: '/create-subscription' },
  cancelSubscription: { method: 'POST', path: '/cancel-subscription' },
  getInvoices: { method: 'GET', path: '/invoices' },
  getPaymentMethod: { method: 'GET', path: '/payment-method' },
  createPortalSession: { method: 'POST', path: '/portal-session' },
  grantAffiliateAccess: { method: 'POST', path: '/affiliate/grant' },
  getAffiliates: { method: 'GET', path: '/affiliates' },
  getAffiliateById: { method: 'GET', path: '/affiliates/:id' },
  getAffiliate: { method: 'GET', path: '/affiliate' },
  getAffiliateAccountSession: {
    method: 'POST',
    path: '/affiliate/account-session',
  },
  getAffiliateOnboardingLink: {
    method: 'GET',
    path: '/affiliate/onboarding-link',
  },
  getAffiliateStats: { method: 'GET', path: '/affiliate/stats' },
  getAffiliateInvitations: { method: 'GET', path: '/affiliate/invitations' },
  sendAffiliateInvitation: { method: 'POST', path: '/affiliate/invite' },
  getAffiliateInvitation: {
    method: 'GET',
    path: '/affiliate/invitation/:token',
  },
  acceptAffiliateInvitation: {
    method: 'POST',
    path: '/affiliate/invitation/:token/accept',
  },
  updateAffiliateStatus: { method: 'PATCH', path: '/affiliates/:id/status' },
  getPromoCodes: { method: 'GET', path: '/promo-codes' },
  getPromoCodeById: { method: 'GET', path: '/promo-codes/:id' },
  createPromoCode: { method: 'POST', path: '/promo-codes' },
  updatePromoCode: { method: 'PATCH', path: '/promo-codes/:id' },
  deletePromoCode: { method: 'DELETE', path: '/promo-codes/:id' },
  getAffiliatePromoCode: {
    method: 'GET',
    path: '/affiliate-promo-code/:referralCode',
  },
} as const satisfies RouteEndpoints<StripeRoutes>;

export const getStripeAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  /**
   * Get a pricing plan calculated for a given promotion code.
   * @param body - Pricing plan body.
   */
  const getPricing = async (
    body?: GetPricingBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetPricingResult>(
      buildRouteURL(backendURL, stripeGroup, stripeEndpoints.getPricing),
      authAPIOptions,
      otherOptions,
      {
        method: stripeEndpoints.getPricing.method,
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
      buildRouteURL(
        backendURL,
        stripeGroup,
        stripeEndpoints.createSubscription
      ),
      authAPIOptions,
      otherOptions,
      {
        method: stripeEndpoints.createSubscription.method,
        body,
      }
    );

  /**
   * Cancels a subscription.
   * @param body - Checkout session body.
   */
  const cancelSubscription = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetCheckoutSessionResult>(
      buildRouteURL(
        backendURL,
        stripeGroup,
        stripeEndpoints.cancelSubscription
      ),
      authAPIOptions,
      otherOptions,
      {
        method: stripeEndpoints.cancelSubscription.method,
      }
    );

  /**
   * Lists invoices for the authenticated organization's Stripe customer.
   */
  const getInvoices = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetInvoicesResult>(
      buildRouteURL(backendURL, stripeGroup, stripeEndpoints.getInvoices),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.getInvoices.method }
    );

  /**
   * Returns the first card payment method for the authenticated organization's
   * Stripe customer (or null if none).
   */
  const getPaymentMethod = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetPaymentMethodResult>(
      buildRouteURL(backendURL, stripeGroup, stripeEndpoints.getPaymentMethod),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.getPaymentMethod.method }
    );

  /**
   * Creates a Stripe Billing Portal session for the authenticated organization.
   */
  const createPortalSession = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<CreatePortalSessionResult>(
      buildRouteURL(
        backendURL,
        stripeGroup,
        stripeEndpoints.createPortalSession
      ),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.createPortalSession.method }
    );

  /**
   * Admin-only: grants affiliate access to a user by creating their Stripe Connect account.
   */
  const grantAffiliateAccess = async (
    body: GrantAffiliateAccessBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GrantAffiliateAccessResult>(
      buildRouteURL(
        backendURL,
        stripeGroup,
        stripeEndpoints.grantAffiliateAccess
      ),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.grantAffiliateAccess.method, body }
    );

  /**
   * Admin-only: returns a paginated list of all affiliates.
   */
  const getAffiliates = async (
    params?: GetAffiliatesParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetAffiliatesResult>(
      buildRouteURL(backendURL, stripeGroup, stripeEndpoints.getAffiliates),
      authAPIOptions,
      otherOptions,
      {
        method: stripeEndpoints.getAffiliates.method,
        params: params as Record<string, string>,
      }
    );

  /**
   * Admin-only: returns a single affiliate by ID.
   */
  const getAffiliateById = async (
    { id }: { id: string },
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetAffiliateByIdResult>(
      buildRouteURL(backendURL, stripeGroup, stripeEndpoints.getAffiliateById, {
        id,
      }),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.getAffiliateById.method }
    );

  /**
   * Returns the affiliate record for the authenticated user (null if not an affiliate).
   */
  const getAffiliate = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetAffiliateResult>(
      buildRouteURL(backendURL, stripeGroup, stripeEndpoints.getAffiliate),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.getAffiliate.method }
    );

  /**
   * Creates a Stripe Connect account session for the authenticated affiliate (embedded onboarding).
   */
  const getAffiliateAccountSession = async (
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetAffiliateAccountSessionResult>(
      buildRouteURL(
        backendURL,
        stripeGroup,
        stripeEndpoints.getAffiliateAccountSession
      ),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.getAffiliateAccountSession.method }
    );

  /**
   * Returns a Stripe-hosted onboarding URL for the authenticated affiliate.
   */
  const getAffiliateOnboardingLink = async (
    params?: { returnUrl?: string },
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetAffiliateOnboardingLinkResult>(
      buildRouteURL(
        backendURL,
        stripeGroup,
        stripeEndpoints.getAffiliateOnboardingLink
      ),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.getAffiliateOnboardingLink.method, params }
    );

  /**
   * Returns referral stats for the authenticated affiliate.
   */
  const getAffiliateStats = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetAffiliateStatsResult>(
      buildRouteURL(backendURL, stripeGroup, stripeEndpoints.getAffiliateStats),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.getAffiliateStats.method }
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
      `${buildRouteURL(backendURL, stripeGroup, stripeEndpoints.getAffiliateInvitations)}${query}`,
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
      buildRouteURL(
        backendURL,
        stripeGroup,
        stripeEndpoints.sendAffiliateInvitation
      ),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.sendAffiliateInvitation.method, body }
    );

  /**
   * Retrieves an affiliate invitation by token (public — no auth required).
   */
  const getAffiliateInvitation = async (
    { token }: { token: string },
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetAffiliateInvitationResult>(
      buildRouteURL(
        backendURL,
        stripeGroup,
        stripeEndpoints.getAffiliateInvitation,
        { token }
      ),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.getAffiliateInvitation.method }
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
      buildRouteURL(
        backendURL,
        stripeGroup,
        stripeEndpoints.updateAffiliateStatus,
        { id }
      ),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.updateAffiliateStatus.method, body }
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
      buildRouteURL(
        backendURL,
        stripeGroup,
        stripeEndpoints.acceptAffiliateInvitation,
        { token }
      ),
      authAPIOptions,
      otherOptions,
      {
        method: stripeEndpoints.acceptAffiliateInvitation.method,
        body: { country, stripeAccountType },
      }
    );

  /**
   * Admin-only: returns a paginated list of all promo codes.
   */
  const getPromoCodeById = async (
    id: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetPromoCodeByIdResult>(
      buildRouteURL(backendURL, stripeGroup, stripeEndpoints.getPromoCodeById, {
        id,
      }),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.getPromoCodeById.method }
    );

  const getPromoCodes = async (
    params: { affiliateId?: string } = {},
    otherOptions: FetcherOptions = {}
  ) => {
    const qs = params.affiliateId
      ? `?affiliateId=${encodeURIComponent(params.affiliateId)}`
      : '';
    return await fetcher<GetPromoCodesResult>(
      `${buildRouteURL(backendURL, stripeGroup, stripeEndpoints.getPromoCodes)}${qs}`,
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
      buildRouteURL(backendURL, stripeGroup, stripeEndpoints.createPromoCode),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.createPromoCode.method, body }
    );

  /**
   * Admin-only: updates a promo code.
   */
  const updatePromoCode = async (
    { id, ...body }: { id: string } & UpdatePromoCodeBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdatePromoCodeResult>(
      buildRouteURL(backendURL, stripeGroup, stripeEndpoints.updatePromoCode, {
        id,
      }),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.updatePromoCode.method, body }
    );

  /**
   * Admin-only: deactivates a promo code (sets active=false, disables Stripe promotion code).
   */
  const deletePromoCode = async (
    { id }: { id: string },
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<DeletePromoCodeResult>(
      buildRouteURL(backendURL, stripeGroup, stripeEndpoints.deletePromoCode, {
        id,
      }),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.deletePromoCode.method }
    );

  /**
   * Retrieves the active promo code associated with a given affiliate referral code.
   */
  const getAffiliatePromoCode = async (
    referralCode: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<any>(
      buildRouteURL(
        backendURL,
        stripeGroup,
        stripeEndpoints.getAffiliatePromoCode,
        { referralCode }
      ),
      authAPIOptions,
      otherOptions,
      { method: stripeEndpoints.getAffiliatePromoCode.method }
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

/**
 * Authenticated `stripe` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const stripeEndpoint = createEndpoint(getStripeAPI);
