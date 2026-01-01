import {
  type AIConfig,
  type AIOptions,
  type ChatCompletionRequestMessage,
  getAIConfig,
} from '@intlayer/ai';
import type { KeyPath, Locale } from '@intlayer/types';
import { getDictionariesByTags } from '@services/dictionary.service';
import * as tagService from '@services/tag.service';
import { getTagsByKeys } from '@services/tag.service';
import * as askDocQuestionUtil from '@utils/AI/askDocQuestion/askDocQuestion';
import * as auditContentDeclarationUtil from '@utils/AI/auditDictionary';
import * as auditContentDeclarationFieldUtil from '@utils/AI/auditDictionaryField';
import * as auditContentDeclarationMetadataUtil from '@utils/AI/auditDictionaryMetadata';
import * as auditTagUtil from '@utils/AI/auditTag';
import * as autocompleteUtil from '@utils/AI/autocomplete';
import * as customQueryUtil from '@utils/AI/customQuery';
import * as translateJSONUtil from '@utils/AI/translateJSON';
import { type AppError, ErrorHandler } from '@utils/errors';
import {
  type DiscussionFiltersParams,
  getDiscussionFiltersAndPagination,
} from '@utils/filtersAndPagination/getDiscussionFiltersAndPagination';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { DiscussionModel } from '@/models/discussion.model';
import type { Dictionary } from '@/types/dictionary.types';
import type { DiscussionAPI } from '@/types/discussion.types';
import type { Tag, TagAPI } from '@/types/tag.types';

type ReplaceAIConfigByOptions<T> = Omit<T, 'aiConfig'> & {
  aiOptions?: AIOptions;
};

export type CustomQueryBody =
  ReplaceAIConfigByOptions<customQueryUtil.CustomQueryOptions> & {
    tagsKeys?: string[];
    applicationContext?: string;
  };
export type CustomQueryResult =
  ResponseData<customQueryUtil.CustomQueryResultData>;

