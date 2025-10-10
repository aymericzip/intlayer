import { logger } from '@logger';
import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
import { SessionModel } from '@models/session.model';
import { sendEmail } from '@services/email.service';
import * as organizationService from '@services/organization.service';
import * as projectService from '@services/project.service';
import * as userService from '@services/user.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  getOrganizationFiltersAndPagination,
  type OrganizationFilters,
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
import type { NextFunction, Request } from 'express';
import { t } from 'express-intlayer';
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
  req: Request<GetOrganizationsParams>,
  res: ResponseWithSession<GetOrganizationsResult>,
  _next: NextFunction
) => {
  const { user, roles } = res.locals;
  const { filters, sortOptions, pageSize, skip, page, getNumberOfPages } =
    getOrganizationFiltersAndPagination(req, res);

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
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
        roles,
        'organization:read'
      )({
        ...res.locals,
        targetOrganizations: organizations,
      })
    ) {
      ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
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

    res.status(200).json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type GetOrganizationParam = { organizationId: string };
export type GetOrganizationResult = ResponseData<OrganizationAPI>;

/**
 * Retrieves an organization by its ID.
 */
export const getOrganization = async (
  req: Request<GetOrganizationParam, any, any>,
  res: ResponseWithSession<GetOrganizationResult>,
  _next: NextFunction
): Promise<void> => {
  const { roles } = res.locals;
  const { organizationId } = req.params as Partial<GetOrganizationParam>;

  if (!organizationId) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_ID_NOT_FOUND');
    return;
  }

  try {
    const organization =
      await organizationService.getOrganizationById(organizationId);

    if (
      !hasPermission(
        roles,
        'organization:read'
      )({
        ...res.locals,
        targetOrganizations: [organization],
      })
    ) {
      ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
      return;
    }

    const responseData = formatResponse<OrganizationAPI>({
      data: mapOrganizationToAPI(organization),
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type AddOrganizationBody = OrganizationCreationData;
export type AddOrganizationResult = ResponseData<OrganizationAPI>;

/**
 * Adds a new organization to the database.
 */
export const addOrganization = async (
  req: Request<any, any, AddOrganizationBody>,
  res: ResponseWithSession<AddOrganizationResult>,
  _next: NextFunction
): Promise<void> => {
  const { user } = res.locals;
  const organization = req.body;

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_DATA_NOT_FOUND');
    return;
  }

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
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

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type UpdateOrganizationBody = Partial<Organization>;
export type UpdateOrganizationResult = ResponseData<OrganizationAPI>;

/**
 * Updates an existing organization in the database.
 */
export const updateOrganization = async (
  req: Request<undefined, undefined, UpdateOrganizationBody>,
  res: ResponseWithSession<UpdateOrganizationResult>,
  _next: NextFunction
): Promise<void> => {
  const { organization, roles } = res.locals;
  const organizationFields = req.body;

  if (!organizationFields) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_DATA_NOT_FOUND');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (
    !hasPermission(
      roles,
      'organization:write'
    )({
      ...res.locals,
      targetOrganizations: [organization],
    })
  ) {
    ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
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

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
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
  req: Request<any, any, AddOrganizationMemberBody>,
  res: ResponseWithSession<AddOrganizationMemberResult>,
  _next: NextFunction
): Promise<void> => {
  const { organization, user, roles } = res.locals;
  const { userEmail } = req.body;

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
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

  const planType = getPlanDetails(organization.plan);

  if (
    planType.numberOfOrganizationUsers &&
    organization.membersIds.length >= planType.numberOfOrganizationUsers
  ) {
    ErrorHandler.handleGenericErrorResponse(res, 'PLAN_USER_LIMIT_REACHED', {
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
        ErrorHandler.handleGenericErrorResponse(res, 'USER_CREATION_FAILED', {
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

    res.json(responseData);

    await sendEmail({
      type: 'invite',
      to: userEmail,
      username: newMember.email.slice(0, newMember.email.indexOf('@')),
      invitedByUsername: user.name,
      invitedByEmail: user.email,
      organizationName: organization.name,
      inviteLink: `${process.env.CLIENT_URL}/auth/login?email=${newMember.email}`,
      inviteFromIp: req.ip ?? '',
      inviteFromLocation: req.hostname,
    });

    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
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
  req: Request<any, any, UpdateOrganizationMembersBody>,
  res: ResponseWithSession<UpdateOrganizationMembersResult>,
  _next: NextFunction
): Promise<void> => {
  const { organization, roles } = res.locals;
  const { membersIds, adminsIds } = req.body;

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
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

  if (!membersIds) {
    ErrorHandler.handleGenericErrorResponse(res, 'INVALID_REQUEST_BODY');
    return;
  }

  if (membersIds?.length === 0) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'ORGANIZATION_MUST_HAVE_MEMBER'
    );
    return;
  }

  if (adminsIds?.filter((id) => membersIds?.includes(id)).length === 0) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'ORGANIZATION_MUST_HAVE_ADMIN'
    );
    return;
  }

  try {
    const existingUsers = await userService.getUsersByIds(membersIds);

    if (!existingUsers) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
      return;
    }

    const existingAdmins = await userService.getUsersByIds(adminsIds!);

    if (!existingAdmins) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
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

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
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
  req: Request<
    UpdateOrganizationMembersByIdParams,
    any,
    UpdateOrganizationMembersByIdBody
  >,
  res: ResponseWithSession<UpdateOrganizationMembersByIdResult>,
  _next: NextFunction
): Promise<void> => {
  const { user } = res.locals;
  const { organizationId } = req.params;
  const { membersIds, adminsIds } = req.body;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (user.role !== 'admin') {
    ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
    return;
  }

  if (!membersIds) {
    ErrorHandler.handleGenericErrorResponse(res, 'INVALID_REQUEST_BODY');
    return;
  }

  if (membersIds?.length === 0) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'ORGANIZATION_MUST_HAVE_MEMBER'
    );
    return;
  }

  try {
    const targetOrganization =
      await organizationService.getOrganizationById(organizationId);

    if (!targetOrganization) {
      ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_FOUND');
      return;
    }

    const existingUsers = await userService.getUsersByIds(membersIds);

    if (!existingUsers) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
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
        res,
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

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type DeleteOrganizationResult = ResponseData<OrganizationAPI>;

/**
 * Deletes an organization from the database by its ID.
 */
export const deleteOrganization = async (
  _req: Request,
  res: ResponseWithSession,
  _next: NextFunction
): Promise<void> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { organization, roles } = res.locals;

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  const projects = await projectService.findProjects({
    organizationId: organization.id,
  });

  if (projects.length > 0) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECTS_EXIST', {
      organizationId: organization.id,
    });
    return;
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

  try {
    // Cancel the subscription on Stripe if it exists
    if (organization.plan?.subscriptionId) {
      await stripe.subscriptions.cancel(organization.plan.subscriptionId);
    }

    const deletedOrganization =
      await organizationService.deleteOrganizationById(organization.id);

    if (!deletedOrganization) {
      ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_FOUND', {
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
    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
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
  req: Request<SelectOrganizationParam>,
  res: ResponseWithSession<SelectOrganizationResult>,
  _next: NextFunction
): Promise<void> => {
  const { organizationId } = req.params as Partial<SelectOrganizationParam>;
  const { session } = res.locals;

  if (!organizationId) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_ID_NOT_FOUND');
    return;
  }

  if (typeof session === 'undefined') {
    ErrorHandler.handleGenericErrorResponse(res, 'SESSION_NOT_DEFINED');
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

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type UnselectOrganizationResult = ResponseData<null>;

/**
 * Unselect an organization.
 */
export const unselectOrganization = async (
  _req: Request,
  res: ResponseWithSession<UnselectOrganizationResult>,
  _next: NextFunction
): Promise<void> => {
  const { session } = res.locals;
  try {
    // Update session to clear activeOrganizationId and activeProjectId

    if (typeof session === 'undefined') {
      ErrorHandler.handleGenericErrorResponse(res, 'SESSION_NOT_DEFINED');
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

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
