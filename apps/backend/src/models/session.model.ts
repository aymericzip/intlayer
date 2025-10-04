import { sessionSchema } from '@schemas/session.schema';
import { model } from 'mongoose';
import type { SessionModelType, SessionSchema } from '@/types/session.types';

export const SessionModel = model<SessionSchema, SessionModelType>(
  'session',
  sessionSchema
);
