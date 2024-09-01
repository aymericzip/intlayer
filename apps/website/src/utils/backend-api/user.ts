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
} from '@controllers/user.controller';

const USER_API_ROUTE = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`;

/**
 * Retrieves a list of users based on filters and pagination.
 * @param filters - Filters and pagination options.
 * @returns List of users.
 */
const getUsers = async (filters?: GetUsersParams): Promise<GetUsersResult> => {
  const searchParams = new URLSearchParams(filters);

  const response = await fetch(`${USER_API_ROUTE}?${searchParams.toString()}`, {
    method: 'GET',
    credentials: 'include',
  });
  return response.json();
};

/**
 * Retrieves a user by ID.
 * @param userId - User ID.
 * @returns User object.
 */
const getUserById = async (
  userId: GetUserByIdParams['userId']
): Promise<GetUserByIdResult> => {
  const response = await fetch(`${USER_API_ROUTE}/${userId}`, {
    method: 'GET',
    credentials: 'include',
  });
  return response.json();
};

/**
 * Retrieves a user by email.
 * @param email - User email.
 * @returns User object.
 */
const getUserByEmail = async (
  email: GetUserByEmailParams['email']
): Promise<GetUserByEmailResult> => {
  const response = await fetch(`${USER_API_ROUTE}/email/${email}`, {
    method: 'GET',
    credentials: 'include',
  });
  return response.json();
};

/**
 * Retrieves a user by account.
 * @param providerAccountId - The provider account ID.
 * @param provider - The provider of the account.
 */
const getUserByAccount = async (
  providerAccountId: GetUserByAccountParams['providerAccountId'],
  provider: GetUserByAccountParams['provider']
): Promise<GetUserByAccountResult> => {
  const response = await fetch(
    `${USER_API_ROUTE}/account/${provider}/${providerAccountId}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
  return response.json();
};

/**
 * Creates a new user.
 * @param user - User credentials.
 * @returns User object.
 */
const createUser = async (user: CreateUserBody): Promise<CreateUserResult> => {
  const response = await fetch(`${USER_API_ROUTE}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
    credentials: 'include',
  });
  return response.json();
};

/**
 * Updates the user with the provided data.
 * @param user - Updated user data.
 * @returns User object.
 */
const updateUser = async (user: UpdateUserBody): Promise<UpdateUserResult> => {
  const response = await fetch(`${USER_API_ROUTE}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
    credentials: 'include',
  });
  return response.json();
};

/**
 * Deletes a user with the provided ID.
 * @param userId - User ID.
 * @returns User object.
 */
const deleteUser = async (userId: string): Promise<UpdateUserResult> => {
  const response = await fetch(`${USER_API_ROUTE}/${userId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return response.json();
};

export const userAPI = {
  createUser,
  getUsers,
  getUserById,
  getUserByAccount,
  getUserByEmail,
  updateUser,
  deleteUser,
};
