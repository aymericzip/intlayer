import { UserModel } from '@models/user.model';
import { GenericError } from '@utils/errors';
import type { UserFilters } from '@utils/filtersAndPagination/getUserFiltersAndPagination';
import {
  type FieldsToCheck,
  type UserFields,
  validateUser,
} from '@utils/validation/validateUser';
import type { Types } from 'mongoose';
import type { User, UserAPI, UserDocument } from '@/types/user.types';

/**
 * Creates a new user with password in the database and hashes the password.
 * @param user - User object with password not hashed.
 * @returns Created user object.
 */
export const createUser = async (
  user: Partial<User>
): Promise<UserDocument> => {
  const fieldsToCheck: FieldsToCheck[] = ['email'];

  const errors = validateUser(user, fieldsToCheck);

  if (Object.keys(errors).length > 0) {
    throw new GenericError('USER_INVALID_FIELDS', {
      userEmail: user.email,
      errors,
    });
  }

  const newUser: UserDocument = await UserModel.create(user);

  if (!newUser) {
    throw new GenericError('USER_CREATION_FAILED', { userEmail: user.email });
  }

  return newUser;
};

/**
 * Retrieves a user by email.
 * @param email - User's email.
 * @returns User object or null if no user was found.
 */
export const getUserByEmail = async (
  email: string
): Promise<UserDocument | null> => {
  return await UserModel.findOne({ email });
};

/**
 * Retrieves users list by email.
 * @param emails - Users email.
 * @returns User object or null if no user was found.
 */
export const getUsersByEmails = async (
  emails: string[]
): Promise<UserDocument[] | null> => {
  return await UserModel.find({ email: { $in: emails } });
};

/**
 * Checks if a user exists by email.
 * @param email - User's email.
 * @returns True if the user exists, false otherwise.
 */
export const checkUserExists = async (email: string): Promise<boolean> => {
  const user = await UserModel.exists({ email });
  return user !== null;
};

/**
 * Retrieves a user by ID.
 * @param userId - User's ID.
 * @returns User object or null if no user was found.
 */
export const getUserById = async (
  userId: string | Types.ObjectId
): Promise<UserDocument | null> => await UserModel.findById(userId);

/**
 * Retrieves a user by ID.
 * @param userId - User's ID.
 * @returns User object or null if no user was found.
 */
export const getUsersByIds = async (
  userIds: (string | Types.ObjectId)[]
): Promise<UserDocument[] | null> =>
  await UserModel.find({ _id: { $in: userIds } });

/**
 * Finds users based on filters and pagination options.
 * @param filters - MongoDB filter query.
 * @param skip - Number of documents to skip.
 * @param limit - Number of documents to limit.
 * @param sortOptions - Sorting options.
 * @returns List of users matching the filters.
 */
export const findUsers = async (
  filters: UserFilters,
  skip: number,
  limit: number,
  sortOptions?: Record<string, 1 | -1>
): Promise<UserDocument[]> => {
  let query = UserModel.find(filters).skip(skip).limit(limit);

  if (sortOptions && Object.keys(sortOptions).length > 0) {
    query = query.sort(sortOptions);
  }

  return await query;
};

/**
 * Counts the total number of users that match the filters.
 * @param filters - MongoDB filter query.
 * @returns Total number of users.
 */
export const countUsers = async (filters: UserFilters): Promise<number> => {
  const count = await UserModel.countDocuments(filters);

  if (typeof count === 'undefined') {
    throw new GenericError('USER_COUNT_FAILED');
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
  userId: string | Types.ObjectId,
  updates: Partial<UserAPI>
): Promise<UserDocument> => {
  const keyToValidate = Object.keys(updates) as UserFields;
  const errors = validateUser(updates, keyToValidate);

  if (Object.keys(errors).length > 0) {
    throw new GenericError('USER_INVALID_FIELDS', {
      userId,
      errors,
    });
  }

  const result = await UserModel.updateOne({ _id: userId }, { $set: updates });

  if (result.matchedCount === 0) {
    throw new GenericError('USER_UPDATE_FAILED', { userId });
  }

  const updatedUser = await UserModel.findById(userId);

  if (!updatedUser) {
    throw new GenericError('USER_UPDATED_USER_NOT_FOUND', { userId });
  }

  return updatedUser;
};

/**
 * Deletes a user from the database.
 * @param userId - The user object.
 * @returns
 */
export const deleteUser = async (
  userId: string | Types.ObjectId
): Promise<UserDocument> => {
  await getUserById(userId);

  const user = await UserModel.findByIdAndDelete(userId);

  if (!user) {
    throw new GenericError('USER_NOT_FOUND', { userId });
  }

  return user;
};
