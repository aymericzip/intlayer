import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, Types } from 'mongoose';
import type { User } from './user.types';

export type PlanType = 'FREE' | 'PREMIUM' | 'ENTERPRISE';

export type PlanData = {
  type: PlanType;
  creatorId?: User['id'];
  subscriptionId?: string;
  customerId?: string;
  priceId?: string;
  status?:
    | 'active'
    | 'canceled'
    | 'past_due'
    | 'unpaid'
    | 'incomplete'
    | 'incomplete_expired'
    | 'paused'
    | 'trialing';
  period?: 'MONTHLY' | 'YEARLY';
};

export type Plan = PlanData & {
  id: Types.ObjectId;
  createdAt: number;
  updatedAt: number;
};

export type PlanSchema = RenameId<Plan>;
export type PlanModelType = Model<Plan>;
export type PlanDocument = Document<unknown, {}, Plan> & Plan;
