import type {
  // @ts-ignore: @intlayer/backend is not built yet
  AskResetPasswordBody,
  // @ts-ignore: @intlayer/backend is not built yet
  AskResetPasswordResult,
  // @ts-ignore: @intlayer/backend is not built yet
  CreateSessionBody,
  // @ts-ignore: @intlayer/backend is not built yet
  CreateSessionResult,
  // @ts-ignore: @intlayer/backend is not built yet
  GetSessionInformationQuery,
  // @ts-ignore: @intlayer/backend is not built yet
  GithubLoginQueryParams,
  // @ts-ignore: @intlayer/backend is not built yet
  GoogleLoginQueryParams,
  // @ts-ignore: @intlayer/backend is not built yet
  GetSessionInformationResult,
  // @ts-ignore: @intlayer/backend is not built yet
  LoginBody,
  // @ts-ignore: @intlayer/backend is not built yet
  LoginResult,
  // @ts-ignore: @intlayer/backend is not built yet
  RegisterBody,
  // @ts-ignore: @intlayer/backend is not built yet
  RegisterQuery,
  // @ts-ignore: @intlayer/backend is not built yet
  RegisterResult,
  // @ts-ignore: @intlayer/backend is not built yet
  ResetPasswordParams,
  // @ts-ignore: @intlayer/backend is not built yet
  ResetPasswordResult,
  // @ts-ignore: @intlayer/backend is not built yet
  DefinePasswordBody,
  // @ts-ignore: @intlayer/backend is not built yet
  DefinePasswordResult,
  // @ts-ignore: @intlayer/backend is not built yet
  UpdatePasswordBody,
  // @ts-ignore: @intlayer/backend is not built yet
  UpdatePasswordResult,
  // @ts-ignore: @intlayer/backend is not built yet
  ValidEmailParams,
  // @ts-ignore: @intlayer/backend is not built yet
  ValidEmailResult,
  // @ts-ignore: @intlayer/backend is not built yet
  SetCSRFTokenResult,
  // @ts-ignore: @intlayer/backend is not built yet
  GetOAuth2TokenBody,
  // @ts-ignore: @intlayer/backend is not built yet
  GetOAuth2TokenResult,
  // @ts-ignore: @intlayer/backend is not built yet
  UserAPI,
  // @ts-ignore: @intlayer/backend is not built yet
  CheckIfUserHasPasswordResult,
  // @ts-ignore @intlayer/backend is not build yet
} from '@intlayer/backend';
import type { IntlayerConfig } from '@intlayer/config/client';
import configuration from '@intlayer/config/built';

import { fetcher, type FetcherOptions } from '../fetcher';

export const getAuthAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig: IntlayerConfig = configuration
) => {
  const { backendURL, clientId, clientSecret } = intlayerConfig?.editor ?? {};

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }

  const AUTH_API_ROUTE = `${backendURL}/api/auth`;

  /**
   * Logs in a user with the provided credentials.
   * @param user - User credentials.
   */
  const login = async (user: LoginBody, otherOptions: FetcherOptions = {}) =>
    await fetcher<LoginResult>(
      `${AUTH_API_ROUTE}/login`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: user,
      }
    );

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
  const register = async (
    user: RegisterBody,
    query: RegisterQuery = {},
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<RegisterResult>(
      `${AUTH_API_ROUTE}/register`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: user,
        params: query,
      }
    );

  /**
   * Signs out the user.
   * @returns User object.
   */
  const logout = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<void>(
      `${AUTH_API_ROUTE}/logout`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
      }
    );

  /**
   * Ask to resets the password of a user with the provided email address.
   * @param email - Email address of the user.
   * @returns User object.
   */
  const askResetPassword = async (
    email: AskResetPasswordBody['email'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AskResetPasswordResult>(
      `${AUTH_API_ROUTE}/password/reset`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: { email },
      }
    );

  /**
   * Resets the password of a user with the provided email address.
   * @param email - Email address of the user.
   * @returns User object.
   */
  const resetPassword = async (
    params: ResetPasswordParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<ResetPasswordResult>(
      `${AUTH_API_ROUTE}/password/reset`,
      authAPIOptions,
      otherOptions,
      { params, method: 'POST' }
    );

  /**
   * Changes the password of a user with the provided data.
   * @param data - New password and confirmation.
   * @returns User object.
   */
  const defineNewPassword = async (
    data: DefinePasswordBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<DefinePasswordResult>(
      `${AUTH_API_ROUTE}/password/define`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: data,
      }
    );

  /**
   * Changes the password of a user with the provided data.
   * @param data - New password and confirmation.
   * @returns User object.
   */
  const changePassword = async (
    data: UpdatePasswordBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdatePasswordResult>(
      `${AUTH_API_ROUTE}/password`,
      authAPIOptions,
      otherOptions,
      {
        method: 'PUT',
        body: data,
      }
    );

  /**
   * Checks if a user has a password.
   * @param params - User ID.
   * @returns User object.
   */
  const checkIfUserHasPassword = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<CheckIfUserHasPasswordResult>(
      `${AUTH_API_ROUTE}/password/has`,
      authAPIOptions,
      otherOptions,
      {
        method: 'GET',
      }
    );

  /**
   * Verifies the email address of a user with the provided token.
   * @param params - User ID and secret key.
   * @returns User object.
   */
  const verifyEmail = async (
    { userId, secret }: ValidEmailParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<ValidEmailResult>(
      `${AUTH_API_ROUTE}/active/${userId}/${secret}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'PUT',
      }
    );

  /**
   * Gets the verify email status URL to use in the SSE.
   * @param userId - User ID.
   * @returns The verify email status URL.
   */
  const getVerifyEmailStatusURL = (userId: string | UserAPI['_id']) =>
    `${AUTH_API_ROUTE}/verify-email-status/${String(userId)}`;

  /**
   * Creates a session for a user.
   * @param params - User ID and secret key.
   * @returns User object.
   */
  const createSession = async (
    data: CreateSessionBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<CreateSessionResult>(
      `${AUTH_API_ROUTE}/session`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: data,
      }
    );

  /**
   * Gets a session and user.
   * @param sessionToken - Session token.
   * @param otherOptions - Fetcher options.
   * @returns Session and user information.
   */
  const getSession = async (
    sessionToken?: GetSessionInformationQuery['session_token'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetSessionInformationResult>(
      `${backendURL}/session`,
      authAPIOptions,
      otherOptions,
      { params: { session_token: sessionToken } }
    );

  /**
   * Gets the CSRF token.
   * @param otherOptions - Fetcher options.
   * @returns The CSRF token.
   */
  const getCSRFToken = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<SetCSRFTokenResult>(
      `${backendURL}/csrf-token`,
      authAPIOptions,
      otherOptions
    );

  /**
   * Gets an oAuth2 accessToken
   * @return The token information
   */
  const getOAuth2AccessToken = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetOAuth2TokenResult>(
      `${backendURL}/oauth2/token`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          grant_type: 'client_credentials',
          client_id: clientId!,
          client_secret: clientSecret!,
        } satisfies GetOAuth2TokenBody,
      }
    );

  return {
    login,
    getLoginWithGitHubURL,
    getLoginWithGoogleURL,
    register,
    logout,
    resetPassword,
    defineNewPassword,
    askResetPassword,
    checkIfUserHasPassword,
    verifyEmail,
    getVerifyEmailStatusURL,
    changePassword,
    createSession,
    getSession,
    getCSRFToken,
    getOAuth2AccessToken,
  };
};
