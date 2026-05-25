import type { Locale } from '@intlayer/types/allLocales';
import * as affiliateService from '@services/affiliate.service';
import * as emailService from '@services/email.service';
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

export type GetPricingBody = {
  priceIds: string[];
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

    const promoCodeId = promoCode
      ? await subscriptionService.getCouponId(promoCode)
      : null;

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

      if (referralCode) {
        await affiliateService.trackReferral(
          referralCode,
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

    if (referralCode) {
      await affiliateService.trackReferral(
        referralCode,
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

    if (!user || user.role !== 'admin') {
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
        data: affiliate.toJSON() as AffiliateAPI,
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

    if (!user || user.role !== 'admin') {
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
        data: affiliates.map((a) => a.toJSON() as AffiliateAPI),
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

    if (!user || user.role !== 'admin') {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const affiliate = await affiliateService.getAffiliateById(
      request.params.id
    );

    return reply.send(
      formatResponse<GetAffiliateByIdResult['data']>({
        data: affiliate ? (affiliate.toJSON() as AffiliateAPI) : null,
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
        data: affiliate ? (affiliate.toJSON() as AffiliateAPI) : null,
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

    if (!user || user.role !== 'admin') {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    const { email, commissionRate, commissionType, country } = request.body;
    const appUrl = process.env.APP_URL ?? 'https://app.intlayer.org';

    const invitation = await affiliateService.createAffiliateInvitation(
      email,
      user.id,
      { commissionRate, commissionType, country }
    );

    const inviteLink = `${appUrl}/affiliation/${invitation.token}`;

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
        data: invitation.toJSON() as AffiliateInvitationAPI,
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
        data: affiliate.toJSON() as AffiliateAPI,
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
export type AcceptAffiliateInvitationBody = { country?: string };

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
    const { country } = request.body ?? {};

    const affiliate = await affiliateService.acceptAffiliateInvitation(
      token,
      user.id,
      country
    );

    return reply.send(
      formatResponse<AcceptAffiliateInvitationResult['data']>({
        data: affiliate.toJSON() as AffiliateAPI,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
