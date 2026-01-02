import { logger } from '@logger';
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
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
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
  request: FastifyRequest<{ Querystring: GetProjectsParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, organization, roles } = request.locals || {};
  const { filters, sortOptions, pageSize, skip, page, getNumberOfPages } =
    getProjectFiltersAndPagination(request);

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!organization && !roles?.includes('admin')) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
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
        roles || [],
        'project:read'
      )({
        ...request.locals,
        targetProjects: projects,
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
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

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type AddProjectBody = ProjectCreationData;
export type AddProjectResult = ResponseData<ProjectAPI>;

/**
 * Adds a new project to the database.
 */
export const addProject = async (
  request: FastifyRequest<{ Body: AddProjectBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { organization, user, roles } = request.locals || {};
  const projectData = request.body;

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  if (!projectData) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_DATA_NOT_FOUND'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'organization:admin'
    )({
      ...request.locals,
      targetOrganizations: [organization],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const { plan } = organization;

  const planType = getPlanDetails(plan);

  if (planType.numberOfProjects) {
    const projectCount = await projectService.countProjects({
      organizationId: organization.id,
    });

    if (projectCount >= planType.numberOfProjects) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PLAN_PROJECT_LIMIT_REACHED',
        {
          organizationId: organization.id,
        }
      );
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

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type UpdateProjectBody = Partial<ProjectAPI>;
export type UpdateProjectResult = ResponseData<ProjectAPI>;

/**
 * Updates an existing project in the database.
 */
export const updateProject = async (
  request: FastifyRequest<{ Body: UpdateProjectBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { organization, project, user, roles } = request.locals || {};
  const projectData = request.body;

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_DATA_NOT_FOUND'
    );
  }

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  if (String(project.organizationId) !== String(organization.id)) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_IN_ORGANIZATION'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.locals,
      targetProjectIds: [String(project.id)],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
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

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
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
  request: FastifyRequest<{ Body: UpdateProjectMembersBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, organization, roles } = request.locals || {};
  const { membersIds } = request.body;

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  if (membersIds?.length === 0) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_MUST_HAVE_MEMBER'
    );
  }

  if (membersIds?.map((el) => el.isAdmin)?.length === 0) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_MUST_HAVE_ADMIN'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.locals,
      targetProjectIds: [String(project.id)],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
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

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type PushProjectConfigurationBody = ProjectConfiguration;
export type PushProjectConfigurationResult = ResponseData<ProjectConfiguration>;

/**
 * Pushes a project configuration to the database.
 */
export const pushProjectConfiguration = async (
  request: FastifyRequest<{ Body: PushProjectConfigurationBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, roles } = request.locals || {};
  const projectConfiguration = request.body;

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.locals,
      targetProjectIds: [String(project.id)],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const projectObject = await projectService.getProjectById(project.id);

    // Preserve existing API key if not provided in the update
    if (
      projectConfiguration.ai &&
      projectObject.configuration?.ai?.apiKey &&
      (!projectConfiguration.ai.apiKey ||
        projectConfiguration.ai.apiKey.trim() === '')
    ) {
      projectConfiguration.ai.apiKey = projectObject.configuration.ai.apiKey;
    }

    projectObject.configuration = projectConfiguration;

    await projectObject.save();

    if (!projectObject.configuration) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PROJECT_UPDATE_FAILED',
        {
          projectId: project.id,
        }
      );
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
      data: mapProjectToAPI(projectObject) as ProjectConfiguration,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type DeleteProjectResult = ResponseData<ProjectAPI>;

/**
 * Deletes a project from the database by its ID.
 */
export const deleteProject = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { user, organization, project, session, roles } = _request.locals || {};

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (typeof session === 'undefined') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'SESSION_NOT_DEFINED'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:admin'
    )({
      ..._request.locals,
      targetProjectIds: [String(project.id)],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const projectToDelete = await projectService.getProjectById(project.id);

    if (String(projectToDelete.organizationId) !== String(organization.id)) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PROJECT_NOT_IN_ORGANIZATION'
      );
    }

    const deletedProject = await projectService.deleteProjectById(project.id);

    if (!deletedProject) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PROJECT_NOT_DEFINED',
        {
          projectId: project.id,
        }
      );
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

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type SelectProjectParam = { projectId: string | Types.ObjectId };
export type SelectProjectResult = ResponseData<ProjectAPI>;

/**
 * Select a project.
 */
export const selectProject = async (
  request: FastifyRequest<{ Params: SelectProjectParam }>,
  reply: FastifyReply
) => {
  const { projectId } = request.params;
  const { session } = request.locals || {};

  if (!projectId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_ID_NOT_FOUND'
    );
  }

  if (typeof session === 'undefined') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'SESSION_NOT_DEFINED'
    );
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

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type UnselectProjectResult = ResponseData<null>;

/**
 * Unselect a project.
 */
export const unselectProject = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  const { session } = _request.locals || {};

  if (typeof session === 'undefined') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'SESSION_NOT_DEFINED'
    );
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

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
