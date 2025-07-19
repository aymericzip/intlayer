import type { Session } from '@/types/session.types';
import { sessionSchema } from '@schemas/session.schema';
import { model } from 'mongoose';

export const SessionModel = model<Session>('session', sessionSchema);
