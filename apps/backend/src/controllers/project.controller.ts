import { logger } from '@logger/index';
import type { ResponseWithInformation } from '@middlewares/auth.middleware';
import {
  clearProjectAuth as clearProjectAuthService,
  setProjectAuth as setProjectAuthService,
} from '@services/auth.service';
import {
  findProjects as findProjectsService,
  countProjects as countProjectsService,
  createProject as createProjectService,
  getProjectById as getProjectByIdService,
  updateProjectById as updateProjectByIdService,
  deleteProjectById as deleteProjectByIdService,
} from '@services/project.service';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  getProjectFiltersAndPagination,
  type ProjectFilters,
  type ProjectFiltersParams,
} from '@utils/filtersAndPagination/getProjectFiltersAndPagination';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import {
  formatPaginatedResponse,
  type ResponseData,
  type PaginatedResponse,
  formatResponse,
} from '@utils/responseData';
import type { Request, Response } from 'express';
import type { ObjectId } from 'mongoose';
import type {
  Project,
  ProjectCreationData,
  ProjectData,
} from '@/types/project.types';

export type GetProjectsParams = FiltersAndPagination<ProjectFiltersParams>;
export type GetProjectsResult = PaginatedResponse<Project>;

/**
 * Retrieves a list of projects based on filters and pagination.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the list of projects and pagination details.
 */
export const getProjects = async (
  req: Request<GetProjectsParams>,
  res: ResponseWithInformation<GetProjectsResult>
): Promise<Response> => {
  const { user, organization } = res.locals;
  const { filters, pageSize, skip, page, getNumberOfPages } =
    getProjectFiltersAndPagination(req);

  if (!organization) {
    const errorMessage = 'Organization not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatPaginatedResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  const restrictedFilter: ProjectFilters = {
    ...filters,
    members: { $in: [...(filters.members ?? []), String(user._id)] },
    organizationId: String(organization._id),
  };

  try {
    const projects = await findProjectsService(
      restrictedFilter,
      skip,
      pageSize
    );
    const totalItems = await countProjectsService(filters);

    const responseData = formatPaginatedResponse<Project>({
      data: projects,
      page,
      pageSize,
      totalPages: getNumberOfPages(totalItems),
      totalItems,
    });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatPaginatedResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type AddProjectBody = ProjectCreationData;
export type AddProjectResult = ResponseData<Project>;

/**
 * Adds a new project to the database.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the created project.
 */
export const addProject = async (
  req: Request<any, any, AddProjectBody>,
  res: ResponseWithInformation<AddProjectResult>
): Promise<Response> => {
  const { organization, user } = res.locals;
  const projectData = req.body;

  if (!projectData) {
    const errorMessage = 'Project not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  const project: ProjectData = {
    members: [user._id],
    creatorId: user._id,
    organizationId: organization._id,
    ...projectData,
  };

  try {
    const newProject = await createProjectService(project);

    const responseData = formatResponse<Project>({ data: newProject });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type UpdateProjectBody = Partial<Project>;
export type UpdateProjectResult = ResponseData<Project>;

/**
 * Updates an existing project in the database.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the updated project.
 */
export const updateProject = async (
  req: Request<any, any, UpdateProjectBody>,
  res: ResponseWithInformation<UpdateProjectResult>
): Promise<Response> => {
  const { organization } = res.locals;
  const project = req.body;

  if (!project) {
    const errorMessage = 'Project not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  if (project.organizationId !== organization._id) {
    const errorMessage = `You don't have access to this project`;
    const responseCode = HttpStatusCodes.FORBIDDEN_403;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });
    return res.status(responseCode).json(responseData);
  }

  if (typeof project._id === 'undefined') {
    const errorMessage = 'Project id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  try {
    const updatedProject = await updateProjectByIdService(project._id, project);

    const responseData = formatResponse<Project>({ data: updatedProject });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type DeleteProjectParam = { projectId: string };
export type DeleteProjectResult = ResponseData<Project>;

/**
 * Deletes a project from the database by its ID.
 * @param req - Express request object.
 * @param  res - Express response object.
 * @returns Response confirming the deletion.
 */
export const deleteProject = async (
  req: Request<DeleteProjectParam>,
  res: ResponseWithInformation<DeleteProjectResult>
): Promise<Response> => {
  const { organization } = res.locals;
  const { projectId } = req.params as Partial<DeleteProjectParam>;

  if (!projectId) {
    const errorMessage = 'Project id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  try {
    const projectToDelete = await getProjectByIdService(projectId);

    if (projectToDelete.organizationId !== organization._id) {
      const errorMessage = `You don't have access to this project`;
      const responseCode = HttpStatusCodes.FORBIDDEN_403;
      const responseData = formatResponse<Project>({
        error: errorMessage,
        status: responseCode,
      });
      return res.status(responseCode).json(responseData);
    }

    const deletedProject = await deleteProjectByIdService(projectId);

    logger.info(`Project deleted: ${deletedProject._id}`);

    const responseData = formatResponse<Project>({ data: deletedProject });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type SelectProjectParam = { projectId: ObjectId | string };
export type SelectProjectResult = ResponseData<Project>;

/**
 * Select a project.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response confirming the deletion.
 */
export const selectProject = async (
  req: Request<SelectProjectParam>,
  res: ResponseWithInformation<SelectProjectResult>
) => {
  const { projectId } = req.params;

  if (!projectId) {
    const errorMessage = 'Project id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  try {
    const project = await getProjectByIdService(projectId);

    setProjectAuthService(res, project);

    const responseData = formatResponse<Project>({
      data: project,
    });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type UnselectProjectResult = ResponseData<null>;

/**
 * Unselect a project.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response confirming the deletion.
 */
export const unselectProject = (
  _req: Request,
  res: ResponseWithInformation<UnselectProjectResult>
) => {
  try {
    clearProjectAuthService(res);

    const responseData = formatResponse<null>({
      data: null,
    });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<null>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};
