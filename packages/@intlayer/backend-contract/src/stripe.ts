import { z } from 'zod/mini';
import { dateTimeSchema, objectIdSchema, paginationQueryShape } from './common';
import {
  defineRoute,
  defineRouteGroup,
  type RouteBodyInput,
  type RouteQuerystring,
} from './defineRoute';
import { type PlanAPI, planSchema } from './organization';
import {
  type PaginatedResponse,
  paginatedResponseSchema,
  type ResponseData,
  responseDataSchema,
} from './responseData';

// ── Stripe objects (subset of the Stripe API the dashboard reads) ───────────

/** Stripe invoice. */
export const stripeInvoiceSchema = z.looseObject({
  id: z.optional(z.string()),
  status: z.nullable(z.string()),
  total: z.number(),
  subtotal: z.number(),
  currency: z.string(),
  /** Epoch seconds. */
  created: z.number(),
  hosted_invoice_url: z.optional(z.nullable(z.string())),
});

/** Stripe payment method. */
export const stripePaymentMethodSchema = z.looseObject({
  id: z.string(),
  type: z.string(),
  card: z.optional(
    z.nullable(
      z.looseObject({
        brand: z.string(),
        last4: z.string(),
        exp_month: z.optional(z.number()),
        exp_year: z.optional(z.number()),
      })
    )
  ),
});

/** Price of each Stripe price id, after the promo code. */
export const pricingResultSchema = z.record(
  z.string(),
  z.object({
    originalTotal: z.number(),
    discountApplied: z.number(),
    discountType: z.nullable(z.enum(['amount', 'percentage'])),
    finalTotal: z.number(),
    currency: z.string(),
    planType: z.enum(['premium', 'enterprise', 'one_time', 'unknown']),
    period: z.enum(['monthly', 'yearly', 'one_time', 'unknown']),
  })
);

// ── Affiliates ──────────────────────────────────────────────────────────────

export const commissionTypeSchema = z.enum(['recurring', 'one_time']);

