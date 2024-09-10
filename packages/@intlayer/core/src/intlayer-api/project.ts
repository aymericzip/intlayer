import type {
  AddProjectBody,
  AddProjectResult,
  DeleteProjectParam,
  DeleteProjectResult,
  GetProjectsParams,
  GetProjectsResult,
  UpdateProjectBody,
  UpdateProjectResult,
} from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config/client';
import { fetcher } from './fetcher';

const backendURL = getConfiguration().editor.backendURL;
const PROJECT_API_ROUTE = `${backendURL}/api/project`;

/**
 * Retrieves a list of projects based on filters and pagination.
 * @param filters - Filters and pagination options.
 */
const getProjects = async (filters?: GetProjectsParams) =>
  await fetcher<GetProjectsResult>(PROJECT_API_ROUTE, {
    params: filters,
  });

/**
 * Adds a new project to the database.
 * @param project - Project data.
 */
const addProject = async (project: AddProjectBody) =>
  await fetcher<AddProjectResult>(`${PROJECT_API_ROUTE}`, {
    method: 'POST',
    body: project,
  });

/**
 * Updates an existing project in the database.
 * @param project - Updated project data.
 */
const updateProject = async (project: UpdateProjectBody) =>
  await fetcher<UpdateProjectResult>(`${PROJECT_API_ROUTE}`, {
    method: 'PUT',
    body: project,
  });

/**
 * Deletes a project from the database by its ID.
 * @param id - Project ID.
 */
const deleteProject = async (id: DeleteProjectParam['projectId']) =>
  await fetcher<DeleteProjectResult>(`${PROJECT_API_ROUTE}`, {
    method: 'DELETE',
    body: { id },
  });

export const projectAPI = {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
};
