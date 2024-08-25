import { logger } from '@logger/index';
import { OrganizationModel } from '@models/organization.model';
import type { Organization } from '@types/organization.type';
import type { OrganizationFilters } from '@utils/filtersAndPagination/getOrganizationFiltersAndPagination';
import { validateOrganization } from '@utils/validation/validateOrganization';

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
  organizationId: string
): Promise<Organization> => {
  const organization = await OrganizationModel.findById(organizationId);

  if (!organization) {
    const errorMessage = `Organization not found - ${organizationId}`;

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
  organization: Organization
): Promise<Organization> => {
  const errors = validateOrganization(organization);

  if (Object.keys(errors).length > 0) {
    const errorMessage = `Organization invalid fields - ${JSON.stringify(errors)}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return await OrganizationModel.create(organization);
};

/**
 * Updates an existing organization in the database by its ID.
 * @param organizationId - The ID of the organization to update.
 * @param organization - The updated organization data.
 * @returns The updated organization.
 */
export const updateOrganizationById = async (
  organizationId: string,
  organization: Partial<Organization>
): Promise<Organization> => {
  const errors = validateOrganization(organization);

  if (Object.keys(errors).length > 0) {
    const errorMessage = `Organization invalid fields - ${organizationId} - ${JSON.stringify(
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
    const errorMessage = `Organization update failed - ${organizationId}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const organizations = await findOrganizations({ ids: organizationId }, 0, 1);

  return organizations[0];
};

/**
 * Deletes an organization from the database by its ID.
 * @param organizationId - The ID of the organization to delete.
 * @returns The result of the deletion operation.
 */
export const deleteOrganizationById = async (
  organizationId: string
): Promise<object> => {
  return await OrganizationModel.deleteOne({ _id: organizationId });
};
