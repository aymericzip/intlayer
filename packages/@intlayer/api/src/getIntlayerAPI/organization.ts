import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  AddOrganizationBody,
  AddOrganizationMemberBody,
  AddOrganizationMemberResult,
  AddOrganizationResult,
  DeleteOrganizationResult,
  GetOrganizationsParams,
  GetOrganizationsResult,
  OrganizationRoutes,
  organizationContract,
  SelectOrganizationParam,
  SelectOrganizationResult,
  UnselectOrganizationResult,
  UpdateOrganizationBody,
  UpdateOrganizationMailerConfigBody,
  UpdateOrganizationMailerConfigResult,
  UpdateOrganizationMembersBody,
  UpdateOrganizationMembersResult,
  UpdateOrganizationResult,
} from '@intlayer/backend-contract/organization';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

/** Prefix of the routes, checked against the backend contract. */
const organizationGroup = {
  prefix: '/api/organization',
} as const satisfies Pick<typeof organizationContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const organizationEndpoints = {
  getOrganizations: { method: 'GET', path: '/' },
  addOrganization: { method: 'POST', path: '/' },
  updateOrganization: { method: 'PUT', path: '/' },
  updateOrganizationMailerConfig: { method: 'PUT', path: '/mailer-config' },
  updateOrganizationMembers: { method: 'PUT', path: '/members' },
  updateOrganizationMembersById: {
    method: 'PUT',
    path: '/:organizationId/members',
  },
  addOrganizationMember: { method: 'POST', path: '/member' },
  deleteOrganization: { method: 'DELETE', path: '/' },
  selectOrganization: { method: 'PUT', path: '/:organizationId' },
  unselectOrganization: { method: 'POST', path: '/logout' },
  deleteOrganizationByIdAdmin: {
    method: 'DELETE',
    path: '/:organizationId/admin',
  },
} as const satisfies RouteEndpoints<OrganizationRoutes>;

export const getOrganizationAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  /**
   * Retrieves a list of organizations based on filters and pagination.
   * @param filters - Filters and pagination options.
   */
  const getOrganizations = async (
    filters?: GetOrganizationsParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetOrganizationsResult>(
      buildRouteURL(
        backendURL,
        organizationGroup,
        organizationEndpoints.getOrganizations
      ),
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
        // @ts-ignore Number of parameter will be stringified by the fetcher
        params: filters,
      }
    );

  /**
   * Retrieves an organization by its ID.
   * @param organizationId - Organization ID.
   */
  /**
   * Adds a new organization to the database.
   * @param organization - Organization data.
   */
  const addOrganization = async (
    organization: AddOrganizationBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AddOrganizationResult>(
      buildRouteURL(
        backendURL,
        organizationGroup,
        organizationEndpoints.addOrganization
      ),
      authAPIOptions,
      otherOptions,
      {
        method: organizationEndpoints.addOrganization.method,
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
      buildRouteURL(
        backendURL,
        organizationGroup,
        organizationEndpoints.updateOrganization
      ),
      authAPIOptions,
      otherOptions,
      {
        method: organizationEndpoints.updateOrganization.method,
        body: organization,
      }
    );

  /**
   * Updates the per-organization transactional mailer configuration.
   * @param body - Mailer configuration. Secrets are optional; omit to keep the
   *   value already stored.
   */
  const updateOrganizationMailerConfig = async (
    body: UpdateOrganizationMailerConfigBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<UpdateOrganizationMailerConfigResult>(
      buildRouteURL(
        backendURL,
        organizationGroup,
        organizationEndpoints.updateOrganizationMailerConfig
      ),
      authAPIOptions,
      otherOptions,
      {
        method: organizationEndpoints.updateOrganizationMailerConfig.method,
        body,
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
      buildRouteURL(
        backendURL,
        organizationGroup,
        organizationEndpoints.updateOrganizationMembers
      ),
      authAPIOptions,
      otherOptions,
      {
        method: organizationEndpoints.updateOrganizationMembers.method,
        body,
      }
    );

  /**
   * Admin-only: Update members of any organization by ID
   * @param organizationId - Organization ID
   * @param body - Updated organization members data.
   */
  const updateOrganizationMembersById = async (
    organizationId: string,
    body: UpdateOrganizationMembersBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<UpdateOrganizationMembersResult>(
      buildRouteURL(
        backendURL,
        organizationGroup,
        organizationEndpoints.updateOrganizationMembersById,
        { organizationId: String(organizationId) }
      ),
      authAPIOptions,
      otherOptions,
      {
        method: organizationEndpoints.updateOrganizationMembersById.method,
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
      buildRouteURL(
        backendURL,
        organizationGroup,
        organizationEndpoints.addOrganizationMember
      ),
      authAPIOptions,
      otherOptions,
      {
        method: organizationEndpoints.addOrganizationMember.method,
        body,
      }
    );

  /**
   * Deletes an organization from the database by its ID.
   * @param organizationId - Organization ID.
   */
  const deleteOrganization = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<DeleteOrganizationResult>(
      buildRouteURL(
        backendURL,
        organizationGroup,
        organizationEndpoints.deleteOrganization
      ),
      authAPIOptions,
      otherOptions,
      {
        method: organizationEndpoints.deleteOrganization.method,
      }
    );

  /**
   * Admin-only: Deletes any organization from the database by its ID.
   * @param organizationId - Organization ID.
   */
  const deleteOrganizationByIdAdmin = async (
    organizationId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<DeleteOrganizationResult>(
      buildRouteURL(
        backendURL,
        organizationGroup,
        organizationEndpoints.deleteOrganizationByIdAdmin,
        { organizationId: String(organizationId) }
      ),
      authAPIOptions,
      otherOptions,
      { method: organizationEndpoints.deleteOrganizationByIdAdmin.method }
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
      buildRouteURL(
        backendURL,
        organizationGroup,
        organizationEndpoints.selectOrganization,
        { organizationId: String(organizationId) }
      ),
      authAPIOptions,
      otherOptions,
      {
        method: organizationEndpoints.selectOrganization.method,
      }
    );

  /**
   * Unselect an organization from the database by its ID.
   * @param organizationId - Organization ID.
   */
  const unselectOrganization = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<UnselectOrganizationResult>(
      buildRouteURL(
        backendURL,
        organizationGroup,
        organizationEndpoints.unselectOrganization
      ),
      authAPIOptions,
      otherOptions,
      {
        method: organizationEndpoints.unselectOrganization.method,
      }
    );

  return {
    getOrganizations,
    addOrganization,
    addOrganizationMember,
    updateOrganization,
    updateOrganizationMailerConfig,
    updateOrganizationMembers,
    updateOrganizationMembersById,
    deleteOrganization,
    deleteOrganizationByIdAdmin,
    selectOrganization,
    unselectOrganization,
  };
};

/**
 * Authenticated `organization` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const organizationEndpoint = createEndpoint(getOrganizationAPI);
