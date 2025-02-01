import type { Token } from 'oauth2-server';
import type { OrganizationAPI } from './organization.types';
import type { ProjectAPI, TokenRights } from './project.types';
import type { UserAPI } from './user.types';

export type OAuth2Token = Token & {
  organization: OrganizationAPI;
  project: ProjectAPI;
  user: UserAPI;
  rights: TokenRights;
};
