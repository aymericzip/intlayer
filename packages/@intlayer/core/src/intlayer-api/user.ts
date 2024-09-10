import type {
  CreateUserBody,
  CreateUserResult,
  GetUserByAccountParams,
  GetUserByAccountResult,
  GetUserByEmailParams,
  GetUserByEmailResult,
  GetUserByIdParams,
  GetUserByIdResult,
  GetUsersParams,
  GetUsersResult,
  UpdateUserBody,
  UpdateUserResult,
} from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config/client';
import { fetcher } from './fetcher';

const backendURL = getConfiguration().editor.backendURL;
const USER_API_ROUTE = `${backendURL}/api/user`;

/**
 * Retrieves a list of users based on filters and pagination.
 * @param filters - Filters and pagination options.
 * @returns List of users.
 */
const getUsers = async (filters?: GetUsersParams) =>
  await fetcher<GetUsersResult>(USER_API_ROUTE, {
    params: filters,
  });

/**
 * Retrieves a user by ID.
 * @param userId - User ID.
 * @returns User object.
 */
const getUserById = async (userId: GetUserByIdParams['userId']) =>
  await fetcher<GetUserByIdResult>(`${USER_API_ROUTE}/${userId}`);

/**
 * Retrieves a user by email.
 * @param email - User email.
 * @returns User object.
 */
const getUserByEmail = async (email: GetUserByEmailParams['email']) =>
  await fetcher<GetUserByEmailResult>(`${USER_API_ROUTE}/email/${email}`);

/**
 * Retrieves a user by account.
 * @param providerAccountId - The provider account ID.
 * @param provider - The provider of the account.
 */
const getUserByAccount = async (
  providerAccountId: GetUserByAccountParams['providerAccountId'],
  provider: GetUserByAccountParams['provider']
) =>
  await fetcher<GetUserByAccountResult>(
    `${USER_API_ROUTE}/account/${provider}/${providerAccountId}`
  );

/**
 * Creates a new user.
 * @param user - User credentials.
 * @returns User object.
 */
const createUser = async (user: CreateUserBody) =>
  await fetcher<CreateUserResult>(`${USER_API_ROUTE}/`, {
    method: 'POST',
    body: user,
  });

/**
 * Updates the user with the provided data.
 * @param user - Updated user data.
 * @returns User object.
 */
const updateUser = async (user: UpdateUserBody) =>
  await fetcher<UpdateUserResult>(`${USER_API_ROUTE}`, {
    method: 'PUT',
    body: user,
  });

/**
 * Deletes a user with the provided ID.
 * @param userId - User ID.
 * @returns User object.
 */
const deleteUser = async (userId: string) =>
  await fetcher<UpdateUserResult>(`${USER_API_ROUTE}/${userId}`, {
    method: 'DELETE',
  });

export const userAPI = {
  createUser,
  getUsers,
  getUserById,
  getUserByAccount,
  getUserByEmail,
  updateUser,
  deleteUser,
};
