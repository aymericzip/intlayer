import {
  type AIConfig,
  type AIOptions,
  type AuditFileResultData,
  auditDictionaryMetadata as auditDictionaryMetadataAI,
} from '@intlayer/ai';
import { logger } from '@logger';
import type { Tag } from '@/types/tag.types';

export type AuditOptions = {
  fileContent: string;
  tags: Tag[];
  aiConfig: AIConfig;
  applicationContext?: string;
};

export type { AuditFileResultData };

export const aiDefaultOptions: AIOptions = {
  // Keep default options
};

/**
 * Audits a content declaration file by constructing a prompt for AI models.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies.
 */
export const auditDictionaryMetadata = async (
  options: AuditOptions
): Promise<AuditFileResultData | undefined> => {
  const result = await auditDictionaryMetadataAI(options);

  if (result) {
    logger.info(`${result.tokenUsed} tokens used in the request`);
  }

  return result;
};
