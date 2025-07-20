import type {
  Organization,
  OrganizationCreationData,
} from '@/types/organization.types';
import type { User } from '@/types/user.types';
import { logger } from '@logger';
import { SessionModel } from '@models/session.model';
import { sendEmail } from '@services/email.service';
import * as organizationService from '@services/organization.service';
import * as projectService from '@services/project.service';
import * as userService from '@services/user.service';

import { type ResponseWithInformation } from '@utils/auth/getAuth';
import { type AppError, ErrorHandler } from '@utils/errors';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  getOrganizationFiltersAndPagination,
  type OrganizationFilters,
  type OrganizationFiltersParams,
} from '@utils/filtersAndPagination/getOrganizationFiltersAndPagination';
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
import { Stripe } from 'stripe';

export type GetOrganizationsParams =
  FiltersAndPagination<OrganizationFiltersParams>;
export type GetOrganizationsResult = PaginatedResponse<Organization>;

/**
 * Retrieves a list of organizations based on filters and pagination.
 */
export const getOrganizations = async (
  req: Request<GetOrganizationsParams>,
  res: ResponseWithInformation<GetOrganizationsResult>,
  _next: NextFunction
) => {
  const { user, organizationRights } = res.locals;
  const { filters, pageSize, skip, page, getNumberOfPages } =
    getOrganizationFiltersAndPagination(req);

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!organizationRights?.read) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'ORGANIZATION_RIGHTS_NOT_READ'
    );
    return;
  }

  const restrictedFilter: OrganizationFilters = {
    ...filters,

    membersIds: { $in: [...(filters.membersIds ?? []), String(user._id)] },
  };

  try {
    const organizations = await organizationService.findOrganizations(
      restrictedFilter,
      skip,
      pageSize
    );
    const totalItems = await organizationService.countOrganizations(filters);

    const responseData = formatPaginatedResponse<Organization>({
      data: organizations,
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
export type GetOrganizationResult = ResponseData<Organization>;

/**
 * Retrieves an organization by its ID.
 */
export const getOrganization = async (
  req: Request<GetOrganizationParam, any, any>,
  res: ResponseWithInformation<GetOrganizationResult>,
  _next: NextFunction
): Promise<void> => {
  const { organizationRights } = res.locals;
  const { organizationId } = req.params as Partial<GetOrganizationParam>;

  if (!organizationRights?.read) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'ORGANIZATION_RIGHTS_NOT_READ'
    );
    return;
  }

  if (!organizationId) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_ID_NOT_FOUND');
    return;
  }

  try {
    const organization =
      await organizationService.getOrganizationById(organizationId);

    const responseData = formatResponse<Organization>({ data: organization });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type AddOrganizationBody = OrganizationCreationData;
export type AddOrganizationResult = ResponseData<Organization>;

/**
 * Adds a new organization to the database.
 */
export const addOrganization = async (
  req: Request<any, any, AddOrganizationBody>,
  res: ResponseWithInformation<AddOrganizationResult>,
  _next: NextFunction
): Promise<void> => {
  const { user } = res.locals;
  const organization = req.body;

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_DATA_NOT_FOUND');
  }

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  try {
    const newOrganization = await organizationService.createOrganization(
      organization,
      user._id
    );

    const responseData = formatResponse<Organization>({
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
      data: newOrganization,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type UpdateOrganizationBody = Partial<Organization>;
export type UpdateOrganizationResult = ResponseData<Organization>;

/**
 * Updates an existing organization in the database.
 */
export const updateOrganization = async (
  req: Request<undefined, undefined, UpdateOrganizationBody>,
  res: ResponseWithInformation<UpdateOrganizationResult>,
  _next: NextFunction
): Promise<void> => {
  const { isOrganizationAdmin, organization, organizationRights } = res.locals;
  const organizationFields = req.body;

  if (!organizationFields) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_DATA_NOT_FOUND');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (!organizationRights?.write) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'ORGANIZATION_RIGHTS_NOT_WRITE'
    );
    return;
  }

  if (!isOrganizationAdmin) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'USER_IS_NOT_ADMIN_OF_ORGANIZATION'
    );
    return;
  }

  try {
    const updatedOrganization =
      await organizationService.updateOrganizationById(
        organization._id,
        organizationFields
      );

    const responseData = formatResponse<Organization>({
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
      data: updatedOrganization,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

type UserAndAdmin = { user: User; isAdmin: boolean };

export type OrganizationMemberByIdOption = {
  userId: string | ObjectId;
  isAdmin?: boolean;
};

export type AddOrganizationMemberBody = {
  userEmail: string;
};
export type AddOrganizationMemberResult = ResponseData<Organization>;

/**
 * Add member to the organization in the database.
 */
export const addOrganizationMember = async (
  req: Request<any, any, AddOrganizationMemberBody>,
  res: ResponseWithInformation<AddOrganizationMemberResult>,
  _next: NextFunction
): Promise<void> => {
  const { organization, isOrganizationAdmin, user, organizationRights } =
    res.locals;
  const { userEmail } = req.body;

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!isOrganizationAdmin) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'USER_IS_NOT_ADMIN_OF_ORGANIZATION'
    );
    return;
  }

  if (!organizationRights?.admin) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'ORGANIZATION_RIGHTS_NOT_ADMIN'
    );
    return;
  }

  if (!organization.plan) {
    ErrorHandler.handleGenericErrorResponse(res, 'PLAN_NOT_FOUND', {
      organizationId: organization._id,
    });
    return;
  }

  const planType = getPLanDetails(organization.plan);

  if (
    planType.numberOfOrganizationUsers &&
    organization.membersIds.length >= planType.numberOfOrganizationUsers
  ) {
    ErrorHandler.handleGenericErrorResponse(res, 'PLAN_USER_LIMIT_REACHED', {
      organizationId: organization._id,
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

    await sendEmail({
      type: 'invite',
      to: userEmail,
      username: newMember.email.slice(0, newMember.email.indexOf('@')),
      invitedByUsername: user.name,
      invitedByEmail: user.email,
      organizationName: organization.name,
      inviteLink: `${process.env.FRONTEND_URL}/login?email=${newMember.email}`,
      inviteFromIp: req.ip ?? '',
      inviteFromLocation: req.hostname,
    });

    const updatedOrganization =
      await organizationService.updateOrganizationById(organization._id, {
        ...organization,
        membersIds: [...organization.membersIds, newMember._id],
      });

    const responseData = formatResponse<Organization>({
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
      data: updatedOrganization,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type UpdateOrganizationMembersBody = Partial<{
  membersIds: OrganizationMemberByIdOption[];
}>;
export type UpdateOrganizationMembersResult = ResponseData<Organization>;

/**
 * Update members to the organization in the database.
 */
export const updateOrganizationMembers = async (
  req: Request<any, any, UpdateOrganizationMembersBody>,
  res: ResponseWithInformation<UpdateOrganizationMembersResult>,
  _next: NextFunction
): Promise<void> => {
  const { organization, organizationRights, isOrganizationAdmin } = res.locals;
  const { membersIds } = req.body;

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (!isOrganizationAdmin) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'USER_IS_NOT_ADMIN_OF_ORGANIZATION'
    );
    return;
  }

  if (!organizationRights?.write) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'ORGANIZATION_RIGHTS_NOT_WRITE'
    );
    return;
  }

  if (membersIds?.length === 0) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'ORGANIZATION_MUST_HAVE_MEMBER'
    );
    return;
  }

  if (membersIds?.map((el) => el.isAdmin)?.length === 0) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'ORGANIZATION_MUST_HAVE_ADMIN'
    );
    return;
  }

  try {
    let existingUsers: UserAndAdmin[] = [];

    if (membersIds) {
      const userIdList = membersIds?.map((member) => member.userId);
      const users = await userService.getUsersByIds(userIdList);

      if (users) {
        const userMap: UserAndAdmin[] = users.map((user) => {
          const isAdmin =
            membersIds.find(
              (member) => String(member.userId) === String(user._id)
            )?.isAdmin ?? false;

          return {
            user,
            isAdmin,
          };
        });

        existingUsers = userMap;
      }
    }

    const formattedMembers: ObjectId[] = existingUsers.map(
      (user) => user.user._id
    );
    const formattedAdmin: ObjectId[] = existingUsers
      .filter((el) => el.isAdmin)
      .map((user) => user.user._id);

    const updatedOrganization =
      await organizationService.updateOrganizationById(organization._id, {
        ...organization,
        membersIds: formattedMembers,
        adminsIds: formattedAdmin,
      });

    const responseData = formatResponse<Organization>({
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
      data: updatedOrganization,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type DeleteOrganizationResult = ResponseData<Organization>;

/**
 * Deletes an organization from the database by its ID.
 */
export const deleteOrganization = async (
  _req: Request,
  res: ResponseWithInformation,
  _next: NextFunction
): Promise<void> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { isOrganizationAdmin, organization, organizationRights } = res.locals;

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (!isOrganizationAdmin) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'USER_IS_NOT_ADMIN_OF_ORGANIZATION'
    );
    return;
  }

  if (!organizationRights?.admin) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'ORGANIZATION_RIGHTS_NOT_ADMIN'
    );
    return;
  }

  const projects = await projectService.findProjects({
    organizationId: organization._id,
  });

  if (projects.length > 0) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECTS_EXIST', {
      organizationId: organization._id,
    });
    return;
  }

  try {
    // Cancel the subscription on Stripe if it exists
    if (organization.plan?.subscriptionId) {
      await stripe.subscriptions.cancel(organization.plan.subscriptionId);
    }

    const deletedOrganization =
      await organizationService.deleteOrganizationById(organization._id);

    if (!deletedOrganization) {
      ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_FOUND', {
        organizationId: organization._id,
      });
      return;
    }

    logger.info(`Organization deleted: ${String(deletedOrganization._id)}`);

    const responseData = formatResponse<Organization>({
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
      data: deletedOrganization,
    });

    // No need to update session here, as it's a delete operation
    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type SelectOrganizationParam = { organizationId: ObjectId | string };
