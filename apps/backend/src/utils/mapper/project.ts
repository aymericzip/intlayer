import type { Project, ProjectAPI } from '@/types/project.types';
import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';

/**
 * Maps a project to an API response.
 * @param project - The project to map.
 * @param isProjectAdmin - Whether the user is an admin of the project.
 * @returns The project mapped to an API response.
 */
export const mapProjectToAPI = (project: Project): ProjectAPI => {
  let projectObject = ensureMongoDocumentToObject<Project>(project);

  const { adminsIds, ...projectAPI } = projectObject;
  return projectAPI as ProjectAPI;
};

/**
 * Formats an array of projects for API response. Removes sensitive information.
 * @param projects - The array of project objects to format.
 * @param user - The user object.
 * @param isProjectAdmin - Whether the user is an admin of the project.
 * @returns The formatted array of user objects.
 */
export const mapProjectsToAPI = (projects: Project[]): ProjectAPI[] =>
  projects.map((project) => mapProjectToAPI(project));
