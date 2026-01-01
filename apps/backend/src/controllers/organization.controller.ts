import { logger } from '@logger';
import { SessionModel } from '@models/session.model';
import { sendEmail } from '@services/email.service';
import * as organizationService from '@services/organization.service';
import * as projectService from '@services/project.service';
import * as userService from '@services/user.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  getOrganizationFiltersAndPagination,
  type OrganizationFiltersParams,
} from '@utils/filtersAndPagination/getOrganizationFiltersAndPagination';
import {
  mapOrganizationsToAPI,
  mapOrganizationToAPI,
} from '@utils/mapper/organization';
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
import { Stripe } from 'stripe';
import type {
  Organization,
  OrganizationAPI,
  OrganizationCreationData,
} from '@/types/organization.types';
import type { User, UserAPI } from '@/types/user.types';

export type GetOrganizationsParams =
  FiltersAndPagination<OrganizationFiltersParams>;
export type GetOrganizationsResult = PaginatedResponse<OrganizationAPI>;

/**
 * Retrieves a list of organizations based on filters and pagination.
 */
export const getOrganizations = async (
  request: FastifyRequest<{ Querystring: GetOrganizationsParams }>,
  reply: FastifyReply
) => {
  const { user, roles } = request.locals || {};
  const { filters, sortOptions, pageSize, skip, page, getNumberOfPages } =
    getOrganizationFiltersAndPagination(request);

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
    return;
  }

  try {
    const organizations = await organizationService.findOrganizations(
      filters,
      skip,
      pageSize,
      sortOptions
    );

    if (
      !hasPermission(
        roles || [],
        'organization:read'
      )({
        ...request.locals,
        targetOrganizations: organizations,
      })
    ) {
      ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
      return;
    }

    const totalItems = await organizationService.countOrganizations(filters);

    const responseData = formatPaginatedResponse<OrganizationAPI>({
      data: mapOrganizationsToAPI(organizations),
      page,
      pageSize,
      totalPages: getNumberOfPages(totalItems),
      totalItems,
    });

    reply.code(200).send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
  }
};

export type GetOrganizationParam = { organizationId: string };
export type GetOrganizationResult = ResponseData<OrganizationAPI>;

/**
 * Retrieves an organization by its ID.
 */
export const getOrganization = async (
  request: FastifyRequest<{ Params: GetOrganizationParam }>,
  reply: FastifyReply
): Promise<void> => {
  const { roles } = request.locals || {};
  const { organizationId } = request.params;

  if (!organizationId) {
    ErrorHandler.handleGenericErrorResponse(reply, 'ORGANIZATION_ID_NOT_FOUND');
    return;
  }

  try {
    const organization =
      await organizationService.getOrganizationById(organizationId);

    if (
      !hasPermission(
        roles || [],
        'organization:read'
      )({
        ...request.locals,
        targetOrganizations: [organization],
      })
    ) {
      ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
      return;
    }

    const responseData = formatResponse<OrganizationAPI>({
      data: mapOrganizationToAPI(organization),
    });

    reply.send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
  }
};

export type AddOrganizationBody = OrganizationCreationData;
export type AddOrganizationResult = ResponseData<OrganizationAPI>;

/**
 * Adds a new organization to the database.
 */
export const addOrganization = async (
  request: FastifyRequest<{ Body: AddOrganizationBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { user } = request.locals || {};
  const organization = request.body;

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_DATA_NOT_FOUND'
    );
    return;
  }

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
    return;
  }

  try {
    const newOrganization = await organizationService.createOrganization(
      organization,
      user.id
    );

    const responseData = formatResponse<OrganizationAPI>({
      message: t({
        en: 'Organization created successfully',
        fr: 'Organisation créée avec succès',
        es: 'Organización creada con éxito',
      }),
      description: t({
        en: 'Your organization has been created successfully',
        fr: 'Votre organisation a été créée avec succès',
        es: 'Su organización ha sido creada con éxito',
      }),
      data: mapOrganizationToAPI(newOrganization),
    });

    reply.send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
  }
};

export type UpdateOrganizationBody = Partial<Organization>;
export type UpdateOrganizationResult = ResponseData<OrganizationAPI>;

/**
 * Updates an existing organization in the database.
 */
