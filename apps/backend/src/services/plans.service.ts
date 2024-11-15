import { PlanModel } from '@models/plan.moddel';
import { ObjectId } from 'mongoose';
import { Plan, PlanData, PlanDocument } from '@/types/plan.types';

/**
 * Creates a new plan in the database.
 * @param plan - The plan data to create.
 * @returns The created plan.
 */
export const createNewPlan = async (
  plan: PlanData
): Promise<PlanDocument | null> => {
  const planData = {
    type: plan.type,
    userId: plan.userId,
    organizationId: plan.organizationId,
    priceId: plan.priceId,
    status: plan.status,
  };

  const planModel = await PlanModel.create(planData);

  return planModel;
};

/**
 * Updates an existing plan in the database by its ID.
 * @param planId - The ID of the plan to update.
 * @param plan - The updated plan data.
 * @returns The updated plan.
 */
export const updatePlan = async (
  planId: string | ObjectId,
  plan: Partial<Plan>
): Promise<PlanDocument | null> =>
  await PlanModel.findOneAndUpdate(
    { _id: planId },
    { $set: plan },
    { new: true }
  );

export type PlanSelector =
  | Pick<PlanDocument, 'organizationId' | 'userId'>
  | Pick<PlanDocument, 'organizationId'>
  | Pick<PlanDocument, '_id'>;

/**
 * Retrieves a plan by its ID.
 * @param planId - The ID of the plan to find.
 * @returns The plan matching the ID.
 */
export const getPlan = async (
  planData: PlanSelector
): Promise<PlanDocument | null> => await PlanModel.findOne(planData);

/**
 * Retrieves a plan by its ID.
 * @param planId - The ID of the plan to find.
 * @returns The plan matching the ID.
 */
export const attachPlanToOrganization = async (
  userId: string | ObjectId,
  organizationId: string | ObjectId
): Promise<PlanDocument | null> => {
  const planModel = await PlanModel.findOneAndUpdate(
    { userId },
    { $set: { organizationId } },
    { new: true }
  );

  return planModel;
};

/**
 * Cancels a plan by its organization ID.
 * @param organizationId - The ID of the organization to cancel the plan.
 * @returns The cancelled plan.
 */
export const cancelPlan = async (
  organizationId: string | ObjectId
): Promise<PlanDocument | null> => {
  const planModel = await PlanModel.findOneAndUpdate(
    { organizationId },
    {
      $set: { status: 'CANCELLED' },
    },
    { new: true }
  );

  return planModel;
};
