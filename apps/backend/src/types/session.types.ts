import type { Locale } from '@intlayer/types/allLocales';
import type { OmitId, RenameId } from '@utils/mongoDB/types';
import type { Permission, Roles } from '@utils/permissions';
import type { Session as BetterAuthSession } from 'better-auth';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
import type { Organization, OrganizationAPI } from './organization.types';
import type {
  Environment,
  EnvironmentAPI,
  Project,
  ProjectAPI,
} from './project.types';
import type { User, UserAPI } from './user.types';

export type SessionData = OmitId<BetterAuthSession> & {
  id: Types.ObjectId;
  activeOrganizationId?: Organization['id'];
  activeProjectId?: Project['id'];
  activeEnvironmentId?: Environment['id'];
  locale?: Locale;
};

export type SessionDataApi = ObjectIdToString<SessionData>;

export type SessionContext = {
  session?: SessionDataApi | null;
  user?: User | UserAPI | null;
  organization?: Organization | OrganizationAPI | null;
  project?: Project | ProjectAPI | null;
  environment?: EnvironmentAPI | null;
  authType?: 'session' | 'oauth2' | null;
  permissions?: Permission[]; // Will check the intersection of the permissions
  /** null = unrestricted; [] = no env access; array = restricted to listed envs (null item = production). */
  allowedEnvironmentIds?: (string | null)[] | null;
  /** null = unrestricted; [] = no locale access; array = restricted to listed locales. */
  allowedLocales?: Locale[] | null;
};

export type Session = {
  session: SessionDataApi;
  user: User;
  organization?: Organization | null;
  project?: Project | null;
  environment?: EnvironmentAPI | null;
  id?: Types.ObjectId;
  permissions: Permission[];
  roles: Roles[];
  authType: 'session' | 'oauth2' | null;
  locale?: Locale;
  allowedEnvironmentIds?: (string | null)[] | null;
  allowedLocales?: Locale[] | null;
};

export type SessionAPI = ObjectIdToString<Session>;

export type SessionSchema = RenameId<SessionData>;
export type SessionModelType = Model<Session>;
export type SessionDocument = Document<unknown, {}, Session> & Session;
