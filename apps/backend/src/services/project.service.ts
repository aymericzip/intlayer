import { logger } from '@logger';
import { ProjectModel } from '@models/project.model';
import type { ProjectFilters } from '@utils/filtersAndPagination/getProjectFiltersAndPagination';
import {
  type ProjectFields,
  validateProject,
} from '@utils/validation/validateProject';
import type { ObjectId } from 'mongoose';
import type { Project, ProjectData } from '@/types/project.types';

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
 * Finds a project by its ID.
 * @param projectId - The ID of the project to find.
 * @returns The project matching the ID.
 */
export const getProjectById = async (
  projectId: string | ObjectId
): Promise<Project> => {
  const project = await ProjectModel.findById(projectId);

  if (!project) {
    const projectIdString = String(projectId);
    const errorMessage = `Project not found - ${projectIdString}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return project;
};

/**
 * Counts the total number of projects that match the filters.
 * @param filters - MongoDB filter query.
 * @returns Total number of projects.
 */
export const countProjects = async (
  filters: ProjectFilters
): Promise<number> => {
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
  const errors = await validateProject(project, ['name']);

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
  projectId: string | ObjectId,
  project: Partial<Project>
): Promise<Project> => {
  const updatedKeys = Object.keys(project) as ProjectFields;
  const errors = validateProject(project, updatedKeys);
  const projectIdString = String(projectId);

  if (Object.keys(errors).length > 0) {
    const errorMessage = `Project invalid fields - ${projectIdString} - ${JSON.stringify(
      errors
    )}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const result = await ProjectModel.updateOne({ _id: projectId }, project);

  if (result.matchedCount === 0) {
    const errorMessage = `Project update failed - ${projectIdString}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return await getProjectById(projectId);
};

/**
 * Deletes a project from the database by its ID.
 * @param projectId - The ID of the project to delete.
 * @returns The result of the deletion operation.
 */
export const deleteProjectById = async (
  projectId: string | ObjectId
): Promise<Project> => {
  const project = await ProjectModel.findByIdAndDelete(projectId);

  if (!project) {
    const projectIdString = String(projectId);
    const errorMessage = `Project not found - ${projectIdString}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return project;
};
