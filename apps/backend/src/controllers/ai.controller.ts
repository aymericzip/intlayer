import { type KeyPath } from '@intlayer/core';
import type { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import { getDictionariesByTags } from '@services/dictionary.service';
import { getTagsByKeys } from '@services/tag.service';
import * as tagService from '@services/tag.service';
import * as askDocQuestionUtil from '@utils/AI/askDocQuestion/askDocQuestion';
import * as auditContentDeclarationUtil from '@utils/AI/auditDictionary';
import * as auditContentDeclarationFieldUtil from '@utils/AI/auditDictionaryField';
import * as auditContentDeclarationMetadataUtil from '@utils/AI/auditDictionaryMetadata';
import * as autocompleteUtil from '@utils/AI/autocomplete';
import * as auditTagUtil from '@utils/auditTag';
import { type AppError, ErrorHandler } from '@utils/errors';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { NextFunction, Request } from 'express';
import type { Locales } from 'intlayer';
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

export type AuditContentDeclarationFieldBody = {
  openAiApiKey?: string;
  customPrompt?: string;
  locales: Locales[];
  fileContent: string;
  filePath?: string;
  model?: string;
  tagsKeys?: string[];
  keyPath: KeyPath[];
};
export type AuditContentDeclarationFieldResult =
  ResponseData<auditContentDeclarationUtil.AuditFileResultData>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const auditContentDeclarationField = async (
  req: Request<AuditContentDeclarationFieldBody>,
  res: ResponseWithInformation<AuditContentDeclarationFieldResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, project } = res.locals;
  const {
    fileContent,
    openAiApiKey,
    customPrompt,
    model,
    locales,
    tagsKeys,
    keyPath,
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

    const auditResponse =
      await auditContentDeclarationFieldUtil.auditDictionaryField({
        fileContent,
        model,
        openAiApiKey: openAiApiKey ?? process.env.OPENAI_API_KEY,
        customPrompt,
        locales,
        tags,
        keyPath,
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

export type AuditContentDeclarationMetadataBody = {
  openAiApiKey?: string;
  customPrompt?: string;
  fileContent: string;
  model?: string;
};
export type AuditContentDeclarationMetadataResult =
  ResponseData<auditContentDeclarationUtil.AuditFileResultData>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const auditContentDeclarationMetadata = async (
  req: Request<AuditContentDeclarationMetadataBody>,
  res: ResponseWithInformation<AuditContentDeclarationMetadataResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, organization, project } = res.locals;
  const { fileContent, openAiApiKey, customPrompt, model } = req.body;

  if (!openAiApiKey) {
    if (!user) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
      return;
    }
    if (!organization) {
      ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
      return;
    }
    if (!project) {
      ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
      return;
    }
  }

  try {
    const tags: Tag[] = await tagService.findTags(
      {
        organizationId: organization?._id,
      },
      0,
      1000
    );

    const auditResponse =
      await auditContentDeclarationMetadataUtil.auditDictionaryMetadata({
        fileContent,
        model,
        openAiApiKey: openAiApiKey ?? process.env.OPENAI_API_KEY,
        customPrompt,
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

export type AskDocQuestionBody = {
  messages: askDocQuestionUtil.ChatCompletionRequestMessage[];
};
export type AskDocQuestionResult =
  ResponseData<askDocQuestionUtil.AskDocQuestionResult>;

export const askDocQuestion = async (
  req: Request<undefined, undefined, AskDocQuestionBody>,
  res: ResponseWithInformation<AskDocQuestionResult>
) => {
  const { messages } = req.body;
  try {
    const response = await askDocQuestionUtil.askDocQuestion(messages);

    const responseData =
      formatResponse<askDocQuestionUtil.AskDocQuestionResult>({
        data: response,
      });

    res.json(responseData);
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type AutocompleteBody = {
  text: string;
  model?: string;
  openAiApiKey: string;
  customPrompt?: string;
};

export type AutocompleteResponse = ResponseData<{
  autocompletion: string;
}>;

export const autocomplete = async (
  req: Request<undefined, undefined, AutocompleteBody>,
  res: ResponseWithInformation<AutocompleteResponse>
) => {
  try {
    const { text, model, openAiApiKey, customPrompt } =
      req.body as AutocompleteBody;
    const response = (await autocompleteUtil.autocomplete({
      text,
      model,
      openAiApiKey,
      customPrompt,
    })) ?? {
      autocompletion: '',
      tokenUsed: 0,
    };

    const responseData =
      formatResponse<autocompleteUtil.AutocompleteFileResultData>({
        data: response,
      });

    res.json(responseData);
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
