import { logger } from '@logger';
import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
import { sendEmail } from '@services/email.service';
import * as organizationService from '@services/organization.service';
import * as userService from '@services/user.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  getUserFiltersAndPagination,
  type UserFiltersParam,
} from '@utils/filtersAndPagination/getUserFiltersAndPagination';
import { mapUsersToAPI, mapUserToAPI } from '@utils/mapper/user';
import { hasPermission } from '@utils/permissions';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { NextFunction, Request } from 'express';
import { t } from 'express-intlayer';
import type { User, UserAPI } from '@/types/user.types';

export type CreateUserBody = { email: string; password?: string };
export type CreateUserResult = ResponseData<UserAPI>;

/**
 * Creates a new user.
 */
export const createUser = async (
  req: Request<any, any, User>,
  res: ResponseWithSession<CreateUserResult>,
  _next: NextFunction
): Promise<void> => {
  const user: User | undefined = req.body;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  try {
    const newUser = await userService.createUser(user);

    await sendEmail({
      type: 'welcome',
      to: newUser.email,
      username: newUser.name,
      loginLink: `${process.env.CLIENT_URL}/auth/login`,
    });

    const formattedUser = mapUserToAPI(newUser);

    const responseData = formatResponse<UserAPI>({
      message: t({
        en: 'User created',
        fr: 'Utilisateur créé',
        es: 'Usuario creado',
      }),
      description: t({
        en: 'User created successfully',
        fr: 'Utilisateur créé avec succès',
        es: 'Usuario creado con éxito',
      }),
      data: formattedUser,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type GetUsersParams = FiltersAndPagination<UserFiltersParam>;
export type GetUsersResult = PaginatedResponse<UserAPI>;

/**
 * Retrieves a list of users based on filters and pagination.
 */
export const getUsers = async (
  req: Request<GetUsersParams>,
  res: ResponseWithSession<GetUsersResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, organization, roles } = res.locals;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  const { filters, sortOptions, pageSize, skip, page, getNumberOfPages } =
    getUserFiltersAndPagination(req);

  try {
    const isAdmin = user.role === 'admin';
    const organizationIdFilter = req.query.organizationId as string | undefined;

    let queryFilters = filters;

    // If organizationId filter is provided, fetch that organization's members
    if (organizationIdFilter) {
      const targetOrganization =
        await organizationService.getOrganizationById(organizationIdFilter);
      if (!targetOrganization) {
        ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_FOUND');
        return;
      }
      queryFilters = {
        $and: [filters, { _id: { $in: targetOrganization.membersIds } }],
      };
    } else if (!isAdmin) {
      // If no organizationId filter and user is not admin, filter by current organization
      if (!organization) {
        ErrorHandler.handleGenericErrorResponse(
          res,
          'ORGANIZATION_NOT_DEFINED'
        );
        return;
      }
      queryFilters = {
        $and: [filters, { _id: { $in: organization.membersIds } }],
      };
    }

    const users = await userService.findUsers(
      queryFilters,
      skip,
      pageSize,
      sortOptions
    );

    if (
      !hasPermission(
        roles,
        'user:read'
      )({
        ...res.locals,
        targetUsers: users,
      })
    ) {
      ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
      return;
    }

    const totalItems = await userService.countUsers(queryFilters);

    const formattedUsers = mapUsersToAPI(users);

    const responseData = formatPaginatedResponse<UserAPI>({
      data: formattedUsers,
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

export type GetUserByIdParams = { userId: UserAPI['id'] };
export type GetUserByIdResult = ResponseData<UserAPI>;

export const getUserById = async (
  req: Request<GetUserByIdParams>,
  res: ResponseWithSession<GetUserByIdResult>,
  _next: NextFunction
): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
      return;
    }

    const formattedUser = mapUserToAPI(user);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type GetUserByEmailParams = { email: string };
export type GetUserByEmailResult = ResponseData<UserAPI>;

export const getUserByEmail = async (
  req: Request<GetUserByEmailParams>,
  res: ResponseWithSession<GetUserByEmailResult>,
  _next: NextFunction
): Promise<void> => {
  const { email } = req.params;
  const { roles } = res.locals;

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
      return;
    }

    if (
      !hasPermission(
        roles,
        'user:read'
      )({
        ...res.locals,
        targetUsers: [user],
      })
    ) {
      ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
      return;
    }

    const formattedUser = mapUserToAPI(user);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    res.json(responseData);
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type UpdateUserBody = Partial<UserAPI>;
export type UpdateUserResult = ResponseData<UserAPI>;

/**
 * Updates user information (phone number, date of birth).
 */
export const updateUser = async (
  req: Request<any, any, UpdateUserBody | undefined>,
  res: ResponseWithSession<UpdateUserResult>,
  _next: NextFunction
): Promise<void> => {
  const userData = req.body;
  const { user, roles } = res.locals;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (typeof userData !== 'object') {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_DATA_NOT_FOUND');
    return;
  }

  if (!userData.id) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_INVALID_FIELDS');
    return;
  }

  const userDB = await userService.getUserById(userData.id);

  if (!userDB) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
    return;
  }

  if (
    !hasPermission(
      roles,
      'user:write'
    )({
      ...res.locals,
      targetUsers: [userDB],
    })
  ) {
    ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
    return;
  }

  try {
    const updatedUser = await userService.updateUserById(userDB.id, userData);

    logger.info(
      `User updated: Name: ${updatedUser.name}, id: ${String(updatedUser.id)}`
    );

    const formattedUser = mapUserToAPI(updatedUser);
    const responseData = formatResponse<UserAPI>({
      message: t({
        en: 'User updated',
        fr: 'Utilisateur mis à jour',
        es: 'Usuario actualizado',
      }),
      description: t({
        en: 'User updated successfully',
        fr: 'Utilisateur mis à jour avec succès',
        es: 'Usuario actualizado con éxito',
      }),
      data: formattedUser,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type DeleteUserParams = { userId: string };
export type DeleteUserResult = ResponseData<UserAPI>;

/**
 * Deletes a user based on the provided ID.
 */
export const deleteUser = async (
  req: Request<DeleteUserParams>,
  res: ResponseWithSession<DeleteUserResult>,
  _next: NextFunction
): Promise<void> => {
  const { userId } = req.params;
  const { roles } = res.locals;

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
      return;
    }

    if (
      !hasPermission(
        roles,
        'user:admin'
      )({
        ...res.locals,
        targetUsers: [user],
      })
    ) {
      ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
      return;
    }

    await userService.deleteUser(userId);

    const formattedUser = mapUserToAPI(user);
    const responseData = formatResponse<UserAPI>({
      message: t({
        en: 'User deleted',
        fr: 'Utilisateur supprimé',
        es: 'Usuario eliminado',
      }),
      description: t({
        en: 'User deleted successfully',
        fr: 'Utilisateur supprimé avec succès',
        es: 'Usuario eliminado con éxito',
      }),
      data: formattedUser,
    });

    res.json(responseData);
  } catch (error) {
    console.log(error);
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

let clients: Array<{ id: number; userId: string; res: ResponseWithSession }> =
  [];

export const sendVerificationUpdate = (user: User) => {
  const filteredClients = clients.filter(
    (client) => String(client.userId) === String(user.id)
  );

  for (const client of filteredClients) {
    if (user.emailVerified) {
      client.res.write(
        `data: ${JSON.stringify({ userId: user.id, status: 'verified' })}\n\n`
      );
    }
  }
};

export type VerifyEmailStatusSSEParams = { userId: string };

/**
 * SSE to check the email verification status
 */
export const verifyEmailStatusSSE = async (
  req: Request<VerifyEmailStatusSSEParams, any, any>,
  res: ResponseWithSession
) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // For Nginx buffering

  // Send initial data to ensure the connection is open
  res.write(':\n\n'); // Comment to keep connection alive
  res.flushHeaders();

  const { userId } = req.params; // Get user ID from query parameters
  const clientId = Date.now();

  const user = await userService.getUserById(userId);

  if (!user) {
    logger.error(`User not found - User ID: ${userId}`);
    res.write(`data: ${JSON.stringify({ userId, status: 'error' })}\n\n`);
    res.end();
    return;
  }

  // Add client to the list
  const newClient = { id: clientId, userId, res };
  clients.push(newClient);

  sendVerificationUpdate(user);

  // Remove client on connection close
  req.on('close', () => {
    clients = clients.filter((client) => client.id !== clientId);
  });
};
