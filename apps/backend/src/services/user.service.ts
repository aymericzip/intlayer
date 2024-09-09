/* eslint-disable sonarjs/no-duplicate-string */
import { logger } from '@logger/index';
import { UserModel } from '@models/user.model';
import type { UserFilters } from '@utils/filtersAndPagination/getUserFiltersAndPagination';
import {
  type FieldsToCheck,
  validateUser,
} from '@utils/validation/validateUser';
import type { ObjectId } from 'mongoose';
import { hashUserPassword } from './auth.service';
import type { SessionProviders } from '@/types/session.types';
import type {
  User,
  UserAPI,
  UserDocument,
  UserWithPasswordNotHashed,
} from '@/types/user.types';

/**
 * Creates a new user with password in the database and hashes the password.
 * @param user - User object with password not hashed.
 * @returns Created user object.
 */
export const createUser = async (user: UserWithPasswordNotHashed) => {
  const fieldsToCheck: FieldsToCheck[] = ['email'];

  const errors = validateUser(user, fieldsToCheck);

  if (Object.keys(errors).length > 0) {
    const errorMessage = `User invalid fields - ${user.email} - ${JSON.stringify(
      errors
    )}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  let newUser: User;

  if (user.password) {
    const userWithHashedPassword = await hashUserPassword(user);

    newUser = await UserModel.create(userWithHashedPassword);
  } else {
    newUser = await UserModel.create(user);
  }

  if (!newUser) {
    const errorMessage = `User creation failed - ${user.email}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return newUser;
};

/**
 * Retrieves a user by email.
 * @param email - User's email.
 * @returns User object or null if no user was found.
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await UserModel.findOne({ email });
};

/**
 * Checks if a user exists by email.
 * @param email - User's email.
 * @returns True if the user exists, false otherwise.
 */
export const checkUserExists = async (email: string) => {
  const user = await UserModel.exists({ email });
  return user !== null;
};

/**
 * Retrieves a user by ID.
 * @param userId - User's ID.
 * @returns User object or null if no user was found.
 */
export const getUserById = async (
  userId: string | ObjectId
): Promise<User | null> => {
  return await UserModel.findById(userId);
};

/**
 * Retrieves a user by session token.
 * @param sessionToken - The session token.
 * @returns User object or null if no user was found.
 */
export const getUserBySession = async (sessionToken: string) => {
  // Get an user by session token and check if it expired
  const user = await UserModel.findOne({
    'session.sessionToken': sessionToken,
  });

  if (!user) {
    const errorMessage = `User not found - ${sessionToken}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  if (user.session?.expires && user.session.expires < new Date()) {
    const errorMessage = `User session expired - ${sessionToken} - ${user.id}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return user;
};

/**
 * Retrieves a user by account.
 * @param provider - The provider of the account.
 * @param providerAccountId - The provider account ID.
 * @returns User object or null if no user was found.
 */
export const getUserByAccount = async (
  provider: SessionProviders['provider'],
  providerAccountId: string
): Promise<User> => {
  const user = await UserModel.findOne({
    provider: [{ provider, providerAccountId }],
  });

  if (!user) {
    const errorMessage = `User not found - ${provider} - ${providerAccountId}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return user;
};

/**
 * Finds users based on filters and pagination options.
 * @param filters - MongoDB filter query.
 * @param skip - Number of documents to skip.
 * @param limit - Number of documents to limit.
 * @returns List of users matching the filters.
 */
export const findUsers = async (
  filters: UserFilters,
  skip: number,
  limit: number
): Promise<User[]> => {
  return await UserModel.find(filters).skip(skip).limit(limit);
};

/**
 * Counts the total number of users that match the filters.
 * @param filters - MongoDB filter query.
 * @returns Total number of users.
 */
export const countUsers = async (filters: UserFilters): Promise<number> => {
  const count = await UserModel.countDocuments(filters);

  if (typeof count === 'undefined') {
    const errorMessage = 'User count failed';

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return count;
};

/**
 * Updates a user's information.
 * @param user - The user object.
 * @param updates - The updates to apply to the user.
 * @returns The updated user.
 */
export const updateUserById = async (
  userId: string | ObjectId,
  updates: Partial<User>
): Promise<User> => {
  const keyToValidate = Object.keys(updates) as (keyof User)[];
  const errors = validateUser(updates, keyToValidate);

  const userIdString = String(userId);

  if (Object.keys(errors).length > 0) {
    const errorMessage = `User invalid fields - ${userIdString} - ${JSON.stringify(
      errors
    )}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const result = await UserModel.updateOne({ _id: userId }, { $set: updates });

  if (result.matchedCount === 0) {
    const errorMessage = `User update failed - ${userIdString}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const updatedUser = await UserModel.findById(userId);

  if (!updatedUser) {
    const errorMessage = `Failed to find the updated user - ${userIdString}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return updatedUser;
};

/**
 * Deletes a user from the database.
 * @param userId - The user object.
 * @returns
 */
export const deleteUser = async (userId: string | ObjectId) => {
  await getUserById(userId);

  const user = await UserModel.findByIdAndDelete(userId);

  if (!user) {
    const userIdString = String(userId);
    const errorMessage = `No user found for deletion - ${userIdString}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return user;
};

/**
 * Formats a user for API response. Removes sensitive information and adds role.
 * @param user - The user object to format.
 * @returns The formatted user object.
 */
export const formatUserForAPI = (user: User | UserDocument): UserAPI => {
  let userObject: User = user;

  // If the user is a mongoose document, convert it to an object
  if (typeof (user as UserDocument).toObject === 'function') {
    userObject = (user as UserDocument).toObject();
  }

  const { provider, session, createdAt, ...userAPI } = userObject;

  return { ...userAPI, role: 'user' };
};

/**
 * Formats an array of users for API response. Removes sensitive information and adds role.
 * @param users - The array of user objects to format.
 * @returns The formatted array of user objects.
 */
export const formatUsersForAPI = (users: User[]): UserAPI[] =>
  users.map(formatUserForAPI);
