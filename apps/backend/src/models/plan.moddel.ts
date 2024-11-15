import { planSchema } from '@schemas/plans.schema';
import { model } from 'mongoose';
import { Plan } from '@/types/plan.types';

export const PlanModel = model<Plan>('plan', planSchema);
