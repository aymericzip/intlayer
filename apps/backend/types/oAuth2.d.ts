import 'oauth2-server';
import { type Organization } from '../src/types/organization.types';
import { type Project } from '../src/types/project.types';
import { type User } from '../src/types/user.types';

declare module 'oauth2-server' {
  interface Token {
    organization: Organization;
    project: Project;
    user: User;
  }
}
