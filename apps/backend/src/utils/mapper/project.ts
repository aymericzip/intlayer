import { Project, ProjectAPI, ProjectDocument } from '@/types/project.types';

/**
 * Maps a project to an API response.
 * @param project - The project to map.
 * @param isProjectAdmin - Whether the user is an admin of the project.
 * @returns The project mapped to an API response.
 */
export const mapProjectToAPI = (
  project: Project,
  isProjectAdmin: boolean
): ProjectAPI => {
  let projectObject: Project = project;

  // If the project is a mongoose document, convert it to an object
  if (typeof (project as ProjectDocument).toObject === 'function') {
    projectObject = (project as ProjectDocument).toObject();
  }

  if (isProjectAdmin) {
    return projectObject;
  }

  const { adminsIds, ...projectAPI } = projectObject;
  return projectAPI;
};
