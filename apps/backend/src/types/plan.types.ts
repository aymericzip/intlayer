import { Document, ObjectId } from 'mongoose';
import { User } from './user.types';

export type PlanType = 'FREE' | 'PREMIUM' | 'ENTERPRISE';

export type PlanData = {
  type: PlanType;
  creatorId?: User['_id'];
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
  _id: ObjectId;
  createdAt: number;
  updatedAt: number;
};

export type PlanDocument = Document<unknown, {}, Plan> & Plan;
