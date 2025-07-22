import { RenameId } from '@utils/mongoDB/types';
import type { Session as BetterAuthSession, OmitId } from 'better-auth';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
import { Organization, OrganizationAPI } from './organization.types';
import { Project, ProjectAPI } from './project.types';
import { UserAPI } from './user.types';

export type SessionData = OmitId<BetterAuthSession> & {
  id: Types.ObjectId;
  activeOrganizationId?: Organization['id'];
  activeProjectId?: Project['id'];
};

export type SessionAPI = ObjectIdToString<SessionData>;

export type Session = {
  id: Types.ObjectId;
  session: SessionAPI;
  user?: UserAPI | null;
  organization?: OrganizationAPI | null;
  project?: ProjectAPI | null;
};

export type SessionSchema = RenameId<SessionData>;
export type SessionModelType = Model<Session>;
export type SessionDocument = Document<unknown, {}, Session> & Session;
