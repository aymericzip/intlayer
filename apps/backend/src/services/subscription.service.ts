import { logger } from '@logger';
import { GenericError } from '@utils/errors';
import { retrievePlanInformation } from '@utils/plan';
import Stripe from 'stripe';
import { sendEmail } from './email.service';
import { getOrganizationById, updatePlan } from './organization.service';
import { getUserById } from './user.service';
import type { Organization } from '@/types/organization.types';
import type { Plan } from '@/types/plan.types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const addOrUpdateSubscription = async (
  subscriptionId: string,
  priceId: string,
  customerId: string,
  userId: string,
  organization: Organization,
  status: Plan['status']
): Promise<Plan | null> => {
  const user = await getUserById(userId);

  if (!user) {
    throw new GenericError('USER_NOT_FOUND', {
      userId,
    });
  }

  if (user.customerId !== customerId) {
    user.customerId = customerId;
    await user.save();
  }

  const planInfo = retrievePlanInformation(priceId);

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
    limit: 1,
  });

  if (subscriptions.data.length >= 1) {
    // Active subscription exists; update it to the new plan
    const otherSubscriptionArray = subscriptions.data.filter(
      (subscription) => subscription.id !== subscriptionId
    );

    for (const subscription of otherSubscriptionArray) {
      await stripe.subscriptions.cancel(subscription.id);
    }
  }

  const updatedOrganization = await updatePlan(organization, {
    creatorId: user._id,
    priceId,
    customerId,
    subscriptionId,
    type: planInfo.type,
    period: planInfo.period,
    status,
  });

  if (!updatedOrganization) {
    throw new GenericError('ORGANIZATION_UPDATE_FAILED', {
      organizationId: organization._id,
    });
  }

  logger.info(
    `Plan updated for organization ${organization._id} - ${planInfo.type} - ${planInfo.period}`
  );

  return updatedOrganization.plan;
};

export const cancelSubscription = async (
  subscriptionId: string | Organization['_id'],
  organizationId: Organization['_id'] | string
): Promise<Plan | null> => {
  const organization = await getOrganizationById(organizationId);

  if (!organization) {
    throw new GenericError('ORGANIZATION_NOT_FOUND', {
      subscriptionId,
    });
  }

  if (!subscriptionId) {
    throw new GenericError('NO_SUBSCRIPTION_ID_PROVIDED');
  }

  if (!organization.plan) {
    throw new GenericError('ORGANIZATION_PLAN_NOT_FOUND', {
      subscriptionId,
      organizationId: organization._id,
    });
  }

  const updatedOrganization = await updatePlan(organization, {
    status: 'canceled',
  });

  if (!updatedOrganization) {
    throw new GenericError('ORGANIZATION_UPDATE_FAILED', {
      organizationId: organization._id,
    });
  }

  logger.info(
    `Cancelled plan for organization ${updatedOrganization._id} - ${updatedOrganization.plan.type} - ${updatedOrganization.plan.period}`
  );

  return updatedOrganization.plan;
};

export const changeSubscriptionStatus = async (
  subscriptionId: string,
  status: Plan['status'],
  userId: string,
  organizationId: string
): Promise<Plan | null> => {
  const organization = await getOrganizationById(organizationId);

  if (!organization) {
    throw new GenericError('ORGANIZATION_NOT_FOUND', {
      userId,
      subscriptionId,
    });
  }

  if (!organization.plan) {
    throw new GenericError('ORGANIZATION_PLAN_NOT_FOUND', {
      userId,
      subscriptionId,
      organizationId: organization._id,
    });
  }

  const updatedOrganization = await updatePlan(organization, {
    status,
    subscriptionId,
  });

  if (!updatedOrganization) {
    throw new GenericError('ORGANIZATION_UPDATE_FAILED', {
      organizationId: organization._id,
    });
  }

  const user = await getUserById(userId);

  if (!user) {
    throw new GenericError('USER_NOT_FOUND', {
      userId,
      subscriptionId,
    });
  }

  logger.info(
    `Updated plan status for organization ${organization._id} - Status: ${status}`
  );

  const emailData = {
    to: user.email,
    username: user.name,
    email: user.email,
    planName: organization.plan.type,
    date: new Date().toLocaleDateString(),
    link: `${process.env.CLIENT_URL}/dashboard`,
  };

  switch (status) {
    case 'active':
      await sendEmail({
        ...emailData,
        type: 'subscriptionPaymentSuccess',
        subscriptionStartDate: emailData.date,
        manageSubscriptionLink: emailData.link,
      });
      break;
    case 'canceled':
      await sendEmail({
        ...emailData,
        type: 'subscriptionPaymentCancellation',
        cancellationDate: emailData.date,
        reactivateLink: emailData.link,
      });
      break;
    case 'incomplete':
      await sendEmail({
        ...emailData,
        type: 'subscriptionPaymentError',
        errorDate: emailData.date,
        retryPaymentLink: emailData.link,
      });
      break;
    default:
      logger.warn(`Unhandled subscription status: ${status}`);
  }

  return updatedOrganization.plan;
};
