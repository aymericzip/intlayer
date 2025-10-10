import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { type FetcherOptions, fetcher } from '../fetcher';
import type {
  AddNewAccessKeyBody,
  AddNewAccessKeyResponse,
  AddProjectBody,
  AddProjectResult,
  DeleteAccessKeyBody,
  DeleteAccessKeyResponse,
  DeleteProjectResult,
  GetProjectsParams,
  GetProjectsResult,
  PushProjectConfigurationBody,
  PushProjectConfigurationResult,
  RefreshAccessKeyBody,
  RefreshAccessKeyResponse,
  SelectProjectParam,
  SelectProjectResult,
  UnselectProjectResult,
  UpdateProjectBody,
  UpdateProjectMembersBody,
  UpdateProjectMembersResult,
  UpdateProjectResult,
} from '../types';

export const getProjectAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }

  const PROJECT_API_ROUTE = `${backendURL}/api/project`;

  /**
   * Retrieves a list of projects based on filters and pagination.
   * @param filters - Filters and pagination options.
   */
  const getProjects = async (
    filters?: GetProjectsParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetProjectsResult>(
      PROJECT_API_ROUTE,
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
        // @ts-ignore Number of parameter will be stringified by the fetcher
        params: filters,
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
      `${PROJECT_API_ROUTE}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
      `${PROJECT_API_ROUTE}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'PUT',
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
      `${PROJECT_API_ROUTE}/members`,
      authAPIOptions,
      otherOptions,
      {
        method: 'PUT',
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
      `${PROJECT_API_ROUTE}/configuration`,
      authAPIOptions,
      otherOptions,
      {
        method: 'PUT',
        body: projectConfiguration,
      }
    );

  /**
   * Deletes a project from the database by its ID.
   * @param id - Project ID.
   */
  const deleteProject = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<DeleteProjectResult>(
      `${PROJECT_API_ROUTE}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'DELETE',
      }
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
      `${PROJECT_API_ROUTE}/${String(projectId)}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'PUT',
      }
    );

  /**
   * Unselect a project from the database by its ID.
   * @param projectId - Project ID.
   */
  const unselectProject = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<UnselectProjectResult>(
      `${PROJECT_API_ROUTE}/logout`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
      `${PROJECT_API_ROUTE}/access_key`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
      `${PROJECT_API_ROUTE}/access_key`,
      authAPIOptions,
      otherOptions,
      {
        method: 'DELETE',
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
      `${PROJECT_API_ROUTE}/access_key`,
      authAPIOptions,
      otherOptions,
      {
        method: 'PATCH',
        body: { clientId },
      }
    );

  return {
    getProjects,
    addProject,
    updateProject,
    updateProjectMembers,
    pushProjectConfiguration,
    deleteProject,
    selectProject,
    unselectProject,
    addNewAccessKey,
    deleteAccessKey,
    refreshAccessKey,
  };
};
