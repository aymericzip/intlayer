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
  SelectOrganizationParam,
  SelectOrganizationResult,
} from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config/client';
import { fetcher, type FetcherOptions } from './fetcher';

const ORGANIZATION_API_ROUTE = `${getConfiguration().editor.backendURL}/api/organization`;

export const getOrganizationAPI = (authAPIOptions: FetcherOptions = {}) => {
  /**
   * Retrieves a list of organizations based on filters and pagination.
   * @param filters - Filters and pagination options.
   */
  const getOrganizations = async (
    filters?: GetOrganizationsParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetOrganizationsResult>(
      ORGANIZATION_API_ROUTE,
      authAPIOptions,
      otherOptions,
      {
        params: filters,
      }
    );

  /**
   * Retrieves an organization by its ID.
   * @param organizationId - Organization ID.
   */
  const getOrganization = async (
    organizationId: GetOrganizationParam['organizationId'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetOrganizationResult>(
      `${ORGANIZATION_API_ROUTE}/${organizationId}`,
      authAPIOptions,
      otherOptions
    );

  /**
   * Adds a new organization to the database.
   * @param organization - Organization data.
   */
  const addOrganization = async (
    organization: AddOrganizationBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AddOrganizationResult>(
      ORGANIZATION_API_ROUTE,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: organization,
      }
    );

  /**
   * Updates an existing organization in the database.
   * @param organization - Updated organization data.
   */
  const updateOrganization = async (
    organization: UpdateOrganizationBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<UpdateOrganizationResult>(
      ORGANIZATION_API_ROUTE,
      authAPIOptions,
      otherOptions,
      {
        method: 'PUT',
        body: organization,
      }
    );

  /**
   * Deletes an organization from the database by its ID.
   * @param organizationId - Organization ID.
   */
  const deleteOrganization = async (
    organizationId: DeleteOrganizationParam['organizationId'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<DeleteOrganizationResult>(
      ORGANIZATION_API_ROUTE,
      authAPIOptions,
      otherOptions,
      {
        method: 'DELETE',
        body: { id: organizationId },
      }
    );

  /**
   * Select an organization from the database by its ID.
   * @param organizationId - Organization ID.
   */
  const selectOrganization = async (
    organizationId: SelectOrganizationParam['organizationId'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<SelectOrganizationResult>(
      `${ORGANIZATION_API_ROUTE}/${organizationId}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'PUT',
      }
    );

  return {
    getOrganizations,
    getOrganization,
    addOrganization,
    updateOrganization,
    deleteOrganization,
    selectOrganization,
  };
};

export const organizationAPI = getOrganizationAPI();
