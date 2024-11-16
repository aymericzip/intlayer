import { Document, ObjectId } from 'mongoose';
import { User } from './user.types';

export type PlanType = 'FREE' | 'PREMIUM' | 'ENTERPRISE';

export type PlanData = {
  type: PlanType;
  creatorId?: User['_id'];
  customerId?: string;
  priceId?: string;
  status?: 'INACTIVE' | 'ACTIVE' | 'ERROR' | 'CANCELLED';
  period?: 'MONTHLY' | 'YEARLY';
};

export type Plan = PlanData & {
  _id: ObjectId;
  createdAt: number;
  updatedAt: number;
};

export type PlanDocument = Document<unknown, {}, Plan> & Plan;
