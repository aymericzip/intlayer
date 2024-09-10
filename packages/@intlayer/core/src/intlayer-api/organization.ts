import type {
  AddOrganizationBody,
  AddOrganizationResult,
  DeleteOrganizationParam,
  DeleteOrganizationResult,
  GetOrganizationParam,
  GetOrganizationResult,
  GetOrganizationsParams,
  GetOrganizationsResult,
  UpdateOrganizationBody,
  UpdateOrganizationResult,
} from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config/client';
import { fetcher } from './fetcher';

const ORGANIZATION_API_ROUTE = `${getConfiguration().editor.backendURL}/api/organization`;

/**
 * Retrieves a list of organizations based on filters and pagination.
 * @param filters - Filters and pagination options.
 */
const getOrganizations = async (filters?: GetOrganizationsParams) =>
  await fetcher<GetOrganizationsResult>(ORGANIZATION_API_ROUTE, {
    params: filters,
  });

/**
 * Retrieves an organization by its ID.
 * @param organizationId - Organization ID.
 */
const getOrganization = async (
  organizationId: GetOrganizationParam['organizationId']
) =>
  await fetcher<GetOrganizationResult>(
    `${ORGANIZATION_API_ROUTE}/${organizationId}`
  );

/**
 * Adds a new organization to the database.
 * @param organization - Organization data.
 */
const addOrganization = async (organization: AddOrganizationBody) =>
  await fetcher<AddOrganizationResult>(ORGANIZATION_API_ROUTE, {
    method: 'POST',
    body: organization,
  });

/**
 * Updates an existing organization in the database.
 * @param organization - Updated organization data.
 */
const updateOrganization = async (organization: UpdateOrganizationBody) =>
  fetcher<UpdateOrganizationResult>(ORGANIZATION_API_ROUTE, {
    method: 'PUT',
    body: organization,
  });

/**
 * Deletes an organization from the database by its ID.
 * @param organizationId - Organization ID.
 */
const deleteOrganization = async (
  organizationId: DeleteOrganizationParam['organizationId']
) =>
  await fetcher<DeleteOrganizationResult>(ORGANIZATION_API_ROUTE, {
    method: 'DELETE',

    body: { id: organizationId },
  });

export const organizationAPI = {
  getOrganizations,
  getOrganization,
  addOrganization,
  updateOrganization,
  deleteOrganization,
};
