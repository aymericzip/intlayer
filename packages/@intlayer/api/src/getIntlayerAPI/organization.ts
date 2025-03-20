import type {
  // @ts-ignore: @intlayer/backend is not built yet
  AddOrganizationBody,
  // @ts-ignore: @intlayer/backend is not built yet
  AddOrganizationResult,
  // @ts-ignore: @intlayer/backend is not built yet
  DeleteOrganizationResult,
  // @ts-ignore: @intlayer/backend is not built yet
  GetOrganizationParam,
  // @ts-ignore: @intlayer/backend is not built yet
  GetOrganizationResult,
  // @ts-ignore: @intlayer/backend is not built yet
  GetOrganizationsParams,
  // @ts-ignore: @intlayer/backend is not built yet
  GetOrganizationsResult,
  // @ts-ignore: @intlayer/backend is not built yet
  UpdateOrganizationBody,
  // @ts-ignore: @intlayer/backend is not built yet
  UpdateOrganizationResult,
  // @ts-ignore: @intlayer/backend is not built yet
  SelectOrganizationParam,
  // @ts-ignore: @intlayer/backend is not built yet
  SelectOrganizationResult,
  // @ts-ignore: @intlayer/backend is not built yet
  UnselectOrganizationResult,
  // @ts-ignore: @intlayer/backend is not built yet
  UpdateOrganizationMembersBody,
  // @ts-ignore: @intlayer/backend is not built yet
  UpdateOrganizationMembersResult,
  // @ts-ignore: @intlayer/backend is not built yet
  AddOrganizationMemberBody,
  // @ts-ignore: @intlayer/backend is not built yet
  AddOrganizationMemberResult,
  // @ts-ignore @intlayer/backend is not build yet
} from '@intlayer/backend';
import type { IntlayerConfig } from '@intlayer/config/client';
import configuration from '@intlayer/config/built';

import { fetcher, type FetcherOptions } from '../fetcher';

export const getOrganizationAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration--.'
    );
  }

  const ORGANIZATION_API_ROUTE = `${backendURL}/api/organization`;

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
      `${ORGANIZATION_API_ROUTE}/${String(organizationId)}`,
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
   * Update members to the organization in the database.
   * @param body - Updated organization members data.
   */
  const updateOrganizationMembers = async (
    body: UpdateOrganizationMembersBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<UpdateOrganizationMembersResult>(
      `${ORGANIZATION_API_ROUTE}/members`,
      authAPIOptions,
      otherOptions,
      {
        method: 'PUT',
        body,
      }
    );

  /**
   * Add member to the organization in the database.
   * @param body - Updated organization members data.
   */
  const addOrganizationMember = async (
    body: AddOrganizationMemberBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<AddOrganizationMemberResult>(
      `${ORGANIZATION_API_ROUTE}/member`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body,
      }
    );

  /**
   * Deletes an organization from the database by its ID.
   * @param organizationId - Organization ID.
   */
  const deleteOrganization = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<DeleteOrganizationResult>(
      ORGANIZATION_API_ROUTE,
      authAPIOptions,
      otherOptions,
      {
        method: 'DELETE',
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
      `${ORGANIZATION_API_ROUTE}/${String(organizationId)}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'PUT',
      }
    );

  /**
   * Unselect an organization from the database by its ID.
   * @param organizationId - Organization ID.
   */
  const unselectOrganization = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<UnselectOrganizationResult>(
      `${ORGANIZATION_API_ROUTE}/logout`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
      }
    );

  return {
    getOrganizations,
    getOrganization,
    addOrganization,
    addOrganizationMember,
    updateOrganization,
    updateOrganizationMembers,
    deleteOrganization,
    selectOrganization,
    unselectOrganization,
  };
};