export const updateOrganization = async (
  request: FastifyRequest<{ Body: UpdateOrganizationBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { organization, roles } = request.locals || {};
  const organizationFields = request.body;

  if (!organizationFields) {
    ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_DATA_NOT_FOUND'
    );
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(reply, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (
    !hasPermission(
      roles || [],
      'organization:write'
    )({
      ...request.locals,
      targetOrganizations: [organization],
    })
  ) {
    ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
    return;
  }

  try {
    const updatedOrganization =
      await organizationService.updateOrganizationById(
        organization.id,
        organizationFields
      );

    const responseData = formatResponse<OrganizationAPI>({
      message: t({
        en: 'Organization updated successfully',
        fr: 'Organisation mise à jour avec succès',
        es: 'Organización actualizada con éxito',
      }),
      description: t({
        en: 'Your organization has been updated successfully',
        fr: 'Votre organisation a été mise à jour avec succès',
        es: 'Su organización ha sido actualizada con éxito',
      }),
      data: mapOrganizationToAPI(updatedOrganization),
    });

    reply.send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
  }
};

export type AddOrganizationMemberBody = {
  userEmail: string;
};
export type AddOrganizationMemberResult = ResponseData<OrganizationAPI>;

/**
 * Add member to the organization in the database.
 */
export const addOrganizationMember = async (
  request: FastifyRequest<{ Body: AddOrganizationMemberBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { organization, user, roles } = request.locals || {};
  const { userEmail } = request.body;

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(reply, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
    return;
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
    ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
    return;
  }

  const planType = getPlanDetails(organization.plan);

  if (
    planType.numberOfOrganizationUsers &&
    organization.membersIds.length >= planType.numberOfOrganizationUsers
  ) {
    ErrorHandler.handleGenericErrorResponse(reply, 'PLAN_USER_LIMIT_REACHED', {
      organizationId: organization.id,
    });
    return;
  }

  try {
    let newMember = await userService.getUserByEmail(userEmail);

    if (!newMember) {
      // Create user if not found
      const newUser = await userService.createUser({ email: userEmail });
      if (!newUser) {
        ErrorHandler.handleGenericErrorResponse(reply, 'USER_CREATION_FAILED', {
          email: userEmail,
        });
        return;
      }

      newMember = newUser;
    }

    const updatedOrganization =
      await organizationService.updateOrganizationById(organization.id, {
        ...organization,
        membersIds: [...organization.membersIds, newMember.id],
      });

    const responseData = formatResponse<OrganizationAPI>({
      message: t({
        en: 'Organization updated successfully',
        fr: 'Organisation mise à jour avec succès',
        es: 'Organización actualizada con éxito',
      }),
      description: t({
        en: 'Your organization has been updated successfully',
        fr: 'Votre organisation a été mise à jour avec succès',
        es: 'Su organización ha sido actualizada con éxito',
      }),
      data: mapOrganizationToAPI(updatedOrganization),
    });

    reply.send(responseData);

    await sendEmail({
      type: 'invite',
      to: userEmail,
      username: newMember.email.slice(0, newMember.email.indexOf('@')),
      invitedByUsername: user.name,
      invitedByEmail: user.email,
      organizationName: organization.name,
      inviteLink: `${process.env.CLIENT_URL}/auth/login?email=${newMember.email}`,
      inviteFromIp: request.ip ?? '',
      inviteFromLocation: request.hostname,
    });

    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
  }
};

export type UpdateOrganizationMembersBody = Partial<{
  membersIds: (User | UserAPI)['id'][];
  adminsIds: (User | UserAPI)['id'][];
}>;
export type UpdateOrganizationMembersResult = ResponseData<OrganizationAPI>;

/**
 * Update members to the organization in the database.
 */
export const updateOrganizationMembers = async (
  request: FastifyRequest<{ Body: UpdateOrganizationMembersBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { organization, roles } = request.locals || {};
  const { membersIds, adminsIds } = request.body;

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(reply, 'ORGANIZATION_NOT_DEFINED');
    return;
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
    ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
    return;
  }

  if (!membersIds) {
    ErrorHandler.handleGenericErrorResponse(reply, 'INVALID_REQUEST_BODY');
    return;
  }

  if (membersIds?.length === 0) {
    ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_MUST_HAVE_MEMBER'
    );
    return;
  }

  if (adminsIds?.filter((id) => membersIds?.includes(id)).length === 0) {
    ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_MUST_HAVE_ADMIN'
    );
    return;
  }

  try {
    const existingUsers = await userService.getUsersByIds(membersIds);

    if (!existingUsers) {
      ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
      return;
    }

    const existingAdmins = await userService.getUsersByIds(adminsIds!);

    if (!existingAdmins) {
      ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
      return;
    }

    const updatedOrganization =
      await organizationService.updateOrganizationById(organization.id, {
        membersIds: existingUsers.map((user) => user.id),
        adminsIds: existingAdmins.map((user) => user.id),
      });

    const responseData = formatResponse<OrganizationAPI>({
      message: t({
        en: 'Organization updated successfully',
        fr: 'Organisation mise à jour avec succès',
        es: 'Organización actualizada con éxito',
      }),
      description: t({
        en: 'Your organization has been updated successfully',
        fr: 'Votre organisation a été mise à jour avec succès',
        es: 'Su organización ha sido actualizada con éxito',
      }),
      data: mapOrganizationToAPI(updatedOrganization),
    });

    reply.send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
  }
};

export type UpdateOrganizationMembersByIdParams = { organizationId: string };
export type UpdateOrganizationMembersByIdBody = Partial<{
  membersIds: (User | UserAPI)['id'][];
  adminsIds: (User | UserAPI)['id'][];
}>;
export type UpdateOrganizationMembersByIdResult = ResponseData<OrganizationAPI>;

/**
 * Admin-only: Update members of any organization by ID
 */
export const updateOrganizationMembersById = async (
  request: FastifyRequest<{
    Params: UpdateOrganizationMembersByIdParams;
    Body: UpdateOrganizationMembersByIdBody;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { user } = request.locals || {};
  const { organizationId } = request.params;
  const { membersIds, adminsIds } = request.body;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
    return;
  }

  if (user.role !== 'admin') {
    ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
    return;
  }

  if (!membersIds) {
    ErrorHandler.handleGenericErrorResponse(reply, 'INVALID_REQUEST_BODY');
    return;
  }

  if (membersIds?.length === 0) {
    ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_MUST_HAVE_MEMBER'
    );
    return;
  }

  try {
    const targetOrganization =
      await organizationService.getOrganizationById(organizationId);

    if (!targetOrganization) {
      ErrorHandler.handleGenericErrorResponse(reply, 'ORGANIZATION_NOT_FOUND');
      return;
    }

    const existingUsers = await userService.getUsersByIds(membersIds);

    if (!existingUsers) {
      ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
      return;
    }

    const finalAdminsIds =
      adminsIds && adminsIds.length > 0
        ? adminsIds
        : targetOrganization.adminsIds;
    const existingAdmins = finalAdminsIds
      ? await userService.getUsersByIds(finalAdminsIds)
      : [];

    if (!existingAdmins || existingAdmins.length === 0) {
      ErrorHandler.handleGenericErrorResponse(
        reply,
        'ORGANIZATION_MUST_HAVE_ADMIN'
      );
      return;
    }

    const updatedOrganization =
      await organizationService.updateOrganizationById(targetOrganization.id, {
        membersIds: existingUsers.map((user) => user.id),
        adminsIds: existingAdmins.map((user) => user.id),
      });

    const responseData = formatResponse<OrganizationAPI>({
      message: t({
        en: 'Organization members updated successfully',
        fr: "Membres de l'organisation mis à jour avec succès",
        es: 'Miembros de la organización actualizados con éxito',
      }),
      description: t({
        en: 'Organization members have been updated successfully',
        fr: "Les membres de l'organisation ont été mis à jour avec succès",
        es: 'Los miembros de la organización han sido actualizados con éxito',
      }),
      data: mapOrganizationToAPI(updatedOrganization),
    });

    reply.send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
  }
};

