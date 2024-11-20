// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
import { logger } from '@logger';
import {
  addSubscription,
  cancelSubscription,
  changeSubscriptionStatus,
} from '@services/subscription.service';
import { type Request, type Response } from 'express';
import { Stripe } from 'stripe';

export const stripeWebhook = async (request: Request, response: Response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // This is your Stripe CLI webhook secret for testing your endpoint locally.
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  const sig = request.headers['stripe-signature']!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${(err as Error).message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created': {
      // Subscription created event received. This event indicates that a new subscription was successfully created.',
      const subscription = event.data.object as Stripe.Subscription;

      logger.info({
        hey: 'new event',
        type: event.type,
        subscriptionId: subscription.id,
        customerId: subscription.customer,
        status: subscription.status,
        startDate: subscription.start_date,
      });

      let userEmail = '';

      const priceId = subscription.items.data[0].price.id;
      const customerId = (subscription.customer ?? '') as string;

      if (subscription.customer) {
        const customer = await stripe.customers.retrieve(customerId);

        userEmail = (customer as unknown as { email: string }).email;
      }

      await addSubscription(priceId!, customerId, userEmail);

      break;
    }

    case 'customer.subscription.updated': {
      // Subscription updated event received. This event indicates that the subscription was updated, which may include changes to its status, billing cycle, or other properties.
      const subscription = event.data.object as Stripe.Subscription;

      logger.info({
        hey: 'new event',
        type: event.type,
        subscriptionId: subscription.id,
        customerId: subscription.customer,
        status: subscription.status,
        startDate: subscription.start_date,
      });

      let userEmail = '';
      let userLocale = '';

      const priceId = subscription.items.data[0].price.id;
      const customerId = (subscription.customer ?? '') as string;

      if (subscription.customer) {
        const customer = await stripe.customers.retrieve(customerId);

        userEmail = (customer as unknown as { email: string }).email;
        userLocale =
          (customer as Stripe.Customer).metadata?.locale ?? 'default_locale';
      }

      await addSubscription(priceId!, customerId, userEmail);

      break;
    }

    case 'customer.subscription.deleted': {
      // Subscription deleted event received. This event occurs when a subscription is canceled or deleted.
      const subscription = event.data.object as Stripe.Subscription;

      logger.info({
        hey: 'new event',
        type: event.type,

        subscriptionId: subscription.id,
        customerId: subscription.customer,
        canceledAt: subscription.canceled_at,
        status: subscription.status,
      });
      const customerId = (subscription.customer ?? '') as string;

      cancelSubscription(customerId);

      break;
    }

    case 'invoice.payment_succeeded': {
      // Invoice payment succeeded event received. This event confirms that an invoice, including subscription payments, was successfully paid.
      const invoice = event.data.object as Stripe.Invoice;

      logger.info({
        hey: 'new event',
        type: event.type,

        invoiceId: invoice.id,
        customerId: invoice.customer,
        amountPaid: invoice.amount_paid,
        subscriptionId: invoice.subscription,
      });

      const customerId = (invoice.customer ?? '') as string;

      changeSubscriptionStatus(customerId, 'ACTIVE');

      break;
    }

    case 'invoice.payment_failed': {
      // Invoice payment failed event received. This event occurs when Stripe is unable to process a payment for an invoice.
      const invoice = event.data.object as Stripe.Invoice;

      logger.warn({
        hey: 'new event',
        type: event.type,

        invoiceId: invoice.id,
        customerId: invoice.customer,
        amountDue: invoice.amount_due,
        subscriptionId: invoice.subscription,
        attemptCount: invoice.attempt_count,
      });

      const customerId = (invoice.customer ?? '') as string;

      changeSubscriptionStatus(customerId, 'ERROR');

      break;
    }

    default:
      logger.info(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};
