import { auditSchema } from '@schemas/audit.schema';
import { model } from 'mongoose';
import type { AuditModelType, AuditSchema } from '@/types/audit.types';

export const AuditModel = model<AuditSchema, AuditModelType>(
  'audit',
  auditSchema
);
