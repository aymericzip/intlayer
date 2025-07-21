import { RenameId } from '@schemas/user.schema';
import type { Document, Schema } from 'mongoose';
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
  id: Schema.Types.ObjectId;
  createdAt: number;
  updatedAt: number;
};

export type PlanModel = RenameId<Plan>;
export type PlanDocument = Document<unknown, {}, PlanModel> & PlanModel;