export type SelectOrganizationResult = ResponseData<Organization>;

/**
 * Select an organization.
 */
export const selectOrganization = async (
  req: Request<SelectOrganizationParam>,
  res: ResponseWithInformation<SelectOrganizationResult>,
  _next: NextFunction
): Promise<void> => {
  const { organizationId } = req.params as Partial<SelectOrganizationParam>;
  const { session } = res.locals;

  if (!organizationId) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_ID_NOT_FOUND');
    return;
  }

  if (!session) {
    ErrorHandler.handleGenericErrorResponse(res, 'SESSION_NOT_DEFINED');
    return;
  }

  try {
    const organization =
      await organizationService.getOrganizationById(organizationId);

    // Update session to set activeOrganizationId
    await SessionModel.updateOne(
      { _id: session.session.id },
      {
        $set: {
          activeOrganizationId: String(organization._id),
          activeProjectId: null,
        },
      }
    ).catch((error: unknown) => {
      // Log the error but don't fail the response
      logger.warn(
        'Failed to update session after organization selection:',
        error
      );
    });

    // No need to update session here, as it's a select operation
    const responseData = formatResponse<Organization>({
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
      data: organization,
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
  res: ResponseWithInformation<UnselectOrganizationResult>,
  _next: NextFunction
): Promise<void> => {
  const { session } = res.locals;
  try {
    // Update session to clear activeOrganizationId and activeProjectId

    if (!session) {
      ErrorHandler.handleGenericErrorResponse(res, 'SESSION_NOT_DEFINED');
      return;
    }

    await SessionModel.updateOne(
      { _id: session.session.id },
      {
        $set: {
          activeOrganizationId: null,
          activeProjectId: null,
        },
      }
    ).catch((error: unknown) => {
      // Log the error but don't fail the response
      logger.warn(
        'Failed to update session after organization unselection:',
        error
      );
    });

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