export const customQuery = async (
  request: FastifyRequest<{ Body: CustomQueryBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { aiOptions, tagsKeys, ...rest } = request.body;
  const { user } = request.locals || {};

  let aiConfig: AIConfig;
  try {
    aiConfig = await getAIConfig(
      {
        userOptions: aiOptions,
        defaultOptions: customQueryUtil.aiDefaultOptions,
        accessType: ['registered_user', 'apiKey'],
      },
      !!user
    );
  } catch (_error) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'AI_ACCESS_DENIED');
  }

  try {
    const auditResponse = await customQueryUtil.customQuery({
      ...rest,
      aiConfig,
      applicationContext: aiOptions?.applicationContext,
    });

    if (!auditResponse) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'QUERY_FAILED');
    }

    const responseData = formatResponse<customQueryUtil.CustomQueryResultData>({
      data: auditResponse,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type TranslateJSONBody = Omit<
  ReplaceAIConfigByOptions<translateJSONUtil.TranslateJSONOptions<JSON>>,
  'tags'
> & {
  tagsKeys?: string[];
};
export type TranslateJSONResult = ResponseData<
  translateJSONUtil.TranslateJSONResultData<JSON>
>;

export const translateJSON = async (
  request: FastifyRequest<{ Body: TranslateJSONBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { project, user } = request.locals || {};
  const { aiOptions, tagsKeys, ...rest } = request.body;

  let aiConfig: AIConfig;
  try {
    aiConfig = await getAIConfig(
      {
        userOptions: aiOptions,
        defaultOptions: translateJSONUtil.aiDefaultOptions,
        accessType: ['registered_user', 'apiKey'],
      },
      !!user
    );
  } catch (_error) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'AI_ACCESS_DENIED');
  }

  try {
    let tags: Tag[] = [];

    if (project?.organizationId && tagsKeys) {
      tags = await getTagsByKeys(tagsKeys, project.organizationId);
    }

    const auditResponse = await translateJSONUtil.translateJSON<any>({
      ...rest,
      aiConfig,
      applicationContext: aiOptions?.applicationContext,
      tags,
    });

    if (!auditResponse) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'AUDIT_FAILED');
    }

    const responseData = formatResponse<
      translateJSONUtil.TranslateJSONResultData<any>
    >({
      data: auditResponse,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type AuditContentDeclarationBody = {
  aiOptions?: AIOptions;
  locales: Locale[];
  defaultLocale: Locale;
  fileContent: string;
  filePath?: string;
  tagsKeys?: string[];
};
export type AuditContentDeclarationResult =
  ResponseData<auditContentDeclarationUtil.AuditFileResultData>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const auditContentDeclaration = async (
  request: FastifyRequest<{ Body: AuditContentDeclarationBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { project, user } = request.locals || {};
  const { fileContent, filePath, aiOptions, locales, defaultLocale, tagsKeys } =
    request.body;

  let aiConfig: AIConfig;
  try {
    aiConfig = await getAIConfig(
      {
        userOptions: aiOptions,
        defaultOptions: auditContentDeclarationUtil.aiDefaultOptions,
        accessType: ['registered_user', 'apiKey'],
      },
      !!user
    );
  } catch (_error) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'AI_ACCESS_DENIED');
  }

  try {
    let tags: Tag[] = [];

    if (project?.organizationId) {
      tags = await getTagsByKeys(tagsKeys ?? [], project.organizationId);
    }

    const auditResponse = await auditContentDeclarationUtil.auditDictionary({
      fileContent,
      filePath,
      aiConfig,
      applicationContext: aiOptions?.applicationContext,
      locales,
      defaultLocale,
      tags,
    });

    if (!auditResponse) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'AUDIT_FAILED');
    }

    const responseData =
      formatResponse<auditContentDeclarationUtil.AuditFileResultData>({
        data: auditResponse,
      });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type AuditContentDeclarationFieldBody = {
  aiOptions?: AIOptions;
  locales: Locale[];
  fileContent: string;
  filePath?: string;
  tagsKeys?: string[];
  keyPath: KeyPath[];
};
export type AuditContentDeclarationFieldResult =
  ResponseData<auditContentDeclarationFieldUtil.AuditDictionaryFieldResultData>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const auditContentDeclarationField = async (
  request: FastifyRequest<{ Body: AuditContentDeclarationFieldBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { project, user } = request.locals || {};
  const { fileContent, aiOptions, locales, tagsKeys, keyPath } = request.body;

  let aiConfig: AIConfig;
  try {
    aiConfig = await getAIConfig(
      {
        userOptions: aiOptions,
        defaultOptions: auditContentDeclarationFieldUtil.aiDefaultOptions,
        accessType: ['registered_user', 'apiKey'],
      },
      !!user
    );
  } catch (_error) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'AI_ACCESS_DENIED');
  }

  try {
    let tags: Tag[] = [];

    if (project?.organizationId) {
      tags = await getTagsByKeys(tagsKeys ?? [], project.organizationId);
    }

    const auditResponse =
      await auditContentDeclarationFieldUtil.auditDictionaryField({
        fileContent,
        aiConfig,
        applicationContext: aiOptions?.applicationContext,
        locales,
        tags,
        keyPath,
      });

    if (!auditResponse) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'AUDIT_FAILED');
    }

    const responseData =
      formatResponse<auditContentDeclarationFieldUtil.AuditDictionaryFieldResultData>(
        {
          data: auditResponse,
        }
      );

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type AuditContentDeclarationMetadataBody = {
  aiOptions?: AIOptions;
  fileContent: string;
};

export type AuditContentDeclarationMetadataResult =
  ResponseData<auditContentDeclarationMetadataUtil.AuditFileResultData>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const auditContentDeclarationMetadata = async (
  request: FastifyRequest<{ Body: AuditContentDeclarationMetadataBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { organization, user } = request.locals || {};
  const { fileContent, aiOptions } = request.body;

  let aiConfig: AIConfig;
  try {
    aiConfig = await getAIConfig(
      {
        userOptions: aiOptions,
        defaultOptions: auditContentDeclarationMetadataUtil.aiDefaultOptions,
        accessType: ['registered_user', 'apiKey'],
      },
      !!user
    );
  } catch (_error) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'AI_ACCESS_DENIED');
  }

  try {
    const tags: Tag[] = await tagService.findTags(
      {
        organizationId: organization?.id,
      },
      0,
      1000
    );

    const auditResponse =
      await auditContentDeclarationMetadataUtil.auditDictionaryMetadata({
        fileContent,
        aiConfig,
        applicationContext: aiOptions?.applicationContext,
        tags,
      });

    if (!auditResponse) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'AUDIT_FAILED');
    }

    const responseData =
      formatResponse<auditContentDeclarationMetadataUtil.AuditFileResultData>({
        data: auditResponse,
      });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type AuditTagBody = {
  aiOptions?: AIOptions;
  tag: TagAPI;
};
export type AuditTagResult = ResponseData<auditTagUtil.TranslateJSONResultData>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const auditTag = async (
  request: FastifyRequest<{ Body: AuditTagBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { project, user } = request.locals || {};
  const { aiOptions, tag } = request.body;

  let aiConfig: AIConfig;
  try {
    aiConfig = await getAIConfig(
      {
        userOptions: aiOptions,
        defaultOptions: auditTagUtil.aiDefaultOptions,
        accessType: ['registered_user', 'apiKey'],
      },
      !!user
    );
  } catch (_error) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'AI_ACCESS_DENIED');
  }

  try {
    let dictionaries: Dictionary[] = [];
    if (project?.organizationId) {
      dictionaries = await getDictionariesByTags([tag.key], project.id);
    }

    const auditResponse = await auditTagUtil.auditTag({
      aiConfig,
      dictionaries,
      tag,
      applicationContext: aiOptions?.applicationContext,
    });

    if (!auditResponse) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'AUDIT_FAILED');
    }

    const responseData = formatResponse<auditTagUtil.TranslateJSONResultData>({
      data: auditResponse,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type AskDocQuestionBody = {
  messages: ChatCompletionRequestMessage[];
  discussionId: string;
};
export type AskDocQuestionResult =
  ResponseData<askDocQuestionUtil.AskDocQuestionResult>;

export const askDocQuestion = async (
  request: FastifyRequest<{ Body: AskDocQuestionBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { messages = [], discussionId } = request.body;
  const { user, project, organization } = request.locals || {};

  let aiConfig: AIConfig;
  try {
    aiConfig = await getAIConfig(
      {
        userOptions: {},
        accessType: ['public'],
      },
      !!user
    );
  } catch (_error) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'AI_ACCESS_DENIED');
  }

  // 1. Prepare SSE headers and flush them NOW
  reply.raw.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  reply.raw.setHeader('Cache-Control', 'no-cache, no-transform');
  reply.raw.setHeader('Connection', 'keep-alive');
  reply.raw.setHeader('X-Accel-Buffering', 'no'); // disable nginx buffering
  reply.raw.flushHeaders?.();
  reply.raw.write(': connected\n\n'); // initial comment keeps some browsers happy

  // 2. Kick off the upstream stream WITHOUT awaiting it
  askDocQuestionUtil
    .askDocQuestion(messages, aiConfig, {
      onMessage: (chunk) => {
        reply.raw.write(`data: ${JSON.stringify({ chunk })}\n\n`);
      },
    })
    .then(async (fullResponse) => {
      const lastUserMessageContent = messages.findLast(
        (message) => message.role === 'user'
      )?.content;
      const lastUserMessageNbWords = lastUserMessageContent
        ? lastUserMessageContent.split(' ').length
        : 0;
      if (lastUserMessageNbWords > 2) {
        // If the last user message is less than 3 words, don't persist the discussion
        // Example: "Hello", "Hi", "Hey", "test", etc.

        // 3. Persist discussion while the client already has all chunks
        await DiscussionModel.findOneAndUpdate(
          { discussionId },
          {
            $set: {
              discussionId,
              userId: user?.id,
              projectId: project?.id,
              organizationId: organization?.id,
              messages: [
                ...messages.map((msg) => ({
                  role: msg.role,
                  content: msg.content,
                  timestamp: msg.timestamp,
                })),
                {
                  role: 'assistant',
                  content: fullResponse.response,
                  relatedFiles: fullResponse.relatedFiles,
                  timestamp: new Date(),
                },
              ],
            },
          },
          { upsert: true, new: true }
        );
      }

      // 4. Tell the client we're done and close the stream
      reply.raw.write(
        `data: ${JSON.stringify({ done: true, response: fullResponse })}\n\n`
      );
      reply.raw.end();
    })
    .catch((err) => {
      // propagate error as an SSE event so the client knows why it closed
      reply.raw.write(
        `event: error\ndata: ${JSON.stringify({ message: err.message })}\n\n`
      );
      reply.raw.end();
    });
};

export type AutocompleteBody = {
  text: string;
  aiOptions?: AIOptions;
  contextBefore?: string;
  currentLine?: string;
  contextAfter?: string;
};

export type AutocompleteResponse = ResponseData<{
  autocompletion: string;
}>;

export const autocomplete = async (
  request: FastifyRequest<{ Body: AutocompleteBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { user } = request.locals || {};

  try {
    const { text, aiOptions, contextBefore, currentLine, contextAfter } =
      request.body;

    let aiConfig: AIConfig;
    try {
      aiConfig = await getAIConfig(
        {
          userOptions: aiOptions,
          defaultOptions: autocompleteUtil.aiDefaultOptions,
          accessType: ['public'],
        },
        !!user
      );
    } catch (_error) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'AI_ACCESS_DENIED');
    }

    const response = (await autocompleteUtil.autocomplete({
      text,
      aiConfig,
      applicationContext: aiOptions?.applicationContext,
      contextBefore,
      currentLine,
      contextAfter,
    })) ?? {
      autocompletion: '',
      tokenUsed: 0,
    };

    const responseData =
      formatResponse<autocompleteUtil.AutocompleteFileResultData>({
        data: response,
      });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetDiscussionsParams =
  | ({
      page?: string | number;
      pageSize?: string | number;
      includeMessages?: 'true' | 'false';
    } & DiscussionFiltersParams)
  | undefined;

export type GetDiscussionsResult = PaginatedResponse<DiscussionAPI>;

/**
 * Retrieves a list of discussions with filters and pagination.
 * Only the owner or admins can access. By default, users only see their own.
 */
export const getDiscussions = async (
  request: FastifyRequest<{ Querystring: GetDiscussionsParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, roles } = request.locals || {};
  const { filters, sortOptions, pageSize, skip, page, getNumberOfPages } =
    getDiscussionFiltersAndPagination(request);
  const includeMessagesParam = (request.query as any)?.includeMessages as
    | 'true'
    | 'false'
    | undefined;
  const includeMessages = includeMessagesParam !== 'false';

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  try {
    const projection = includeMessages ? {} : { messages: 0 };
    const discussions = await DiscussionModel.find(filters, projection)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize)
      .lean();

    // Compute number of messages for each discussion
    const numberOfMessagesById: Record<string, number> = {};
    if (!includeMessages && discussions.length > 0) {
      const ids = discussions.map((d: any) => d._id);
      const counts = await DiscussionModel.aggregate([
        { $match: { _id: { $in: ids } } },
        {
          $project: {
            numberOfMessages: { $size: { $ifNull: ['$messages', []] } },
          },
        },
      ]);
      for (const c of counts as any[]) {
        numberOfMessagesById[String(c._id)] = c.numberOfMessages ?? 0;
      }
    }

    // Permission: allow admin, or the owner for all returned entries
    const allOwnedByUser = discussions.every(
      (d) => String(d.userId) === String(user.id)
    );
    const isAllowed = roles?.includes('admin') || allOwnedByUser;

    if (!isAllowed) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    const totalItems = await DiscussionModel.countDocuments(filters);

    const responseData = formatPaginatedResponse({
      data: discussions.map((d: any) => ({
        ...d,
        id: String(d._id ?? d.id),
        numberOfMessages: includeMessages
          ? Array.isArray(d.messages)
            ? d.messages.length
            : 0
          : (numberOfMessagesById[String(d._id ?? d.id)] ?? 0),
      })),
      page,
      pageSize,
      totalPages: getNumberOfPages(totalItems),
      totalItems,
    });

    return reply.send(responseData as any);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
