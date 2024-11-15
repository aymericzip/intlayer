import { logger } from '@logger';
import { GenericError } from '@utils/errors';
import { retrievePlanInformation } from '@utils/plan';
import { ObjectId } from 'mongoose';
import {
  getOrganizationById,
  getOrganizationsByOwner,
} from './organization.service';
import { getPlan, createNewPlan, PlanSelector } from './plans.service';
import { getUserByEmail, createUser } from './user.service';
import { Organization } from '@/export';
import { Plan } from '@/types/plan.types';

export const addSubscription = async (
  priceId: string,
  customerId: string,
  email: string,
  organizationId?: string | ObjectId
): Promise<Plan | null> => {
  let user = await getUserByEmail(email);

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

  let organization: Organization | null = null;

  if (organizationId) {
    organization = await getOrganizationById(organizationId);
  }

  const organizations = await getOrganizationsByOwner(user._id);

  if (organizations && organizations.length === 1) {
    organization = organizations[0];
  }

  const planType = retrievePlanInformation(priceId!);

  if (!organization) {
    throw new GenericError('ORGANIZATION_NOT_FOUND', {
      organizationId,
    });
  }

  let plan = await getPlan({
    organizationId: organization._id,
  });

  if (plan) {
    plan.type = planType.type;
    plan.period = planType.period;
    plan.status = 'ACTIVE';
    await plan.save();

    logger.info(
      `Updated plan for organization ${organization._id} - ${planType.type} - ${planType.period}`
    );
  } else {
    plan = await createNewPlan({
      userId: user._id,
      organizationId: organization._id,
      priceId: priceId!,
      type: planType.type,
      period: planType.period,
      status: 'ACTIVE',
    });

    logger.info(
      `Created plan for organization ${organization._id} - ${planType.type} - ${planType.period}`
    );
  }

  return plan;
};

export const cancelSubscription = async (
  organizationId: string | ObjectId
): Promise<Plan | null> => {
  const plan = await getPlan({
    organizationId: organizationId as ObjectId,
  });

  if (!plan) {
    throw new GenericError('PLAN_NOT_FOUND', {
      organizationId,
    });
  }

  plan.status = 'CANCELLED';

  await plan.save();

  return plan;
};

export const cancelUserSubscription = async (
  planData: PlanSelector
): Promise<Plan | null> => {
  const plan = await getPlan(planData);

  if (!plan) {
    throw new GenericError('PLAN_NOT_FOUND', {
      planData,
    });
  }

  plan.status = 'CANCELLED';

  await plan.save();

  return plan;
};
