import { Document, ObjectId } from 'mongoose';
import { Organization } from './organization.types';
import { User } from './user.types';

export type PlanType = 'FREE' | 'PREMIUM' | 'ENTERPRISE';

export type PlanData = {
  type: PlanType;
  userId?: User['_id'];
  organizationId: Organization['_id'];
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
