import { logger } from '@logger';
import { OrganizationModel } from '@models/organization.model';
import { GenericError } from '@utils/errors';
import { retrievePlanInformation } from '@utils/plan';
import { ObjectId } from 'mongoose';
import { getOrganizationById } from './organization.service';
import { getUserByEmail, createUser } from './user.service';
import { Plan } from '@/types/plan.types';

export const addSubscription = async (
  organizationId: string | ObjectId,
  priceId: string,
  customerId: string,
  email: string
): Promise<Plan | null> => {
  let user = await getUserByEmail(email);
  let organization = await getOrganizationById(organizationId!);

  if (!user) {
    user = await createUser({
      email,
    });
  }

  if (!organization) {
    throw new GenericError('ORGANIZATION_NOT_FOUND', {
      organizationId,
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

  if (!organization) {
    throw new GenericError('ORGANIZATION_NOT_FOUND', {
      organizationId,
    });
  }

  if (organization.plan) {
    organization.plan = {
      ...organization.plan,
      type: planType.type,
      period: planType.period,
      status: 'ACTIVE',
    };

    await organization.save();

    logger.info(
      `Updated plan for organization ${organization._id} - ${planType.type} - ${planType.period}`
    );
  } else {
    const editOrganizationResult = await OrganizationModel.updateOne(
      { _id: organizationId },
      {
        $set: {
          plan: {
            creatorId: user._id,
            priceId: priceId!,
            type: planType.type,
            period: planType.period,
            status: 'ACTIVE',
          },
        },
      }
    );

    if (editOrganizationResult.matchedCount === 0) {
      throw new GenericError('ORGANIZATION_UPDATE_FAILED', {
        organizationId,
      });
    }

    organization = await getOrganizationById(organizationId);

    logger.info(
      `Created plan for organization ${organization._id} - ${planType.type} - ${planType.period}`
    );
  }

  return organization.plan;
};

export const cancelSubscription = async (
  organizationId: string | ObjectId
): Promise<Plan | null> => {
  const organization = await getOrganizationById(organizationId as ObjectId);

  if (!organization.plan) {
    throw new GenericError('PLAN_NOT_FOUND', {
      organizationId,
    });
  }

  organization.plan.status = 'CANCELLED';

  await organization.save();

  return organization.plan;
};
