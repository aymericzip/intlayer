/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dictionary as LocalDictionary } from '@intlayer/core';
import { logger } from '@logger/index';
import type { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import {
  findDictionaries as findDictionariesService,
  countDictionaries as countDictionariesService,
  getDictionaryById as getDictionaryByIdService,
  createDictionary as createDictionaryService,
  updateDictionaryById as updateDictionaryByIdService,
  deleteDictionaryById as deleteDictionaryByIdService,
  getExistingDictionaryKey as getExistingDictionaryKeyService,
  updateDictionaryByKey as updateDictionaryByKeyService,
} from '@services/dictionary.service';
import {
  type DictionaryFiltersParams,
  getDictionaryFiltersAndPagination,
} from '@utils/filtersAndPagination/getDictionaryFiltersAndPagination';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import {
  formatPaginatedResponse,
  type ResponseData,
  type PaginatedResponse,
  formatResponse,
} from '@utils/responseData';
import type { Request } from 'express';
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
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the list of dictionaries and pagination details.
 */
export const getDictionaries = async (
  req: Request<GetDictionariesParams>,
  res: ResponseWithInformation<GetDictionariesResult>
): Promise<void> => {
  const { filters, pageSize, skip, page, getNumberOfPages } =
    getDictionaryFiltersAndPagination(req);

  try {
    const dictionaries = await findDictionariesService(filters, skip, pageSize);
    const totalItems = await countDictionariesService(filters);

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
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatPaginatedResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }
};

export type AddDictionaryBody = DictionaryCreationData;
export type AddDictionaryResult = ResponseData<Dictionary>;

/**
 * Adds a new dictionary to the database.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the created dictionary.
 */
export const addDictionary = async (
  req: Request<any, any, AddDictionaryBody>,
  res: ResponseWithInformation<AddDictionaryResult>
): Promise<void> => {
  const { project, user } = res.locals;
  const dictionaryData = req.body;

  if (!dictionaryData) {
    const errorMessage = 'Dictionary not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (!project) {
    const errorMessage = 'Project not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (!user) {
    const errorMessage = 'User not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (!dictionaryData.projectIds.includes(String(project._id))) {
    const errorMessage = `You don't have access to this dictionary`;
    const responseCode = HttpStatusCodes.FORBIDDEN_403;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
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
    const newDictionary = await createDictionaryService(dictionary);

    const responseData = formatResponse<Dictionary>({ data: newDictionary });

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
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
  res: ResponseWithInformation<PushDictionariesResult>
): Promise<void> => {
  const { project, user } = res.locals;
  const dictionaryData = req.body.dictionaries;
  const dictionariesKeys = dictionaryData.map((dictionary) => dictionary.key);

  if (
    typeof dictionaryData === 'object' &&
    Array.isArray(dictionaryData) &&
    dictionaryData.length === 0
  ) {
    const errorMessage = 'No dictionaries provided';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<PushDictionariesResultData>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  } else if (!dictionaryData) {
    const errorMessage = 'Dictionary not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<PushDictionariesResultData>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (!project) {
    const errorMessage = 'Project not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<PushDictionariesResultData>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (!user) {
    const errorMessage = 'User not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<PushDictionariesResultData>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  try {
    const { existingDictionariesKey, newDictionariesKey } =
      await getExistingDictionaryKeyService(dictionariesKeys, project._id);

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
        ...dictionaryDataEl,
        content: dictionaryDataEl,
        projectIds: [String(project._id)],
        creatorId: user._id,
        key: dictionaryDataEl.key,
      };

      try {
        const newDictionary = await createDictionaryService(dictionary);
        result.newDictionaries.push(newDictionary.key);
      } catch (error) {
        const errorMessage: string = (error as Error).message;
        const dictionaryId = dictionaryDataEl.key;

        logger.error(errorMessage);

        result.error.push({ dictionaryId, message: errorMessage });
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
        const newDictionary = await updateDictionaryByKeyService(
          dictionaryDataEl.key,
          dictionary,
          project._id
        );
        result.updatedDictionaries.push(newDictionary.key);
      } catch (error) {
        const errorMessage: string = (error as Error).message;
        const dictionaryId = dictionaryDataEl.key;

        logger.error(errorMessage);

        result.error.push({ dictionaryId, message: errorMessage });
      }
    }

    const responseData = formatResponse<PushDictionariesResultData>({
      data: result,
    });

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<PushDictionariesResultData>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }
};

export type UpdateDictionaryBody = Partial<Dictionary>;
export type UpdateDictionaryResult = ResponseData<Dictionary>;

/**
 * Updates an existing dictionary in the database.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the updated dictionary.
 */
export const updateDictionary = async (
  req: Request<any, any, UpdateDictionaryBody>,
  res: ResponseWithInformation<UpdateDictionaryResult>
): Promise<void> => {
  const { project } = res.locals;
  const dictionaryData = req.body;

  if (!dictionaryData) {
    const errorMessage = 'Dictionary not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (!project) {
    const errorMessage = 'Project not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (!dictionaryData.projectIds?.includes(String(project._id))) {
    const errorMessage = `You don't have access to this dictionary`;
    const responseCode = HttpStatusCodes.FORBIDDEN_403;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });
    res.status(responseCode).json(responseData);
    return;
  }

  if (typeof dictionaryData._id === 'undefined') {
    const errorMessage = 'Dictionary id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  try {
    const updatedDictionary = await updateDictionaryByIdService(
      dictionaryData._id,
      dictionaryData
    );

    const responseData = formatResponse<Dictionary>({
      data: updatedDictionary,
    });

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }
};

export type DeleteDictionaryParam = { dictionaryId: string };
export type DeleteDictionaryResult = ResponseData<Dictionary>;

/**
 * Deletes a dictionary from the database by its ID.
 * @param req - Express request object.
 * @param  res - Express response object.
 * @returns Response confirming the deletion.
 */
export const deleteDictionary = async (
  req: Request<DeleteDictionaryParam>,
  res: ResponseWithInformation<DeleteDictionaryResult>
): Promise<void> => {
  const { project } = res.locals;
  const { dictionaryId } = req.params as Partial<DeleteDictionaryParam>;

  if (!dictionaryId) {
    const errorMessage = 'Dictionary id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (!project) {
    const errorMessage = 'Project not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  try {
    const dictionaryToDelete = await getDictionaryByIdService(dictionaryId);

    if (!dictionaryToDelete.projectIds.includes(project._id)) {
      const errorMessage = `You don't have access to this dictionary`;
      const responseCode = HttpStatusCodes.FORBIDDEN_403;
      const responseData = formatResponse<Dictionary>({
        error: errorMessage,
        status: responseCode,
      });
      res.status(responseCode).json(responseData);
      return;
    }

    const deletedDictionary = await deleteDictionaryByIdService(dictionaryId);

    if (!deletedDictionary) {
      const errorMessage = 'Dictionary not found';

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.NOT_FOUND_404;
      const responseData = formatResponse<Dictionary>({
        error: errorMessage,
        status: responseCode,
      });

      res.status(responseCode).json(responseData);
      return;
    }

    logger.info(`Dictionary deleted: ${String(deletedDictionary._id)}`);

    const responseData = formatResponse<Dictionary>({
      data: deletedDictionary,
    });

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }
};
