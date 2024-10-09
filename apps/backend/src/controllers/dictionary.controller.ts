/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@logger/index';
import type { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import {
  findDictionaries as findDictionariesService,
  countDictionaries as countDictionariesService,
  getDictionaryById as getDictionaryByIdService,
  createDictionary as createDictionaryService,
  updateDictionaryById as updateDictionaryByIdService,
  deleteDictionaryById as deleteDictionaryByIdService,
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
import type { Request, Response } from 'express';
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
): Promise<Response> => {
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

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatPaginatedResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
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
): Promise<Response> => {
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

    return res.status(responseCode).json(responseData);
  }

  if (!project) {
    const errorMessage = 'Project not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  if (!user) {
    const errorMessage = 'User not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  if (!dictionaryData.projectIds.includes(String(project._id))) {
    const errorMessage = `You don't have access to this dictionary`;
    const responseCode = HttpStatusCodes.FORBIDDEN_403;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });
    return res.status(responseCode).json(responseData);
  }

  const dictionary: DictionaryData = {
    content: {},
    creatorId: user._id,
    ...dictionaryData,
  };

  try {
    const newDictionary = await createDictionaryService(dictionary);

    const responseData = formatResponse<Dictionary>({ data: newDictionary });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
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
): Promise<Response> => {
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

    return res.status(responseCode).json(responseData);
  }

  if (!project) {
    const errorMessage = 'Project not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  if (!dictionaryData.projectIds?.includes(String(project._id))) {
    const errorMessage = `You don't have access to this dictionary`;
    const responseCode = HttpStatusCodes.FORBIDDEN_403;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });
    return res.status(responseCode).json(responseData);
  }

  if (typeof dictionaryData._id === 'undefined') {
    const errorMessage = 'Dictionary id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  try {
    const updatedDictionary = await updateDictionaryByIdService(
      dictionaryData._id,
      dictionaryData
    );

    const responseData = formatResponse<Dictionary>({
      data: updatedDictionary,
    });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
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
): Promise<Response> => {
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

    return res.status(responseCode).json(responseData);
  }

  if (!project) {
    const errorMessage = 'Project not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
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
      return res.status(responseCode).json(responseData);
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

      return res.status(responseCode).json(responseData);
    }

    logger.info(`Dictionary deleted: ${String(deletedDictionary._id)}`);

    const responseData = formatResponse<Dictionary>({
      data: deletedDictionary,
    });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Dictionary>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};
