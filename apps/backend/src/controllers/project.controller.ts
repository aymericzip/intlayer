import { logger } from '@logger';
import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
import { SessionModel } from '@models/session.model';
import * as projectService from '@services/project.service';
import * as userService from '@services/user.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  getProjectFiltersAndPagination,
  type ProjectFiltersParams,
} from '@utils/filtersAndPagination/getProjectFiltersAndPagination';
import { mapProjectsToAPI, mapProjectToAPI } from '@utils/mapper/project';
import { hasPermission } from '@utils/permissions';
import { getPlanDetails } from '@utils/plan';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { NextFunction, Request } from 'express';
import { t } from 'express-intlayer';
import type { Types } from 'mongoose';
import type {
  ProjectAPI,
  ProjectConfiguration,
  ProjectCreationData,
  ProjectData,
} from '@/types/project.types';
import type { User } from '@/types/user.types';

export type GetProjectsParams = FiltersAndPagination<ProjectFiltersParams>;
export type GetProjectsResult = PaginatedResponse<ProjectAPI>;

/**
 * Retrieves a list of projects based on filters and pagination.
 */
export const getProjects = async (
  req: Request<GetProjectsParams>,
  res: ResponseWithSession<GetProjectsResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, organization, roles } = res.locals;
  const { filters, sortOptions, pageSize, skip, page, getNumberOfPages } =
    getProjectFiltersAndPagination(req, res);

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!organization && !roles.includes('admin')) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  try {
    const projects = await projectService.findProjects(
      filters,
      skip,
      pageSize,
      sortOptions
    );

    if (
      !hasPermission(
        roles,
        'project:read'
      )({
        ...res.locals,
        targetProjects: projects,
      })
    ) {
      ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
      return;
    }

    const totalItems = await projectService.countProjects(filters);

    const formattedProjects = mapProjectsToAPI(projects);

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
  res: ResponseWithSession<AddProjectResult>,
  _next: NextFunction
): Promise<void> => {
  const { organization, user, roles } = res.locals;
  const projectData = req.body;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (!projectData) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_DATA_NOT_FOUND');
  }

  if (
    !hasPermission(
      roles,
      'organization:admin'
    )({
      ...res.locals,
      targetOrganizations: [organization],
    })
  ) {
    ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
    return;
  }

  const { plan } = organization;

  const planType = getPlanDetails(plan);

  if (planType.numberOfProjects) {
    const projectCount = await projectService.countProjects({
      organizationId: organization.id,
    });

    if (projectCount >= planType.numberOfProjects) {
      ErrorHandler.handleGenericErrorResponse(
        res,
        'PLAN_PROJECT_LIMIT_REACHED',
        {
          organizationId: organization.id,
        }
      );
      return;
    }
  }

  const project: ProjectData = {
    membersIds: [user.id],
    adminsIds: [user.id],
    creatorId: user.id,
    organizationId: organization.id,
    ...projectData,
  };

  try {
    const newProject = await projectService.createProject(project);

    const formattedProject = mapProjectToAPI(newProject);

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

export type UpdateProjectBody = Partial<ProjectAPI>;
export type UpdateProjectResult = ResponseData<ProjectAPI>;

/**
 * Updates an existing project in the database.
 */
export const updateProject = async (
  req: Request<any, any, UpdateProjectBody>,
  res: ResponseWithSession<UpdateProjectResult>,
  _next: NextFunction
): Promise<void> => {
  const { organization, project, user, roles } = res.locals;
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

  if (String(project.organizationId) !== String(organization.id)) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_IN_ORGANIZATION');
    return;
  }

  if (
    !hasPermission(
      roles,
      'project:write'
    )({
      ...res.locals,
      targetProjectIds: [String(project.id)],
    })
  ) {
    ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
    return;
  }

  try {
    const updatedProject = await projectService.updateProjectById(
      project.id,
      projectData
    );

    const formattedProject = mapProjectToAPI(updatedProject);

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
  userId: string | Types.ObjectId;
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
  res: ResponseWithSession<UpdateProjectMembersResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, project, organization, roles } = res.locals;
  const { membersIds } = req.body;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
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

  if (
    !hasPermission(
      roles,
      'project:write'
    )({
      ...res.locals,
      targetProjectIds: [String(project.id)],
    })
  ) {
    ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
    return;
  }

  try {
    const existingUsers: UserAndAdmin[] = [];

    if (membersIds) {
      const userIdList = membersIds
        ?.filter(
          (member) =>
            // Remove members that are not in the organization
            !organization?.membersIds.includes(member.userId as Types.ObjectId)
        )
        .map((member) => member.userId);

      const users = await userService.getUsersByIds(userIdList);

      if (users) {
        const userMap: UserAndAdmin[] = users.map((user) => ({
          user,
          isAdmin:
            membersIds.find(
              (member) => String(member.userId) === String(user.id)
            )?.isAdmin ?? false,
        }));

        existingUsers.push(...userMap);
      }
    }

    const formattedMembers: Types.ObjectId[] = existingUsers.map(
      (user) => user.user.id
    );
    const formattedAdmin: Types.ObjectId[] = existingUsers
      .filter((el) => el.isAdmin)
      .map((user) => user.user.id);

    const updatedOrganization = await projectService.updateProjectById(
      project.id,
      {
        ...project,
        membersIds: formattedMembers,
        adminsIds: formattedAdmin,
      }
    );

    const formattedProject = mapProjectToAPI(updatedOrganization);

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
  res: ResponseWithSession<PushProjectConfigurationResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, project, roles } = res.locals;
  const projectConfiguration = req.body;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
    return;
  }

  if (
    !hasPermission(
      roles,
      'project:write'
    )({
      ...res.locals,
      targetProjectIds: [String(project.id)],
    })
  ) {
    ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
    return;
  }

  try {
    const projectObject = await projectService.getProjectById(project.id);
    projectObject.configuration = projectConfiguration;

    projectObject.save();

    if (!projectObject.configuration) {
      ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_UPDATE_FAILED', {
        projectId: project.id,
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
  res: ResponseWithSession<DeleteProjectResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, organization, project, session, roles } = res.locals;

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

  if (typeof session === 'undefined') {
    ErrorHandler.handleGenericErrorResponse(res, 'SESSION_NOT_DEFINED');
    return;
  }

  if (
    !hasPermission(
      roles,
      'project:admin'
    )({
      ...res.locals,
      targetProjectIds: [String(project.id)],
    })
  ) {
    ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
    return;
  }

  try {
    const projectToDelete = await projectService.getProjectById(project.id);

    if (String(projectToDelete.organizationId) !== String(organization.id)) {
      ErrorHandler.handleGenericErrorResponse(
        res,
        'PROJECT_NOT_IN_ORGANIZATION'
      );
      return;
    }

    const deletedProject = await projectService.deleteProjectById(project.id);

    if (!deletedProject) {
      ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED', {
        projectId: project.id,
      });

      return;
    }

    logger.info(`Project deleted: ${String(deletedProject.id)}`);

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
      data: mapProjectToAPI(deletedProject),
    });

    await SessionModel.updateOne(
      { _id: session.id },
      { $set: { activeProjectId: null } }
    );

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type SelectProjectParam = { projectId: string | Types.ObjectId };
export type SelectProjectResult = ResponseData<ProjectAPI>;

/**
 * Select a project.
 */
export const selectProject = async (
  req: Request<SelectProjectParam>,
  res: ResponseWithSession<SelectProjectResult>,
  _next: NextFunction
) => {
  const { projectId } = req.params;
  const { session } = res.locals;

  if (!projectId) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_ID_NOT_FOUND');
    return;
  }

  if (typeof session === 'undefined') {
    ErrorHandler.handleGenericErrorResponse(res, 'SESSION_NOT_DEFINED');
    return;
  }

  try {
    const project = await projectService.getProjectById(projectId);

    await SessionModel.updateOne(
      { _id: session.id },
      { $set: { activeProjectId: String(projectId) } }
    );

    const responseData = formatResponse<ProjectAPI>({
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
      data: mapProjectToAPI(project),
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
export const unselectProject = async (
  _req: Request,
  res: ResponseWithSession<UnselectProjectResult>,
  _next: NextFunction
) => {
  const { session } = res.locals;

  if (typeof session === 'undefined') {
    ErrorHandler.handleGenericErrorResponse(res, 'SESSION_NOT_DEFINED');
    return;
  }

  try {
    await SessionModel.updateOne(
      { _id: session.id },
      { $set: { activeProjectId: null } }
    );

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
