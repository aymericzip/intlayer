import type { Locale } from '@intlayer/types/allLocales';
import { logger } from '@logger';
import * as emailService from '@services/email.service';
import { getOrganizationById } from '@services/organization.service';
import {
  addOrUpdateSubscription,
  cancelSubscription,
  changeSubscriptionStatus,
} from '@services/subscription.service';
import { getUserById } from '@services/user.service';
import { GenericError } from '@utils/errors';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { Stripe } from 'stripe';
import type { Plan } from '@/types/plan.types';

type SubscriptionMetadata = {
  locale: Locale; // Localization setting (e.g., 'en', 'fr', 'es')
  userId: string; // ID of the user associated with the subscription
  organizationId: string; // ID of the organization associated with the subscription
};

/**
 * Stripe webhook handler for processing subscription and invoice events.
 * @param req - Fastify request object.
 * @param reply - Fastify response object.
 */
export const stripeWebhook = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  // Initialize the Stripe client with the secret key
  if (!process.env.STRIPE_SECRET_KEY) {
    logger.error('STRIPE_SECRET_KEY is missing');
    reply.status(500).send('Configuration Error');
    return;
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Webhook secret for verifying event signatures
  const sig = req.headers['stripe-signature'] as string; // Retrieve the signature from the webhook request headers

  if (!endpointSecret) {
    logger.error('STRIPE_WEBHOOK_SECRET is missing');
    reply.status(500).send('Configuration Error');
    return;
  }

  if (!sig) {
    logger.error('Stripe signature is missing');
    reply.status(400).send('Webhook Error: Missing signature');
    return;
  }

  let event: Stripe.Event;

  // Verify the webhook signature to ensure the request is authentic
  try {
    // Pass the raw buffer attached by the custom parser, not request.body
    const rawBody = (req as any).rawBody;

    if (!rawBody) {
      throw new Error('Raw body is missing from request');
    }

    event = await stripe.webhooks.constructEventAsync(
      rawBody as string | Buffer,
      sig,
      endpointSecret
    );
  } catch (err) {
    logger.error(
      `Webhook signature verification failed: ${(err as Error).message}`
    );
    // Respond with a 400 status code if the signature verification fails
    reply.status(400).send(`Webhook Error: ${(err as Error).message}`);
    return;
  }

  // Utility function to extract metadata from a Stripe customer
  const extractMetadata = async (customerId: string) => {
    const customer = await stripe.customers.retrieve(customerId); // Retrieve customer details from Stripe
    const metadata = (customer as Stripe.Customer)
      .metadata as SubscriptionMetadata; // Return the metadata object
    return metadata;
  };

  // Handles subscription-related events (creation, update, deletion)
  const handleSubscriptionEvent = async (
    subscription: Stripe.Subscription,
    statusOverride?: Plan['status'] // Optionally override the subscription status
  ) => {
    const { id: subscriptionId, customer } = subscription;
    const priceId = subscription.items.data[0]?.price?.id; // Extract the price ID from subscription items

    if (!customer) {
      throw new GenericError('STRIPE_SUBSCRIPTION_NO_CUSTOMER');
    }

    const customerId = customer as string;
    const { locale, userId, organizationId } =
      await extractMetadata(customerId); // Extract metadata from the customer

    // Set localization in request locals if available
    if (locale && req.intlayer) {
      req.intlayer.locale = locale;
    }

    const organization = await getOrganizationById(organizationId); // Fetch organization details by ID

    if (!organization) {
      throw new GenericError('ORGANIZATION_NOT_FOUND');
    }

    const user = await getUserById(userId);

    if (!user) {
      throw new GenericError('USER_NOT_FOUND');
    }

    const status = statusOverride ?? subscription.status; // Use the provided status override or the subscription's status

    // Update or create a subscription record in the database
    await addOrUpdateSubscription(
      subscriptionId,
      priceId!,
      customerId,
      userId,
      organization,
      status
    );

    if (status === 'active') {
      await emailService.sendEmail({
        type: 'subscriptionPaymentSuccess',
        to: user.email,
        email: user.email,
        subscriptionStartDate: new Date().toLocaleDateString(),
        manageSubscriptionLink: `${process.env.APP_URL}/organization`,
        username: user.name,
        organizationName: organization.name,
        planName: organization.plan?.type ?? 'Unknown',
      });
    }
    if (status === 'canceled') {
      await emailService.sendEmail({
        type: 'subscriptionPaymentCancellation',
        to: user.email,
        email: user.email,
        cancellationDate: new Date(
          (subscription as any).current_period_end * 1000
        ).toLocaleDateString(),
        reactivateLink: `${process.env.APP_URL}/pricing`,
        username: user.name,
        organizationName: organization.name,
        planName: organization.plan?.type ?? 'Unknown',
      });
    }
  };

  // Handles invoice-related events (payment success or failure)
  const handleInvoiceEvent = async (
    invoice: Stripe.Invoice,
    status: 'active' | 'incomplete'
  ) => {
    const subscriptionId =
      typeof (invoice as any).subscription === 'string'
        ? (invoice as any).subscription
        : (invoice as any).subscription?.id;

    if (!subscriptionId) {
      logger.warn('Subscription ID is undefined in invoice.');
      return;
    }

    const customerId = invoice.customer as string;

    // 1. Extract metadata first to guarantee we have the correct organizationId
    const { locale, userId, organizationId } =
      await extractMetadata(customerId);

    if (locale && req.intlayer) {
      req.intlayer.locale = locale;
    }

    const organization = await getOrganizationById(organizationId);

    if (!organization) {
      throw new GenericError('ORGANIZATION_NOT_FOUND');
    }

    // 2. Prevent duplicate subscriptions by canceling the OLD subscription, not the new one
    if (
      organization.plan?.subscriptionId &&
      organization.plan.subscriptionId !== subscriptionId
    ) {
      try {
        await stripe.subscriptions.cancel(organization.plan.subscriptionId);
      } catch (err) {
        // Suppress errors if the old subscription is already canceled
        logger.info(
          `Old subscription ${organization.plan.subscriptionId} could not be canceled or is already canceled. ${err}`
        );
      }
    }

    // 3. Update the database to reflect the new subscription status
    await changeSubscriptionStatus(
      subscriptionId,
      status,
      userId,
      organizationId
    );
  };

  try {
    // Log the event type for debugging and monitoring
    logger.info(`Triggered event type ${event.type}`);

    // Handle specific event types
    switch (event.type) {
      case 'customer.subscription.created': {
        logger.info(`Handled event type ${event.type}`);
        // Process a new subscription creation event
        await handleSubscriptionEvent(event.data.object as Stripe.Subscription);
        break;
      }
      case 'customer.subscription.updated': {
        logger.info(`Handled event type ${event.type}`);
        // Process a subscription update event
        await handleSubscriptionEvent(event.data.object as Stripe.Subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        logger.info(`Handled event type ${event.type}`);
        const subscription = event.data
          .object as unknown as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const { locale, organizationId } = await extractMetadata(customerId);

        // Set localization in request locals if available
        if (locale && req.intlayer) {
          req.intlayer.locale = locale;
        }

        // Handle subscription deletion by canceling it in the database
        await cancelSubscription(subscription.id, organizationId);
        break;
      }
      case 'invoice.payment_succeeded': {
        logger.info(`Handled event type ${event.type}`);
        // Handle successful invoice payment
        await handleInvoiceEvent(event.data.object as Stripe.Invoice, 'active');
        break;
      }
      case 'invoice.payment_failed': {
        logger.info(`Handled event type ${event.type}`);
        // Handle failed invoice payment
        await handleInvoiceEvent(
          event.data.object as Stripe.Invoice,
          'incomplete'
        );
        break;
      }
      default:
        // Log unhandled event types for visibility
        logger.info(`Unhandled event type ${event.type}`);
    }

    // Respond to Stripe to confirm the event was processed successfully
    reply.send();
  } catch (error) {
    // Log errors for debugging and respond with a 500 status code
    logger.error(
      `Error handling event ${event?.type ?? 'unknown'}: ${(error as Error).message}`
    );
    reply.status(500).send('Server Error');
  }
};
