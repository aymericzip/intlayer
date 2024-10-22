/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@logger/index';
import type { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import {
  findProjects as findProjectsService,
  countProjects as countProjectsService,
  createProject as createProjectService,
  getProjectById as getProjectByIdService,
  updateProjectById as updateProjectByIdService,
  deleteProjectById as deleteProjectByIdService,
} from '@services/project.service';
import {
  clearProjectAuth as clearProjectAuthService,
  setProjectAuth as setProjectAuthService,
} from '@services/sessionAuth.service';
import { getUsersByIds as getUsersByIdsService } from '@services/user.service';
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
import type { Request } from 'express';
import type { ObjectId } from 'mongoose';
import { User } from 'oauth2-server';
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
): Promise<void> => {
  const { user, organization } = res.locals;
  const { filters, pageSize, skip, page, getNumberOfPages } =
    getProjectFiltersAndPagination(req);

  if (!user) {
    const errorMessage = 'User not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatPaginatedResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (!organization) {
    const errorMessage = 'Organization not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatPaginatedResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
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

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatPaginatedResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
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
): Promise<void> => {
  const { organization, user } = res.locals;
  const projectData = req.body;

  if (!user) {
    const errorMessage = 'User not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (!organization) {
    const errorMessage = 'Organization not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (!projectData) {
    const errorMessage = 'Project not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  const project: ProjectData = {
    membersIds: [user._id],
    adminsIds: [user._id],
    creatorId: user._id,
    organizationId: organization._id,
    ...projectData,
  };

  try {
    const newProject = await createProjectService(project);

    const responseData = formatResponse<Project>({ data: newProject });

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
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
): Promise<void> => {
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

    res.status(responseCode).json(responseData);
    return;
  }

  if (!organization) {
    const errorMessage = 'Organization not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (project.organizationId !== organization._id) {
    const errorMessage = `You don't have access to this project`;
    const responseCode = HttpStatusCodes.FORBIDDEN_403;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });
    res.status(responseCode).json(responseData);
    return;
  }

  if (typeof project._id === 'undefined') {
    const errorMessage = 'Project id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  try {
    const updatedProject = await updateProjectByIdService(project._id, project);

    const responseData = formatResponse<Project>({ data: updatedProject });

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }
};

type UserAndAdmin = { user: User; isAdmin: boolean };
export type ProjectMemberByIdOption = {
  userId: string | ObjectId;
  isAdmin?: boolean;
};

export type UpdateProjectMembersBody = Partial<{
  membersIds: ProjectMemberByIdOption[];
}>;
export type UpdateProjectMembersResult = ResponseData<Project>;

/**
 * Update members to the dictionary in the database.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the updated dictionary.
 */
export const updateProjectMembers = async (
  req: Request<any, any, UpdateProjectMembersBody>,
  res: ResponseWithInformation<UpdateProjectMembersResult>
): Promise<void> => {
  const { project, isProjectAdmin, organization } = res.locals;
  const { membersIds } = req.body;

  if (!project) {
    const errorMessage = 'Project not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (!isProjectAdmin) {
    const errorMessage = 'User is not admin of the project';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (!organization) {
    const errorMessage = 'Organization not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (membersIds?.length === 0) {
    const errorMessage = 'No members to update';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  try {
    const existingUsers: UserAndAdmin[] = [];

    if (membersIds) {
      const userIdList = membersIds
        ?.filter(
          (member) =>
            // Remove members that are not in the organization
            !organization?.membersIds.includes(member.userId as ObjectId)
        )
        .map((member) => member.userId);

      const users = await getUsersByIdsService(userIdList);

      if (users) {
        const userMap: UserAndAdmin[] = users.map((user) => ({
          user,
          isAdmin:
            membersIds.find((member) => member.userId === user._id)?.isAdmin ??
            false,
        }));

        existingUsers.push(...userMap);
      }
    }

    const formattedMembers: ObjectId[] = existingUsers
      .filter((el) => !el.isAdmin)
      .map((user) => user.user._id);
    const formattedAdmin: ObjectId[] = existingUsers
      .filter((el) => el.isAdmin)
      .map((user) => user.user._id);

    const updatedOrganization = await updateProjectByIdService(project._id, {
      ...project,
      membersIds: formattedMembers,
      adminsIds: formattedAdmin,
    });

    const responseData = formatResponse<Project>({
      data: updatedOrganization,
    });

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }
};

export type DeleteProjectResult = ResponseData<Project>;

/**
 * Deletes a project from the database by its ID.
 * @param req - Express request object.
 * @param  res - Express response object.
 * @returns Response confirming the deletion.
 */
export const deleteProject = async (
  _req: Request,
  res: ResponseWithInformation<DeleteProjectResult>
): Promise<void> => {
  const { organization, project } = res.locals;

  if (!organization) {
    const errorMessage = 'Organization not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  if (!project) {
    const errorMessage = 'Project not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }

  try {
    const projectToDelete = await getProjectByIdService(project._id);

    if (projectToDelete.organizationId !== organization._id) {
      const errorMessage = `You don't have access to this project`;
      const responseCode = HttpStatusCodes.FORBIDDEN_403;
      const responseData = formatResponse<Project>({
        error: errorMessage,
        status: responseCode,
      });
      res.status(responseCode).json(responseData);
      return;
    }

    const deletedProject = await deleteProjectByIdService(project._id);

    if (!deletedProject) {
      const errorMessage = 'Project not found';

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.NOT_FOUND_404;
      const responseData = formatResponse<Project>({
        error: errorMessage,
        status: responseCode,
      });

      res.status(responseCode).json(responseData);
      return;
    }

    logger.info(`Project deleted: ${String(deletedProject._id)}`);

    const responseData = formatResponse<Project>({ data: deletedProject });

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
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

    res.status(responseCode).json(responseData);
    return;
  }

  try {
    const project = await getProjectByIdService(projectId);

    setProjectAuthService(res, project);

    const responseData = formatResponse<Project>({
      data: project,
    });

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<Project>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
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

    res.json(responseData);
    return;
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<null>({
      error: errorMessage,
      status: responseCode,
    });

    res.status(responseCode).json(responseData);
    return;
  }
};
