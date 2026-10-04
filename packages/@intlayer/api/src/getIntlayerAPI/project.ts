import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  AddNewAccessKeyBody,
  AddNewAccessKeyResponse,
  AddProjectBody,
  AddProjectResult,
  DeleteAccessKeyBody,
  DeleteAccessKeyResponse,
  DeleteProjectResult,
  GetProjectInsightsResult,
  GetProjectsParams,
  GetProjectsResult,
  ProjectRoutes,
  PushProjectConfigurationBody,
  PushProjectConfigurationResult,
  projectContract,
  RefreshAccessKeyBody,
  RefreshAccessKeyResponse,
  SelectProjectParam,
  SelectProjectResult,
  TriggerBuildResult,
  TriggerWebhookBody,
  TriggerWebhookResult,
  UnselectProjectResult,
  UpdateMemberAccessBody,
  UpdateMemberAccessResult,
  UpdateProjectBody,
  UpdateProjectMembersBody,
  UpdateProjectMembersResult,
  UpdateProjectResult,
} from '@intlayer/backend-contract/project';
import type { ResponseData } from '@intlayer/backend-contract/responseData';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

/** Prefix of the project routes, checked against the backend contract. */
const projectGroup = {
  prefix: '/api/project',
} as const satisfies Pick<typeof projectContract, 'prefix'>;

/**
 * Method and path of every project route, checked against the backend
 * contract at compile time (the contract's zod schemas are never loaded).
 */
const projectEndpoints = {
  getProjects: { method: 'GET', path: '/' },
  getProjectInsights: { method: 'GET', path: '/insights' },
  addProject: { method: 'POST', path: '/' },
  updateProject: { method: 'PUT', path: '/' },
  updateProjectMembers: { method: 'PUT', path: '/members' },
  pushProjectConfiguration: { method: 'PUT', path: '/configuration' },
  deleteProject: { method: 'DELETE', path: '/' },
  selectProject: { method: 'PUT', path: '/:projectId' },
  unselectProject: { method: 'POST', path: '/logout' },
  addNewAccessKey: { method: 'POST', path: '/access_key' },
  refreshAccessKey: { method: 'PATCH', path: '/access_key' },
  deleteAccessKey: { method: 'DELETE', path: '/access_key' },
  triggerBuild: { method: 'POST', path: '/build' },
  triggerWebhook: { method: 'POST', path: '/webhook' },
  getCIConfiguration: { method: 'GET', path: '/ci' },
  pushCIConfiguration: { method: 'POST', path: '/ci' },
  deleteProjectByIdAdmin: { method: 'DELETE', path: '/:projectId/admin' },
  updateMemberAccess: { method: 'PUT', path: '/member/:userId/access' },
} as const satisfies RouteEndpoints<ProjectRoutes>;

