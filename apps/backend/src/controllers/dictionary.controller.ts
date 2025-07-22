import type {
  Dictionary,
  DictionaryAPI,
  DictionaryCreationData,
  DictionaryData,
  VersionedContent,
} from '@/types/dictionary.types';
import * as eventListener from '@controllers/eventListener.controller';
import type {
  ContentNode,
  Dictionary as LocalDictionary,
} from '@intlayer/core';
import { logger } from '@logger';
import * as dictionaryService from '@services/dictionary.service';
import type { ResponseWithInformation } from '@utils/auth/getAuth';
import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';
import { type AppError, ErrorHandler } from '@utils/errors';
import {
  type DictionaryFiltersParams,
  getDictionaryFiltersAndPagination,
} from '@utils/filtersAndPagination/getDictionaryFiltersAndPagination';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import { mapDictionaryToAPI } from '@utils/mapper/dictionary';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { NextFunction, Request } from 'express';
import { t } from 'express-intlayer';

export type GetDictionariesParams =
  FiltersAndPagination<DictionaryFiltersParams>;
export type GetDictionariesResult = PaginatedResponse<DictionaryAPI>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const getDictionaries = async (
  req: Request<GetDictionariesParams>,
  res: ResponseWithInformation<GetDictionariesResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, project } = res.locals;
  const { filters, pageSize, skip, page, getNumberOfPages } =
    getDictionaryFiltersAndPagination(req);

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
    return;
  }
  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  try {
    const dictionaries = await dictionaryService.findDictionaries(
      {
        ...filters,
        projectIds: project.id,
      },
      skip,
      pageSize
    );
    const totalItems = await dictionaryService.countDictionaries(filters);

    const dictionariesAPI = dictionaries.map((el) =>
      mapDictionaryToAPI(el, project.id)
    );

    const responseData = formatPaginatedResponse<DictionaryAPI>({
      data: dictionariesAPI,
      page,
      pageSize,
      totalPages: getNumberOfPages(totalItems),
      totalItems,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type GetDictionariesKeysResult = ResponseData<string[]>;

/**
 * Retrieves a list of dictionaries keys based on filters and pagination.
 */
export const getDictionariesKeys = async (
  _req: Request,
  res: ResponseWithInformation<GetDictionariesKeysResult>,
  _next: NextFunction
) => {
  const { project } = res.locals;

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
    return;
  }

  try {
    const dictionariesKeys = await dictionaryService.getDictionariesKeys(
      project.id
    );

    const responseData = formatResponse<string[]>({
      data: dictionariesKeys,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type GetDictionaryParams = { dictionaryKey: string };
export type GetDictionaryQuery = { version?: string };
export type GetDictionaryResult = ResponseData<DictionaryAPI>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const getDictionaryByKey = async (
  req: Request<GetDictionaryParams, any, any, GetDictionaryQuery>,
  res: ResponseWithInformation<GetDictionaryResult>,
  _next: NextFunction
): Promise<void> => {
  const { project, user } = res.locals;
  const { dictionaryKey } = req.params;
  const version = req.query.version;

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
    return;
  }
  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  try {
    const dictionary = await dictionaryService.getDictionaryByKey(
      dictionaryKey,
      project.id
    );

    if (!dictionary.projectIds.map(String).includes(String(project.id))) {
      ErrorHandler.handleGenericErrorResponse(
        res,
        'DICTIONARY_PROJECT_MISMATCH'
      );
      return;
    }

    const apiResult = mapDictionaryToAPI(dictionary, project.id, version);

    const responseData = formatResponse<DictionaryAPI>({
      data: apiResult,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type AddDictionaryBody = { dictionary: DictionaryCreationData };
export type AddDictionaryResult = ResponseData<DictionaryAPI>;

/**
 * Adds a new dictionary to the database.
 */
export const addDictionary = async (
  req: Request<any, any, AddDictionaryBody>,
  res: ResponseWithInformation<AddDictionaryResult>,
  _next: NextFunction
): Promise<void> => {
  const { project, user } = res.locals;
  const dictionaryData = req.body.dictionary;

  if (!dictionaryData) {
    ErrorHandler.handleGenericErrorResponse(res, 'DICTIONARY_DATA_NOT_FOUND');
    return;
  }

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
    return;
  }

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!dictionaryData.projectIds?.includes(String(project.id))) {
    ErrorHandler.handleGenericErrorResponse(res, 'DICTIONARY_PROJECT_MISMATCH');
    return;
  }

  const dictionary: DictionaryData = {
    key: dictionaryData.key,
    title: dictionaryData.title,
    description: dictionaryData.description,
    content: new Map([
      ['v1', { content: dictionaryData.content ?? ({} as ContentNode) }],
    ]),
    creatorId: user.id,
    filePath: {
      [String(project.id)]: dictionaryData.filePath ?? '',
    },
    projectIds: dictionaryData.projectIds ?? [String(project.id)],
  };

  try {
    const newDictionary = await dictionaryService.createDictionary(dictionary);

    const apiResult = mapDictionaryToAPI(newDictionary, project.id);

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

    res.json(responseData);

    eventListener.sendDictionaryUpdate([
      {
        dictionary: mapDictionaryToAPI(newDictionary, project.id),
        status: 'ADDED',
      },
    ]);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type PushDictionariesBody = {
  dictionaries: LocalDictionary[];
};
type PushDictionariesResultData = {
  newDictionaries: string[];
  updatedDictionaries: string[];
  error: { dictionaryId: string; message: string }[];
};
export type PushDictionariesResult = ResponseData<PushDictionariesResultData>;

/**
 * Check each dictionaries, add the new ones and update the existing ones.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the created dictionary.
 */
export const pushDictionaries = async (
  req: Request<any, any, PushDictionariesBody>,
  res: ResponseWithInformation<PushDictionariesResult>,
  _next: NextFunction
): Promise<void> => {
  const { project, user } = res.locals;
  const dictionaryData = req.body.dictionaries;
  const dictionariesKeys = dictionaryData.map((dictionary) => dictionary.key);

  if (
    typeof dictionaryData === 'object' &&
    Array.isArray(dictionaryData) &&
    dictionaryData.length === 0
  ) {
    ErrorHandler.handleGenericErrorResponse(res, 'DICTIONARIES_NOT_PROVIDED');
    return;
  } else if (!dictionaryData) {
    ErrorHandler.handleGenericErrorResponse(res, 'DICTIONARY_DATA_NOT_FOUND');
    return;
  }

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
    return;
  }

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  try {
    const { existingDictionariesKey, newDictionariesKey } =
      await dictionaryService.getExistingDictionaryKey(
        dictionariesKeys,
        project.id
      );

    const existingDictionaries = dictionaryData.filter((dictionary) =>
      existingDictionariesKey.includes(dictionary.key)
    );
    const newDictionaries = dictionaryData.filter((dictionary) =>
      newDictionariesKey.includes(dictionary.key)
    );

    const newDictionariesResult: DictionaryAPI[] = [];
    const updatedDictionariesResult: DictionaryAPI[] = [];
    const errorResult: PushDictionariesResultData['error'] = [];

    for (const dictionaryDataEl of newDictionaries) {
      const dictionary: DictionaryData = {
        title: dictionaryDataEl.title,
        description: dictionaryDataEl.description,
        projectIds: [String(project.id)],
        creatorId: user.id,
        content: new Map([
          ['v1', { content: dictionaryDataEl.content ?? ({} as ContentNode) }],
        ]),
        filePath: {
          [String(project.id)]: dictionaryDataEl.filePath ?? '',
        },
        key: dictionaryDataEl.key,
      };

      try {
        const newDictionary =
          await dictionaryService.createDictionary(dictionary);
        newDictionariesResult.push(
          mapDictionaryToAPI(newDictionary, project.id)
        );
      } catch (error) {
        ErrorHandler.handleAppErrorResponse(res, error as AppError);
        return;
      }
    }

    if (existingDictionariesKey.length >= 0) {
      const existingDictionariesDB =
        await dictionaryService.getDictionariesByKeys(
          existingDictionariesKey,
          project.id
        );

      for (const dictionaryDataEl of existingDictionaries) {
        const existingDictionaryDB = existingDictionariesDB.find(
          (dictionaryDB) => dictionaryDB.key === dictionaryDataEl.key
        )!;

        const versionList = [...(existingDictionaryDB.content.keys() ?? [])];
        const lastVersion = versionList[versionList.length - 1];

        const lastContent =
          (existingDictionaryDB.content.get(lastVersion)
            ?.content as DictionaryAPI['content']) ?? null;

        const isSameContent =
          JSON.stringify(lastContent) ===
          JSON.stringify(dictionaryDataEl.content);

        let newContent: VersionedContent = existingDictionaryDB.content;

        if (!isSameContent) {
          const newContentVersion =
            dictionaryService.incrementVersion(existingDictionaryDB);

          existingDictionaryDB.content.set(newContentVersion, {
            content: dictionaryDataEl.content ?? ({} as ContentNode),
          });

          newContent = existingDictionaryDB.content;
        }

        const dictionary: DictionaryData = {
          ...ensureMongoDocumentToObject(existingDictionaryDB),
          ...dictionaryDataEl,
          content: newContent,
          projectIds: [String(project.id)],
          creatorId: user.id,
          filePath: {
            [String(project.id)]: dictionaryDataEl.filePath ?? '',
          },
          key: dictionaryDataEl.key,
        };

        try {
          const updatedDictionary =
            await dictionaryService.updateDictionaryByKey(
              dictionaryDataEl.key,
              dictionary,
              project.id
            );
          updatedDictionariesResult.push(
            mapDictionaryToAPI(updatedDictionary, project.id)
          );
        } catch (error) {
          ErrorHandler.handleAppErrorResponse(res, error as AppError);
          return;
        }
      }
    }

    const result: PushDictionariesResultData = {
      newDictionaries: newDictionariesResult.map(
        (dictionary) => dictionary.key
      ),
      updatedDictionaries: updatedDictionariesResult.map(
        (dictionary) => dictionary.key
      ),
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

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type UpdateDictionaryParam = { dictionaryId: string };
export type UpdateDictionaryBody = Partial<Dictionary>;
export type UpdateDictionaryResult = ResponseData<DictionaryAPI>;

/**
 * Updates an existing dictionary in the database.
 */
export const updateDictionary = async (
  req: Request<UpdateDictionaryParam, any, UpdateDictionaryBody>,
  res: ResponseWithInformation<UpdateDictionaryResult>,
  _next: NextFunction
): Promise<void> => {
  const { dictionaryId } = req.params;
  const { project } = res.locals;
  const dictionaryData = req.body;

  if (!dictionaryData) {
    ErrorHandler.handleGenericErrorResponse(res, 'DICTIONARY_DATA_NOT_FOUND');
    return;
  }

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
    return;
  }

  if (!dictionaryData.projectIds?.includes(String(project.id))) {
    ErrorHandler.handleGenericErrorResponse(res, 'DICTIONARY_PROJECT_MISMATCH');
    return;
  }

  if (typeof dictionaryId === 'undefined') {
    ErrorHandler.handleGenericErrorResponse(res, 'DICTIONARY_ID_NOT_FOUND');
    return;
  }

  try {
    const updatedDictionary = await dictionaryService.updateDictionaryById(
      dictionaryId,
      dictionaryData
    );

    const apiResult = mapDictionaryToAPI(updatedDictionary, project.id);

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

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type DeleteDictionaryParam = { dictionaryId: string };
export type DeleteDictionaryResult = ResponseData<DictionaryAPI>;

/**
 * Deletes a dictionary from the database by its ID.
 */
export const deleteDictionary = async (
  req: Request<DeleteDictionaryParam>,
  res: ResponseWithInformation<DeleteDictionaryResult>,
  _next: NextFunction
): Promise<void> => {
  const { project } = res.locals;
  const { dictionaryId } = req.params as Partial<DeleteDictionaryParam>;

  if (!dictionaryId) {
    ErrorHandler.handleGenericErrorResponse(res, 'DICTIONARY_ID_NOT_FOUND');
    return;
  }

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
    return;
  }

  try {
    const dictionaryToDelete =
      await dictionaryService.getDictionaryById(dictionaryId);

    if (!dictionaryToDelete.projectIds.includes(project.id)) {
      ErrorHandler.handleGenericErrorResponse(
        res,
        'DICTIONARY_PROJECT_MISMATCH'
      );
      return;
    }

    const deletedDictionary =
      await dictionaryService.deleteDictionaryById(dictionaryId);

    if (!deletedDictionary) {
      ErrorHandler.handleGenericErrorResponse(res, 'DICTIONARY_NOT_FOUND', {
        dictionaryId,
      });
      return;
    }

    logger.info(`Dictionary deleted: ${String(deletedDictionary.id)}`);

    const apiResult = mapDictionaryToAPI(deletedDictionary, project.id);

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

    res.json(responseData);

    eventListener.sendDictionaryUpdate([
      {
        dictionary: apiResult,
        status: 'DELETED',
      },
    ]);

    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
