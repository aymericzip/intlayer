/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ResponseWithInformation } from '@middlewares/auth.middleware';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import { getOrganizationFiltersAndPagination } from '@utils/filtersAndPagination/getOrganizationFiltersAndPagination';
import type { UserFiltersParam } from '@utils/filtersAndPagination/getUserFiltersAndPagination';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { Request } from 'express';
import { logger } from '@/logger';
import {
  findUsers as findUsersService,
  countUsers as countUsersService,
  updateUserById as updateUserByIdService,
  getUserById as getUserByIdService,
  getUserByAccount as getUserByAccountService,
  createUser as createUserService,
  formatUserForAPI as formatUserForAPIService,
  formatUsersForAPI as formatUsersForAPIService,
  getUserByEmail as getUserByEmailService,
  deleteUser as deleteUserService,
} from '@/services/user.service';
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
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the created user or error message.
 */
export const createUser = async (
  req: Request<any, any, UserWithPasswordNotHashed>,
  res: ResponseWithInformation<CreateUserResult>
) => {
  const user: UserWithPasswordNotHashed | undefined = req.body;

  if (!user) {
    const errorMessage = 'User not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.NOT_FOUND_404;
    const responseData = formatResponse<UserAPI>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  try {
    const newUser = await createUserService(user);

    const formattedUser = formatUserForAPIService(newUser);

    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as { message: string }).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<UserAPI>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type GetUsersParams = FiltersAndPagination<UserFiltersParam>;
export type GetUsersResult = PaginatedResponse<UserAPI>;

/**
 * Retrieves a list of users based on filters and pagination.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the list of users and pagination details.
 */
export const getUsers = async (
  req: Request<GetUsersParams>,
  res: ResponseWithInformation<GetUsersResult>
) => {
  const { user } = res.locals;

  if (!user) {
    const errorMessage = 'User not found';
    const responseCode = HttpStatusCodes.UNAUTHORIZED_401;

    logger.error(errorMessage);
    const responseData = formatPaginatedResponse<UserAPI>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  const { filters, pageSize, skip, page, getNumberOfPages } =
    getOrganizationFiltersAndPagination(req);

  try {
    const users = await findUsersService(filters, skip, pageSize);
    const totalItems = await countUsersService(filters);

    const formattedUsers = formatUsersForAPIService(users);

    const responseData = formatPaginatedResponse<UserAPI>({
      data: formattedUsers,
      page,
      pageSize,
      totalPages: getNumberOfPages(totalItems),
      totalItems,
    });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as { message: string }).message;

    logger.error(`errors: ${errorMessage}`);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatPaginatedResponse<UserAPI>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type GetUserByIdParams = { userId: string };
export type GetUserByIdResult = ResponseData<UserAPI>;

export const getUserById = async (
  req: Request<GetUserByIdParams>,
  res: ResponseWithInformation<GetUserByIdResult>
) => {
  const { userId } = req.params;

  try {
    const user = await getUserByIdService(userId);

    if (!user) {
      const errorMessage = `User not found - ${userId}`;

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.NOT_FOUND_404;
      const responseData = formatResponse<UserAPI>({
        error: errorMessage,
        status: responseCode,
      });

      return res.status(responseCode).json(responseData);
    }

    const formattedUser = formatUserForAPIService(user);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as { message: string }).message;

    logger.error(errorMessage);
  }
};

export type GetUserByEmailParams = { email: string };
export type GetUserByEmailResult = ResponseData<UserAPI>;

export const getUserByEmail = async (
  req: Request<GetUserByEmailParams>,
  res: ResponseWithInformation<GetUserByEmailResult>
) => {
  const { email } = req.params;

  try {
    const user = await getUserByEmailService(email);

    if (!user) {
      const errorMessage = `User not found - ${email}`;

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.NOT_FOUND_404;
      const responseData = formatResponse<UserAPI>({
        error: errorMessage,
        status: responseCode,
      });

      return res.status(responseCode).json(responseData);
    }

    const formattedUser = formatUserForAPIService(user);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as { message: string }).message;

    logger.error(errorMessage);
  }
};

export type GetUserByAccountParams = {
  providerAccountId: string;
  provider: SessionProviders['provider'];
};
export type GetUserByAccountResult = ResponseData<UserAPI>;

/**
 * Retrieves a user by account.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the user or error message.
 */
export const getUserByAccount = async (
  req: Request<GetUserByAccountParams>,
  res: ResponseWithInformation<GetUserByAccountResult>
) => {
  const { providerAccountId, provider } = req.params;

  try {
    const user = await getUserByAccountService(provider, providerAccountId);

    const formattedUser = formatUserForAPIService(user);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as { message: string }).message;

    logger.error(errorMessage);
  }
};

export type UpdateUserBody = Partial<User>;
export type UpdateUserResult = ResponseData<UserAPI>;

/**
 * Updates user information (phone number, date of birth).
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the updated user or error message.
 */
export const updateUser = async (
  req: Request<any, any, UpdateUserBody | undefined>,
  res: ResponseWithInformation<UpdateUserResult>
) => {
  const userData = req.body;
  const { user } = res.locals;

  if (!user) {
    const errorMessage = 'User not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.NOT_FOUND_404;
    const responseData = formatResponse<UserAPI>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  if (typeof userData !== 'object') {
    const errorMessage = 'User data not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<UserAPI>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  try {
    const updatedUser = await updateUserByIdService(user._id, userData);

    logger.info(
      `User updated: Name: ${updatedUser.name}, id: ${String(updatedUser._id)}`
    );

    const formattedUser = formatUserForAPIService(updatedUser);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as { message: string }).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<UserAPI>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type DeleteUserParams = { userId: string };
export type DeleteUserResult = ResponseData<UserAPI>;

/**
 * Deletes a user based on the provided ID.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the deleted user or error message.
 */
export const deleteUser = async (
  req: Request<any, any, DeleteUserParams>,
  res: ResponseWithInformation<DeleteUserResult>
) => {
  const { userId } = req.params;

  try {
    const user = await deleteUserService(userId);

    const formattedUser = formatUserForAPIService(user);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as { message: string }).message;

    logger.error(errorMessage);
  }
};
