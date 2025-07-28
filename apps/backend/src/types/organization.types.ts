import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
import type { Plan } from './plan.types';
import type { User } from './user.types';

export type OrganizationCreationData = {
  name: Organization['name'];
};

export type OrganizationData = {
  name: string;
  membersIds: User['id'][];
  adminsIds: User['id'][];
};

export type Organization = OrganizationData & {
  id: Types.ObjectId;
  creatorId: User['id'];
  plan?: Plan;
  createdAt: number;
  updatedAt: number;
};

export type OrganizationAPI = ObjectIdToString<Organization>;

export type OrganizationSchema = RenameId<Organization>;
export type OrganizationModelType = Model<Organization>;
export type OrganizationDocument = Document<unknown, {}, Organization> &
  Organization;
