import type { Document, Schema } from 'mongoose';
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
  id: Schema.Types.ObjectId;
  creatorId: User['id'];
  plan?: Plan;
  createdAt: number;
  updatedAt: number;
};

export type OrganizationAPI = Omit<Organization, 'adminsIds'> & {
  adminsIds?: User['id'][];
};

export type OrganizationDocument = Document<unknown, {}, Organization> &
  Organization;
