import type { Locale } from '@intlayer/types/allLocales';
import { PromoCodeModel } from '@schemas/promoCode.schema';
import * as affiliateService from '@services/affiliate.service';
import * as emailService from '@services/email.service';
import * as promoCodeService from '@services/promoCode.service';
import * as subscriptionService from '@services/subscription.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import {
  type FiltersAndPagination,
  getFiltersAndPaginationFromBody,
} from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import { isLifetimePriceId, retrievePlanInformation } from '@utils/plan';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import Stripe from 'stripe';
import type { AffiliateAPI, AffiliateStats } from '@/types/affiliate.types';
import type { AffiliateInvitationAPI } from '@/types/affiliateInvitation.types';
import type { Organization } from '@/types/organization.types';
import type { PromoCodeAPI } from '@/types/promoCode.types';

export type GetPricingBody = {
  priceIds?: string[];
  promoCode?: string;
};

export type GetPricingResult = ResponseData<subscriptionService.PricingResult>;

/**
 * Simulate pricing for a given set of prices and a promotion code.
 *
 * @param request - The request object containing the price IDs and promotion code.
 * @param reply - The response object to send the simulated pricing result.
 */
export const getPricing = async (
  request: FastifyRequest<{ Body: GetPricingBody }>,
  reply: FastifyReply
) => {
  const { priceIds, promoCode } = request.body;

  const pricingResult = await subscriptionService.getPricing(
    priceIds,
    promoCode
  );

  const formattedPricingResult =
    formatResponse<subscriptionService.PricingResult>({
      data: pricingResult,
    });

  reply.code(200).send(formattedPricingResult);
};

export type GetCheckoutSessionBody = {
  priceId: string;
  promoCode?: string;
  referralCode?: string;
};

export type GetCheckoutSessionResult = ResponseData<{
  subscription?: Stripe.Response<Stripe.Subscription>;
  paymentIntent?: Stripe.Response<Stripe.PaymentIntent>;
  clientSecret: string;
}>;

/**
 * Handles subscription creation or update with Stripe and returns a ClientSecret.
 */
