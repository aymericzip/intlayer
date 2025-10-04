import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';
import type { User, UserAPI } from '@/types/user.types';

/**
 * Formats a user for API response. Removes sensitive information and adds role.
 * @param user - The user object to format.
 * @returns The formatted user object.
 */
export const mapUserToAPI = <T extends User | UserAPI | null>(
  user?: T
): T extends null ? null : UserAPI => {
  if (!user) {
    return null as any;
  }

  const userObject = ensureMongoDocumentToObject(user);

  const { provider, session, ...userAPI } = userObject as any;

  return userAPI as any;
};

/**
 * Formats an array of users for API response. Removes sensitive information and adds role.
 * @param users - The array of user objects to format.
 * @returns The formatted array of user objects.
 */
export const mapUsersToAPI = (users: (User | UserAPI)[]): UserAPI[] =>
  users.map(mapUserToAPI).filter(Boolean) as UserAPI[];
