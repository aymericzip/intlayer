// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
import { logger } from '@logger';
import { addSubscription } from '@services/subscription.service';
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
    case 'checkout.session.async_payment_failed': {
      // const checkoutSessionAsyncPaymentFailed = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;
    }
    case 'checkout.session.async_payment_succeeded': {
      // const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    }
    case 'checkout.session.completed': {
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed

      const session = await stripe.checkout.sessions.retrieve(
        checkoutSessionCompleted.id,
        {
          expand: ['line_items'],
        }
      );

      const customerId = session.customer as string;

      if (!customerId) {
        logger.error('No customer ID found', session);
        return;
      }

      const customer = await stripe.customers.retrieve(customerId);

      const priceId = session.line_items?.data[0]?.price?.id;

      const userEmail = (customer as unknown as { email: string }).email;

      await addSubscription('organizationId', priceId!, customerId, userEmail);

      break;
    }
    case 'checkout.session.expired': {
      const checkoutSessionExpired = event.data.object;
      // Then define and call a function to handle the event checkout.session.expired

      console.log('checkoutSessionExpired', checkoutSessionExpired);

      const session = await stripe.checkout.sessions.retrieve(
        checkoutSessionExpired.id,
        {
          expand: ['line_items'],
        }
      );
      console.log('session', session);

      const customerId = session.customer as string;

      if (!customerId) {
        logger.error('No customer ID found', session);
        return;
      }

      // const customer = await stripe.customers.retrieve(customerId);

      // const userEmail = (customer as unknown as { email: string }).email;

      // await cancelSubscription({});

      break;
    }
    // ... handle other event types
    default:
      logger.info(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};
