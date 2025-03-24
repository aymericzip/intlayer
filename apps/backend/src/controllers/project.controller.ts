import type {
  Project,
  ProjectAPI,
  ProjectConfiguration,
  ProjectCreationData,
  ProjectData,
} from '@/types/project.types';
import { logger } from '@logger';
import type { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import * as projectService from '@services/project.service';
import * as sessionAuthService from '@services/sessionAuth.service';
import * as userService from '@services/user.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  getProjectFiltersAndPagination,
  type ProjectFilters,
  type ProjectFiltersParams,
} from '@utils/filtersAndPagination/getProjectFiltersAndPagination';
import { mapProjectsToAPI, mapProjectToAPI } from '@utils/mapper/project';
import { getPLanDetails } from '@utils/plan';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { NextFunction, Request } from 'express';
import { t } from 'express-intlayer';
import type { ObjectId } from 'mongoose';
import type { User } from 'oauth2-server';

export type GetProjectsParams = FiltersAndPagination<ProjectFiltersParams>;
export type GetProjectsResult = PaginatedResponse<ProjectAPI>;

/**
 * Retrieves a list of projects based on filters and pagination.
 */
export const getProjects = async (
  req: Request<GetProjectsParams>,
  res: ResponseWithInformation<GetProjectsResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, organization, projectRights } = res.locals;
  const { filters, pageSize, skip, page, getNumberOfPages } =
    getProjectFiltersAndPagination(req);

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (!projectRights?.read) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_RIGHTS_NOT_READ');
    return;
  }

  const restrictedFilter: ProjectFilters = {
    ...filters,
    membersIds: { $in: [...(filters.membersIds ?? []), String(user._id)] },
    organizationId: String(organization._id),
  };

  try {
    const projects = await projectService.findProjects(
      restrictedFilter,
      skip,
      pageSize
    );
    const totalItems = await projectService.countProjects(filters);

    const formattedProjects = mapProjectsToAPI(
      projects,
      user,
      res.locals.isProjectAdmin
    );

    const responseData = formatPaginatedResponse<ProjectAPI>({
      data: formattedProjects,
      page,
      pageSize,
      totalPages: getNumberOfPages(totalItems),
      totalItems,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type AddProjectBody = ProjectCreationData;
export type AddProjectResult = ResponseData<ProjectAPI>;

/**
 * Adds a new project to the database.
 */
export const addProject = async (
  req: Request<any, any, AddProjectBody>,
  res: ResponseWithInformation<AddProjectResult>,
  _next: NextFunction
): Promise<void> => {
  const { organization, user, isOrganizationAdmin } = res.locals;
  const projectData = req.body;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (!isOrganizationAdmin) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'USER_IS_NOT_ADMIN_OF_ORGANIZATION'
    );
  }

  if (!projectData) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_DATA_NOT_FOUND');
  }

  const { plan } = organization;

  const planType = getPLanDetails(plan);

  if (planType.numberOfProjects) {
    const projectCount = await projectService.countProjects({
      organizationId: organization._id,
    });

    if (projectCount >= planType.numberOfProjects) {
      ErrorHandler.handleGenericErrorResponse(
        res,
        'PLAN_PROJECT_LIMIT_REACHED',
        {
          organizationId: organization._id,
        }
      );
      return;
    }
  }

  const project: ProjectData = {
    membersIds: [user._id],
    adminsIds: [user._id],
    creatorId: user._id,
    organizationId: organization._id,
    ...projectData,
  };

  try {
    const newProject = await projectService.createProject(project);

    const formattedProject = mapProjectToAPI(newProject, user, true);

    const responseData = formatResponse<ProjectAPI>({
      message: t({
        en: 'Project created successfully',
        fr: 'Projet créé avec succès',
        es: 'Proyecto creado con éxito',
      }),
      description: t({
        en: 'Your project has been created successfully',
        fr: 'Votre projet a été créé avec succès',
        es: 'Su proyecto ha sido creado con éxito',
      }),
      data: formattedProject,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type UpdateProjectBody = Partial<Project>;
export type UpdateProjectResult = ResponseData<ProjectAPI>;

/**
 * Updates an existing project in the database.
 */
export const updateProject = async (
  req: Request<any, any, UpdateProjectBody>,
  res: ResponseWithInformation<UpdateProjectResult>,
  _next: NextFunction
): Promise<void> => {
  const { organization, projectRights, project, user, isProjectAdmin } =
    res.locals;
  const projectData = req.body;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_DATA_NOT_FOUND');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (!isProjectAdmin) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_RIGHTS_NOT_ADMIN');
    return;
  }

  if (!projectRights?.write) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_RIGHTS_NOT_WRITE');
    return;
  }

  if (String(project.organizationId) !== String(organization._id)) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_IN_ORGANIZATION');
    return;
  }

  try {
    const updatedProject = await projectService.updateProjectById(
      project._id,
      projectData
    );

    const formattedProject = mapProjectToAPI(
      updatedProject,
      user,
      isProjectAdmin
    );

    const responseData = formatResponse<ProjectAPI>({
      message: t({
        en: 'Project updated successfully',
        fr: 'Projet mis à jour avec succès',
        es: 'Proyecto actualizado con éxito',
      }),
      description: t({
        en: 'Your project has been updated successfully',
        fr: 'Votre projet a été mis à jour avec succès',
        es: 'Su proyecto ha sido actualizado con éxito',
      }),
      data: formattedProject,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
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
export type UpdateProjectMembersResult = ResponseData<ProjectAPI>;

/**
 * Update members to the dictionary in the database.
 */
export const updateProjectMembers = async (
  req: Request<any, any, UpdateProjectMembersBody>,
  res: ResponseWithInformation<UpdateProjectMembersResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, project, isProjectAdmin, organization, projectRights } =
    res.locals;
  const { membersIds } = req.body;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
    return;
  }

  if (!isProjectAdmin) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'USER_IS_NOT_ADMIN_OF_PROJECT'
    );
    return;
  }

  if (!projectRights?.admin) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_RIGHTS_NOT_ADMIN');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (membersIds?.length === 0) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_MUST_HAVE_MEMBER');
    return;
  }

  if (membersIds?.map((el) => el.isAdmin)?.length === 0) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_MUST_HAVE_ADMIN');
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

      const users = await userService.getUsersByIds(userIdList);

      if (users) {
        const userMap: UserAndAdmin[] = users.map((user) => ({
          user,
          isAdmin:
            membersIds.find(
              (member) => String(member.userId) === String(user._id)
            )?.isAdmin ?? false,
        }));

        existingUsers.push(...userMap);
      }
    }

    const formattedMembers: ObjectId[] = existingUsers.map(
      (user) => user.user._id
    );
    const formattedAdmin: ObjectId[] = existingUsers
      .filter((el) => el.isAdmin)
      .map((user) => user.user._id);

    const updatedOrganization = await projectService.updateProjectById(
      project._id,
      {
        ...project,
        membersIds: formattedMembers,
        adminsIds: formattedAdmin,
      }
    );

    const formattedProject = mapProjectToAPI(
      updatedOrganization,
      user,
      isProjectAdmin
    );

    const responseData = formatResponse<ProjectAPI>({
      message: t({
        en: 'Project members updated successfully',
        fr: 'Membres du projet mis à jour avec succès',
        es: 'Miembros del proyecto actualizados con éxito',
      }),
      description: t({
        en: 'Your project members have been updated successfully',
        fr: 'Les membres de votre projet ont été mis à jour avec succès',
        es: 'Los miembros de su proyecto han sido actualizados con éxito',
      }),
      data: formattedProject,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type PushProjectConfigurationBody = ProjectConfiguration;
export type PushProjectConfigurationResult = ResponseData<ProjectConfiguration>;

/**
 * Pushes a project configuration to the database.
 * @param req - Express request object.
 * @param  res - Express response object.
 * @returns Response confirming the deletion.
 */
export const pushProjectConfiguration = async (
  req: Request<any, any, PushProjectConfigurationBody>,
  res: ResponseWithInformation<PushProjectConfigurationResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, project } = res.locals;
  const projectConfiguration = req.body;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
    return;
  }

  try {
    const projectObject = await projectService.getProjectById(project._id);
    projectObject.configuration = projectConfiguration;

    projectObject.save();

    if (!projectObject.configuration) {
      ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_UPDATE_FAILED', {
        projectId: project._id,
      });
      return;
    }

    const responseData = formatResponse<ProjectConfiguration>({
      message: t({
        en: 'Project configuration updated successfully',
        fr: 'Configuration du projet mise à jour avec succès',
        es: 'Configuración del proyecto actualizada con éxito',
      }),
      description: t({
        en: 'Your project configuration has been updated successfully',
        fr: 'La configuration du projet a été mise à jour avec succès',
        es: 'Su configuración del proyecto ha sido actualizada con éxito',
      }),
      data: projectObject.configuration,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type DeleteProjectResult = ResponseData<ProjectAPI>;

/**
 * Deletes a project from the database by its ID.
 * @param req - Express request object.
 * @param  res - Express response object.
 * @returns Response confirming the deletion.
 */
export const deleteProject = async (
  _req: Request,
  res: ResponseWithInformation<DeleteProjectResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, organization, project, projectRights, isProjectAdmin } =
    res.locals;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
    return;
  }

  if (!projectRights?.admin) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_RIGHTS_NOT_ADMIN');
    return;
  }

  try {
    const projectToDelete = await projectService.getProjectById(project._id);

    if (String(projectToDelete.organizationId) !== String(organization._id)) {
      ErrorHandler.handleGenericErrorResponse(
        res,
        'PROJECT_NOT_IN_ORGANIZATION'
      );
      return;
    }

    const deletedProject = await projectService.deleteProjectById(project._id);

    if (!deletedProject) {
      ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED', {
        projectId: project._id,
      });

      return;
    }

    logger.info(`Project deleted: ${String(deletedProject._id)}`);

    const formattedProject = mapProjectToAPI(
      deletedProject,
      user,
      isProjectAdmin
    );

    const responseData = formatResponse<ProjectAPI>({
      message: t({
        en: 'Project deleted successfully',
        fr: 'Projet supprimé avec succès',
        es: 'Proyecto eliminado con éxito',
      }),
      description: t({
        en: 'Your project has been deleted successfully',
        fr: 'Votre projet a été supprimé avec succès',
        es: 'Su proyecto ha sido eliminado con éxito',
      }),
      data: formattedProject,
    });

    sessionAuthService.clearProjectAuth(res);

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type SelectProjectParam = { projectId: ObjectId | string };
export type SelectProjectResult = ResponseData<Project>;

