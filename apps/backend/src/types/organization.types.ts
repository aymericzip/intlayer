import type { ObjectId, Document } from 'mongoose';
import type { User } from './user.types';

export type OrganizationCreationData = {
  name: Organization['name'];
};

export type OrganizationData = {
  name: string;
  membersIds: User['_id'][];
  adminsIds: User['_id'][];
};

export type Organization = OrganizationData & {
  _id: ObjectId;
  creatorId: User['_id'];
  createdAt: number;
  updatedAt: number;
};

export type OrganizationAPI = Omit<Organization, 'adminsIds'> & {
  adminsIds?: User['_id'][];
};

export type OrganizationDocument = Document<unknown, {}, Organization> &
  Organization;
