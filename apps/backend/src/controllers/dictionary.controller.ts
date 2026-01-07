import { isDeepStrictEqual } from 'node:util';
import * as eventListener from '@controllers/eventListener.controller';
import type {
  ContentNode,
  DictionaryId,
  Dictionary as LocalDictionary,
  LocalDictionaryId,
} from '@intlayer/types';
import { logger } from '@logger';
import * as dictionaryService from '@services/dictionary.service';
import * as projectService from '@services/project.service';
import * as webhooksService from '@services/webhook.service';
import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';
import { type AppError, ErrorHandler } from '@utils/errors';
import {
  type DictionaryFiltersParams,
  getDictionaryFiltersAndPagination,
} from '@utils/filtersAndPagination/getDictionaryFiltersAndPagination';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import { mapDictionaryToAPI } from '@utils/mapper/dictionary';
import { hasPermission } from '@utils/permissions';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import type {
  Dictionary,
  DictionaryAPI,
  DictionaryCreationData,
  DictionaryData,
  VersionedContent,
} from '@/types/dictionary.types';

export type GetDictionariesParams =
  FiltersAndPagination<DictionaryFiltersParams>;
export type GetDictionariesResult = PaginatedResponse<DictionaryAPI>;

const removeMetadata = <T extends Record<string, any>>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(removeMetadata) as unknown as T;
  }

  if (obj && typeof obj === 'object') {
    const clone: T = {} as T;
    for (const key in obj) {
      if (key !== 'metadata') {
        clone[key] = removeMetadata(obj[key]);
      }
    }
    return clone as T;
  }

  return obj as T;
};

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const getDictionaries = async (
  request: FastifyRequest<{ Querystring: GetDictionariesParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, roles } = request.locals || {};
  const { filters, sortOptions, pageSize, skip, page, getNumberOfPages } =
    getDictionaryFiltersAndPagination(request);

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  try {
    const dictionaries = await dictionaryService.findDictionaries(
      {
        ...filters,
        projectIds: project.id,
      },
      skip,
      pageSize,
      sortOptions
    );

    if (
      !hasPermission(
        roles || [],
        'dictionary:read'
      )({
        ...request.locals,
        targetDictionaries: dictionaries,
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    const totalItems = await dictionaryService.countDictionaries(filters);

    const dictionariesAPI = dictionaries.map((el) => mapDictionaryToAPI(el));

    const responseData = formatPaginatedResponse<DictionaryAPI>({
      data: dictionariesAPI,
      page,
      pageSize,
      totalPages: getNumberOfPages(totalItems),
      totalItems,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetDictionariesKeysResult = ResponseData<string[]>;

/**
 * Retrieves a list of dictionaries keys based on filters and pagination.
 */
export const getDictionariesKeys = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  const { project, roles } = _request.locals || {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  try {
    const dictionaries = await dictionaryService.findDictionaries({
      projectIds: project.id,
    });

    if (
      !hasPermission(
        roles || [],
        'dictionary:read'
      )({
        ..._request.locals,
        targetDictionaries: dictionaries,
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    const dictionariesKeys = dictionaries.map((dictionary) => dictionary.key);

    const responseData = formatResponse<string[]>({
      data: dictionariesKeys,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetDictionariesUpdateTimestampResult = ResponseData<
  Record<DictionaryId, { key: string; updatedAt: number }>
>;

/**
 * Retrieves a list of dictionaries keys based on filters and pagination.
 */
export const getDictionariesUpdateTimestamp = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  const { project, roles } = _request.locals || {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  try {
    const dictionaries = await dictionaryService.findDictionaries({
      projectIds: project.id,
    });

    if (
      !hasPermission(
        roles || [],
        'dictionary:read'
      )({
        ..._request.locals,
        targetDictionaries: dictionaries,
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    const dictionariesUpdateTimestamp: Record<
      string,
      { key: string; updatedAt: number }
    > = {};
    for (const dictionary of dictionaries) {
      dictionariesUpdateTimestamp[dictionary.id] = {
        key: dictionary.key,
        updatedAt: new Date(dictionary.updatedAt).getTime(),
      };
    }

    const responseData = formatResponse<
      Record<string, { key: string; updatedAt: number }>
    >({
      data: dictionariesUpdateTimestamp,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetDictionaryParams = { dictionaryKey: string };
export type GetDictionaryQuery = { version?: string };
export type GetDictionaryResult = ResponseData<DictionaryAPI>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const getDictionaryByKey = async (
  request: FastifyRequest<{
    Params: GetDictionaryParams;
    Querystring: GetDictionaryQuery;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { project, user, roles } = request.locals || {};
  const { dictionaryKey } = request.params;
  const version = request.query.version;

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  try {
    const dictionary = await dictionaryService.getDictionaryByKey(
      dictionaryKey,
      project.id
    );

    if (
      !hasPermission(
        roles || [],
        'dictionary:read'
      )({
        ...request.locals,
        targetDictionaries: [dictionary],
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    if (!dictionary.projectIds.map(String).includes(String(project.id))) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'DICTIONARY_PROJECT_MISMATCH'
      );
    }

    const apiResult = mapDictionaryToAPI(dictionary, version);

    const responseData = formatResponse<DictionaryAPI>({
      data: apiResult,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type AddDictionaryBody = { dictionary: DictionaryCreationData };
export type AddDictionaryResult = ResponseData<DictionaryAPI>;

/**
 * Adds a new dictionary to the database.
 */
export const addDictionary = async (
  request: FastifyRequest<{ Body: AddDictionaryBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { project, user, roles } = request.locals || {};
  const dictionaryData = request.body.dictionary;

  if (!dictionaryData) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'DICTIONARY_DATA_NOT_FOUND'
    );
  }

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!dictionaryData.projectIds?.includes(String(project.id))) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'DICTIONARY_PROJECT_MISMATCH'
    );
  }

  const dictionary: DictionaryData = {
    key: dictionaryData.key,
    title: dictionaryData.title,
    description: dictionaryData.description,
    content: new Map([
      [
        'v1',
        {
          // Remove metadata as markdown metadata are dynamic data inserted at build time
          content: removeMetadata(dictionaryData.content ?? {}) as ContentNode,
        },
      ],
    ]),
    creatorId: user.id,
    projectIds: dictionaryData.projectIds ?? [String(project.id)],
  };

  if (!hasPermission(roles || [], 'dictionary:write')(request.locals)) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const newDictionary = await dictionaryService.createDictionary(dictionary);

    const apiResult = mapDictionaryToAPI(newDictionary);

    const responseData = formatResponse<DictionaryAPI>({
      message: t({
        en: 'Dictionary created successfully',
        fr: 'Dictionnaire créé avec succès',
        es: 'Diccionario creado con éxito',
      }),
      description: t({
        en: 'Your dictionary has been created successfully',
        fr: 'Votre dictionnaire a été créé avec succès',
        es: 'Su diccionario ha sido creado con éxito',
      }),
      data: apiResult,
    });

    eventListener.sendDictionaryUpdate([
      {
        dictionary: mapDictionaryToAPI(newDictionary),
        status: 'ADDED',
      },
    ]);

    // Trigger CI builds if configured
    if (project) {
      try {
        const fullProject = await projectService.getProjectById(project.id);
        await webhooksService.triggerAll(fullProject);
      } catch (error) {
        // Log error but don't fail the dictionary creation
        logger.error(
          'Failed to trigger CI builds after dictionary creation',
          error
        );
      }
    }

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type PushDictionariesBody = {
  dictionaries: LocalDictionary[];
};
type PushDictionariesResultData = {
  newDictionaries: {
    key: string;
    localId: LocalDictionaryId;
    id: string | undefined;
  }[];
  updatedDictionaries: {
    key: string;
    localId: LocalDictionaryId;
    id: string | undefined;
  }[];
  error: {
    id: string | undefined;
    key: string;
    localId: LocalDictionaryId | undefined;
    message: string;
  }[];
};
export type PushDictionariesResult = ResponseData<PushDictionariesResultData>;

/**
 * Check each dictionaries, add the new ones and update the existing ones.
 */
export const pushDictionaries = async (
  request: FastifyRequest<{ Body: PushDictionariesBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { project, user, roles } = request.locals || {};

  // Normalize the input: handle both { dictionaries: [...] } and { dictionaries: { dictionaries: [...] } }
  // The latter can happen due to client-side double-wrapping issues
  let dictionaryData = request.body.dictionaries;
  if (
    dictionaryData &&
    !Array.isArray(dictionaryData) &&
    typeof dictionaryData === 'object' &&
    'dictionaries' in dictionaryData &&
    Array.isArray(
      (dictionaryData as unknown as PushDictionariesBody).dictionaries
    )
  ) {
    dictionaryData = (dictionaryData as unknown as PushDictionariesBody)
      .dictionaries;
  }

  if (
    typeof dictionaryData === 'object' &&
    Array.isArray(dictionaryData) &&
    dictionaryData.length === 0
  ) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'DICTIONARIES_NOT_PROVIDED'
    );
  } else if (!dictionaryData) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'DICTIONARY_DATA_NOT_FOUND'
    );
  }

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!hasPermission(roles || [], 'dictionary:write')(request.locals)) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const existingDictionaries = dictionaryData.filter(
      (dictionary) => dictionary.id !== undefined
    );
    const newDictionaries = dictionaryData.filter(
      (dictionary) => dictionary.id === undefined
    );

    const newDictionariesResult: PushDictionariesResultData['newDictionaries'] =
      [];
    const updatedDictionariesResult: PushDictionariesResultData['updatedDictionaries'] =
      [];
    const errorResult: PushDictionariesResultData['error'] = [];

    for (const dictionaryDataEl of newDictionaries) {
      const dictionary: DictionaryData = {
        title: dictionaryDataEl.title,
        description: dictionaryDataEl.description,
        projectIds: [String(project.id)],
        creatorId: user.id,
        content: new Map([
          // Remove metadata as markdown metadata are dynamic data inserted at build time

          [
            'v1',
            {
              content:
                removeMetadata(dictionaryDataEl.content) ?? ({} as ContentNode),
            },
          ],
        ]),
        key: dictionaryDataEl.key,
      };

      try {
        const newDictionary =
          await dictionaryService.createDictionary(dictionary);
        newDictionariesResult.push({
          key: newDictionary.key,
          localId: dictionaryDataEl.localId!,
          id: newDictionary.id,
        });
      } catch (error) {
        errorResult.push({
          id: dictionaryDataEl.id!,
          key: dictionaryDataEl.key,
          localId: dictionaryDataEl.localId!,
          message: (error as AppError).message,
        });
      }
    }

    for (const dictionaryDataEl of existingDictionaries) {
      const remoteDictionary = await dictionaryService.getDictionaryById(
        dictionaryDataEl.id!
      );

      // Remove metadata as markdown metadata are dynamic data inserted at build time
      const cleanedContent = removeMetadata(dictionaryDataEl.content);

      const versionList = [...(remoteDictionary.content.keys() ?? [])];
      const lastVersion = versionList[versionList.length - 1];

      const lastContent =
        (remoteDictionary.content.get(lastVersion)
          ?.content as DictionaryAPI['content']) ?? null;

      const isSameContent = isDeepStrictEqual(lastContent, cleanedContent);

      const newContent: VersionedContent = new Map(remoteDictionary.content);

      if (!isSameContent) {
        const newContentVersion =
          dictionaryService.incrementVersion(remoteDictionary);

        newContent.set(newContentVersion, {
          // Remove metadata as markdown metadata are dynamic data inserted at build time
          content: cleanedContent,
        });
      }

      const dictionary: DictionaryData = {
        ...ensureMongoDocumentToObject(remoteDictionary),
        ...dictionaryDataEl,
        content: newContent,
        projectIds: [String(project.id)],
        creatorId: user.id,
        key: remoteDictionary.key,
      };

      try {
        const updatedDictionary = await dictionaryService.updateDictionaryByKey(
          remoteDictionary.key,
          dictionary,
          project.id
        );
        updatedDictionariesResult.push({
          key: updatedDictionary.key,
          localId: dictionaryDataEl.localId!,
          id: updatedDictionary.id,
        });
      } catch (error) {
        errorResult.push({
          id: dictionaryDataEl.id!,
          key: dictionaryDataEl.key,
          localId: dictionaryDataEl.localId!,
          message: (error as AppError).message,
        });
      }
    }

    const result: PushDictionariesResultData = {
      newDictionaries: newDictionariesResult,
      updatedDictionaries: updatedDictionariesResult,
      error: errorResult,
    };

    const responseData = formatResponse<PushDictionariesResultData>({
      message: t({
        en: 'Dictionaries updated successfully',
        fr: 'Dictionnaires mis à jour avec succès',
        es: 'Diccionarios actualizados con éxito',
      }),
      description: t({
        en: 'Your dictionaries have been updated successfully',
        fr: 'Vos dictionnaires ont été mis à jour avec succès',
        es: 'Sus diccionarios han sido actualizados con éxito',
      }),
      data: result,
    });

    eventListener.sendDictionaryUpdate([
      ...newDictionariesResult.map(
        (dictionary) =>
          ({
            dictionary,
            status: 'ADDED',
          }) as eventListener.SendDictionaryUpdateArg
      ),
      ...updatedDictionariesResult.map(
        (dictionary) =>
          ({
            dictionary,
            status: 'UPDATED',
          }) as eventListener.SendDictionaryUpdateArg
      ),
    ]);

    // Trigger CI builds if configured (only if there were actual changes)
    if (
      project &&
      (newDictionariesResult.length > 0 || updatedDictionariesResult.length > 0)
    ) {
      try {
        const fullProject = await projectService.getProjectById(project.id);
        await webhooksService.triggerAll(fullProject);
      } catch (error) {
        // Log error but don't fail the dictionary push
        logger.error(
          'Failed to trigger CI builds after dictionary push',
          error
        );
      }
    }

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type UpdateDictionaryParam = { dictionaryId: string };
export type UpdateDictionaryBody = Partial<Dictionary>;
export type UpdateDictionaryResult = ResponseData<DictionaryAPI>;

/**
 * Updates an existing dictionary in the database.
 */
export const updateDictionary = async (
  request: FastifyRequest<{
    Params: UpdateDictionaryParam;
    Body: UpdateDictionaryBody;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { dictionaryId } = request.params;
  const { project, roles } = request.locals || {};
  const dictionaryData = request.body;

  if (!dictionaryData) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'DICTIONARY_DATA_NOT_FOUND'
    );
  }

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!dictionaryData.projectIds?.includes(String(project.id))) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'DICTIONARY_PROJECT_MISMATCH'
    );
  }

  if (typeof dictionaryId === 'undefined') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'DICTIONARY_ID_NOT_FOUND'
    );
  }

  if (!hasPermission(roles || [], 'dictionary:write')(request.locals)) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const updatedDictionary = await dictionaryService.updateDictionaryById(
      dictionaryId,
      dictionaryData
    );

    const apiResult = mapDictionaryToAPI(updatedDictionary);

    const responseData = formatResponse<DictionaryAPI>({
      message: t({
        en: 'Dictionary updated successfully',
        fr: 'Dictionnaire mis à jour avec succès',
        es: 'Diccionario actualizado con éxito',
      }),
      description: t({
        en: 'Your dictionary has been updated successfully',
        fr: 'Votre dictionnaire a été mis à jour avec succès',
        es: 'Su diccionario ha sido actualizado con éxito',
      }),
      data: apiResult,
    });

    eventListener.sendDictionaryUpdate([
      {
        dictionary: apiResult,
        status: 'UPDATED',
      },
    ]);

    // Trigger CI builds if configured
    if (project) {
      try {
        const fullProject = await projectService.getProjectById(project.id);
        await webhooksService.triggerAll(fullProject);
      } catch (error) {
        // Log error but don't fail the dictionary update
        logger.error(
          'Failed to trigger CI builds after dictionary update',
          error
        );
      }
    }

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type DeleteDictionaryParam = { dictionaryId: string };
export type DeleteDictionaryResult = ResponseData<DictionaryAPI>;

/**
 * Deletes a dictionary from the database by its ID.
 */
export const deleteDictionary = async (
  request: FastifyRequest<{ Params: DeleteDictionaryParam }>,
  reply: FastifyReply
): Promise<void> => {
  const { project, roles } = request.locals || {};
  const { dictionaryId } = request.params;

  if (!dictionaryId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'DICTIONARY_ID_NOT_FOUND'
    );
  }

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!hasPermission(roles || [], 'dictionary:admin')(request.locals)) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const dictionaryToDelete =
      await dictionaryService.getDictionaryById(dictionaryId);

    if (!dictionaryToDelete.projectIds.includes(project.id)) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'DICTIONARY_PROJECT_MISMATCH'
      );
    }

    const deletedDictionary =
      await dictionaryService.deleteDictionaryById(dictionaryId);

    if (!deletedDictionary) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'DICTIONARY_NOT_FOUND',
        {
          dictionaryId,
        }
      );
    }

    logger.info(`Dictionary deleted: ${String(deletedDictionary.id)}`);

    const apiResult = mapDictionaryToAPI(deletedDictionary);

    const responseData = formatResponse<DictionaryAPI>({
      message: t({
        en: 'Dictionary deleted successfully',
        fr: 'Dictionnaire supprimé avec succès',
        es: 'Diccionario eliminado con éxito',
      }),
      description: t({
        en: 'Your dictionary has been deleted successfully',
        fr: 'Votre dictionnaire a été supprimé avec succès',
        es: 'Su diccionario ha sido eliminado con éxito',
      }),
      data: apiResult,
    });

    eventListener.sendDictionaryUpdate([
      {
        dictionary: apiResult,
        status: 'DELETED',
      },
    ]);

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
