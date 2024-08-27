import type { ObjectId } from 'mongoose';
import type { User } from './user.types';

export type OrganizationData = {
  name: string;
  members: User['_id'][];
  creatorId: User['_id'];
};

export type Organization = OrganizationData & {
  _id: ObjectId;
  createdAt: number;
  updatedAt: number;
};
