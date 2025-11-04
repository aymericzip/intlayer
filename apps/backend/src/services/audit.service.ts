import { AuditModel } from '@models/audit.model';
import { GenericError } from '@utils/errors';
import type { Types } from 'mongoose';
import type { Audit, AuditData, AuditDocument } from '@/types/audit.types';

/**
 * Creates a new audit in the database.
 * @param audit - The audit data to create.
 * @returns The created audit.
 */
export const createAudit = async (audit: AuditData): Promise<AuditDocument> => {
  return await AuditModel.create(audit);
};

/**
 * Finds an audit by its ID.
 * @param auditId - The ID of the audit to find.
 * @returns The audit matching the ID.
 */
export const getAuditById = async (
  auditId: string | Types.ObjectId
): Promise<AuditDocument> => {
  const audit = await AuditModel.findById(auditId);

  if (!audit) {
    throw new GenericError('AUDIT_NOT_DEFINED', { auditId });
  }

  return audit;
};

/**
 * Finds audits by user ID.
 * @param userId - The ID of the user.
 * @param limit - Number of documents to limit.
 * @param skip - Number of documents to skip.
 * @returns List of audits for the user.
 */
export const findAuditsByUserId = async (
  userId: string | Types.ObjectId,
  limit = 100,
  skip = 0
): Promise<AuditDocument[]> => {
  return await AuditModel.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

/**
 * Finds audits by project ID.
 * @param projectId - The ID of the project.
 * @param limit - Number of documents to limit.
 * @param skip - Number of documents to skip.
 * @returns List of audits for the project.
 */
export const findAuditsByProjectId = async (
  projectId: string | Types.ObjectId,
  limit = 100,
  skip = 0
): Promise<AuditDocument[]> => {
  return await AuditModel.find({ projectId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};
