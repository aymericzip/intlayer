import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
import type { Plan } from './plan.types';
import type { User } from './user.types';

/**
 * Note: SSO configuration is managed entirely by better-auth's SSO plugin.
 * The organization only stores a reference to whether SSO is enabled
 * and the domain for SSO provider lookup.
 * See: https://www.better-auth.com/docs/plugins/sso
 */

export type OrganizationCreationData = {
  name: Organization['name'];
};

export type OrganizationData = {
  name: string;
  membersIds: User['id'][];
  adminsIds: User['id'][];
  /** Whether SSO is configured for this organization (managed by better-auth) */
  ssoEnabled: boolean;
  /** Primary domain for this organization (used for SSO provider lookup) */
  domain: string;
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