export type DeleteOrganizationResult = ResponseData<OrganizationAPI>;

/**
 * Deletes an organization from the database by its ID.
 */
export const deleteOrganization = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { organization, roles } = _request.locals || {};

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(reply, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  const projects = await projectService.findProjects({
    organizationId: organization.id,
  });

  if (projects.length > 0) {
    ErrorHandler.handleGenericErrorResponse(reply, 'PROJECTS_EXIST', {
      organizationId: organization.id,
    });
    return;
  }

  if (
    !hasPermission(
      roles || [],
      'organization:admin'
    )({
      ..._request.locals,
      targetOrganizations: [organization],
    })
  ) {
    ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
    return;
  }

  try {
    // Cancel the subscription on Stripe if it exists
    if (organization.plan?.subscriptionId) {
      await stripe.subscriptions.cancel(organization.plan.subscriptionId);
    }

    const deletedOrganization =
      await organizationService.deleteOrganizationById(organization.id);

    if (!deletedOrganization) {
      ErrorHandler.handleGenericErrorResponse(reply, 'ORGANIZATION_NOT_FOUND', {
        organizationId: organization.id,
      });
      return;
    }

    logger.info(`Organization deleted: ${String(deletedOrganization.id)}`);

    const responseData = formatResponse<OrganizationAPI>({
      message: t({
        en: 'Organization deleted successfully',
        fr: 'Organisation supprimée avec succès',
        es: 'Organización eliminada con éxito',
      }),
      description: t({
        en: 'Your organization has been deleted successfully',
        fr: 'Votre organisation a été supprimée avec succès',
        es: 'Su organización ha sido eliminada con éxito',
      }),
      data: mapOrganizationToAPI(deletedOrganization),
    });

    // No need to update session here, as it's a delete operation
    reply.send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
  }
};

