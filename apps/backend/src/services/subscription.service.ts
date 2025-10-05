import { logger } from '@logger';
import { GenericError } from '@utils/errors';
import { retrievePlanInformation } from '@utils/plan';
import Stripe from 'stripe';
import type { Organization } from '@/types/organization.types';
import type { Plan } from '@/types/plan.types';
import { sendEmail } from './email.service';
import { getOrganizationById, updatePlan } from './organization.service';
import { getUserById } from './user.service';

export const addOrUpdateSubscription = async (
  subscriptionId: string,
  priceId: string,
  customerId: string,
  userId: string,
  organization: Organization,
  status: Plan['status']
): Promise<Plan | null> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const user = await getUserById(userId);

  if (!user) {
    throw new GenericError('USER_NOT_FOUND', {
      userId,
    });
  }

  if (String(user.customerId) !== customerId) {
    (user.customerId as unknown as string) = customerId;
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
    creatorId: user.id,
    priceId,
    customerId,
    subscriptionId,
    type: planInfo.type,
    period: planInfo.period,
    status,
  });

  if (!updatedOrganization) {
    throw new GenericError('ORGANIZATION_UPDATE_FAILED', {
      organizationId: organization.id,
    });
  }

  logger.info(
    `Plan updated for organization ${organization.id} - ${planInfo.type} - ${planInfo.period}`
  );

  return updatedOrganization.plan ?? null;
};

export const cancelSubscription = async (
  subscriptionId: string | Organization['id'],
  organizationId: Organization['id'] | string
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
      organizationId: organization.id,
    });
  }

  const updatedOrganization = await updatePlan(organization, {
    status: 'canceled',
  });

  if (!updatedOrganization) {
    throw new GenericError('ORGANIZATION_UPDATE_FAILED', {
      organizationId: organization.id,
    });
  }

  logger.info(
    `Cancelled plan for organization ${updatedOrganization.id} - ${updatedOrganization.plan?.type} - ${updatedOrganization.plan?.period}`
  );

  return updatedOrganization.plan ?? null;
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
      organizationId: organization.id,
    });
  }

  const updatedOrganization = await updatePlan(organization, {
    status,
    subscriptionId,
  });

  if (!updatedOrganization) {
    throw new GenericError('ORGANIZATION_UPDATE_FAILED', {
      organizationId: organization.id,
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
    `Updated plan status for organization ${organization.id} - Status: ${status}`
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
        organizationName: organization.name,
        subscriptionStartDate: emailData.date,
        manageSubscriptionLink: emailData.link,
      });
      break;
    case 'canceled':
      await sendEmail({
        ...emailData,
        type: 'subscriptionPaymentCancellation',
        organizationName: organization.name,
        cancellationDate: emailData.date,
        reactivateLink: emailData.link,
      });
      break;
    case 'incomplete':
      await sendEmail({
        ...emailData,
        type: 'subscriptionPaymentError',
        organizationName: organization.name,
        errorDate: emailData.date,
        retryPaymentLink: emailData.link,
      });
      break;
    default:
      logger.warn(`Unhandled subscription status: ${status}`);
  }

  return updatedOrganization.plan ?? null;
};

export const getCouponId = async (
  promoCode: string
): Promise<string | null> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    // Retrieve the coupon details by name
    const coupons = await stripe.coupons.list();
    const matchingCoupon = coupons.data.find(
      (coupon) => coupon.name === promoCode
    );

    return matchingCoupon ? matchingCoupon.id : null;
  } catch (error) {
    console.error('Error retrieving coupon:', error);
    return null;
  }
};

export type PricingResult = Record<
  string,
  {
    originalTotal: number;
    discountApplied: number;
    discountType: 'amount' | 'percentage' | null;
    finalTotal: number;
    currency: string;
  }
>;

export const getPricing = async (
  priceIds: string[],
  promoCode?: string
): Promise<PricingResult> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    // 1. Fetch all price objects
    const pricePromises = priceIds.map((priceId) =>
      stripe.prices.retrieve(priceId)
    );
    const prices = await Promise.all(pricePromises);

    // Calculate the total amount before discount (to help with proportional distribution if needed)
    const totalAmount = prices.reduce(
      (sum, price) => sum + (price.unit_amount ?? 0),
      0
    );

    // 2. Retrieve the discount (if promo code is provided)
    let discountAmount = 0;
    let discountType: 'amount' | 'percentage' | null = null;

    if (promoCode) {
      const coupons = await stripe.coupons.list();
      const matchingCoupons = coupons.data.find(
        (coupon) => coupon.name === promoCode
      );
      if (matchingCoupons) {
        if (matchingCoupons.amount_off) {
          discountAmount = matchingCoupons.amount_off;
          discountType = 'amount';
        } else if (matchingCoupons.percent_off) {
          // For a percentage discount, we won't store discountAmount as a raw number
          // because each price line is discounted individually by the same percentage.
          discountAmount = matchingCoupons.percent_off;
          discountType = 'percentage';
        }
      }
    }

    // 3. Build the result for each priceId
    const results: PricingResult = {};

    for (const price of prices) {
      if (!price.id || !price.unit_amount) {
        continue; // Skip any invalid price
      }

      const originalTotal = price.unit_amount;
      let appliedDiscount = 0;
      let finalTotal = originalTotal;

      // Apply discount based on the discount type
      if (discountType === 'percentage' && discountAmount > 0) {
        // percentage-based discount
        appliedDiscount = (originalTotal * discountAmount) / 100;
        finalTotal = originalTotal - appliedDiscount;
      } else if (
        discountType === 'amount' &&
        totalAmount > 0 &&
        discountAmount > 0
      ) {
        // fixed amount discount - distribute proportionally
        const proportion = originalTotal / totalAmount;
        appliedDiscount = discountAmount * proportion;
        finalTotal = originalTotal - appliedDiscount;
      }

      // Prevent final total from going negative due to rounding
      finalTotal = Math.max(finalTotal, 0);

      results[price.id] = {
        originalTotal: originalTotal,
        discountApplied: appliedDiscount,
        discountType,
        finalTotal: finalTotal,
        currency: price.currency,
      };
    }

    return results;
  } catch (error) {
    console.error('Error calculating pricing per priceId:', error);
    throw new Error('Failed to calculate pricing breakdown.');
  }
};
