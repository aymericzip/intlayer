import type { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import { getDictionariesByTags } from '@services/dictionary.service';
import { getTagsByKeys } from '@services/tag.service';
import * as auditContentDeclarationUtil from '@utils/auditDictionary';
import * as auditTagUtil from '@utils/auditTag';
import { AppError, ErrorHandler } from '@utils/errors';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { NextFunction, Request } from 'express';
import { Locales } from 'intlayer';
import type { Dictionary } from '@/types/dictionary.types';
import type { Tag } from '@/types/tag.types';

export type AuditContentDeclarationBody = {
  openAiApiKey?: string;
  customPrompt?: string;
  locales: Locales[];
  defaultLocale: Locales;
  fileContent: string;
  filePath?: string;
  model?: string;
  tagsKeys?: string[];
};
export type AuditContentDeclarationResult =
  ResponseData<auditContentDeclarationUtil.AuditFileResultData>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const auditContentDeclaration = async (
  req: Request<AuditContentDeclarationBody>,
  res: ResponseWithInformation<AuditContentDeclarationResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, project } = res.locals;
  const {
    fileContent,
    filePath,
    openAiApiKey,
    customPrompt,
    model,
    locales,
    defaultLocale,
    tagsKeys,
  } = req.body;

  if (!openAiApiKey) {
    if (!user) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
      return;
    }
    if (!project) {
      ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
      return;
    }
  }

  try {
    let tags: Tag[] = [];

    if (project?.organizationId) {
      tags = await getTagsByKeys(tagsKeys, project.organizationId);
    }

    const auditResponse = await auditContentDeclarationUtil.auditDictionary({
      fileContent,
      filePath,
      model,
      openAiApiKey: openAiApiKey ?? process.env.OPENAI_API_KEY,
      customPrompt,
      locales,
      defaultLocale,
      tags,
    });

    if (!auditResponse) {
      ErrorHandler.handleGenericErrorResponse(res, 'AUDIT_FAILED');
      return;
    }

    const responseData =
      formatResponse<auditContentDeclarationUtil.AuditFileResultData>({
        data: auditResponse,
      });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type AuditTagBody = {
  openAiApiKey?: string;
  customPrompt?: string;
  filePath?: string;
  model?: string;
  tag: Tag;
};
export type AuditTagResult =
  ResponseData<auditContentDeclarationUtil.AuditFileResultData>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const auditTag = async (
  req: Request<undefined, undefined, AuditTagBody>,
  res: ResponseWithInformation<AuditTagResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, project } = res.locals;
  const { openAiApiKey, customPrompt, model, tag } = req.body;

  if (!openAiApiKey) {
    if (!user) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
      return;
    }
    if (!project) {
      ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
      return;
    }
  }

  try {
    let dictionaries: Dictionary[] = [];
    if (project?.organizationId) {
      dictionaries = await getDictionariesByTags([tag.key], project._id);
    }

    const auditResponse = await auditTagUtil.auditTag({
      model,
      openAiApiKey: openAiApiKey ?? process.env.OPENAI_API_KEY!,
      customPrompt,
      dictionaries,
      tag,
    });

    if (!auditResponse) {
      ErrorHandler.handleGenericErrorResponse(res, 'AUDIT_FAILED');
      return;
    }

    const responseData =
      formatResponse<auditContentDeclarationUtil.AuditFileResultData>({
        data: auditResponse,
      });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