/** Affiliate program member. The Stripe account id is admin information. */
export const affiliateSchema = z.looseObject({
  id: z.string(),
  userId: z.string(),
  stripeAccountId: z.optional(z.string()),
  stripeAccountType: z.optional(z.enum(['express', 'standard'])),
  referralCode: z.string(),
  status: z.enum(['pending', 'onboarding', 'active', 'suspended']),
  /** Percentage (20 = 20%). */
  commissionRate: z.number(),
  commissionType: commissionTypeSchema,
  chargesEnabled: z.optional(z.boolean()),
  payoutsEnabled: z.optional(z.boolean()),
  activatedAt: z.optional(dateTimeSchema),
  stripeOnboardingInitiated: z.optional(z.boolean()),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

export const affiliateStatsSchema = z.object({
  affiliate: affiliateSchema,
  totalReferrals: z.number(),
  convertedReferrals: z.number(),
  pendingReferrals: z.number(),
  /** In cents. */
  totalCommissionEarned: z.number(),
  /** In cents. */
  pendingCommission: z.number(),
  referralLink: z.string(),
});

export const affiliateInvitationSchema = z.looseObject({
  id: z.string(),
  email: z.string(),
  token: z.string(),
  status: z.enum(['pending', 'accepted', 'expired']),
  invitedBy: z.string(),
  commissionRate: z.number(),
  commissionType: commissionTypeSchema,
  country: z.optional(z.string()),
  expiresAt: dateTimeSchema,
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

// ── Promo codes ─────────────────────────────────────────────────────────────

export const promoCodeSchema = z.looseObject({
  id: z.string(),
  code: z.string(),
  stripeCouponId: z.string(),
  stripePromotionCodeId: z.optional(z.string()),
  affiliateId: z.optional(z.string()),
  discountType: z.enum(['percentage', 'amount']),
  discountValue: z.number(),
  currency: z.optional(z.string()),
  maxRedemptions: z.optional(z.number()),
  timesRedeemed: z.number(),
  active: z.boolean(),
  expiresAt: z.optional(dateTimeSchema),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

const idParamsSchema = z.object({ id: objectIdSchema });
const tokenParamsSchema = z.object({ token: z.string().check(z.minLength(1)) });
const searchQuerySchema = z.looseObject({
  ...paginationQueryShape,
  search: z.optional(z.string()),
});
const affiliateTermsShape = {
  commissionRate: z.optional(z.number()),
  commissionType: z.optional(commissionTypeSchema),
  country: z.optional(z.string()),
};
const affiliateResponseSchema = responseDataSchema(affiliateSchema);
const promoCodeResponseSchema = responseDataSchema(promoCodeSchema);
const urlResponseSchema = responseDataSchema(z.object({ url: z.string() }));

/** REST contract of the `/api/stripe` routes (billing, affiliates, promo codes). */
export const stripeContract = defineRouteGroup({
  prefix: '/api/stripe',
  tag: 'Billing',
  routes: {
    getPricing: defineRoute({
      method: 'POST',
      path: '/pricing',
      summary: 'Prices of the plans, with an optional promo code',
      schemas: {
        body: z.object({
          priceIds: z.optional(z.array(z.string())),
          promoCode: z.optional(z.string()),
        }),
        response: { 200: responseDataSchema(pricingResultSchema) },
      },
    }),
    createSubscription: defineRoute({
      method: 'POST',
      path: '/create-subscription',
      summary: 'Start a subscription checkout for the selected organization',
      schemas: {
        body: z.object({
          priceId: z.string(),
          promoCode: z.optional(z.string()),
          referralCode: z.optional(z.string()),
        }),
        response: {
          200: responseDataSchema(
            z.looseObject({
              /** Stripe subscription (one-time prices return a payment intent). */
              subscription: z.optional(z.looseObject({ id: z.string() })),
              paymentIntent: z.optional(z.looseObject({ id: z.string() })),
              clientSecret: z.string(),
            })
          ),
        },
      },
    }),
    cancelSubscription: defineRoute({
      method: 'POST',
      path: '/cancel-subscription',
      summary: 'Cancel the subscription of the selected organization',
      schemas: {
        response: { 200: responseDataSchema(z.optional(planSchema)) },
      },
    }),
    getInvoices: defineRoute({
      method: 'GET',
      path: '/invoices',
      summary: 'Invoices of the selected organization',
      schemas: {
        response: { 200: responseDataSchema(z.array(stripeInvoiceSchema)) },
      },
    }),
    getPaymentMethod: defineRoute({
      method: 'GET',
      path: '/payment-method',
      summary: 'Default payment method of the selected organization',
      schemas: {
        response: {
          200: responseDataSchema(z.nullable(stripePaymentMethodSchema)),
        },
      },
    }),
    createPortalSession: defineRoute({
      method: 'POST',
      path: '/portal-session',
      summary: 'Stripe customer portal URL',
      schemas: { response: { 200: urlResponseSchema } },
    }),
    grantAffiliateAccess: defineRoute({
      method: 'POST',
      path: '/affiliate/grant',
      summary: 'Admin only: make a user an affiliate',
      schemas: {
        body: z.object({ userId: objectIdSchema, ...affiliateTermsShape }),
        response: { 200: affiliateResponseSchema },
      },
    }),
    getAffiliates: defineRoute({
      method: 'GET',
      path: '/affiliates',
      summary: 'Admin only: list affiliates',
      schemas: {
        querystring: searchQuerySchema,
        response: { 200: paginatedResponseSchema(affiliateSchema) },
      },
    }),
    getAffiliateById: defineRoute({
      method: 'GET',
      path: '/affiliates/:id',
      summary: 'Admin only: get an affiliate',
      schemas: {
        params: idParamsSchema,
        response: { 200: responseDataSchema(z.nullable(affiliateSchema)) },
      },
    }),
    getAffiliate: defineRoute({
      method: 'GET',
      path: '/affiliate',
      summary: 'Affiliate account of the signed-in user',
      schemas: {
        response: { 200: responseDataSchema(z.nullable(affiliateSchema)) },
      },
    }),
    getAffiliateAccountSession: defineRoute({
      method: 'POST',
      path: '/affiliate/account-session',
      summary: 'Stripe Connect embedded component session',
      schemas: {
        response: {
          200: responseDataSchema(z.object({ clientSecret: z.string() })),
        },
      },
    }),
    getAffiliateOnboardingLink: defineRoute({
      method: 'GET',
      path: '/affiliate/onboarding-link',
      summary: 'Stripe Connect onboarding link',
      schemas: {
        querystring: z.object({ returnUrl: z.optional(z.string()) }),
        response: { 200: urlResponseSchema },
      },
    }),
    getAffiliateStats: defineRoute({
      method: 'GET',
      path: '/affiliate/stats',
      summary: 'Referral and commission stats of the signed-in affiliate',
      schemas: {
        response: { 200: responseDataSchema(z.nullable(affiliateStatsSchema)) },
      },
    }),
    getAffiliateInvitations: defineRoute({
      method: 'GET',
      path: '/affiliate/invitations',
      summary: 'Admin only: list affiliate invitations',
      schemas: {
        querystring: searchQuerySchema,
        response: { 200: paginatedResponseSchema(affiliateInvitationSchema) },
      },
    }),
    sendAffiliateInvitation: defineRoute({
      method: 'POST',
      path: '/affiliate/invite',
      summary: 'Admin only: invite someone to the affiliate program',
      schemas: {
        body: z.object({ email: z.string(), ...affiliateTermsShape }),
        response: {
          200: responseDataSchema(z.object({ sent: z.boolean() })),
        },
      },
    }),
    getAffiliateInvitation: defineRoute({
      method: 'GET',
      path: '/affiliate/invitation/:token',
      summary: 'Invitation details (landing page of the invitation link)',
      schemas: {
        params: tokenParamsSchema,
        response: {
          200: responseDataSchema(z.nullable(affiliateInvitationSchema)),
        },
      },
    }),
    acceptAffiliateInvitation: defineRoute({
      method: 'POST',
      path: '/affiliate/invitation/:token/accept',
      summary: 'Accept an affiliate invitation',
      schemas: {
        params: tokenParamsSchema,
        body: z.optional(
          z.object({
            country: z.optional(z.string()),
            stripeAccountType: z.optional(z.enum(['express', 'standard'])),
          })
        ),
        response: { 200: affiliateResponseSchema },
      },
    }),
    updateAffiliateStatus: defineRoute({
      method: 'PATCH',
      path: '/affiliates/:id/status',
      summary: 'Admin only: activate or suspend an affiliate',
      schemas: {
        params: idParamsSchema,
        body: z.object({
          status: z.optional(z.enum(['active', 'suspended'])),
        }),
        response: { 200: affiliateResponseSchema },
      },
    }),
    getPromoCodes: defineRoute({
      method: 'GET',
      path: '/promo-codes',
      summary: 'Admin only: list promo codes',
      schemas: {
        querystring: z.looseObject({
          ...searchQuerySchema.shape,
          affiliateId: z.optional(z.string()),
        }),
        response: { 200: paginatedResponseSchema(promoCodeSchema) },
      },
    }),
    getPromoCodeById: defineRoute({
      method: 'GET',
      path: '/promo-codes/:id',
      summary: 'Admin only: get a promo code',
      schemas: {
        params: idParamsSchema,
        response: { 200: promoCodeResponseSchema },
      },
    }),
    createPromoCode: defineRoute({
      method: 'POST',
      path: '/promo-codes',
      summary: 'Admin only: create a promo code (and its Stripe coupon)',
      schemas: {
        body: z.object({
          code: z.string().check(z.minLength(1)),
          discountType: z.enum(['percentage', 'amount']),
          discountValue: z.number(),
          currency: z.optional(z.string()),
          affiliateId: z.optional(z.string()),
          maxRedemptions: z.optional(z.number()),
          /** ISO date. */
          expiresAt: z.optional(z.string()),
        }),
        response: { 200: promoCodeResponseSchema },
      },
    }),
    updatePromoCode: defineRoute({
      method: 'PATCH',
      path: '/promo-codes/:id',
      summary: 'Admin only: update a promo code',
      schemas: {
        params: idParamsSchema,
        body: z.object({
          affiliateId: z.optional(z.nullable(z.string())),
          active: z.optional(z.boolean()),
          maxRedemptions: z.optional(z.number()),
          /** ISO date. */
          expiresAt: z.optional(z.string()),
        }),
        response: { 200: promoCodeResponseSchema },
      },
    }),
    deletePromoCode: defineRoute({
      method: 'DELETE',
      path: '/promo-codes/:id',
      summary: 'Admin only: delete a promo code',
      schemas: {
        params: idParamsSchema,
        response: {
          200: responseDataSchema(z.object({ deleted: z.boolean() })),
        },
      },
    }),
    getAffiliatePromoCode: defineRoute({
      method: 'GET',
      path: '/affiliate-promo-code/:referralCode',
      summary: 'Promo code attached to a referral code (checkout)',
      schemas: {
        params: z.object({ referralCode: z.string().check(z.minLength(1)) }),
        response: { 200: responseDataSchema(z.nullable(promoCodeSchema)) },
      },
    }),
  },
});

/** Route definitions of the `/api/stripe` group, by name. */
export type StripeRoutes = (typeof stripeContract)['routes'];

export type StripeInvoice = z.output<typeof stripeInvoiceSchema>;
export type StripePaymentMethod = z.output<typeof stripePaymentMethodSchema>;
export type PricingResult = z.output<typeof pricingResultSchema>;
export type CommissionType = z.output<typeof commissionTypeSchema>;
export type AffiliateAPI = z.output<typeof affiliateSchema>;
export type AffiliateStats = z.output<typeof affiliateStatsSchema>;
export type AffiliateInvitationAPI = z.output<typeof affiliateInvitationSchema>;
export type PromoCodeAPI = z.output<typeof promoCodeSchema>;

export type GetPricingBody = RouteBodyInput<StripeRoutes['getPricing']>;
export type GetPricingResult = ResponseData<PricingResult>;
export type GetCheckoutSessionBody = RouteBodyInput<
  StripeRoutes['createSubscription']
>;
export type GetCheckoutSessionResult = ResponseData<{
  subscription?: { id: string; [key: string]: unknown };
  paymentIntent?: { id: string; [key: string]: unknown };
  clientSecret: string;
}>;
export type CancelSubscriptionResult = ResponseData<PlanAPI | undefined>;
export type GetInvoicesResult = ResponseData<StripeInvoice[]>;
export type GetPaymentMethodResult = ResponseData<StripePaymentMethod | null>;
export type CreatePortalSessionResult = ResponseData<{ url: string }>;
export type GrantAffiliateAccessBody = RouteBodyInput<
  StripeRoutes['grantAffiliateAccess']
>;
export type GrantAffiliateAccessResult = ResponseData<AffiliateAPI>;
export type GetAffiliatesParams = RouteQuerystring<
  StripeRoutes['getAffiliates']
>;
export type GetAffiliatesResult = PaginatedResponse<AffiliateAPI>;
export type GetAffiliateByIdResult = ResponseData<AffiliateAPI | null>;
export type GetAffiliateResult = ResponseData<AffiliateAPI | null>;
export type GetAffiliateAccountSessionResult = ResponseData<{
  clientSecret: string;
}>;
export type GetAffiliateOnboardingLinkResult = ResponseData<{ url: string }>;
export type GetAffiliateStatsResult = ResponseData<AffiliateStats | null>;
export type GetAffiliateInvitationsResult =
  PaginatedResponse<AffiliateInvitationAPI>;
export type SendAffiliateInvitationBody = RouteBodyInput<
  StripeRoutes['sendAffiliateInvitation']
>;
export type SendAffiliateInvitationResult = ResponseData<{ sent: boolean }>;
export type GetAffiliateInvitationResult =
  ResponseData<AffiliateInvitationAPI | null>;
export type UpdateAffiliateStatusBody = RouteBodyInput<
  StripeRoutes['updateAffiliateStatus']
>;
export type UpdateAffiliateStatusResult = ResponseData<AffiliateAPI>;
export type AcceptAffiliateInvitationBody = NonNullable<
  RouteBodyInput<StripeRoutes['acceptAffiliateInvitation']>
>;
export type AcceptAffiliateInvitationResult = ResponseData<AffiliateAPI>;
export type GetPromoCodesQuerystring = RouteQuerystring<
  StripeRoutes['getPromoCodes']
>;
export type GetPromoCodesResult = PaginatedResponse<PromoCodeAPI>;
export type GetPromoCodeByIdResult = ResponseData<PromoCodeAPI>;
export type CreatePromoCodeBody = RouteBodyInput<
  StripeRoutes['createPromoCode']
>;
export type CreatePromoCodeResult = ResponseData<PromoCodeAPI>;
export type UpdatePromoCodeBody = RouteBodyInput<
  StripeRoutes['updatePromoCode']
>;
export type UpdatePromoCodeResult = ResponseData<PromoCodeAPI>;
export type DeletePromoCodeResult = ResponseData<{ deleted: boolean }>;
