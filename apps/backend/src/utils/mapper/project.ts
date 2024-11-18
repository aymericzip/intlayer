import { Project, ProjectAPI, ProjectDocument } from '@/types/project.types';
import { User } from '@/types/user.types';

/**
 * Maps a project to an API response.
 * @param project - The project to map.
 * @param isProjectAdmin - Whether the user is an admin of the project.
 * @returns The project mapped to an API response.
 */
export const mapProjectToAPI = (
  project: Project,
  user: User | null,
  isProjectAdmin: boolean | null
): ProjectAPI => {
  let projectObject: Project = project;

  // If the project is a mongoose document, convert it to an object
  if (typeof (project as ProjectDocument).toObject === 'function') {
    projectObject = (project as ProjectDocument).toObject();
  }

  projectObject = {
    ...projectObject,
    oAuth2Access: projectObject.oAuth2Access
      .filter((token) => token.userId !== user?._id)
      .map((token) => {
        const isJustUpdated =
          new Date().getTime() - new Date(token.updatedAt).getTime() <
          1000 * 60 * 5; // 5 min

        if (isJustUpdated) {
          return token;
        }

        return {
          ...token,
          clientSecret: `${token.clientSecret.substring(0, 10)}${'*'.repeat(token.clientSecret.length - 10)}`,
        };
      }),
  };

  if (isProjectAdmin) {
    return projectObject;
  }

  const { adminsIds, ...projectAPI } = projectObject;
  return projectAPI;
};

/**
 * Formats an array of projects for API response. Removes sensitive information.
 * @param projects - The array of project objects to format.
 * @param user - The user object.
 * @param isProjectAdmin - Whether the user is an admin of the project.
 * @returns The formatted array of user objects.
 */
export const mapProjectsToAPI = (
  projects: Project[],
  user: User,
  isProjectAdmin: boolean | null
): ProjectAPI[] =>
  projects.map((project) => mapProjectToAPI(project, user, isProjectAdmin));
