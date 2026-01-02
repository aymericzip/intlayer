import type { IntlayerConfig } from '@intlayer/types';
import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
import type { Token } from 'oauth2-server';
import type { Organization, OrganizationAPI } from './organization.types';
import type { User, UserAPI } from './user.types';

export type ProjectCreationData = {
  name: Project['name'];
};

type ProjectConfigInternationalization = Partial<
  Pick<IntlayerConfig['internationalization'], 'locales' | 'defaultLocale'>
>;

type ProjectConfigEditor = Partial<
  Pick<IntlayerConfig['editor'], 'applicationURL' | 'cmsURL'>
>;

type ProjectConfigAI = Partial<
  Pick<
    IntlayerConfig['ai'],
    'provider' | 'model' | 'apiKey' | 'applicationContext' | 'baseURL'
  >
> & { apiKeyConfigured?: boolean };

export type ProjectConfiguration = {
  internationalization?: ProjectConfigInternationalization;
  editor?: ProjectConfigEditor;
  ai?: ProjectConfigAI;
};

export type GitHubRepository = {
  owner: string;
  repository: string;
  branch: string;
  installationId?: number;
  url: string;
  configFilePath: string;
};

export type ProjectData = {
  organizationId: Organization['id'];
  name: string;
  membersIds: User['id'][];
  adminsIds: User['id'][];
  creatorId: User['id'];
  configuration?: ProjectConfiguration;
  github?: GitHubRepository;
};

export type AccessKeyData = {
  name: string;
  grants: string[];
  expiresAt?: Date;
};

export type OAuth2AccessData = AccessKeyData & {
  clientId: string;
  clientSecret: string;
  accessToken: string[];
  userId: User['id'];
};

export type OAuth2AccessContext = {
  accessToken: Token;
  user?: UserAPI;
  project?: ProjectAPI;
  organization?: OrganizationAPI;
  grants: Token['grants'];
};

export type OAuth2Access = OAuth2AccessData & {
  id: Types.ObjectId;
  createdAt: number;
  updatedAt: number;
};

export type OAuth2AccessAPI = ObjectIdToString<OAuth2Access>;

export type Project = ProjectData & {
  id: Types.ObjectId;
  createdAt: number;
  updatedAt: number;
  oAuth2Access: OAuth2Access[];
};

export type ProjectAPI = ObjectIdToString<Project>;

export type ProjectSchema = RenameId<Project>;
export type ProjectModelType = Model<Project>;
export type ProjectDocument = Document<unknown, {}, Project> & Project;
