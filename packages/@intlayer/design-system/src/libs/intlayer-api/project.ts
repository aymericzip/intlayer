import type {
  AddProjectBody,
  AddProjectResult,
  DeleteProjectResult,
  GetProjectsParams,
  GetProjectsResult,
  UpdateProjectBody,
  UpdateProjectResult,
  SelectProjectParam,
  SelectProjectResult,
  UnselectProjectResult,
  AddNewAccessKeyBody,
  AddNewAccessKeyResponse,
  DeleteAccessKeyBody,
  DeleteAccessKeyResponse,
  RefreshAccessKeyBody,
  RefreshAccessKeyResponse,
  UpdateProjectMembersBody,
  UpdateProjectMembersResult,
} from '@intlayer/backend';
import { getConfiguration, type IntlayerConfig } from '@intlayer/config/client';
import { fetcher, type FetcherOptions } from './fetcher';

export const getProjectAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const { backendURL } = (intlayerConfig ?? getConfiguration()).editor;
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
    deleteProject,
    selectProject,
    unselectProject,
    addNewAccessKey,
    deleteAccessKey,
    refreshAccessKey,
  };
};

export const projectAPI = getProjectAPI();
