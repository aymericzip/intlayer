import type { Locale } from '@intlayer/types/allLocales';
import * as emailService from '@services/email.service';
import * as subscriptionService from '@services/subscription.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { isLifetimePriceId, retrievePlanInformation } from '@utils/plan';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import Stripe from 'stripe';
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
    const { priceId, promoCode } = request.body;

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
        fr: 'Souscription annulée avec succès',
        es: 'Suscripción cancelada con éxito',
      }),
      description: t({
        en: 'Your subscription has been cancelled successfully',
        fr: 'Votre souscription a été annulée avec succès',
        es: 'Su suscripción ha sido cancelada con éxito',
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
