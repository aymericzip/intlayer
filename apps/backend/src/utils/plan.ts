import { Plan } from '@/types/plan.types';

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
    case process.env.STRIPE_PREMIUM_ENTERPRISE_YEARLY_PRICE_ID!:
      return { period: 'YEARLY', type: 'ENTERPRISE' };
    case process.env.STRIPE_PREMIUM_ENTERPRISE_MONTHLY_PRICE_ID!:
      return { period: 'MONTHLY', type: 'ENTERPRISE' };
    default:
      return { period: undefined, type: 'FREE' };
  }
};

type PlanDetails = {
  numberOfOrganizationUsers?: number;
  numberOfProjects?: number;
  totalStorage?: number;
  SeoAI: boolean;
  contentAI: boolean;
};

const planDetails: Record<Plan['type'], PlanDetails> = {
  ['FREE']: {
    numberOfOrganizationUsers: 1,
    numberOfProjects: 1,
    totalStorage: 100, // 100 MB
    SeoAI: false,
    contentAI: false,
  },
  ['PREMIUM']: {
    numberOfOrganizationUsers: 20,
    numberOfProjects: 10,
    totalStorage: 500, // 500 MB
    SeoAI: false,
    contentAI: true,
  },
  ['ENTERPRISE']: {
    numberOfOrganizationUsers: undefined,
    numberOfProjects: undefined,
    totalStorage: undefined,
    SeoAI: true,
    contentAI: true,
  },
};

export const getPLanDetails = (planType: Plan['type']): PlanDetails =>
  planDetails[planType];
