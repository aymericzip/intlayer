import type { ResponseWithInformation } from '@middlewares/auth.middleware';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import { getOrganizationFiltersAndPagination } from '@utils/filtersAndPagination/getOrganizationFiltersAndPagination';
import type { UserFilters } from '@utils/filtersAndPagination/getUserFiltersAndPagination';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { Request, Response } from 'express';
import { type ObjectId, Types } from 'mongoose';
import { logger } from '@/logger';
import {
  findUsers as findUsersService,
  countUsers as countUsersService,
  changeUserPassword as changeUserPasswordService,
  updateUserById as updateUserByIdService,
  activateUser as activateUserService,
  requestPasswordReset as requestPasswordResetService,
  resetUserPassword as resetUserPasswordService,
  getUserById as getUserByIdService,
  createUser as createUserService,
} from '@/services/user.service';
import type {
  User,
  UserData,
  UserWithPasswordNotHashed,
} from '@/types/user.types';

export type CreateUserBody = UserData;
export type CreateUserResult = ResponseData<User>;

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

    const responseCode = HttpStatusCodes.NOT_FOUND;
    const responseData = formatResponse<User>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  try {
    const newUser = await createUserService(user);

    const responseData = formatResponse<User>({ data: newUser });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as { message: string }).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    const responseData = formatResponse<User>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type GetUserParams = FiltersAndPagination<UserFilters>;
export type GetUserResult = PaginatedResponse<User>;

/**
 * Retrieves a list of users based on filters and pagination.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the list of users and pagination details.
 */
