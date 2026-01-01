import { logger } from '@logger';
import { sendEmail } from '@services/email.service';
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
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import type { User, UserAPI } from '@/types/user.types';

export type CreateUserBody = { email: string; password?: string };
export type CreateUserResult = ResponseData<UserAPI>;

/**
 * Creates a new user.
 */
export const createUser = async (
  request: FastifyRequest<{ Body: User }>,
  reply: FastifyReply
): Promise<void> => {
  const user: User | undefined = request.body;

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
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

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetUsersParams = FiltersAndPagination<UserFiltersParam>;
export type GetUsersResult = PaginatedResponse<UserAPI>;

/**
 * Retrieves a list of users based on filters and pagination.
 */
export const getUsers = async (
  request: FastifyRequest<{ Querystring: GetUsersParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, roles } = request.locals || {};

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const { filters, sortOptions, pageSize, skip, page, getNumberOfPages } =
    getUserFiltersAndPagination(request);

  try {
    const users = await userService.findUsers(
      filters,
      skip,
      pageSize,
      sortOptions
    );

    if (
      !hasPermission(
        roles || [],
        'user:read'
      )({
        ...request.locals,
        targetUsers: users,
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    const totalItems = await userService.countUsers(filters);

    const formattedUsers = mapUsersToAPI(users);

    const responseData = formatPaginatedResponse<UserAPI>({
      data: formattedUsers,
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

export type GetUserByIdParams = { userId: UserAPI['id'] };
export type GetUserByIdResult = ResponseData<UserAPI>;

export const getUserById = async (
  request: FastifyRequest<{ Params: GetUserByIdParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = request.params;

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
    }

    const formattedUser = mapUserToAPI(user);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetUserByEmailParams = { email: string };
export type GetUserByEmailResult = ResponseData<UserAPI>;

export const getUserByEmail = async (
  request: FastifyRequest<{ Params: GetUserByEmailParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { email } = request.params;
  const { roles } = request.locals || {};

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
    }

    if (
      !hasPermission(
        roles || [],
        'user:read'
      )({
        ...request.locals,
        targetUsers: [user],
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    const formattedUser = mapUserToAPI(user);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type UpdateUserBody = Partial<UserAPI>;
export type UpdateUserResult = ResponseData<UserAPI>;

/**
 * Updates user information (phone number, date of birth).
 */
export const updateUser = async (
  request: FastifyRequest<{ Body: UpdateUserBody }>,
  reply: FastifyReply
): Promise<void> => {
  const userData = request.body;
  const { user, roles } = request.locals || {};

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (typeof userData !== 'object') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'USER_DATA_NOT_FOUND'
    );
  }

  if (!userData.id) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'USER_INVALID_FIELDS'
    );
  }

  const userDB = await userService.getUserById(userData.id);

  if (!userDB) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
  }

  if (
    !hasPermission(
      roles || [],
      'user:write'
    )({
      ...request.locals,
      targetUsers: [userDB],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
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

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type DeleteUserParams = { userId: string };
export type DeleteUserResult = ResponseData<UserAPI>;

/**
 * Deletes a user based on the provided ID.
 */
export const deleteUser = async (
  request: FastifyRequest<{ Params: DeleteUserParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = request.params;
  const { roles } = request.locals || {};

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    if (
      !hasPermission(
        roles || [],
        'user:admin'
      )({
        ...request.locals,
        targetUsers: [user],
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
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

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

let clients: Array<{
  id: number;
  userId: string;
  res: { raw: FastifyReply['raw'] };
}> = [];

export const sendVerificationUpdate = (user: User) => {
  const filteredClients = clients.filter(
    (client) => String(client.userId) === String(user.id)
  );

  for (const client of filteredClients) {
    if (user.emailVerified) {
      client.res.raw.write(
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
  request: FastifyRequest<{ Params: VerifyEmailStatusSSEParams }>,
  reply: FastifyReply
) => {
  // Set headers for SSE
  reply.raw.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  reply.raw.setHeader('Cache-Control', 'no-cache, no-transform');
  reply.raw.setHeader('Connection', 'keep-alive');
  reply.raw.setHeader('X-Accel-Buffering', 'no'); // For Nginx buffering

  // Send initial data to ensure the connection is open
  reply.raw.write(':\n\n'); // Comment to keep connection alive
  reply.raw.flushHeaders?.();

  const { userId } = request.params; // Get user ID from params
  const clientId = Date.now();

  const user = await userService.getUserById(userId);

  if (!user) {
    logger.error(`User not found - User ID: ${userId}`);
    reply.raw.write(`data: ${JSON.stringify({ userId, status: 'error' })}\n\n`);
    reply.raw.end();
    return;
  }

  // Add client to the list
  const newClient = { id: clientId, userId, res: { raw: reply.raw } };
  clients.push(newClient);

  sendVerificationUpdate(user);

  // Remove client on connection close
  request.raw.on('close', () => {
    clients = clients.filter((client) => client.id !== clientId);
  });
};
