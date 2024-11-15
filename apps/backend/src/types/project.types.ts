import type { Model, ObjectId, Document } from 'mongoose';
import type { Organization } from './organization.types';
import type { User } from './user.types';

export type ProjectCreationData = {
  name: Project['name'];
};

export type ProjectData = {
  organizationId: Organization['_id'];
  name: string;
  membersIds: User['_id'][];
  adminsIds: User['_id'][];
  creatorId: User['_id'];
};

export type Rights = {
  read: boolean;
  write: boolean;
  admin: boolean;
};

export type TokenRights = {
  dictionary: Rights;
  project: Rights;
  organization: Rights;
};

export type AccessKeyData = {
  name: string;
  rights: TokenRights;
  expiresAt?: Date;
};

export type OAuth2AccessData = AccessKeyData & {
  clientId: string;
  clientSecret: string;
  accessToken: string[];
  userId: User['_id'];
};

export type OAuth2Access = OAuth2AccessData & {
  _id: ObjectId;
  createdAt: number;
  updatedAt: number;
};

export type Project = ProjectData & {
  _id: ObjectId;
  createdAt: number;
  updatedAt: number;
  oAuth2Access: OAuth2Access[];
};

export type ProjectAPI = Omit<Project, 'adminsIds'> & {
  adminsIds?: User['_id'][];
};

export type ProjectDocument = Document<unknown, {}, Project> & Project;

export type ProjectModelType = Model<Project>;
