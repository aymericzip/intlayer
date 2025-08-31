import type {
  Project,
  ProjectAPI,
  ProjectData,
  ProjectDocument,
} from '@/types/project.types';
import { ProjectModel } from '@models/project.model';
import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';
import { GenericError } from '@utils/errors';
import type { ProjectFilters } from '@utils/filtersAndPagination/getProjectFiltersAndPagination';
import { removeObjectKeys } from '@utils/removeObjectKeys';
import {
  type ProjectFields,
  validateProject,
} from '@utils/validation/validateProject';
import type { Types } from 'mongoose';

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
): Promise<ProjectDocument[]> =>
  await ProjectModel.find(filters).skip(skip).limit(limit);

/**
 * Finds a project by its ID.
 * @param projectId - The ID of the project to find.
 * @returns The project matching the ID.
 */
export const getProjectById = async (
  projectId: string | Types.ObjectId
): Promise<ProjectDocument> => {
  const project = await ProjectModel.findById(projectId);

  if (!project) {
    throw new GenericError('PROJECT_NOT_DEFINED', { projectId });
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
    throw new GenericError('PROJECT_COUNT_FAILED', { filters });
  }

  return result;
};

/**
 * Creates a new project in the database.
 * @param  project - The project data to create.
 * @returns The created project.
 */
export const createProject = async (
  project: ProjectData
): Promise<ProjectDocument> => {
  if ((project as Partial<Project>).oAuth2Access) {
    delete (project as Partial<Project>).oAuth2Access;
  }

  const errors = await validateProject(project, ['name']);

  if (Object.keys(errors).length > 0) {
    throw new GenericError('PROJECT_INVALID_FIELDS', { errors });
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
  projectId: string | Types.ObjectId,
  project: Partial<Project | ProjectAPI>
): Promise<ProjectDocument> => {
  const projectObject = ensureMongoDocumentToObject(project);
  const projectToUpdate = removeObjectKeys(projectObject, [
    'id',
    'oAuth2Access',
    'organizationId',
  ]);

  const updatedKeys = Object.keys(projectToUpdate) as ProjectFields;

  const errors = validateProject(project, updatedKeys);

  if (Object.keys(errors).length > 0) {
    throw new GenericError('PROJECT_INVALID_FIELDS', {
      projectId,
      errors,
    });
  }

  const result = await ProjectModel.updateOne(
    { _id: projectId },
    projectToUpdate
  );

  if (result.matchedCount === 0) {
    throw new GenericError('PROJECT_UPDATE_FAILED', { projectId });
  }

  return await getProjectById(projectId);
};

/**
 * Deletes a project from the database by its ID.
 * @param projectId - The ID of the project to delete.
 * @returns The result of the deletion operation.
 */
export const deleteProjectById = async (
  projectId: string | Types.ObjectId
): Promise<ProjectDocument> => {
  const project = await ProjectModel.findByIdAndDelete(projectId);

  if (!project) {
    throw new GenericError('PROJECT_NOT_DEFINED', { projectId });
  }

  return project;
};
