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
import { fetcher } from './fetcher';

const backendURL = getConfiguration().editor.backendURL;
const AUTH_API_ROUTE = `${backendURL}/api/auth`;

/**
 * Logs in a user with the provided credentials.
 * @param user - User credentials.
 */
const login = async (user: LoginBody) =>
  await fetcher<LoginResult>(`${AUTH_API_ROUTE}/login`, {
    method: 'POST',
    body: user,
  });

/**
 * Gets the login with GitHub URL.
 * @param params - The parameters for the login with GitHub URL.
 * @returns The login with GitHub URL.
 */
const getLoginWithGitHubURL = (params: GithubLoginQueryParams): string => {
  const searchParams = new URLSearchParams(params);

  return `${AUTH_API_ROUTE}/login/github?${searchParams.toString()}`;
};

/**
 * Gets the login with Google URL.
 * @param params - The parameters for the login with Google URL.
 * @returns The login with Google URL.
 */
const getLoginWithGoogleURL = (params: GoogleLoginQueryParams): string => {
  const searchParams = new URLSearchParams(params);

  return `${AUTH_API_ROUTE}/login/google?${searchParams.toString()}`;
};

/**
 * Registers a new user with the provided credentials.
 * @param user - User credentials.
 * @returns User object.
 */
const register = async (user: RegisterBody) =>
  await fetcher<RegisterResult>(`${AUTH_API_ROUTE}/register`, {
    method: 'POST',
    body: user,
  });

/**
 * Signs out the user.
 * @returns User object.
 */
const logout = async () =>
  await fetcher<void>(`${AUTH_API_ROUTE}/logout`, {
    method: 'POST',
  });

/**
 * Ask to resets the password of a user with the provided email address.
 * @param email - Email address of the user.
 * @returns User object.
 */
const askResetPassword = async (email: AskResetPasswordBody['email']) =>
  await fetcher<AskResetPasswordResult>(`${AUTH_API_ROUTE}/password/reset`, {
    method: 'POST',
    body: { email },
  });

/**
 * Resets the password of a user with the provided email address.
 * @param email - Email address of the user.
 * @returns User object.
 */
const resetPassword = async (params: ResetPasswordParams) => {
  const searchParams = new URLSearchParams(params);

  return await fetcher<ResetPasswordResult>(
    `${AUTH_API_ROUTE}/password/reset?${searchParams.toString()}`,
    {
      method: 'POST',
    }
  );
};

/**
 * Changes the password of a user with the provided data.
 * @param data - New password and confirmation.
 * @returns User object.
 */
const changePassword = async (data: UpdatePasswordBody) =>
  await fetcher<UpdatePasswordResult>(`${AUTH_API_ROUTE}/password`, {
    method: 'PUT',
    body: data,
  });

/**
 * Verifies the email address of a user with the provided token.
 * @param params - User ID and secret key.
 * @returns User object.
 */
const verifyEmail = async (params: ValidEmailParams) => {
  const { userId, secret } = params;

  return await fetcher<ValidEmailResult>(
    `${AUTH_API_ROUTE}/active/${userId}/${secret}`,
    {
      method: 'PUT',
    }
  );
};

/**
 * Creates a session for a user.
 * @param params - User ID and secret key.
 * @returns User object.
 */
const createSession = async (data: CreateSessionBody) =>
  await fetcher<CreateSessionResult>(`${AUTH_API_ROUTE}/session`, {
    method: 'POST',
    body: data,
  });

/**
 * Gets a session and user.
 * @param params - User ID and secret key.
 * @returns User object.
 */
const getSessionInformation = async (
  sessionToken?: GetSessionInformationQuery['session_token']
) => {
  let params = '';

  if (sessionToken) {
    params = `?${new URLSearchParams({ session_token: sessionToken }).toString()}`;
  }

  return await fetcher<GetSessionInformationResult>(
    `${AUTH_API_ROUTE}/session${params}`
  );
};

/**
 * Gets the CSRF token.
 * @returns The CSRF token.
 */
const getCSRFToken = async () =>
  await fetcher<string>(`${AUTH_API_ROUTE}/csrf-token`);

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
  getCSRFToken,
};
