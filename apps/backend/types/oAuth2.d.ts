import 'oauth2-server';
import type { OrganizationAPI } from '../src/types/organization.types';
import type { ProjectAPI } from '../src/types/project.types';
import type { UserAPI } from '../src/types/user.types';

declare module 'oauth2-server' {
  interface User extends UserAPI {}

  interface Token {
    organization: OrganizationAPI;
    project: ProjectAPI;
    user: User;
    grants: string[];
  }
}
