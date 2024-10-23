import { logger } from '@logger/index';
import { OrganizationModel } from '@models/organization.model';
import type { OrganizationFilters } from '@utils/filtersAndPagination/getOrganizationFiltersAndPagination';
import {
  type OrganizationFields,
  validateOrganization,
} from '@utils/validation/validateOrganization';
import type { ObjectId } from 'mongoose';
import type {
  Organization,
  OrganizationCreationData,
} from '@/types/organization.types';

/**
 * Finds organizations based on filters and pagination options.
 * @param filters - MongoDB filter query.
 * @param skip - Number of documents to skip.
 * @param limit - Number of documents to limit.
 * @returns List of organizations matching the filters.
 */
export const findOrganizations = async (
  filters: OrganizationFilters,
  skip: number,
  limit: number
): Promise<Organization[]> => {
  return await OrganizationModel.find(filters).skip(skip).limit(limit);
};

/**
 * Finds an organization by its ID.
 * @param organizationId - The ID of the organization to find.
 * @returns The organization matching the ID.
 */
export const getOrganizationById = async (
  organizationId: ObjectId | string
): Promise<Organization> => {
  const organization = await OrganizationModel.findById(organizationId);

  if (!organization) {
    const organizationIdString = String(organizationId);
    const errorMessage = `Organization not found - ${organizationIdString}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return organization;
};

/**
 * Counts the total number of organizations that match the filters.
 * @param filters - MongoDB filter query.
 * @returns Total number of organizations.
 */
export const countOrganizations = async (
  filters: OrganizationFilters
): Promise<number> => {
  const result = await OrganizationModel.countDocuments(filters);

  if (typeof result === 'undefined') {
    const errorMessage = 'Organization count failed';

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return result;
};

/**
 * Creates a new organization in the database.
 * @param organization - The organization data to create.
 * @returns The created organization.
 */
export const createOrganization = async (
  organization: OrganizationCreationData,
  userId: string | ObjectId
): Promise<Organization> => {
  const errors = validateOrganization(organization, ['name']);

  if (Object.keys(errors).length > 0) {
    const errorMessage = `Organization invalid fields - ${JSON.stringify(errors)}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return await OrganizationModel.create({
    creatorId: userId,
    membersIds: [userId],
    adminsIds: [userId],
    ...organization,
  });
};

/**
 * Updates an existing organization in the database by its ID.
 * @param organizationId - The ID of the organization to update.
 * @param organization - The updated organization data.
 * @returns The updated organization.
 */
export const updateOrganizationById = async (
  organizationId: ObjectId | string,
  organization: Partial<Organization>
): Promise<Organization> => {
  const updatedKeys = Object.keys(organization) as OrganizationFields;
  const errors = validateOrganization(organization, updatedKeys);
  const organizationIdString = String(organizationId);

  if (Object.keys(errors).length > 0) {
    const errorMessage = `Organization invalid fields - ${organizationIdString} - ${JSON.stringify(
      errors
    )}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const result = await OrganizationModel.updateOne(
    { _id: organizationId },
    organization
  );

  if (result.matchedCount === 0) {
    const errorMessage = `Organization update failed - ${organizationIdString}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return await getOrganizationById(organizationId);
};

/**
 * Deletes an organization from the database by its ID.
 * @param organizationId - The ID of the organization to delete.
 * @returns The result of the deletion operation.
 */
export const deleteOrganizationById = async (
  organizationId: ObjectId | string
): Promise<Organization> => {
  const organization =
    await OrganizationModel.findByIdAndDelete(organizationId);

  if (!organization) {
    const organizationIdString = String(organizationId);
    const errorMessage = `Organization not found - ${organizationIdString}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return organization;
};
