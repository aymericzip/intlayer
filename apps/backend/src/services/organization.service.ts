import { OrganizationModel } from '@models/organization.model';
import { GenericError } from '@utils/errors';
import type { OrganizationFilters } from '@utils/filtersAndPagination/getOrganizationFiltersAndPagination';
import {
  type OrganizationFields,
  validateOrganization,
} from '@utils/validation/validateOrganization';
import type { ObjectId } from 'mongoose';
import type {
  Organization,
  OrganizationCreationData,
  OrganizationDocument,
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
): Promise<OrganizationDocument[]> => {
  return await OrganizationModel.find(filters).skip(skip).limit(limit);
};

/**
 * Finds an organization by its ID.
 * @param organizationId - The ID of the organization to find.
 * @returns The organization matching the ID.
 */
export const getOrganizationById = async (
  organizationId: ObjectId | string
): Promise<OrganizationDocument> => {
  const organization = await OrganizationModel.findById(organizationId);

  if (!organization) {
    throw new GenericError('ORGANIZATION_NOT_FOUND', { organizationId });
  }

  return organization;
};

/**
 * Retrieves an organization by its owner.
 * @param userId - The ID of the user to find the organization.
 * @returns The organizations matching the user ID.
 */
export const getOrganizationsByOwner = async (
  userId: string | ObjectId
): Promise<OrganizationDocument[] | null> => {
  const organization = await OrganizationModel.find({
    creatorId: userId,
  });

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
    throw new GenericError('ORGANIZATION_COUNT_FAILED', { filters });
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
): Promise<OrganizationDocument> => {
  const errors = validateOrganization(organization, ['name']);

  if (Object.keys(errors).length > 0) {
    throw new GenericError('ORGANIZATION_INVALID_FIELDS', { errors });
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
): Promise<OrganizationDocument> => {
  const updatedKeys = Object.keys(organization) as OrganizationFields;
  const errors = validateOrganization(organization, updatedKeys);

  if (Object.keys(errors).length > 0) {
    throw new GenericError('ORGANIZATION_INVALID_FIELDS', {
      organizationId,
      errors,
    });
  }

  const result = await OrganizationModel.updateOne(
    { _id: organizationId },
    organization
  );

  if (result.matchedCount === 0) {
    throw new GenericError('ORGANIZATION_UPDATE_FAILED', { organizationId });
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
): Promise<OrganizationDocument> => {
  const organization =
    await OrganizationModel.findByIdAndDelete(organizationId);

  if (!organization) {
    throw new GenericError('ORGANIZATION_NOT_FOUND', { organizationId });
  }

  return organization;
};
