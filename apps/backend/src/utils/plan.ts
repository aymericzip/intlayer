import { isSelfHosted } from '@utils/isSelfHosted';
import type { Plan } from '@/types/plan.types';

/**
 * Retrieves the plan type based on the price ID.
 * @param priceId - The price ID to retrieve the plan type from.
 * @returns The plan type and period.
 */
export const retrievePlanInformation = (
  priceId: string
): Pick<Plan, 'period' | 'type'> => {
  switch (priceId) {
    case process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID!:
      return { period: 'YEARLY', type: 'PREMIUM' };
    case process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID!:
      return { period: 'MONTHLY', type: 'PREMIUM' };
    case process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID!:
      return { period: 'YEARLY', type: 'ENTERPRISE' };
    case process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID!:
      return { period: 'MONTHLY', type: 'ENTERPRISE' };
    case process.env.STRIPE_ONE_TIME_PAYMENT_PRICE_ID!:
      return { period: 'LIFETIME', type: 'LIFETIME' };
    default:
      return { period: undefined, type: 'FREE' };
  }
};

export const isLifetimePriceId = (priceId: string): boolean =>
  Boolean(
    process.env.STRIPE_ONE_TIME_PAYMENT_PRICE_ID &&
    priceId === process.env.STRIPE_ONE_TIME_PAYMENT_PRICE_ID
  );

type PlanDetails = {
  numberOfOrganizationUsers?: number;
  numberOfProjects?: number;
  totalStorage?: number;
  SeoAI: boolean;
  contentAI: boolean;
  /** AI credits granted each calendar month (UTC) when using Intlayer's AI key. */
  monthlyAICredits: number;
};

const planDetails: Record<Plan['type'], PlanDetails> = {
  FREE: {
    numberOfOrganizationUsers: 2,
    numberOfProjects: 2,
    totalStorage: 100, // 100 MB
    SeoAI: false,
    contentAI: false,
    monthlyAICredits: 100,
  },
  PREMIUM: {
    numberOfOrganizationUsers: 20,
    numberOfProjects: 10,
    totalStorage: 500, // 500 MB
    SeoAI: false,
    contentAI: true,
    monthlyAICredits: 2_000,
  },
  ENTERPRISE: {
    numberOfOrganizationUsers: undefined,
    numberOfProjects: undefined,
    totalStorage: undefined,
    SeoAI: true,
    contentAI: true,
    monthlyAICredits: 10_000,
  },
  LIFETIME: {
    numberOfOrganizationUsers: undefined,
    numberOfProjects: undefined,
    totalStorage: undefined,
    SeoAI: true,
    contentAI: true,
    monthlyAICredits: 10_000,
  },
};

/**
 * Self-hosted deployments have no subscription: nothing is limited, and AI
 * runs on the projects' own AI configuration, never on credits.
 */
const selfHostedPlanDetails: PlanDetails = {
  numberOfOrganizationUsers: undefined,
  numberOfProjects: undefined,
  totalStorage: undefined,
  SeoAI: true,
  contentAI: true,
  monthlyAICredits: 0,
};

export const getPlanDetails = (
  plan?: Pick<Plan, 'status' | 'type'>
): PlanDetails => {
  if (isSelfHosted()) {
    return selfHostedPlanDetails;
  }

  if (plan?.status !== 'active') {
    return planDetails.FREE;
  }

  return planDetails[plan.type];
};
