import { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import {
  getStripeCustomerId,
  saveStripeCustomerId,
} from '@services/organization.service';
import { ErrorHandler, AppError } from '@utils/errors';
import { formatResponse, ResponseData } from '@utils/responseData';
import { Request } from 'express';
import { Stripe } from 'stripe';
import { GetProjectsParams } from './project.controller';

export type GetCheckoutSessionBody = {
  organizationId: string;
  priceId: string;
};

type CheckoutSessionData = {
  sessionId: string;
};

export type GetCheckoutSessionResult = ResponseData<CheckoutSessionData>;

export const getCheckoutSession = async (
  req: Request<GetProjectsParams>,
  res: ResponseWithInformation<GetCheckoutSessionResult>
): Promise<void> => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const { organizationId, priceId } = req.body;

    // Fetch or create a Stripe customer for the organization
    let customerId = await getStripeCustomerId(organizationId);
    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: { organizationId },
      });
      customerId = customer.id;
      await saveStripeCustomerId(organizationId, customerId);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    const responseData = formatResponse<CheckoutSessionData>({
      data: { sessionId: session.id },
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
