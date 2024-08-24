import { logger } from '@logger/index';
import type { ResponseWithInformation } from '@middlewares/auth.middleware';
import type { Project } from '@schemas/project.type';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  getProjectFiltersAndPagination,
  type ProjectFilters,
} from '@utils/filtersAndPagination/getProjectFiltersAndPagination';
import type { Request, Response } from 'express';
import {
  findProjects,
  countProjects,
  createProject,
  updateProjectById,
  deleteProjectById,
} from '@/services/project.service';

/**
 * Retrieves a list of projects based on filters and pagination.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the list of projects and pagination details.
 */
export const getProjects = async (
  req: Request<FiltersAndPagination<ProjectFilters>>,
  res: ResponseWithInformation
): Promise<Response> => {
  const { filters, pageSize, skip, page, getNumberOfPages } =
    getProjectFiltersAndPagination(req);

  try {
    const projects = await findProjects(filters, skip, pageSize);
    const totalItems = await countProjects(filters);

    return res.status(200).json({
      success: true,
      data: projects,
      page,
      page_size: pageSize,
      total_pages: getNumberOfPages(totalItems),
      total_items: totalItems,
    });
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    return res.status(500).json({ success: false, message: errorMessage });
  }
};

/**
 * Adds a new project to the database.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the created project.
 */
export const addProject = async (
  req: Request<any, any, Project | undefined>,
  res: ResponseWithInformation
): Promise<Response> => {
  const project: Project | undefined = req.body;

  if (!project) {
    const errorMessage = 'Project not found';

    logger.error(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const newProject = await createProject(project);
    return res.status(200).json(newProject);
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    return res.status(500).json({ success: false, message: errorMessage });
  }
};

/**
 * Updates an existing project in the database.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the updated project.
 */
export const updateProject = async (
  req: Request<any, any, Project | undefined>,
  res: ResponseWithInformation
): Promise<Response> => {
  const project: Project | undefined = req.body;

  if (!project) {
    const errorMessage = 'Project not found';

    logger.error(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const updatedProject = await updateProjectById(project._id, project);
    return res.status(200).json(updatedProject);
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    return res.status(500).json({ success: false, message: errorMessage });
  }
};

/**
 * Deletes a project from the database by its ID.
 * @param req - Express request object.
 * @param  res - Express response object.
 * @returns Response confirming the deletion.
 */
export const deleteProject = async (
  req: Request,
  res: ResponseWithInformation
): Promise<Response> => {
  const projectId = req.params.projectId;

  try {
    const deletedProject = await deleteProjectById(projectId);
    return res.status(200).json(deletedProject);
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    return res.status(500).json({ success: false, message: errorMessage });
  }
};
