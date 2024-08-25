import { logger } from '@logger/index';
import { ProjectModel } from '@models/project.model';
import type { Project, ProjectData } from '@types/project.type';
import type { ProjectFilters } from '@utils/filtersAndPagination/getProjectFiltersAndPagination';
import { validateProject } from '@utils/validation/validateProject';

/**
 * Finds projects based on filters and pagination options.
 * @param filters - MongoDB filter query.
 * @param skip - Number of documents to skip.
 * @param limit - Number of documents to limit.
 * @returns List of projects matching the filters.
 */
export const findProjects = async (
  filters: ProjectFilters,
  skip = 0,
  limit = 100
): Promise<Project[]> => {
  return await ProjectModel.find(filters).skip(skip).limit(limit);
};

/**
 * Counts the total number of projects that match the filters.
 * @param filters - MongoDB filter query.
 * @returns Total number of projects.
 */
export const countProjects = async (filters: object): Promise<number> => {
  const result = await ProjectModel.countDocuments(filters);

  if (typeof result === 'undefined') {
    const errorMessage = 'Project count failed';

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return result;
};

/**
 * Creates a new project in the database.
 * @param  project - The project data to create.
 * @returns The created project.
 */
export const createProject = async (project: ProjectData): Promise<Project> => {
  const errors = await validateProject(project);

  if (Object.keys(errors).length > 0) {
    const errorMessage = `Project invalid fields - ${JSON.stringify(errors)}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return await ProjectModel.create(project);
};

/**
 * Updates an existing project in the database by its ID.
 * @param projectId - The ID of the project to update.
 * @param project - The updated project data.
 * @returns The updated project.
 */
export const updateProjectById = async (
  projectId: string,
  project: Partial<Project>
): Promise<Project> => {
  const errors = validateProject(project);

  if (Object.keys(errors).length > 0) {
    const errorMessage = `Project invalid fields - ${projectId} - ${JSON.stringify(
      errors
    )}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const result = await ProjectModel.updateOne({ _id: projectId }, project);

  if (result.matchedCount === 0) {
    const errorMessage = `Project update failed - ${projectId}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const projects = await findProjects({ ids: projectId }, 0, 1);

  return projects[0];
};

/**
 * Deletes a project from the database by its ID.
 * @param projectId - The ID of the project to delete.
 * @returns The result of the deletion operation.
 */
export const deleteProjectById = async (projectId: string): Promise<object> =>
  await ProjectModel.deleteOne({ _id: projectId });