export const getUsers = async (
  req: Request<GetUserParams>,
  res: ResponseWithInformation<GetUserResult>
) => {
  const { filters, pageSize, skip, page, getNumberOfPages } =
    getOrganizationFiltersAndPagination(req);

  try {
    const users = await findUsersService(filters, skip, pageSize);
    const totalItems = await countUsersService(filters);

    const responseData = formatPaginatedResponse<User>({
      data: users,
      page,
      pageSize,
      totalPages: getNumberOfPages(totalItems),
      totalItems,
    });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as { message: string }).message;

    logger.error(`errors: ${errorMessage}`);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    const responseData = formatPaginatedResponse<User>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type UpdatePasswordBody = {
  oldPassword: string;
  newPassword: string;
};
export type UpdatePasswordResult = ResponseData<User>;

/**
 * Updates the user's password.
 * @param req - Express request object.
 * @param  res - Express response object.
 * @returns  Response containing the updated user or error message.
 */
export const updatePassword = async (
  req: Request<undefined, any, UpdatePasswordBody>,
  res: ResponseWithInformation<UpdatePasswordResult>
) => {
  const { oldPassword, newPassword } = req.body;
  let user = res.locals.user;

  if (!user) {
    return res.sendStatus(404).json();
  }

  try {
    if (newPassword !== '') {
      user = await changeUserPasswordService(
        user._id,
        oldPassword,
        newPassword
      );

      if (!user || typeof user !== 'object') {
        const errorMessage = 'User data not found';

        logger.error(errorMessage);

        const responseCode = HttpStatusCodes.BAD_REQUEST;
        const responseData = formatResponse<User>({
          error: errorMessage,
          status: responseCode,
        });

        return res.status(responseCode).json(responseData);
      }

      logger.info(
        `Password changed - User : Firstname : ${user.firstname}, Lastname : ${user.lastname}, id : ${user._id}`
      );

      const responseData = formatResponse<User>({ data: user });

      return res.json(responseData);
    }
  } catch (err) {
    const errorMessage: string = (err as { message: string }).message;
    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.FORBIDDEN;
    const responseData = formatResponse<User>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type UpdateUserBody = Partial<User>;
export type UpdateUserResult = ResponseData<User>;

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
  const user = res.locals.user;

  if (!user) {
    const errorMessage = 'User not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.NOT_FOUND;
    const responseData = formatResponse<User>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  if (typeof userData !== 'object') {
    const errorMessage = 'User data not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST;
    const responseData = formatResponse<User>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  try {
    const updatedUser = await updateUserByIdService(user._id, userData);

    logger.info(
      `User updated: Firstname: ${updatedUser.firstname}, Lastname: ${updatedUser.lastname}, id: ${updatedUser._id}`
    );

    const responseData = formatResponse<User>({ data: updatedUser });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as { message: string }).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    const responseData = formatResponse<User>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type ValidEmailParams = { secret: string; userId: string };
export type ValidEmailResult = ResponseData<User>;

/**
 * Validates a user's email based on the provided secret and user ID.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the validated user or error message.
 */
export const validEmail = async (
  req: Request<ValidEmailParams, any, any>,
  res: ResponseWithInformation<ValidEmailResult>
) => {
  const userId = req.params.userId as unknown as User['_id'];
  const secret = req.params.secret;
  const organization = res.locals.organization;

  if (!Types.ObjectId.isValid(userId.toString())) {
    const responseCode = HttpStatusCodes.NOT_FOUND;

    const responseData = formatResponse<User>({
      error: 'User id not valid',
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  if (!organization) {
    const responseCode = HttpStatusCodes.NOT_FOUND;

    const responseData = formatResponse<User>({
      error: 'Organization not found',
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  const user = await getUserByIdService(userId);

  if (!user) {
    const errorMessage = 'User not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.NOT_FOUND;
    const responseData = formatResponse<User>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  await activateUserService(user._id, secret);

  logger.info(
    `User activated - User: Firstname: ${user.firstname}, Lastname: ${user.lastname}, id: ${user._id}`
  );

  const responseData = formatResponse<User>({ data: user });

  return res.json(responseData);
};

export type AskResetPasswordBody = {
  email: string;
};
export type AskResetPasswordResult = ResponseData<undefined>;

/**
 * Requests a password reset for a user.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response indicating the status of the password reset request.
 */
export const askResetPassword = async (
  req: Request<undefined, any, AskResetPasswordBody>,
  res: ResponseWithInformation<AskResetPasswordResult>
) => {
  const { email } = req.body as Partial<AskResetPasswordBody>;

  if (!email) {
    const errorMessage = 'Email not provided';
    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST;
    const responseData = formatResponse<undefined>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  try {
    const updatedUser = await requestPasswordResetService(email);

    if (!updatedUser) {
      const errorMessage = 'User not found';

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.NOT_FOUND;
      const responseData = formatResponse<undefined>({
        error: errorMessage,
        status: responseCode,
      });

      return res.status(responseCode).json(responseData);
    }

    logger.info(
      `Ask changing password - User: Firstname: ${updatedUser.firstname}, Lastname: ${updatedUser.lastname}, id: ${updatedUser._id}`
    );

    const responseData = formatResponse<undefined>({ data: undefined });

    return res.json(responseData);
  } catch (err) {
    logger.error(err);
    return res.sendStatus(500);
  }
};

export type ResetPasswordParams = { secret: string; userId: string };
export type ResetPasswordResult = ResponseData<undefined>;

/**
 * Resets a user's password based on the provided secret and user ID.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the updated user or error message.
 */
export const resetPassword = async (
  req: Request<ResetPasswordParams, any, any>,
  res: Response<ResetPasswordResult>
) => {
  const { secret, userId } = req.params as Partial<ResetPasswordParams>;
  const password: string = req.body.password;

  const userIdString = String(userId);

  if (!userId || !userIdString || !Types.ObjectId.isValid(userIdString)) {
    const errorMessage = `User id invalid - ${userIdString}`;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST;
    const responseData = formatResponse<undefined>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  if (!secret) {
    const errorMessage = 'Secret not provided';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST;
    const responseData = formatResponse<undefined>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  try {
    const updatedUser = await resetUserPasswordService(
      userId,
      secret,
      password
    );

    logger.info(
      `Password changed - User: Firstname: ${updatedUser.firstname}, Lastname: ${updatedUser.lastname}, id: ${updatedUser._id}`
    );

    const responseData = formatResponse<undefined>({ data: undefined });

    return res.json(responseData);
  } catch (err) {
    const errorMessage: string = (err as { message: string }).message;
    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST;
    const responseData = formatResponse<undefined>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};
