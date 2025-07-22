import type { IntlayerConfig } from '@intlayer/config';
import { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
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

export type AccessKeyData = {
  name: string;
  rights: string[];
  expiresAt?: Date;
};

export type OAuth2AccessData = AccessKeyData & {
  clientId: string;
  clientSecret: string;
  accessToken: string[];
  userId: User['id'];
};

export type OAuth2Access = OAuth2AccessData & {
  id: Types.ObjectId;
  createdAt: number;
  updatedAt: number;
};

export type Project = ProjectData & {
  id: Types.ObjectId;
  createdAt: number;
  updatedAt: number;
  oAuth2Access: OAuth2Access[];
};

export type ProjectAPI = ObjectIdToString<
  Omit<Project, 'adminsIds'> & {
    adminsIds?: User['id'][];
  }
>;

export type ProjectSchema = RenameId<Project>;
export type ProjectModelType = Model<Project>;
export type ProjectDocument = Document<unknown, {}, Project> & Project;