export type SelectOrganizationParam = {
  organizationId: string | Types.ObjectId;
};
export type SelectOrganizationResult = ResponseData<OrganizationAPI>;

/**
 * Select an organization.
 */
export const selectOrganization = async (
  request: FastifyRequest<{ Params: SelectOrganizationParam }>,
  reply: FastifyReply
): Promise<void> => {
  const { organizationId } = request.params;
  const { session } = request.locals || {};

  if (!organizationId) {
    ErrorHandler.handleGenericErrorResponse(reply, 'ORGANIZATION_ID_NOT_FOUND');
    return;
  }

  if (typeof session === 'undefined') {
    ErrorHandler.handleGenericErrorResponse(reply, 'SESSION_NOT_DEFINED');
    return;
  }

  try {
    const organization =
      await organizationService.getOrganizationById(organizationId);

    // Update session to set activeOrganizationId
    await SessionModel.updateOne(
      { _id: session.id },
      {
        $set: {
          activeOrganizationId: String(organization.id),
          activeProjectId: null,
        },
      }
    );

    // No need to update session here, as it's a select operation
    const responseData = formatResponse<OrganizationAPI>({
      message: t({
        en: 'Organization retrieved successfully',
        fr: 'Organisation récupérée avec succès',
        es: 'Organización recuperada con éxito',
      }),
      description: t({
        en: 'Your organization has been retrieved successfully',
        fr: 'Votre organisation a été récupérée avec succès',
        es: 'Su organización ha sido recuperada con éxito',
      }),
      data: mapOrganizationToAPI(organization),
    });

    reply.send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
  }
};

export type UnselectOrganizationResult = ResponseData<null>;

/**
 * Unselect an organization.
 */
export const unselectOrganization = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { session } = _request.locals || {};
  try {
    // Update session to clear activeOrganizationId and activeProjectId

    if (typeof session === 'undefined') {
      ErrorHandler.handleGenericErrorResponse(reply, 'SESSION_NOT_DEFINED');
      return;
    }

    await SessionModel.updateOne(
      { _id: session.id },
      {
        $set: {
          activeOrganizationId: null,
          activeProjectId: null,
        },
      }
    );

    const responseData = formatResponse<null>({
      message: t({
        en: 'Organization unselected successfully',
        fr: 'Organisation désélectionnée avec succès',
        es: 'Organización deseleccionada con éxito',
      }),
      description: t({
        en: 'Your organization has been unselected successfully',
        fr: 'Votre organisation a été désélectionnée avec succès',
        es: 'Su organización ha sido deseleccionada con éxito',
      }),
      data: null,
    });

    reply.send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
  }
};
