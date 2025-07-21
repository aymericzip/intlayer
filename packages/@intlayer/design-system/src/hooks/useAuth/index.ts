import type { OrganizationAPI, ProjectAPI, UserAPI } from '@intlayer/backend';

export type Session = {
  user: UserAPI | null;
  organization: OrganizationAPI | null;
  project: ProjectAPI | null;
};

export * from './useAuth';
export * from './useOAuth2';
export * from './useSession';
