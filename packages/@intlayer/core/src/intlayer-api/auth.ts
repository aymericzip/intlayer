import type {
  AskResetPasswordBody,
  AskResetPasswordResult,
  CreateSessionBody,
  CreateSessionResult,
  GetSessionInformationQuery,
  GithubLoginQueryParams,
  GoogleLoginQueryParams,
  GetSessionInformationResult,
  LoginBody,
  LoginResult,
  RegisterBody,
  RegisterResult,
  ResetPasswordParams,
  ResetPasswordResult,
  UpdatePasswordBody,
  UpdatePasswordResult,
  ValidEmailParams,
  ValidEmailResult,
} from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config/client';

const backendURL = getConfiguration().editor.backendURL;
const AUTH_API_ROUTE = `${backendURL}/api/auth`;

/**
 * Logs in a user with the provided credentials.
 * @param user - User credentials.
 */
const login = async (user: LoginBody): Promise<LoginResult> => {
  const response = await fetch(`${AUTH_API_ROUTE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(user),
  });
  return response.json();
};

const getLoginWithGitHubURL = (params: GithubLoginQueryParams): string => {
  const searchParams = new URLSearchParams(params);

  return `${AUTH_API_ROUTE}/login/github?${searchParams.toString()}`;
};

const getLoginWithGoogleURL = (params: GoogleLoginQueryParams): string => {
  const searchParams = new URLSearchParams(params);

  return `${AUTH_API_ROUTE}/login/google?${searchParams.toString()}`;
};

/**
 * Registers a new user with the provided credentials.
 * @param user - User credentials.
 * @returns User object.
 */
const register = async (user: RegisterBody): Promise<RegisterResult> => {
  const response = await fetch(`${AUTH_API_ROUTE}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(user),
  });
  return response.json();
};

/**
 * Signs out the user.
 * @returns User object.
 */
const logout = async (): Promise<void> => {
  const response = await fetch(`${AUTH_API_ROUTE}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  return response.json();
};

/**
 * Ask to resets the password of a user with the provided email address.
 * @param email - Email address of the user.
 * @returns User object.
 */
const askResetPassword = async (
  email: AskResetPasswordBody['email']
): Promise<AskResetPasswordResult> => {
  const response = await fetch(`${AUTH_API_ROUTE}/password/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email }),
  });
  return response.json();
};

/**
 * Resets the password of a user with the provided email address.
 * @param email - Email address of the user.
 * @returns User object.
 */
const resetPassword = async (
  params: ResetPasswordParams
): Promise<ResetPasswordResult> => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${AUTH_API_ROUTE}/password/reset?${searchParams.toString()}`,
    {
      method: 'POST',
      credentials: 'include',
    }
  );
  return response.json();
};

/**
 * Changes the password of a user with the provided data.
 * @param data - New password and confirmation.
 * @returns User object.
 */
const changePassword = async (
  data: UpdatePasswordBody
): Promise<UpdatePasswordResult> => {
  const response = await fetch(`${AUTH_API_ROUTE}/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  return response.json();
};

/**
 * Verifies the email address of a user with the provided token.
 * @param params - User ID and secret key.
 * @returns User object.
 */
const verifyEmail = async (
  params: ValidEmailParams
): Promise<ValidEmailResult> => {
  const { userId, secret } = params;
  const response = await fetch(`${AUTH_API_ROUTE}/active/${userId}/${secret}`, {
    method: 'PUT',
    credentials: 'include',
  });
  return response.json();
};

/**
 * Creates a session for a user.
 * @param params - User ID and secret key.
 * @returns User object.
 */
const createSession = async (
  data: CreateSessionBody
): Promise<CreateSessionResult> => {
  const response = await fetch(`${AUTH_API_ROUTE}/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  return response.json();
};

/**
 * Gets a session and user.
 * @param params - User ID and secret key.
 * @returns User object.
 */
const getSessionInformation = async (
  sessionToken?: GetSessionInformationQuery['session_token']
): Promise<GetSessionInformationResult> => {
  let params = '';

  if (sessionToken) {
    params = `?${new URLSearchParams({ session_token: sessionToken }).toString()}`;
  }

  const response = await fetch(`${AUTH_API_ROUTE}/session${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  return response.json();
};

export const authAPI = {
  login,
  getLoginWithGitHubURL,
  getLoginWithGoogleURL,
  register,
  logout,
  resetPassword,
  askResetPassword,
  verifyEmail,
  changePassword,
  createSession,
  getSessionInformation,
};
