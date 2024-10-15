/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@logger/index';
import type { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import {
  clearOrganizationAuth as clearOrganizationAuthService,
  clearProjectAuth as clearProjectAuthService,
  setOrganizationAuth as setOrganizationAuthService,
} from '@services/sessionAuth.service';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  getOrganizationFiltersAndPagination,
  type OrganizationFiltersParams,
  type OrganizationFilters,
} from '@utils/filtersAndPagination/getOrganizationFiltersAndPagination';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { Request } from 'express';
import type { ObjectId } from 'mongoose';
import {
  findOrganizations as findOrganizationsService,
  countOrganizations as countOrganizationsService,
  createOrganization as createOrganizationService,
  updateOrganizationById as updateOrganizationByIdService,
  deleteOrganizationById as deleteOrganizationByIdService,
  getOrganizationById as getOrganizationByIdService,
} from '@/services/organization.service';
import type {
  Organization,
  OrganizationCreationData,
} from '@/types/organization.types';

export type GetOrganizationsParams =
  FiltersAndPagination<OrganizationFiltersParams>;
export type GetOrganizationsResult = PaginatedResponse<Organization>;

/**
 * Retrieves a list of organizations based on filters and pagination.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the list of organizations and pagination details.
 */
export const getOrganizations = async (
  req: Request<GetOrganizationsParams>,
  res: ResponseWithInformation<GetOrganizationsResult>
) => {
  const { user } = res.locals;
  const { filters, pageSize, skip, page, getNumberOfPages } =
    getOrganizationFiltersAndPagination(req);

  if (!user) {
    const errorMessage = 'User not logged in';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatPaginatedResponse<Organization>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  const restrictedFilter: OrganizationFilters = {
    ...filters,
    members: { $in: [...(filters.members ?? []), String(user._id)] },
  };

  try {
    const organizations = await findOrganizationsService(
      restrictedFilter,
      skip,
      pageSize
    );
    const totalItems = await countOrganizationsService(filters);

    const responseData = formatPaginatedResponse<Organization>({
      data: organizations,
      page,
      pageSize,
      totalPages: getNumberOfPages(totalItems),
      totalItems,
    });

    res.status(200).json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatPaginatedResponse<Organization>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }
};

export type GetOrganizationParam = { organizationId: string };
export type GetOrganizationResult = ResponseData<Organization>;

/**
 * Retrieves an organization by its ID.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the organization.
 */
export const getOrganization = async (
  req: Request<GetOrganizationParam, any, any>,
  res: ResponseWithInformation<GetOrganizationResult>
): Promise<void> => {
  const { organizationId } = req.params as Partial<GetOrganizationParam>;

  if (!organizationId) {
    const errorMessage = 'Organization id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Organization>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  try {
    const organization = await getOrganizationByIdService(organizationId);

    const responseData = formatResponse<Organization>({ data: organization });

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Organization>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }
};

export type AddOrganizationBody = OrganizationCreationData;
export type AddOrganizationResult = ResponseData<Organization>;

/**
 * Adds a new organization to the database.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the created organization.
 */
export const addOrganization = async (
  req: Request<any, any, AddOrganizationBody>,
  res: ResponseWithInformation<AddOrganizationResult>
): Promise<void> => {
  const { user } = res.locals;
  const organization = req.body;

  if (!organization) {
    const errorMessage = 'Organization not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Organization>({
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
    const responseData = formatResponse<Organization>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  try {
    const newOrganization = await createOrganizationService(
      organization,
      user._id
    );

    const responseData = formatResponse<Organization>({
      data: newOrganization,
    });

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Organization>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }
};

export type UpdateOrganizationBody = Partial<Organization>;
export type UpdateOrganizationResult = ResponseData<Organization>;

/**
 * Updates an existing organization in the database.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the updated organization.
 */
export const updateOrganization = async (
  req: Request<undefined, undefined, UpdateOrganizationBody>,
  res: ResponseWithInformation<UpdateOrganizationResult>
): Promise<void> => {
  const organization = req.body;

  if (!organization) {
    const errorMessage = 'Organization not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Organization>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (typeof organization._id === 'undefined') {
    const errorMessage = 'Organization id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Organization>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  try {
    const updatedOrganization = await updateOrganizationByIdService(
      organization._id,
      organization
    );

    const responseData = formatResponse<Organization>({
      data: updatedOrganization,
    });

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Organization>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }
};

export type DeleteOrganizationParam = { organizationId: ObjectId | string };
export type DeleteOrganizationResult = ResponseData<Organization>;

/**
 * Deletes an organization from the database by its ID.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response confirming the deletion.
 */
export const deleteOrganization = async (
  req: Request<DeleteOrganizationParam>,
  res: ResponseWithInformation
): Promise<void> => {
  const { organizationId } = req.params as Partial<DeleteOrganizationParam>;

  if (!organizationId) {
    const errorMessage = 'Organization id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Organization>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  try {
    const deletedOrganization =
      await deleteOrganizationByIdService(organizationId);

    if (!deletedOrganization) {
      const errorMessage = 'Organization not found';

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.NOT_FOUND_404;
      const responseData = formatResponse<Organization>({
        error: errorMessage,
        status: responseCode,
      });

      res.status(responseCode).json(responseData);
      return;
    }

    logger.info(`Organization deleted: ${String(deletedOrganization._id)}`);

    const responseData = formatResponse<Organization>({
      data: deletedOrganization,
    });

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Organization>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }
};

export type SelectOrganizationParam = { organizationId: ObjectId | string };
export type SelectOrganizationResult = ResponseData<Organization>;

/**
 * Select an organization.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response confirming the deletion.
 */
export const selectOrganization = async (
  req: Request<SelectOrganizationParam>,
  res: ResponseWithInformation<SelectOrganizationResult>
): Promise<void> => {
  const { organizationId } = req.params as Partial<SelectOrganizationParam>;

  if (!organizationId) {
    const errorMessage = 'Organization id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Organization>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  try {
    const organization = await getOrganizationByIdService(organizationId);

    setOrganizationAuthService(res, organization);

    const responseData = formatResponse<Organization>({
      data: organization,
    });

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Organization>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }
};

export type UnselectOrganizationResult = ResponseData<null>;

/**
 * Unselect an organization.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response confirming the deletion.
 */
export const unselectOrganization = (
  _req: Request,
  res: ResponseWithInformation<UnselectOrganizationResult>
): void => {
  try {
    clearOrganizationAuthService(res);
    clearProjectAuthService(res);

    const responseData = formatResponse<null>({
      data: null,
    });

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<null>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }
};
