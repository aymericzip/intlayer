import type { Session, SessionAPI } from '@/types/session.types';
import { mapOrganizationToAPI } from './organization';
import { mapProjectToAPI } from './project';
import { mapUserToAPI } from './user';

export const mapSessionToAPI = (session: Session): SessionAPI => ({
  ...(session as any),
  id: session.id ? String(session.id) : undefined,
  user: mapUserToAPI(session.user),
  organization: mapOrganizationToAPI(session.organization),
  project: mapProjectToAPI(session.project),
  environment: session.environment ?? null,
});
