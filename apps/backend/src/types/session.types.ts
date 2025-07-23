import { RenameId } from '@utils/mongoDB/types';
import { Permission, Roles } from '@utils/permissions';
import type { Session as BetterAuthSession, OmitId } from 'better-auth';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
import { Organization, OrganizationAPI } from './organization.types';
import { Project, ProjectAPI } from './project.types';
import { User, UserAPI } from './user.types';

export type SessionData = OmitId<BetterAuthSession> & {
  id: Types.ObjectId;
  activeOrganizationId?: Organization['id'];
  activeProjectId?: Project['id'];
};

export type SessionDataApi = ObjectIdToString<SessionData>;

export type SessionContext = {
  session?: SessionDataApi | null;
  user?: User | UserAPI | null;
  organization?: Organization | OrganizationAPI | null;
  project?: Project | ProjectAPI | null;
  authType?: 'session' | 'oauth2' | null;
  permissions?: Permission[]; // Will check the intersection of the permissions
};

export type Session = {
  session: SessionDataApi;
  user: User;
  organization?: Organization | null;
  project?: Project | null;
  id: Types.ObjectId;
  permissions: Permission[];
  roles: Roles[];
  authType: 'session' | 'oauth2' | null;
};

export type SessionAPI = ObjectIdToString<Session>;

export type SessionSchema = RenameId<SessionData>;
export type SessionModelType = Model<Session>;
export type SessionDocument = Document<unknown, {}, Session> & Session;
