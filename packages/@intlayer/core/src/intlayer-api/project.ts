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

const backendURL = getConfiguration().editor.backendURL;
const PROJECT_API_ROUTE = `${backendURL}/api/project`;

/**
 * Retrieves a list of projects based on filters and pagination.
 * @param filters - Filters and pagination options.
 */
const getProjects = async (
  filters?: GetProjectsParams
): Promise<GetProjectsResult> => {
  const params = new URLSearchParams(filters);

  const response = await fetch(`${PROJECT_API_ROUTE}?${params.toString()}`, {
    method: 'GET',
  });
  return response.json();
};

/**
 * Adds a new project to the database.
 * @param project - Project data.
 */
const addProject = async (
  project: AddProjectBody
): Promise<AddProjectResult> => {
  const response = await fetch(`${PROJECT_API_ROUTE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
    credentials: 'include',
  });
  return response.json();
};

/**
 * Updates an existing project in the database.
 * @param project - Updated project data.
 */
const updateProject = async (
  project: UpdateProjectBody
): Promise<UpdateProjectResult> => {
  const response = await fetch(`${PROJECT_API_ROUTE}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
    credentials: 'include',
  });
  return response.json();
};

/**
 * Deletes a project from the database by its ID.
 * @param id - Project ID.
 */
const deleteProject = async (
  id: DeleteProjectParam['projectId']
): Promise<DeleteProjectResult> => {
  const response = await fetch(`${PROJECT_API_ROUTE}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
    credentials: 'include',
  });
  return response.json();
};

export const projectAPI = {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
};
