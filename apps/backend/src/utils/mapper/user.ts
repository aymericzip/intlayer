import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';
import type { User, UserAPI, UserDocument } from '@/types/user.types';

/**
 * Formats a user for API response. Removes sensitive information and adds role.
 * @param user - The user object to format.
 * @returns The formatted user object.
 */
export const mapUserToAPI = (user: User | UserAPI): UserAPI => {
  const userObject = ensureMongoDocumentToObject(user);

  const { provider, session, createdAt, ...userAPI } =
    userObject as UserDocument;

  return { ...userAPI, role: 'user' };
};

/**
 * Formats an array of users for API response. Removes sensitive information and adds role.
 * @param users - The array of user objects to format.
 * @returns The formatted array of user objects.
 */
export const mapUsersToAPI = (users: User[]): UserAPI[] =>
  users.map(mapUserToAPI);
