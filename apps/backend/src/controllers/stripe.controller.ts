import { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import * as subscriptionService from '@services/subscription.service';
import { ErrorHandler, AppError } from '@utils/errors';
import { retrievePlanInformation } from '@utils/plan';
import { formatResponse, ResponseData } from '@utils/responseData';
import { Request } from 'express';
import { t } from 'express-intlayer';
import { Locales } from 'intlayer';
import { Stripe } from 'stripe';
import type { Organization } from '@/types/organization.types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export type GetCheckoutSessionBody = {
  organizationId: string;
  priceId: string;
};

type CheckoutSessionData = {
  subscriptionId: string;
  clientSecret: string;
  status: Stripe.Subscription.Status;
};

export type GetCheckoutSessionResult = ResponseData<CheckoutSessionData>;

/**
 * Handles subscription creation or update with Stripe and returns a ClientSecret.
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const getSubscription = async (
  req: Request<undefined, undefined, GetCheckoutSessionBody>,
  res: ResponseWithInformation<GetCheckoutSessionResult>
): Promise<void> => {
  try {
    // Extract organization and user from response locals (set by authentication middleware)
    const { organization, user } = res.locals;
    // Get the price ID (Stripe Price ID) from the request body
    const { priceId } = req.body;

    // Validate that the organization exists
    if (!organization) {
      ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_FOUND');
      return;
    }

    // Validate that the user exists
    if (!user) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
      return;
    }

    // Ensure the user is a member of the organization
    if (!organization.membersIds.map(String).includes(String(user._id))) {
      ErrorHandler.handleGenericErrorResponse(
        res,
        'USER_NOT_ORGANIZATION_MEMBER'
      );
      return;
    }

    // Ensure the user is an admin of the organization
    if (!organization.adminsIds.map(String).includes(String(user._id))) {
      ErrorHandler.handleGenericErrorResponse(
        res,
        'USER_NOT_ORGANIZATION_ADMIN'
      );
      return;
    }

    const { period, type } = retrievePlanInformation(priceId);

    if (
      organization.plan?.subscriptionId ||
      (organization.plan?.type === type && organization.plan?.period === period)
    ) {
      ErrorHandler.handleGenericErrorResponse(res, 'ALREADY_SUBSCRIBED', {
        organizationId: organization._id,
      });
      return;
    }

    // Attempt to retrieve the Stripe customer ID from the organization's plan
    let customerId = organization.plan?.customerId;

    if (!customerId) {
      // If no customer ID exists, create a new Stripe customer for the organization
      const customer = await stripe.customers.create({
        metadata: {
          organizationId: String(organization._id),
          userId: String(user._id),
          // Include the locale for potential localization
          locale: (res.locals as unknown as { locale: Locales }).locale,
        },
      });
      customerId = customer.id;
    }

    // If no subscription exists, create a new one
    const subscription = await stripe.subscriptions.create({
      customer: customerId, // Associate the subscription with the customer
      items: [{ price: priceId }], // Set the price ID for the subscription
      expand: ['latest_invoice.payment_intent'], // Expand to get payment intent details
      payment_settings: {
        payment_method_types: ['card'], // Specify payment method types
      },
      payment_behavior: 'default_incomplete', // Create the subscription in an incomplete state until payment is confirmed
    });

    // Handle subscription creation failure
    if (!subscription) {
      ErrorHandler.handleGenericErrorResponse(
        res,
        'SUBSCRIPTION_CREATION_FAILED',
        {
          user,
          organization,
          priceId,
        }
      );
      return;
    }

    // Prepare the response data with subscription details
    const responseData = formatResponse<CheckoutSessionData>({
      data: {
        subscriptionId: subscription.id,
        // Retrieve the client secret from the payment intent to complete payment on the client side
        clientSecret:
          (
            (subscription.latest_invoice as Stripe.Invoice)
              .payment_intent as Stripe.PaymentIntent
          )?.client_secret ?? '',
        status: subscription.status, // Subscription status (e.g., 'incomplete', 'active')
      },
    });

    // Send the response back to the client
    res.json(responseData);

    return;
  } catch (error) {
    // Handle any errors that occur during the process

    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

type CancelSubscriptionData = Organization['plan'];

type CancelSubscriptionResult = ResponseData<CancelSubscriptionData>;

/**
 * Cancels a subscription for an organization.
 * @param _req - Express request object.
 * @param res - Express response object.
 */
export const cancelSubscription = async (
  _req: Request,
  res: ResponseWithInformation<CancelSubscriptionResult>
): Promise<void> => {
  try {
    // Extract the organization and user from the response locals
    // These are typically set by authentication middleware earlier in the request pipeline
    const { organization, user } = res.locals;

    // Validate that the organization exists
    if (!organization) {
      ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_FOUND');
      return;
    }

    // Validate that the user exists
    if (!user) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
      return;
    }

    // Check if the user is an admin of the organization
    if (!organization.adminsIds.map(String).includes(String(user._id))) {
      ErrorHandler.handleGenericErrorResponse(
        res,
        'USER_NOT_ORGANIZATION_ADMIN'
      );
      return;
    }

    // Check if the organization has an active subscription to cancel
    if (!organization.plan?.subscriptionId) {
      ErrorHandler.handleGenericErrorResponse(
        res,
        'ORGANIZATION_PLAN_NOT_FOUND'
      );
      return;
    }

    // Cancel the subscription on Stripe immediately using the subscription ID
    await stripe.subscriptions.cancel(organization.plan.subscriptionId);

    // Update the organization's plan in the database to reflect the cancellation
    const plan = await subscriptionService.cancelSubscription(
      organization.plan.subscriptionId,
      String(organization._id)
    );

    // If the plan could not be updated in the database, handle the error
    if (!plan) {
      ErrorHandler.handleGenericErrorResponse(
        res,
        'ORGANIZATION_PLAN_NOT_FOUND'
      );
      return;
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
    res.json(formattedPlan);
  } catch (error) {
    // Handle any errors that occur during the cancellation process
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
  }
};
