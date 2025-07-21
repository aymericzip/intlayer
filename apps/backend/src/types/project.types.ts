import type { IntlayerConfig } from '@intlayer/config';
import type { Document, Model, Schema } from 'mongoose';
import type { Organization } from './organization.types';
import type { User } from './user.types';

export type ProjectCreationData = {
  name: Project['name'];
};

type ProjectConfigInternationalization = Pick<
  IntlayerConfig['internationalization'],
  'locales' | 'defaultLocale'
>;

type ProjectConfigEditor = Pick<
  IntlayerConfig['editor'],
  'applicationURL' | 'cmsURL'
>;

export type ProjectConfiguration = {
  internationalization: ProjectConfigInternationalization;
  editor: ProjectConfigEditor;
};

export type ProjectData = {
  organizationId: Organization['id'];
  name: string;
  membersIds: User['id'][];
  adminsIds: User['id'][];
  creatorId: User['id'];
  configuration?: ProjectConfiguration;
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
  userId: User['id'];
};

export type OAuth2Access = OAuth2AccessData & {
  id: Schema.Types.ObjectId;
  createdAt: number;
  updatedAt: number;
};

export type Project = ProjectData & {
  id: Schema.Types.ObjectId;
  createdAt: number;
  updatedAt: number;
  oAuth2Access: OAuth2Access[];
};

export type ProjectAPI = Omit<Project, 'adminsIds'> & {
  adminsIds?: User['id'][];
};

export type ProjectDocument = Document<unknown, {}, Project> & Project;

export type ProjectModelType = Model<Project>;
