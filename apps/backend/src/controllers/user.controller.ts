import type { ResponseWithInformation } from '@middlewares/auth.middleware';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import { getOrganizationFiltersAndPagination } from '@utils/filtersAndPagination/getOrganizationFiltersAndPagination';
import type { UserFilters } from '@utils/filtersAndPagination/getUserFiltersAndPagination';
import type { Request, Response } from 'express';
import { Types } from 'mongoose';
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
import type { User } from '@/types/user.type';

export const createUser = async (
  req: Request<any, any, User | undefined>,
  res: ResponseWithInformation
) => {
  const user: User | undefined = req.body;

  if (!user) {
    const errorMessage = 'User not found';

    logger.error(errorMessage);
    return res.status(404).json({ error: errorMessage });
  }

  try {
    const newUser = await createUserService(user);
    return res.status(200).json(newUser);
  } catch (error) {
    const errorMessage: string = (error as { message: string }).message;

    logger.error(`errors: ${errorMessage}`);
    return res.status(500).json({ success: false, message: errorMessage });
  }
};

/**
 * Retrieves a list of users based on filters and pagination.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the list of users and pagination details.
 */
export const getUsers = async (
  req: Request<FiltersAndPagination<UserFilters>>,
  res: ResponseWithInformation
) => {
  const { filters, pageSize, skip, page, getNumberOfPages } =
    getOrganizationFiltersAndPagination(req);

  try {
    const users = await findUsersService(filters, skip, pageSize);
    const totalItems = await countUsersService(filters);

    return res.status(200).json({
      success: true,
      data: users,
      page,
      page_size: pageSize,
      total_pages: getNumberOfPages(totalItems),
      total_items: totalItems,
    });
  } catch (error) {
    const errorMessage: string = (error as { message: string }).message;

    logger.error(`errors: ${errorMessage}`);
    return res.status(500).json({ success: false, message: errorMessage });
  }
};

/**
 * Updates the user's password.
 * @param req - Express request object.
 * @param  res - Express response object.
 * @returns  Response containing the updated user or error message.
 */
export const updatePassword = async (
  req: Request,
  res: ResponseWithInformation
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

      logger.info(
        `Password changed - User : Firstname : ${user.firstname}, Lastname : ${user.lastname}, id : ${user._id}`
      );

      if (user) return res.status(200).json(user);
      else return res.sendStatus(500);
    }
  } catch (err) {
    logger.error(err);
    return res.status(403).json({ error: err });
  }
};

/**
 * Updates user information (phone number, date of birth).
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the updated user or error message.
 */
export const updateUser = async (
  req: Request<any, any, Partial<User> | undefined>,
  res: ResponseWithInformation
) => {
  const userData = req.body;
  const user = res.locals.user;

  if (!user) {
    const errorMessage = 'User not found';

    logger.error(errorMessage);
    return res.status(404).json({ error: errorMessage });
  }

  if (typeof userData !== 'object') {
    const errorMessage = 'User data not found';

    logger.error(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const updatedUser = await updateUserByIdService(user._id, userData);

    logger.info(
      `User updated: Firstname: ${updatedUser.firstname}, Lastname: ${updatedUser.lastname}, id: ${updatedUser._id}`
    );

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    const errorMessage: string = (error as { message: string }).message;

    logger.error(`errors: ${errorMessage}`);
    return res.status(500).json({ success: false, message: errorMessage });
  }
};

/**
 * Validates a user's email based on the provided secret and user ID.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the validated user or error message.
 */
export const validEmail = async (
  req: Request,
  res: ResponseWithInformation
) => {
  const userId = req.params.userId as unknown as User['_id'];
  const secret = req.params.secret;
  const organization = res.locals.organization;

  if (!Types.ObjectId.isValid(userId.toString())) {
    return res
      .sendStatus(404)
      .json({ success: false, message: 'User id not valid' });
  }

  if (!organization) {
    return res
      .sendStatus(404)
      .json({ success: false, message: 'Organization not found' });
  }

  const user = await getUserByIdService(userId);

  if (!user) {
    return res
      .sendStatus(404)
      .json({ success: false, message: 'User not found' });
  }

  if (secret !== user.secret) {
    return res
      .sendStatus(500)
      .json({ success: false, message: 'Secret not valid' });
  }

  user.emailValidated = true;
  await user.save();

  await activateUserService(user);

  logger.info(
    `User activated - User: Firstname: ${user.firstname}, Lastname: ${user.lastname}, id: ${user._id}`
  );

  return res.status(200).json(user);
};

/**
 * Requests a password reset for a user.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response indicating the status of the password reset request.
 */
export const askResetPassword = async (
  req: Request,
  res: ResponseWithInformation
) => {
  try {
    const user = await requestPasswordResetService(req.body.email);

    if (!user) {
      return res
        .status(200)
        .json({ emailState: 'Email incorrect', user: 'none' });
    }

    logger.info(
      `Ask changing password - User: Firstname: ${user.firstname}, Lastname: ${user.lastname}, id: ${user._id}`
    );

    return res.status(200).json({ emailState: 'Email sent', user: user._id });
  } catch (err) {
    logger.error(err);
    return res.sendStatus(500);
  }
};

/**
 * Resets a user's password based on the provided secret and user ID.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the updated user or error message.
 */
export const resetPassword = async (
  req: Request,
  res: ResponseWithInformation
): Promise<Response> => {
  const userId = req.params.userId as unknown as User['_id'];
  const secret: string = req.params.secret;
  const password: string = req.body.password;
  const organization = res.locals.organization;

  if (!Types.ObjectId.isValid(userId.toString())) {
    return res
      .sendStatus(404)
      .json({ success: false, message: 'User id not valid' });
  }

  if (!organization) {
    return res
      .sendStatus(404)
      .json({ success: false, message: 'Organization not found' });
  }

  if (!secret) {
    return res
      .status(400)
      .json({ success: false, message: 'Secret not provided' });
  }

  try {
    const user = await resetUserPasswordService(userId, secret, password);

    logger.info(
      `Password changed - User: Firstname: ${user.firstname}, Lastname: ${user.lastname}, id: ${user._id}`
    );

    return res.status(200).json(user);
  } catch (err) {
    return res
      .status(400)
      .json({ emailState: 'Not sent', user: 'not created', error: err });
  }
};
