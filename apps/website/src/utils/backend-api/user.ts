import type {
  RegisterBody,
  LoginBody,
  LoginResult,
  RegisterResult,
} from '@controllers/auth.controller';
import type {
  AskResetPasswordBody,
  AskResetPasswordResult,
  GetUserParams,
  GetUserResult,
  ResetPasswordParams,
  ResetPasswordResult,
  UpdatePasswordBody,
  UpdatePasswordResult,
  UpdateUserBody,
  UpdateUserResult,
  ValidEmailParams,
  ValidEmailResult,
} from '@controllers/user.controller';

const USER_API_ROUTE = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`;

/**
 * Retrieves a list of users based on filters and pagination.
 * @param filters - Filters and pagination options.
 */
const getUser = async (filters?: GetUserParams): Promise<GetUserResult> => {
  const searchParams = new URLSearchParams(filters);

  const response = await fetch(`${USER_API_ROUTE}?${searchParams.toString()}`, {
    method: 'GET',
  });
  return response.json();
};

/**
 * Logs in a user with the provided credentials.
 * @param user - User credentials.
 */
const login = async (user: LoginBody): Promise<LoginResult> => {
  const response = await fetch(`${USER_API_ROUTE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

/**
 * Verifies the email address of a user with the provided token.
 * @param params - User ID and secret key.
 */
const verifyEmail = async (
  params: ValidEmailParams
): Promise<ValidEmailResult> => {
  const { userId, secret } = params;
  const response = await fetch(`${USER_API_ROUTE}/active/${userId}/${secret}`, {
    method: 'PUT',
  });
  return response.json();
};

/**
 * Registers a new user with the provided credentials.
 * @param user - User credentials.
 */
const register = async (user: RegisterBody): Promise<RegisterResult> => {
  const response = await fetch(`${USER_API_ROUTE}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

/**
 * Ask to resets the password of a user with the provided email address.
 * @param email - Email address of the user.
 */
const askResetPassword = async (
  email: AskResetPasswordBody['email']
): Promise<AskResetPasswordResult> => {
  const response = await fetch(`${USER_API_ROUTE}/password/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  return response.json();
};

/**
 * Resets the password of a user with the provided email address.
 * @param email - Email address of the user.
 */
const resetPassword = async (
  params: ResetPasswordParams
): Promise<ResetPasswordResult> => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${USER_API_ROUTE}/password/reset?${searchParams.toString()}`,
    {
      method: 'POST',
    }
  );
  return response.json();
};

/**
 * Changes the password of a user with the provided data.
 * @param data - New password and confirmation.
 */
const changePassword = async (
  data: UpdatePasswordBody
): Promise<UpdatePasswordResult> => {
  const response = await fetch(`${USER_API_ROUTE}/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

/**
 * Updates the user with the provided data.
 * @param user - Updated user data.
 */
const updateUser = async (user: UpdateUserBody): Promise<UpdateUserResult> => {
  const response = await fetch(`${USER_API_ROUTE}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const userAPI = {
  verifyEmail,
  login,
  register,
  resetPassword,
  askResetPassword,
  changePassword,
  getUser,
  updateUser,
};
