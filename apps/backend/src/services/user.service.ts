import { logger } from '@logger/index';
import { UserModel } from '@models/user.model';
import type { UserFilters } from '@utils/filtersAndPagination/getUserFiltersAndPagination';
import {
  type FieldsToCheck,
  validateUser,
} from '@utils/validation/validateUser';
import { compare, genSalt, hash } from 'bcrypt';
import type { ObjectId } from 'mongoose';
import type {
  User,
  UserAPI,
  UserWithPasswordNotHashed,
} from '@/types/user.types';

/**
 * Creates a new user in the database.
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

  const userWithHashedPassword = await hashUserPassword(
    user as unknown as UserWithPasswordNotHashed
  );
  const newUser = await UserModel.create(userWithHashedPassword);

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
export const getUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    const errorMessage = `User not found - ${email}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return user;
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
export const getUserById = async (userId: string | ObjectId) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    const userIdString = String(userId);
    const errorMessage = `User not found - ${userIdString}`;

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
  const errors = validateUser(updates);

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
 * Activates a user by setting the emailValidated flag to true.
 * @param user - The user object.
 * @returns
 */
export const activateUser = async (
  userId: string | ObjectId,
  secret: string
): Promise<void> => {
  const user = await getUserById(userId);

  if (user.secret !== secret) {
    const userIdString = String(userId);
    const errorMessage = `Secret not valid - ${userIdString}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }
  await updateUserById(userId, { emailValidated: true });
};

/**
 * Generates a random secret string of a specified length.
 * @param {number} length - The length of the secret.
 * @returns {string} The generated secret string.
 */
export const generateSecret = (length: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');
};

/**
 * Handles a password reset request for a user.
 * @param email - The user's email.
 * @param organization - The organization associated with the user.
 * @returns The user object or null if no user was found.
 */
export const requestPasswordReset = async (
  email: string
): Promise<User | null> => {
  const user = await UserModel.findOne({ email });
  if (user) {
    user.secret = generateSecret(35);
    await user.save();
  }
  return user;
};

/**
 * Resets a user's password.
 * @param userId - The ID of the user.
 * @param secret - The secret token associated with the user.
 * @param newPassword - The new password to set.
 * @returns The updated user or null if the reset failed.
 */
export const resetUserPassword = async (
  userId: string | ObjectId,
  secret: string,
  newPassword: string
): Promise<User> => {
  const user = await UserModel.findById(userId);
  const userIdString = String(userId);

  if (!user) {
    const errorMessage = `User not found - ${userIdString}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  if (user.secret !== secret) {
    const errorMessage = `Secret not valid - ${userIdString}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  user.passwordHash = await hash(newPassword, await genSalt());
  user.secret = undefined;

  await user.save();

  return user;
};

/**
 * Logs in a user.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns The user object.
 */
export const testUserPassword = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (!user?.passwordHash) {
    const errorMessage = `User request to login but no password defined: ${email}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const isMatch = await compare(password, user.passwordHash);

  if (!isMatch) {
    const errorMessage = `Incorrect email or password: ${email}`;

    logger.error(errorMessage);

    // Await a random time to prevent brute force attacks
    const randomNumber = Math.floor(Math.random() * 1000) + 1000;
    await new Promise((resolve) => setTimeout(resolve, randomNumber));

    throw new Error(errorMessage);
  }

  return user;
};

export const hashUserPassword = async (
  userWithPasswordNotHashed: UserWithPasswordNotHashed
): Promise<Partial<User>> => {
  const { password, ...user } = userWithPasswordNotHashed;

  if (!password) {
    const errorMessage = `No password defined: ${userWithPasswordNotHashed.email}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const salt = await genSalt();
  const passwordHash = await hash(password, salt);

  return { ...user, passwordHash };
};

export const formatUserName = (user: Pick<User, 'firstname' | 'lastname'>) => {
  const { firstname, lastname } = user;

  const formattedUser: Partial<User> = {
    ...user,
    firstname:
      firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase(),
    lastname: lastname.toUpperCase(),
  };

  return formattedUser;
};

/**
 * Changes a user's password.
 * @param userId - The ID of the user.
 * @param oldPassword - The user's old password.
 * @param newPassword - The user's new password.
 * @returns The updated user or null if the password change failed.
 */
export const changeUserPassword = async (
  userId: string | ObjectId,
  oldPassword: string,
  newPassword: string
) => {
  const { email } = await getUserById(userId);
  const user = await testUserPassword(email, oldPassword);

  user.passwordHash = await hash(newPassword, await genSalt());
  await user.save();
  return user;
};

/**
 * Resets a user's password.
 * @param userId - The ID of the user.
 * @param secret - The secret token associated with the user.
 * @param newPassword - The new password to set.
 * @returns The updated user or null if the reset failed.
 */
export const resetPassword = async (userId: string, password: string) => {
  const user = await getUserById(userId);

  if (user) {
    user.passwordHash = await hash(password, await genSalt());
    await user.save();
    return user;
  }

  throw new Error('Incorrect password');
};

export const formatUserForAPI = (user: User): UserAPI => {
  const { emailValidated, secret, passwordHash, ...userAPI } = user;

  return { ...userAPI, role: 'user' };
};
export const formatUsersForAPI = (users: User[]): UserAPI[] =>
  users.map(formatUserForAPI);