/**
 * Select a project.
 */
export const selectProject = async (
  req: Request<SelectProjectParam>,
  res: ResponseWithInformation<SelectProjectResult>,
  _next: NextFunction
) => {
  const { projectId } = req.params;

  if (!projectId) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_ID_NOT_FOUND');
    return;
  }

  try {
    const project = await projectService.getProjectById(projectId);

    sessionAuthService.setProjectAuth(res, project);

    const responseData = formatResponse<Project>({
      message: t({
        en: 'Project selected successfully',
        fr: 'Projet sélectionné avec succès',
        es: 'Proyecto seleccionado con éxito',
      }),
      description: t({
        en: 'Your project has been selected successfully',
        fr: 'Votre projet a été sélectionné avec succès',
        es: 'Su proyecto ha sido seleccionado con éxito',
      }),
      data: project,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type UnselectProjectResult = ResponseData<null>;

/**
 * Unselect a project.
 */
export const unselectProject = (
  _req: Request,
  res: ResponseWithInformation<UnselectProjectResult>,
  _next: NextFunction
) => {
  try {
    sessionAuthService.clearProjectAuth(res);

    const responseData = formatResponse<null>({
      message: t({
        en: 'Project unselected successfully',
        fr: 'Projet désélectionné avec succès',
        es: 'Proyecto deseleccionado con éxito',
      }),
      description: t({
        en: 'Your project has been unselected successfully',
        fr: 'Votre projet a été désélectionné avec succès',
        es: 'Su proyecto ha sido deseleccionado con éxito',
      }),
      data: null,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
