import type { Session } from '@/types/session.types';
import { sessionSchema } from '@schemas/session.schema';
import { RenameId } from '@schemas/user.schema';
import { Model, model } from 'mongoose';

export const SessionModel = model<RenameId<Session>, Model<Session>>(
  'session',
  sessionSchema
);
