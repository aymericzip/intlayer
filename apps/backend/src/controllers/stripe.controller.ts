import { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import { saveStripeCustomerId } from '@services/organization.service';
import { ErrorHandler, AppError } from '@utils/errors';
import { formatResponse, ResponseData } from '@utils/responseData';
import { Request } from 'express';
import { Stripe } from 'stripe';

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

export const getCheckoutSession = async (
  req: Request<undefined, undefined, GetCheckoutSessionBody>,
  res: ResponseWithInformation<GetCheckoutSessionResult>
): Promise<void> => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const { organization, user } = res.locals;
    const { priceId } = req.body;

    if (!organization) {
      ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_FOUND');
      return;
    }

    // Fetch or create a Stripe customer for the organization
    let { customerId } = organization.plan;

    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: { organizationId: String(organization._id) },
      });
      customerId = customer.id;
      await saveStripeCustomerId(organization, customerId);
    }

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
      payment_settings: {
        payment_method_types: ['card'],
      },
      payment_behavior: 'default_incomplete',
    });

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

    const responseData = formatResponse<CheckoutSessionData>({
      data: {
        subscriptionId: subscription.id,
        clientSecret:
          (
            (subscription.latest_invoice as Stripe.Invoice)
              .payment_intent as Stripe.PaymentIntent
          )?.client_secret ?? '',
        status: subscription.status,
      },
    });

    res.json(responseData);

    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
