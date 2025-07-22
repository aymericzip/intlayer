import type { SessionModelType, SessionSchema } from '@/types/session.types';
import { sessionSchema } from '@schemas/session.schema';
import { model } from 'mongoose';

export const SessionModel = model<SessionSchema, SessionModelType>(
  'session',
  sessionSchema
);
