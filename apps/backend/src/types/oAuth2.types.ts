import type { Token } from '@node-oauth/oauth2-server';
import type { Document, Model } from 'mongoose';
import type { OrganizationAPI } from './organization.types';
import type { ProjectAPI } from './project.types';
import type { UserAPI } from './user.types';

export type OAuth2Token = Token & {
  organization: OrganizationAPI;
  project: ProjectAPI;
  user: UserAPI;
};

export type OAuth2TokenSchema = OAuth2Token;
export type OAuth2TokenModelType = Model<OAuth2Token>;
export type OAuth2TokenDocument = Document<unknown, {}, OAuth2Token> &
  OAuth2Token;