export const getProjectAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  /**
   * Retrieves a list of projects based on filters and pagination.
   * @param filters - Filters and pagination options.
   */
  const getProjects = async (
    filters?: GetProjectsParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetProjectsResult>(
      buildRouteURL(backendURL, projectGroup, projectEndpoints.getProjects),
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
        method: projectEndpoints.getProjects.method,
        // @ts-ignore Number of parameter will be stringified by the fetcher
        params: filters,
      }
    );

  /**
   * Retrieves aggregated localization insights for the currently selected
   * project (locale/key counts, per-locale completion, missing translations,
   * recent activity, team/config status).
   */
  const getProjectInsights = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetProjectInsightsResult>(
      buildRouteURL(
        backendURL,
        projectGroup,
        projectEndpoints.getProjectInsights
      ),
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
        method: projectEndpoints.getProjectInsights.method,
      }
    );

  /**
   * Adds a new project to the database.
   * @param project - Project data.
   */
  const addProject = async (
    project: AddProjectBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AddProjectResult>(
      buildRouteURL(backendURL, projectGroup, projectEndpoints.addProject),
      authAPIOptions,
      otherOptions,
      {
        method: projectEndpoints.addProject.method,
        body: project,
      }
    );

  /**
   * Updates an existing project in the database.
   * @param project - Updated project data.
   */
  const updateProject = async (
    project: UpdateProjectBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdateProjectResult>(
      buildRouteURL(backendURL, projectGroup, projectEndpoints.updateProject),
      authAPIOptions,
      otherOptions,
      {
        method: projectEndpoints.updateProject.method,
        body: project,
      }
    );

  /**
   * Updates project members in the database.
   * @param project - Updated project data.
   */
  const updateProjectMembers = async (
    body: UpdateProjectMembersBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdateProjectMembersResult>(
      buildRouteURL(
        backendURL,
        projectGroup,
        projectEndpoints.updateProjectMembers
      ),
      authAPIOptions,
      otherOptions,
      {
        method: projectEndpoints.updateProjectMembers.method,
        body,
      }
    );

  /** Pushes a project configuration to the database.
   * @param projectConfiguration - Project configuration data.
   */
  const pushProjectConfiguration = async (
    projectConfiguration: PushProjectConfigurationBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<PushProjectConfigurationResult>(
      buildRouteURL(
        backendURL,
        projectGroup,
        projectEndpoints.pushProjectConfiguration
      ),
      authAPIOptions,
      otherOptions,
      {
        method: projectEndpoints.pushProjectConfiguration.method,
        body: projectConfiguration,
      }
    );

  /**
   * Deletes a project from the database by its ID.
   * @param id - Project ID.
   */
  const deleteProject = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<DeleteProjectResult>(
      buildRouteURL(backendURL, projectGroup, projectEndpoints.deleteProject),
      authAPIOptions,
      otherOptions,
      {
        method: projectEndpoints.deleteProject.method,
      }
    );

  /**
   * Admin-only: Deletes any project from the database by its ID.
   * @param projectId - Project ID.
   */
  const deleteProjectByIdAdmin = async (
    projectId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<DeleteProjectResult>(
      buildRouteURL(
        backendURL,
        projectGroup,
        projectEndpoints.deleteProjectByIdAdmin,
        { projectId }
      ),
      authAPIOptions,
      otherOptions,
      { method: projectEndpoints.deleteProjectByIdAdmin.method }
    );

  /**
   * Select a project from the database by its ID.
   * @param projectId - Organization ID.
   */
  const selectProject = async (
    projectId: SelectProjectParam['projectId'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<SelectProjectResult>(
      buildRouteURL(backendURL, projectGroup, projectEndpoints.selectProject, {
        projectId: String(projectId),
      }),
      authAPIOptions,
      otherOptions,
      {
        method: projectEndpoints.selectProject.method,
      }
    );

  /**
   * Unselect a project from the database by its ID.
   * @param projectId - Project ID.
   */
  const unselectProject = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<UnselectProjectResult>(
      buildRouteURL(backendURL, projectGroup, projectEndpoints.unselectProject),
      authAPIOptions,
      otherOptions,
      {
        method: projectEndpoints.unselectProject.method,
      }
    );

  /**
   * Add a new access key to a project.
   * @param accessKey - Access key data.
   * @param otherOptions - Fetcher options.
   * @returns The new access key.
   */
  const addNewAccessKey = async (
    accessKey: AddNewAccessKeyBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AddNewAccessKeyResponse>(
      buildRouteURL(backendURL, projectGroup, projectEndpoints.addNewAccessKey),
      authAPIOptions,
      otherOptions,
      {
        method: projectEndpoints.addNewAccessKey.method,
        body: accessKey,
      }
    );

  /**
   * Delete a project access key.
   * @param clientId - Access key client ID.
   * @param otherOptions - Fetcher options.
   * @returns The deleted project.
   */
  const deleteAccessKey = async (
    clientId: DeleteAccessKeyBody['clientId'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<DeleteAccessKeyResponse>(
      buildRouteURL(backendURL, projectGroup, projectEndpoints.deleteAccessKey),
      authAPIOptions,
      otherOptions,
      {
        method: projectEndpoints.deleteAccessKey.method,
        body: { clientId },
      }
    );

  /**
   * Refreshes an access key from a project.
   * @param clientId - The ID of the client to refresh.
   * @param projectId - The ID of the project to refresh the access key from.
   * @returns The new access key.
   */
  const refreshAccessKey = async (
    clientId: RefreshAccessKeyBody['clientId'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<RefreshAccessKeyResponse>(
      buildRouteURL(
        backendURL,
        projectGroup,
        projectEndpoints.refreshAccessKey
      ),
      authAPIOptions,
      otherOptions,
      {
        method: projectEndpoints.refreshAccessKey.method,
        body: { clientId },
      }
    );

  /**
   * Triggers CI builds for a project (Git provider pipelines and webhooks).
   * @param otherOptions - Fetcher options.
   * @returns The trigger results.
   */
  const triggerBuild = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<TriggerBuildResult>(
      buildRouteURL(backendURL, projectGroup, projectEndpoints.triggerBuild),
      authAPIOptions,
      otherOptions,
      {
        method: projectEndpoints.triggerBuild.method,
      }
    );

  /**
   * Triggers a single webhook by index.
   * @param webhookIndex - The index of the webhook to trigger.
   * @param otherOptions - Fetcher options.
   * @returns The trigger result.
   */
  const triggerWebhook = async (
    webhookIndex: TriggerWebhookBody['webhookIndex'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<TriggerWebhookResult>(
      buildRouteURL(backendURL, projectGroup, projectEndpoints.triggerWebhook),
      authAPIOptions,
      otherOptions,
      {
        method: projectEndpoints.triggerWebhook.method,
        body: { webhookIndex },
      }
    );

  /**
   * Get CI configuration status for the current project.
   * @param otherOptions - Fetcher options.
   * @returns The CI configuration status.
   */
  const getCIConfig = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<ResponseData<any>>(
      buildRouteURL(
        backendURL,
        projectGroup,
        projectEndpoints.getCIConfiguration
      ),
      authAPIOptions,
      otherOptions,
      {
        method: projectEndpoints.getCIConfiguration.method,
      }
    );

  /**
   * Push CI configuration file to the repository.
   * @param otherOptions - Fetcher options.
   * @returns Success status.
   */
  const pushCIConfig = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<ResponseData<any>>(
      buildRouteURL(
        backendURL,
        projectGroup,
        projectEndpoints.pushCIConfiguration
      ),
      authAPIOptions,
      otherOptions,
      {
        method: projectEndpoints.pushCIConfiguration.method,
      }
    );

  /**
   * Updates granular access constraints for a project member.
   * @param userId - The user ID to update access for.
   * @param body - The new access constraints.
   */
  const updateMemberAccess = async (
    userId: string,
    body: UpdateMemberAccessBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdateMemberAccessResult>(
      buildRouteURL(
        backendURL,
        projectGroup,
        projectEndpoints.updateMemberAccess,
        { userId }
      ),
      authAPIOptions,
      otherOptions,
      { method: projectEndpoints.updateMemberAccess.method, body }
    );

  return {
    getProjects,
    getProjectInsights,
    addProject,
    updateProject,
    updateProjectMembers,
    pushProjectConfiguration,
    deleteProject,
    deleteProjectByIdAdmin,
    selectProject,
    unselectProject,
    addNewAccessKey,
    deleteAccessKey,
    refreshAccessKey,
    triggerBuild,
    triggerWebhook,
    getCIConfig,
    pushCIConfig,
    updateMemberAccess,
  };
};

/**
 * Authenticated `project` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const projectEndpoint = createEndpoint(getProjectAPI);
