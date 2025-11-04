import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
import type { User, UserAPI } from './user.types';

export type AuditData = {
  url: string;
  summary: Record<string, unknown>;
  errors: Record<string, { message: string; details?: unknown }>;
  score: number;
  label: string;
  userId?: User['id'];
  projectId?: Types.ObjectId;
};

export type Audit = AuditData & {
  id: Types.ObjectId;
  createdAt: number;
  updatedAt: number;
};

export type AuditAPI = ObjectIdToString<Audit>;

export type AuditSchema = RenameId<Audit>;
export type AuditModelType = Model<Audit>;
export type AuditDocument = Document<unknown, {}, Audit> & Audit;
