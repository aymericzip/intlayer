import type { Project, ProjectAPI } from '@/types/project.types';
import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';

/**
 * Maps a project to an API response.
 * @param project - The project to map.
 * @param  - Whether the user is an admin of the project.
 * @returns The project mapped to an API response.
 */
export const mapProjectToAPI = <T extends Project | ProjectAPI | null>(
  project?: T
): T extends null ? null : ProjectAPI => {
  if (!project) {
    return null as any;
  }

  const projectObject = ensureMongoDocumentToObject(project);

  const { adminsIds, ...projectAPI } = projectObject;
  return projectAPI as any;
};

/**
 * Formats an array of projects for API response. Removes sensitive information.
 * @param projects - The array of project objects to format.
 * @param user - The user object.
 * @param  - Whether the user is an admin of the project.
 * @returns The formatted array of user objects.
 */
export const mapProjectsToAPI = (
  projects: (Project | ProjectAPI)[]
): ProjectAPI[] =>
  projects.map(mapProjectToAPI).filter(Boolean) as ProjectAPI[];
