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

export type AccessKeyData = {
  name: string;
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

export type ProjectDocument = Document<Project> & Project;

export type ProjectModelType = Model<Project>;
