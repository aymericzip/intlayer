import { logger } from '@logger';
import type { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import { getSessionAuthRoutes } from '@routes/sessionAuth.routes';
import { sendEmail } from '@services/email.service';
import * as userService from '@services/user.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import { getOrganizationFiltersAndPagination } from '@utils/filtersAndPagination/getOrganizationFiltersAndPagination';
import type { UserFiltersParam } from '@utils/filtersAndPagination/getUserFiltersAndPagination';
import { mapUsersToAPI, mapUserToAPI } from '@utils/mapper/user';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { NextFunction, Request } from 'express';
import { t } from 'express-intlayer';
import type { SessionProviders } from '@/types/session.types';
import type {
  User,
  UserAPI,
  UserWithPasswordNotHashed,
} from '@/types/user.types';

export type CreateUserBody = { email: string; password?: string };
export type CreateUserResult = ResponseData<UserAPI>;

/**
 * Creates a new user.
 */
export const createUser = async (
  req: Request<any, any, UserWithPasswordNotHashed>,
  res: ResponseWithInformation<CreateUserResult>,
  _next: NextFunction
): Promise<void> => {
  const user: UserWithPasswordNotHashed | undefined = req.body;

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
      loginLink: getSessionAuthRoutes().loginEmailPassword.url,
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
  res: ResponseWithInformation<GetUsersResult>,
  _next: NextFunction
): Promise<void> => {
  const { user } = res.locals;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  const { filters, pageSize, skip, page, getNumberOfPages } =
    getOrganizationFiltersAndPagination(req);

  try {
    const users = await userService.findUsers(filters, skip, pageSize);
    const totalItems = await userService.countUsers(filters);

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

export type GetUserByIdParams = { userId: string };
export type GetUserByIdResult = ResponseData<UserAPI>;

export const getUserById = async (
  req: Request<GetUserByIdParams>,
  res: ResponseWithInformation<GetUserByIdResult>,
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
  res: ResponseWithInformation<GetUserByEmailResult>,
  _next: NextFunction
): Promise<void> => {
  const { email } = req.params;

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
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

export type GetUserByAccountParams = {
  providerAccountId: string;
  provider: SessionProviders['provider'];
};
export type GetUserByAccountResult = ResponseData<UserAPI>;

/**
 * Retrieves a user by account.
 */
export const getUserByAccount = async (
  req: Request<GetUserByAccountParams>,
  res: ResponseWithInformation<GetUserByAccountResult>,
  _next: NextFunction
): Promise<void> => {
  const { providerAccountId, provider } = req.params;

  try {
    const user = await userService.getUserByAccount(
      provider,
      providerAccountId
    );

    const formattedUser = mapUserToAPI(user);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    res.json(responseData);
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
  }
};

export type UpdateUserBody = Partial<User>;
export type UpdateUserResult = ResponseData<UserAPI>;

/**
 * Updates user information (phone number, date of birth).
 */
export const updateUser = async (
  req: Request<any, any, UpdateUserBody | undefined>,
  res: ResponseWithInformation<UpdateUserResult>,
  _next: NextFunction
): Promise<void> => {
  const userData = req.body;
  const { user } = res.locals;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (typeof userData !== 'object') {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_DATA_NOT_FOUND');
    return;
  }

  try {
    const updatedUser = await userService.updateUserById(user._id, userData);

    logger.info(
      `User updated: Name: ${updatedUser.name}, id: ${String(updatedUser._id)}`
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
  req: Request<any, any, DeleteUserParams>,
  res: ResponseWithInformation<DeleteUserResult>,
  _next: NextFunction
): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await userService.deleteUser(userId);

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
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
