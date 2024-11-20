import { logger } from '@logger';
import { GenericError } from '@utils/errors';
import { retrievePlanInformation } from '@utils/plan';
import { Locales } from 'intlayer';
import { Stripe } from 'stripe';
import { sendEmail } from './email.service';
import {
  getOrganizationByCustomerId,
  updatePlan,
} from './organization.service';
import { getUserByEmail, createUser, getUserById } from './user.service';
import { Plan } from '@/types/plan.types';

/**
 * Adds a subscription to an organization.
 * @param priceId - The ID of the price to add.
 * @param customerId - The ID of the customer to add.
 * @param email - The email of the user to add.
 * @param locale - The locale of the user to add.
 * @returns The added plan.
 */
export const addSubscription = async (
  priceId: string,
  customerId: string,
  email: string,
  locale: Locales = Locales.ENGLISH
): Promise<Plan | null> => {
  let user = await getUserByEmail(email);
  const organization = await getOrganizationByCustomerId(customerId);

  if (!organization) {
    throw new GenericError('ORGANIZATION_NOT_FOUND', {
      customerId,
    });
  }

  if (!user) {
    user = await createUser({
      email,
    });
  }

  if (!user) {
    throw new GenericError('USER_NOT_FOUND', {
      email,
    });
  }

  if (user.customerId !== customerId) {
    user.customerId = customerId as string;
    await user.save();
  }
  const planType = retrievePlanInformation(priceId!);

  if (organization.plan) {
    // Cancel the current plan
    await cancelSubscription(organization.plan.customerId!);

    const editedOrganization = await updatePlan(organization, {
      ...organization.plan,
      creatorId: user._id,
      priceId: priceId!,
      type: planType.type,
      period: planType.period,
      status: 'ACTIVE',
    });

    if (!editedOrganization) {
      throw new GenericError('ORGANIZATION_UPDATE_FAILED', {
        organizationId: organization._id,
      });
    }

    logger.info(
      `Updated plan for organization ${organization._id} - ${planType.type} - ${planType.period}`
    );

    return editedOrganization.plan;
  }

  const editedOrganization = await updatePlan(organization, {
    creatorId: user._id,
    priceId: priceId!,
    type: planType.type,
    period: planType.period,
    status: 'ACTIVE',
  });

  if (!editedOrganization) {
    throw new GenericError('ORGANIZATION_UPDATE_FAILED', {
      organizationId: organization._id,
    });
  }

  const { type } = retrievePlanInformation(priceId!);

  await sendEmail({
    type: 'subscriptionPaymentSuccess',
    to: user.email,
    username: user.name,
    planName: type,
    subscriptionStartDate: new Date().toLocaleDateString(),
    email,
    manageSubscriptionLink: `${process.env.CLIENT_URL}/dashboard`!,
    locale,
  });

  logger.info(
    `Created plan for organization ${organization._id} - ${planType.type} - ${planType.period}`
  );

  return editedOrganization.plan;
};

/* Function to retrieve active subscriptions for a customer
 * Returns an array of Stripe.Subscription objects
 */
const getActiveSubscriptions = async (
  customerId: string
): Promise<Stripe.Subscription[]> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
  });
  return subscriptions.data;
};

export const cancelSubscription = async (customerId: string) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const organization = await getOrganizationByCustomerId(customerId);

  if (!organization) {
    throw new GenericError('ORGANIZATION_NOT_FOUND', {
      customerId,
    });
  }

  if (!organization.plan) {
    throw new GenericError('ORGANIZATION_PLAN_NOT_FOUND', {
      customerId,
    });
  }

  // Retrieve and cancel existing subscriptions
  const activeSubscriptions = await getActiveSubscriptions(customerId);
  for (const sub of activeSubscriptions) {
    await stripe.subscriptions.cancel(sub.id);
  }

  logger.info(
    `Cancelled plan for organization ${organization._id} - ${organization.plan.type} - ${organization.plan.period}`
  );

  return organization.plan;
};

/**
 * Changes the subscription status of an organization.
 *
 * @param customerId - The ID of the customer to change the subscription status for.
 * @param status - The new status of the subscription.
 * @param locale - The locale of the user to change the subscription status for.
 * @returns The updated plan.
 */
export const changeSubscriptionStatus = async (
  customerId: string,
  status: Plan['status'],
  locale: Locales = Locales.ENGLISH
) => {
  const organization = await getOrganizationByCustomerId(customerId);

  if (!organization) {
    throw new GenericError('ORGANIZATION_NOT_FOUND', {
      customerId,
    });
  }

  if (!organization.plan) {
    throw new GenericError('ORGANIZATION_PLAN_NOT_FOUND', {
      customerId,
    });
  }

  const editedOrganization = await updatePlan(organization, {
    status,
  });

  if (!editedOrganization) {
    throw new GenericError('ORGANIZATION_UPDATE_FAILED', {
      organizationId: organization._id,
    });
  }

  const user = await getUserById(organization.plan.creatorId!);

  logger.info(
    `Updated plan for organization ${organization._id} - ${organization.plan.type} - ${organization.plan.period} - ${status}`
  );

  if (status === 'ACTIVE') {
    await sendEmail({
      type: 'subscriptionPaymentSuccess',
      to: user!.email,
      username: user!.name,
      email: user!.email,
      planName: organization.plan.type,
      subscriptionStartDate: new Date().toLocaleDateString(),
      manageSubscriptionLink: `${process.env.CLIENT_URL}/dashboard`!,
      locale,
    });
  } else if (status === 'CANCELLED') {
    await sendEmail({
      type: 'subscriptionPaymentCancellation',
      to: user!.email,
      username: user!.name,
      email: user!.email,
      planName: organization.plan.type,
      cancellationDate: new Date().toLocaleDateString(),
      reactivateLink: `${process.env.CLIENT_URL}/dashboard`!,
      locale,
    });
  } else if (status === 'ERROR') {
    await sendEmail({
      type: 'subscriptionPaymentError',
      to: user!.email,
      username: user!.name,
      email: user!.email,
      planName: organization.plan.type,
      errorDate: new Date().toLocaleDateString(),
      retryPaymentLink: `${process.env.CLIENT_URL}/dashboard`!,
      locale,
    });
  }

  return editedOrganization.plan;
};
