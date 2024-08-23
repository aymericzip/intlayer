import type { Model, ObjectId } from 'mongoose';
import type { User } from './user.type';

export type Organization = Document & {
  _id: ObjectId;
  name: string;
  description: string;
  creatorId: User['_id'];
  createdAt: number;
};

export type OrganizationModel = Model<Organization>;
