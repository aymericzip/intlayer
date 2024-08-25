import { logger } from '@logger/index';
import type { ResponseWithInformation } from '@middlewares/auth.middleware';
import type { Organization } from '@types/organization.type';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  getOrganizationFiltersAndPagination,
  type OrganizationFilters,
} from '@utils/filtersAndPagination/getOrganizationFiltersAndPagination';
import type { Request } from 'express';
import {
  findOrganizations as findOrganizationsService,
  countOrganizations as countOrganizationsService,
  createOrganization as createOrganizationService,
  updateOrganizationById as updateOrganizationByIdService,
  deleteOrganizationById as deleteOrganizationByIdService,
  getOrganizationById as getOrganizationByIdService,
} from '@/services/organization.service';

/**
 * Retrieves a list of organizations based on filters and pagination.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the list of organizations and pagination details.
 */
export const getOrganizations = async (
  req: Request<FiltersAndPagination<OrganizationFilters>>,
  res: ResponseWithInformation
) => {
  const { filters, pageSize, skip, page, getNumberOfPages } =
    getOrganizationFiltersAndPagination(req);

  try {
    const organizations = await findOrganizationsService(
      filters,
      skip,
      pageSize
    );
    const totalItems = await countOrganizationsService(filters);

    return res.status(200).json({
      success: true,
      data: organizations,
      page,
      page_size: pageSize,
      total_pages: getNumberOfPages(totalItems),
      total_items: totalItems,
    });
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    return res.status(500).json({ success: false, message: errorMessage });
  }
};

/**
 * Retrieves an organization by its ID.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the organization.
 */
export const getOrganization = async (
  req: Request<{ organizationId: string | undefined }, any, any>,
  res: ResponseWithInformation
) => {
  const organizationId = req.params.organizationId;

  if (!organizationId) {
    const errorMessage = 'Organization id not found';

    logger.error(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const organization = await getOrganizationByIdService(organizationId);
    return res.status(200).json(organization);
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    return res.status(500).json({ success: false, message: errorMessage });
  }
};

/**
 * Adds a new organization to the database.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the created organization.
 */
export const addOrganization = async (
  req: Request<any, any, Organization | undefined>,
  res: ResponseWithInformation
) => {
  const organization: Organization | undefined = req.body;

  if (!organization) {
    const errorMessage = 'Organization not found';

    logger.error(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const newOrganization = await createOrganizationService(organization);
    return res.status(200).json(newOrganization);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    return res.status(500).json({ success: false, message: errorMessage });
  }
};

/**
 * Updates an existing organization in the database.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the updated organization.
 */
export const updateOrganization = async (
  req: Request<undefined, undefined, Partial<Organization> | undefined>,
  res: ResponseWithInformation
) => {
  const organization = req.body;

  if (!organization) {
    const errorMessage = 'Organization not found';

    logger.error(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  if (typeof organization._id === 'undefined') {
    const errorMessage = 'Organization id not found';

    logger.error(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const updatedOrganization = await updateOrganizationByIdService(
      organization._id,
      organization
    );
    return res.status(200).json(updatedOrganization);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    return res.status(500).json({ success: false, message: errorMessage });
  }
};

/**
 * Deletes an organization from the database by its ID.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response confirming the deletion.
 */
export const deleteOrganization = async (
  req: Request,
  res: ResponseWithInformation
) => {
  const organizationId = req.params.organizationId;

  try {
    const deletedOrganization =
      await deleteOrganizationByIdService(organizationId);
    return res.status(200).json(deletedOrganization);
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    return res.status(500).json({ success: false, message: errorMessage });
  }
};
