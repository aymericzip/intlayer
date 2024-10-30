/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Dictionary as LocalDictionary } from '@intlayer/core';
import { logger } from '@logger';
import type { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import * as dictionaryService from '@services/dictionary.service';
import { AppError, ErrorHandler } from '@utils/errors';
import {
  type DictionaryFiltersParams,
  getDictionaryFiltersAndPagination,
} from '@utils/filtersAndPagination/getDictionaryFiltersAndPagination';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  formatPaginatedResponse,
  type ResponseData,
  type PaginatedResponse,
  formatResponse,
} from '@utils/responseData';
import type { NextFunction, Request } from 'express';
import type {
  Dictionary,
  DictionaryCreationData,
  DictionaryData,
} from '@/types/dictionary.types';

export type GetDictionariesParams =
  FiltersAndPagination<DictionaryFiltersParams>;
export type GetDictionariesResult = PaginatedResponse<Dictionary>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const getDictionaries = async (
  req: Request<GetDictionariesParams>,
  res: ResponseWithInformation<GetDictionariesResult>,
  _next: NextFunction
): Promise<void> => {
  const { filters, pageSize, skip, page, getNumberOfPages } =
    getDictionaryFiltersAndPagination(req);

  try {
    const dictionaries = await dictionaryService.findDictionaries(
      filters,
      skip,
      pageSize
    );
    const totalItems = await dictionaryService.countDictionaries(filters);

    const responseData = formatPaginatedResponse<Dictionary>({
      data: dictionaries,
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

export type AddDictionaryBody = DictionaryCreationData;
export type AddDictionaryResult = ResponseData<Dictionary>;

/**
 * Adds a new dictionary to the database.
 */
export const addDictionary = async (
  req: Request<any, any, AddDictionaryBody>,
  res: ResponseWithInformation<AddDictionaryResult>,
  _next: NextFunction
): Promise<void> => {
  const { project, user } = res.locals;
  const dictionaryData = req.body;

  if (!dictionaryData) {
    ErrorHandler.handleGenericErrorResponse(res, 'DICTIONARY_DATA_NOT_FOUND');
    return;
  }

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_FOUND');
    return;
  }

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
    return;
  }

  if (!dictionaryData.projectIds.includes(String(project._id))) {
    ErrorHandler.handleGenericErrorResponse(res, 'DICTIONARY_PROJECT_MISMATCH');
    return;
  }

  const dictionary: DictionaryData = {
    key: dictionaryData.key,
    title: dictionaryData.title,
    description: dictionaryData.description,
    content: dictionaryData.content,
    creatorId: user._id,
    filePath: dictionaryData.filePath,
    projectIds: dictionaryData.projectIds ?? [String(project._id)],
  };

  try {
    const newDictionary = await dictionaryService.createDictionary(dictionary);

    const responseData = formatResponse<Dictionary>({ data: newDictionary });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type PushDictionariesBody = { dictionaries: LocalDictionary[] };
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
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_FOUND');
    return;
  }

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
    return;
  }

  try {
    const { existingDictionariesKey, newDictionariesKey } =
      await dictionaryService.getExistingDictionaryKey(
        dictionariesKeys,
        project._id
      );

    const existingDictionaries = dictionaryData.filter((dictionary) =>
      existingDictionariesKey.includes(dictionary.key)
    );
    const newDictionaries = dictionaryData.filter((dictionary) =>
      newDictionariesKey.includes(dictionary.key)
    );

    const result: PushDictionariesResultData = {
      newDictionaries: [],
      updatedDictionaries: [],
      error: [],
    };

    for (const dictionaryDataEl of newDictionaries) {
      const dictionary: DictionaryData = {
        title: dictionaryDataEl.title,
        description: dictionaryDataEl.description,
        content: dictionaryDataEl.content,
        projectIds: [String(project._id)],
        creatorId: user._id,
        filePath: dictionaryDataEl.filePath,
        key: dictionaryDataEl.key,
      };

      try {
        const newDictionary =
          await dictionaryService.createDictionary(dictionary);
        result.newDictionaries.push(newDictionary.key);
      } catch (error) {
        ErrorHandler.handleAppErrorResponse(res, error as AppError);
      }
    }

    for (const dictionaryDataEl of existingDictionaries) {
      const dictionary: DictionaryData = {
        ...dictionaryDataEl,
        content: dictionaryDataEl,
        projectIds: [String(project._id)],
        creatorId: user._id,
        key: dictionaryDataEl.key,
      };

      try {
        const newDictionary = await dictionaryService.updateDictionaryByKey(
          dictionaryDataEl.key,
          dictionary,
          project._id
        );
        result.updatedDictionaries.push(newDictionary.key);
      } catch (error) {
        ErrorHandler.handleAppErrorResponse(res, error as AppError);
      }
    }

    const responseData = formatResponse<PushDictionariesResultData>({
      data: result,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type UpdateDictionaryBody = Partial<Dictionary>;
export type UpdateDictionaryResult = ResponseData<Dictionary>;

/**
 * Updates an existing dictionary in the database.
 */
export const updateDictionary = async (
  req: Request<any, any, UpdateDictionaryBody>,
  res: ResponseWithInformation<UpdateDictionaryResult>,
  _next: NextFunction
): Promise<void> => {
  const { project } = res.locals;
  const dictionaryData = req.body;

  if (!dictionaryData) {
    ErrorHandler.handleGenericErrorResponse(res, 'DICTIONARY_DATA_NOT_FOUND');
    return;
  }

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_FOUND');
    return;
  }

  if (!dictionaryData.projectIds?.includes(String(project._id))) {
    ErrorHandler.handleGenericErrorResponse(res, 'DICTIONARY_PROJECT_MISMATCH');
    return;
  }

  if (typeof dictionaryData._id === 'undefined') {
    ErrorHandler.handleGenericErrorResponse(res, 'DICTIONARY_ID_NOT_FOUND');
    return;
  }

  try {
    const updatedDictionary = await dictionaryService.updateDictionaryById(
      dictionaryData._id,
      dictionaryData
    );

    const responseData = formatResponse<Dictionary>({
      data: updatedDictionary,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type DeleteDictionaryParam = { dictionaryId: string };
export type DeleteDictionaryResult = ResponseData<Dictionary>;

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
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_FOUND');
    return;
  }

  try {
    const dictionaryToDelete =
      await dictionaryService.getDictionaryById(dictionaryId);

    if (!dictionaryToDelete.projectIds.includes(project._id)) {
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

    logger.info(`Dictionary deleted: ${String(deletedDictionary._id)}`);

    const responseData = formatResponse<Dictionary>({
      data: deletedDictionary,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