export const getSubscription = async (
  request: FastifyRequest<{ Body: GetCheckoutSessionBody }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    // Extract organization and user from request locals (set by authentication middleware)
    const { organization, user } = request.session || {};
    const { priceId, promoCode, referralCode } = request.body;

    // Validate that the organization exists
    if (!organization) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ORGANIZATION_NOT_FOUND'
      );
    }

    // Validate that the user exists
    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const { period, type } = retrievePlanInformation(priceId);

    if (
      organization.plan?.subscriptionId &&
      organization.plan?.type === type &&
      organization.plan?.period === period &&
      organization.plan?.status === 'active'
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ALREADY_SUBSCRIBED',
        {
          organizationId: organization.id,
        }
      );
    }

    // Attempt to retrieve the Stripe customer ID from the organization's plan
    let customerId = organization.plan?.customerId;

    if (!customerId) {
      // If no customer ID exists, create a new Stripe customer for the organization
      const customer = await stripe.customers.create({
        metadata: {
          organizationId: String(organization.id),
          userId: String(user.id),
          // Include the locale for potential localization
          locale: (request.session as unknown as { locale: Locale }).locale,
        },
      });
      customerId = customer.id;
    }

    const { couponId: promoCodeId, affiliateId: promoAffiliateId } = promoCode
      ? await subscriptionService.getCouponId(promoCode)
      : { couponId: null, affiliateId: undefined };

    let referralCodeToUse = referralCode;
    if (!referralCodeToUse && promoAffiliateId) {
      const promoAffiliate =
        await affiliateService.getAffiliateById(promoAffiliateId);
      if (promoAffiliate) {
        referralCodeToUse = promoAffiliate.referralCode;
      }
    }

    // Lifetime / one-time payment — handled with a PaymentIntent rather than a
    // recurring subscription so the price is charged once.
    if (isLifetimePriceId(priceId)) {
      const price = await stripe.prices.retrieve(priceId);

      if (!price.unit_amount) {
        return ErrorHandler.handleGenericErrorResponse(
          reply,
          'SUBSCRIPTION_CREATION_FAILED',
          { user, organization, priceId }
        );
      }

      let amount = price.unit_amount;

      if (promoCodeId) {
        const coupon = await stripe.coupons.retrieve(promoCodeId);
        if (coupon.percent_off) {
          amount = Math.round(amount * (1 - coupon.percent_off / 100));
        } else if (coupon.amount_off) {
          amount = Math.max(0, amount - coupon.amount_off);
        }
      }

      const paymentIntent = await stripe.paymentIntents.create({
        customer: customerId,
        amount,
        currency: price.currency,
        payment_method_types: ['card'],
        metadata: {
          organizationId: String(organization.id),
          userId: String(user.id),
          priceId,
          purchaseType: 'lifetime',
        },
      });

      if (!paymentIntent?.client_secret) {
        return ErrorHandler.handleGenericErrorResponse(
          reply,
          'SUBSCRIPTION_CREATION_FAILED',
          { user, organization, priceId }
        );
      }

      if (referralCodeToUse) {
        await affiliateService.trackReferral(
          referralCodeToUse,
          organization.id,
          paymentIntent.id,
          paymentIntent.amount,
          paymentIntent.currency
        );
      }

      return reply.send(
        formatResponse<GetCheckoutSessionResult['data']>({
          data: {
            paymentIntent,
            clientSecret: paymentIntent.client_secret,
          },
        })
      );
    }

    const discounts: Stripe.SubscriptionCreateParams.Discount[] = promoCodeId
      ? [{ coupon: promoCodeId }]
      : [];

    // If no subscription exists, create a new one
    const subscription = await stripe.subscriptions.create({
      customer: customerId, // Associate the subscription with the customer
      items: [{ price: priceId }], // Set the price ID for the subscription
      expand: ['latest_invoice.confirmation_secret'],
      payment_settings: {
        payment_method_types: ['card'], // Specify payment method types
      },
      payment_behavior: 'default_incomplete', // Create the subscription in an incomplete state until payment is confirmed
      discounts,
    });

    // Handle subscription creation failure
    if (!subscription) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'SUBSCRIPTION_CREATION_FAILED',
        {
          user,
          organization,
          priceId,
        }
      );
    }

    const clientSecret = (
      subscription.latest_invoice as Stripe.Invoice & {
        confirmation_secret?: { client_secret: string };
      }
    )?.confirmation_secret?.client_secret;

    // Handle subscription creation failure
    if (!clientSecret) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'SUBSCRIPTION_CREATION_FAILED',
        {
          user,
          organization,
          priceId,
        }
      );
    }

    if (referralCodeToUse) {
      await affiliateService.trackReferral(
        referralCodeToUse,
        organization.id,
        subscription.id
      );
    }

    // Prepare the response data with subscription details
    const responseData = formatResponse<GetCheckoutSessionResult['data']>({
      data: { subscription, clientSecret },
    });

    // Send the response back to the client
    return reply.send(responseData);
  } catch (error) {
    // Handle any errors that occur during the process

    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

type CancelSubscriptionData = Organization['plan'];
export type CancelSubscriptionResult = ResponseData<CancelSubscriptionData>;

/**
 * Cancels a subscription for an organization.
 */
export const cancelSubscription = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    // Extract the organization and user from the request locals
    // These are typically set by authentication middleware earlier in the request pipeline
    const { organization, user } = _request.session || {};

    // Validate that the organization exists
    if (!organization) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ORGANIZATION_NOT_FOUND'
      );
    }

    // Validate that the user exists
    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    // Try to get the subscription ID from the organization's plan
    const subscriptionId = organization.plan?.subscriptionId;

    // Only attempt to cancel on Stripe if it's a subscription (not LIFETIME or FREE)
    if (subscriptionId && organization.plan?.type !== 'LIFETIME') {
      try {
        // Cancel the subscription on Stripe immediately using the subscription ID
        await stripe.subscriptions.cancel(subscriptionId);
      } catch (error) {
        // If the subscription is already canceled or not found on Stripe, we log it and continue
        // to ensure our local database remains in sync.
        console.error(
          `Stripe subscription cancellation failed for ${subscriptionId}:`,
          error
        );
      }
    }

    // Update the organization's plan in the database to reflect the cancellation
    const plan = await subscriptionService.cancelSubscription(
      subscriptionId,
      String(organization.id)
    );

    // If the plan could not be updated in the database, handle the error
    if (!plan) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ORGANIZATION_PLAN_NOT_FOUND'
      );
    }

    // Prepare a formatted response with a success message and the updated plan data
    const formattedPlan = formatResponse<CancelSubscriptionData>({
      message: t({
        en: 'Subscription cancelled successfully',
        'en-GB': 'Subscription cancelled successfully',
        fr: 'Souscription annulée avec succès',
        es: 'Suscripción cancelada con éxito',
        ru: 'Подписка успешно отменена',
        ja: 'サブスクリプションが正常にキャンセルされました',
        ko: '구독이 성공적으로 취소되었습니다',
        zh: '订阅已成功取消',
        de: 'Abonnement erfolgreich gekündigt',
        ar: 'تم إلغاء الاشتراك بنجاح',
        it: 'Abbonamento annullato con successo',
        pt: 'Assinatura cancelada com sucesso',
        hi: 'सदस्यता सफलतापूर्वक रद्द कर दी गई',
        tr: 'Abonelik başarıyla iptal edildi',
        pl: 'Subskrypcja została pomyślnie anulowana',
        id: 'Langganan berhasil dibatalkan',
        vi: 'Đăng ký đã được hủy thành công',
        uk: 'Передплату успішно скасовано',
      }),
      description: t({
        en: 'Your subscription has been cancelled successfully',
        'en-GB': 'Your subscription has been cancelled successfully',
        fr: 'Votre souscription a été annulée avec succès',
        es: 'Su suscripción ha sido cancelada con éxito',
        ru: 'Ваша подписка была успешно отменена',
        ja: 'サブスクリプションは正常にキャンセルされました',
        ko: '구독이 성공적으로 취소되었습니다',
        zh: '您的订阅已成功取消',
        de: 'Ihr Abonnement wurde erfolgreich gekündigt',
        ar: 'لقد تم إلغاء اشتراكك بنجاح',
        it: 'Il tuo abbonamento è stato annullato con successo',
        pt: 'Sua assinatura foi cancelada com sucesso',
        hi: 'आपकी सदस्यता सफलतापूर्वक रद्द कर दी गई है',
        tr: 'Aboneliğiniz başarıyla iptal edildi',
        pl: 'Twoja subskrypcja została pomyślnie anulowana',
        id: 'Langganan Anda telah berhasil dibatalkan',
        vi: 'Đăng ký của bạn đã được hủy thành công',
        uk: 'Вашу передплату успішно скасовано',
      }),
      data: plan!,
    });

    // Send the response back to the client
    reply.send(formattedPlan);

    await emailService.sendEmail({
      type: 'subscriptionPaymentCancellation',
      to: user.email,
      email: user.email,
      cancellationDate: new Date().toLocaleDateString(),
      reactivateLink: `${process.env.APP_URL}/pricing`,
      username: user.name,
      organizationName: organization.name,
      planName: plan.type,
    });
  } catch (error) {
    // Handle any errors that occur during the cancellation process
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/** Pulls the Stripe customer ID from the authenticated organization's plan. */
const getCustomerIdFromSession = (
  request: FastifyRequest
): string | undefined => request.session?.organization?.plan?.customerId;

export type GetInvoicesResult = ResponseData<Stripe.Invoice[]>;

/**
 * Lists Stripe invoices for the authenticated organization's customer.
 */
export const getInvoices = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const customerId = getCustomerIdFromSession(request);

    if (!customerId) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ORGANIZATION_PLAN_NOT_FOUND'
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const invoices = await stripe.invoices.list({ customer: customerId });

    return reply.send(
      formatResponse<GetInvoicesResult['data']>({ data: invoices.data })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetPaymentMethodResult = ResponseData<Stripe.PaymentMethod | null>;

/**
 * Returns the first card payment method attached to the authenticated
 * organization's Stripe customer (or null if none).
 */
export const getPaymentMethod = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const customerId = getCustomerIdFromSession(request);

    if (!customerId) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ORGANIZATION_PLAN_NOT_FOUND'
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    return reply.send(
      formatResponse<GetPaymentMethodResult['data']>({
        data: paymentMethods.data[0] ?? null,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type CreatePortalSessionResult = ResponseData<{ url: string }>;

/**
 * Creates a Stripe Billing Portal session for the authenticated organization
 * so the user can manage their payment method and subscription.
 */
export const createPortalSession = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const customerId = getCustomerIdFromSession(request);

    if (!customerId) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ORGANIZATION_PLAN_NOT_FOUND'
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.APP_URL ?? 'http://localhost:3000'}/dashboard`,
    });

    return reply.send(
      formatResponse<CreatePortalSessionResult['data']>({
        data: { url: session.url },
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GrantAffiliateAccessBody = {
  userId: string;
  commissionRate?: number;
  commissionType?: 'recurring' | 'one_time';
  country?: string;
};

export type GrantAffiliateAccessResult = ResponseData<AffiliateAPI>;

/**
 * Admin-only: creates a Stripe Connect account and affiliate record for a user.
 */
export const grantAffiliateAccess = async (
  request: FastifyRequest<{ Body: GrantAffiliateAccessBody }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { user } = request.session || {};

    if (user?.role !== 'admin') {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const { userId, commissionRate, commissionType, country } = request.body;

    const affiliate = await affiliateService.createAffiliate(userId as any, {
      commissionRate,
      commissionType,
      country,
    });

    return reply.send(
      formatResponse<GrantAffiliateAccessResult['data']>({
        data: affiliate.toJSON() as unknown as AffiliateAPI,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetAffiliatesParams = FiltersAndPagination<{ search?: string }>;
export type GetAffiliatesResult = PaginatedResponse<AffiliateAPI>;

/**
 * Admin-only: returns a paginated list of all affiliate records.
 */
export const getAffiliates = async (
  request: FastifyRequest<{ Querystring: GetAffiliatesParams }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { user } = request.session || {};

    if (user?.role !== 'admin') {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const { filters, skip, pageSize, page, getNumberOfPages } =
      getFiltersAndPaginationFromBody<{ search?: string }>(request);

    const query: Record<string, unknown> = {};
    if (filters.search) {
      query.referralCode = { $regex: filters.search, $options: 'i' };
    }

    const affiliates = await affiliateService.findAffiliates(
      query,
      skip,
      pageSize
    );
    const totalItems = await affiliateService.countAffiliates(query);

    return reply.send(
      formatPaginatedResponse<AffiliateAPI>({
        data: affiliates.map(
          (affiliate) => affiliate.toJSON() as unknown as AffiliateAPI
        ),
        page,
        pageSize,
        totalPages: getNumberOfPages(totalItems),
        totalItems,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetAffiliateByIdResult = ResponseData<AffiliateAPI | null>;

/**
 * Admin-only: returns a single affiliate by ID.
 */
export const getAffiliateById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { user } = request.session || {};

    if (user?.role !== 'admin') {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const affiliate = await affiliateService.getAffiliateById(
      request.params.id
    );

    return reply.send(
      formatResponse<GetAffiliateByIdResult['data']>({
        data: affiliate
          ? (affiliate.toJSON() as unknown as AffiliateAPI)
          : null,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetAffiliateResult = ResponseData<AffiliateAPI | null>;

/**
 * Returns the affiliate record for the authenticated user, or null if not an affiliate.
 */
export const getAffiliate = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { user } = request.session || {};

    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const affiliate = await affiliateService.getAffiliateByUserId(user.id);

    return reply.send(
      formatResponse<GetAffiliateResult['data']>({
        data: affiliate
          ? (affiliate.toJSON() as unknown as AffiliateAPI)
          : null,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetAffiliateAccountSessionResult = ResponseData<{
  clientSecret: string;
}>;

/**
 * Creates a Stripe Connect account session for the authenticated affiliate.
 */
export const getAffiliateAccountSession = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { user } = request.session || {};

    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const affiliate = await affiliateService.getAffiliateByUserId(user.id);

    if (!affiliate?.stripeAccountId) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'AFFILIATE_NOT_FOUND'
      );
    }

    const clientSecret = await affiliateService.createAccountSession(
      affiliate.stripeAccountId
    );

    return reply.send(
      formatResponse<GetAffiliateAccountSessionResult['data']>({
        data: { clientSecret },
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetAffiliateOnboardingLinkResult = ResponseData<{ url: string }>;

/**
 * Returns a Stripe-hosted onboarding URL for the authenticated affiliate.
 * Accepts an optional `returnUrl` query param to redirect back after onboarding.
 */
export const getAffiliateOnboardingLink = async (
  request: FastifyRequest<{ Querystring: { returnUrl?: string } }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { user } = request.session || {};

    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const affiliate = await affiliateService.getAffiliateByUserId(user.id);

    if (!affiliate?.stripeAccountId) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'AFFILIATE_NOT_FOUND'
      );
    }

    const appUrl = process.env.APP_URL;
    const fallback = `${appUrl}/dashboard/affiliate`;
    const returnUrl = request.query.returnUrl ?? fallback;
    const refreshUrl = request.query.returnUrl ?? fallback;

    const url = await affiliateService.createOnboardingLink(
      affiliate.stripeAccountId,
      returnUrl,
      refreshUrl
    );

    return reply.send(
      formatResponse<GetAffiliateOnboardingLinkResult['data']>({
        data: { url },
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetAffiliateStatsResult = ResponseData<AffiliateStats | null>;

/**
 * Returns referral stats for the authenticated affiliate.
 */
export const getAffiliateStats = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { user } = request.session || {};

    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const stats = await affiliateService.getAffiliateStats(user.id);

    return reply.send(
      formatResponse<GetAffiliateStatsResult['data']>({ data: stats })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetAffiliateInvitationsResult =
  PaginatedResponse<AffiliateInvitationAPI>;

/**
 * Admin-only: returns a paginated list of all affiliate invitations.
 */
export const getAffiliateInvitations = async (
  request: FastifyRequest<{ Querystring: GetAffiliatesParams }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { user } = request.session || {};
    if (user?.role !== 'admin') {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const { filters, skip, pageSize, page, getNumberOfPages } =
      getFiltersAndPaginationFromBody<{ search?: string }>(request);

    const query: Record<string, unknown> = {};
    if (filters.search) {
      query.email = { $regex: filters.search, $options: 'i' };
    }

    const invitations = await affiliateService.findAffiliateInvitations(
      query,
      skip,
      pageSize
    );
    const totalItems = await affiliateService.countAffiliateInvitations(query);

    return reply.send(
      formatPaginatedResponse<AffiliateInvitationAPI>({
        data: invitations.map(
          (invitation) =>
            invitation.toJSON() as unknown as AffiliateInvitationAPI
        ),
        page,
        pageSize,
        totalPages: getNumberOfPages(totalItems),
        totalItems,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type SendAffiliateInvitationBody = {
  email: string;
  commissionRate?: number;
  commissionType?: 'recurring' | 'one_time';
  country?: string;
};

export type SendAffiliateInvitationResult = ResponseData<{ sent: boolean }>;

/**
 * Admin-only: creates an affiliate invitation and sends the email.
 */
export const sendAffiliateInvitation = async (
  request: FastifyRequest<{ Body: SendAffiliateInvitationBody }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { user } = request.session || {};

    if (user?.role !== 'admin') {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const { email, commissionRate, commissionType, country } = request.body;

    const invitation = await affiliateService.createAffiliateInvitation(
      email,
      user.id,
      { commissionRate, commissionType, country }
    );

    const inviteLink = `${process.env.APP_URL}/affiliation/${invitation.token}`;

    await emailService.sendEmail({
      type: 'affiliateInvitation',
      to: email,
      inviteLink,
      commissionRate: invitation.commissionRate,
    });

    return reply.send(
      formatResponse<SendAffiliateInvitationResult['data']>({
        data: { sent: true },
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetAffiliateInvitationResult =
  ResponseData<AffiliateInvitationAPI | null>;

/**
 * Public: returns invitation details by token (for rendering the landing page).
 */
export const getAffiliateInvitation = async (
  request: FastifyRequest<{ Params: { token: string } }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { token } = request.params;
    const invitation =
      await affiliateService.getAffiliateInvitationByToken(token);

    if (!invitation) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'AFFILIATE_INVITATION_NOT_FOUND'
      );
    }

    return reply.send(
      formatResponse<GetAffiliateInvitationResult['data']>({
        data: invitation.toJSON() as unknown as AffiliateInvitationAPI,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type UpdateAffiliateStatusBody = {
  status?: 'active' | 'suspended';
};
export type UpdateAffiliateStatusResult = ResponseData<AffiliateAPI>;

/**
 * Admin-only: updates an affiliate's status.
 */
export const updateAffiliateStatus = async (
  request: FastifyRequest<{
    Params: { id: string };
    Body: UpdateAffiliateStatusBody;
  }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { id } = request.params;
    const { status } = request.body;

    const affiliate = await affiliateService.setAffiliateStatus(id, {
      status,
    });

    if (!affiliate) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'AFFILIATE_NOT_FOUND'
      );
    }

    return reply.send(
      formatResponse<UpdateAffiliateStatusResult['data']>({
        data: affiliate.toJSON() as unknown as AffiliateAPI,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type AcceptAffiliateInvitationResult = ResponseData<AffiliateAPI>;

/**
 * Authenticated: accepts an invitation, creates the Stripe Connect account and affiliate record.
 */
export type AcceptAffiliateInvitationBody = {
  country?: string;
  stripeAccountType?: 'express' | 'standard';
};

export const acceptAffiliateInvitation = async (
  request: FastifyRequest<{
    Params: { token: string };
    Body: AcceptAffiliateInvitationBody;
  }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { user } = request.session || {};

    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const { token } = request.params;
    const { country, stripeAccountType } = request.body ?? {};

    const affiliate = await affiliateService.acceptAffiliateInvitation(
      token,
      user.id,
      { country, stripeAccountType, email: user.email }
    );

    const appUrl = process.env.APP_URL;

    await emailService.sendEmail({
      type: 'affiliateWelcome',
      to: user.email,
      dashboardLink: `${appUrl}/affiliation/${token}`,
      commissionRate: affiliate.commissionRate,
    });

    return reply.send(
      formatResponse<AcceptAffiliateInvitationResult['data']>({
        data: affiliate.toJSON() as unknown as AffiliateAPI,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetPromoCodesQuerystring = GetAffiliatesParams & {
  affiliateId?: string;
};
export type GetPromoCodesResult = PaginatedResponse<PromoCodeAPI>;

export const getPromoCodes = async (
  request: FastifyRequest<{ Querystring: GetPromoCodesQuerystring }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { user } = request.session || {};

    if (user?.role !== 'admin') {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const { skip, pageSize, page, getNumberOfPages } =
      getFiltersAndPaginationFromBody<{ search?: string }>(request);

    const affiliateIdFilter = (request.query as GetPromoCodesQuerystring)
      .affiliateId;

    const promoCodes = await promoCodeService.getPromoCodes(
      skip,
      pageSize,
      affiliateIdFilter
    );
    const totalItems =
      await promoCodeService.countPromoCodes(affiliateIdFilter);

    return reply.send(
      formatPaginatedResponse<PromoCodeAPI>({
        data: promoCodes.map(
          (promoCode) => promoCode.toJSON() as unknown as PromoCodeAPI
        ),
        page,
        pageSize,
        totalPages: getNumberOfPages(totalItems),
        totalItems,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetPromoCodeByIdResult = ResponseData<PromoCodeAPI>;

export const getPromoCodeById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { user } = request.session || {};

    if (user?.role !== 'admin') {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const { id } = request.params;
    const promoCode = await promoCodeService.getPromoCodeById(id);

    if (!promoCode) {
      return reply.status(404).send({ error: 'Promo code not found' });
    }

    return reply.send(
      formatResponse<PromoCodeAPI>({
        data: promoCode.toJSON() as unknown as PromoCodeAPI,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type CreatePromoCodeBody = {
  code: string;
  discountType: 'percentage' | 'amount';
  discountValue: number;
  currency?: string;
  affiliateId?: string;
  maxRedemptions?: number;
  expiresAt?: string;
};
export type CreatePromoCodeResult = ResponseData<PromoCodeAPI>;

export const createPromoCode = async (
  request: FastifyRequest<{ Body: CreatePromoCodeBody }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { user } = request.session || {};

    if (user?.role !== 'admin') {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const {
      code,
      discountType,
      discountValue,
      currency,
      affiliateId,
      maxRedemptions,
      expiresAt,
    } = request.body;

    const newPromo = await promoCodeService.createPromoCode({
      code,
      discountType,
      discountValue,
      currency,
      affiliateId,
      maxRedemptions,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    });

    return reply.send(
      formatResponse<PromoCodeAPI>({
        data: newPromo.toJSON() as unknown as PromoCodeAPI,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type UpdatePromoCodeBody = {
  affiliateId?: string | null;
  active?: boolean;
  maxRedemptions?: number;
  expiresAt?: string;
};
export type UpdatePromoCodeResult = ResponseData<PromoCodeAPI>;

export const updatePromoCode = async (
  request: FastifyRequest<{
    Params: { id: string };
    Body: UpdatePromoCodeBody;
  }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { user } = request.session || {};

    if (user?.role !== 'admin') {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const { id } = request.params;
    const { affiliateId, active, maxRedemptions, expiresAt } = request.body;

    const updated = await promoCodeService.updatePromoCode(id, {
      affiliateId,
      active,
      maxRedemptions,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    });

    if (!updated) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PROMO_CODE_NOT_FOUND'
      );
    }

    return reply.send(
      formatResponse<PromoCodeAPI>({
        data: updated.toJSON() as unknown as PromoCodeAPI,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type DeletePromoCodeResult = ResponseData<{ deleted: boolean }>;

export const deletePromoCode = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { user } = request.session || {};

    if (user?.role !== 'admin') {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const { id } = request.params;
    const deleted = await promoCodeService.deletePromoCode(id);

    if (!deleted) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PROMO_CODE_NOT_FOUND'
      );
    }

    return reply.send(
      formatResponse<DeletePromoCodeResult['data']>({
        data: { deleted: true },
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export const getAffiliatePromoCode = async (
  request: FastifyRequest<{ Params: { referralCode: string } }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { referralCode } = request.params;
    const affiliate = await affiliateService.getAffiliateByCode(referralCode);

    if (!affiliate) {
      return reply.send(formatResponse<any>({ data: null }));
    }

    const promoCode = await PromoCodeModel.findOne({
      affiliateId: affiliate._id,
      active: true,
    });

    return reply.send(
      formatResponse<any>({
        data: promoCode ? promoCode.code : null,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
