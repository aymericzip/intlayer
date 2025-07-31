import type { Session, SessionAPI } from '@/types/session.types';
import type { OmitId } from 'better-auth';
import { mapOrganizationToAPI } from './organization';
import { mapProjectToAPI } from './project';
import { mapUserToAPI } from './user';

export const mapSessionToAPI = (
  session: OmitId<Session>
): OmitId<SessionAPI> => ({
  ...session,
  user: mapUserToAPI(session.user),
  organization: mapOrganizationToAPI(session.organization),
  project: mapProjectToAPI(session.project),
});
