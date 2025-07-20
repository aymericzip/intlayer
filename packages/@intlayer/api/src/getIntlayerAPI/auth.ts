import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { createAuthClient } from 'better-auth/client';
import { FetcherOptions, fetcher } from '../fetcher';
import { GetOAuth2TokenBody, GetOAuth2TokenResult } from '../types';

export const getAuthAPI = (intlayerConfig?: IntlayerConfig) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration.editor?.backendURL;
  const { clientId, clientSecret } = intlayerConfig?.editor ?? {};

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }

  const authClient = createAuthClient({
    baseURL: backendURL,
  });

  const signInEmail = (...args: Parameters<typeof authClient.signIn.email>) =>
    authClient.signIn.email(...args);
  const signInSocial = (...args: Parameters<typeof authClient.signIn.social>) =>
    authClient.signIn.social(...args);
  const signUpEmail = (...args: Parameters<typeof authClient.signUp.email>) =>
    authClient.signUp.email(...args);
  const signOut = (...args: Parameters<typeof authClient.signOut>) =>
    authClient.signOut(...args);
  const changePasswordSession = (
    ...args: Parameters<typeof authClient.changePassword>
  ) => authClient.changePassword(...args);
  const requestPasswordResetSession = (
    ...args: Parameters<typeof authClient.requestPasswordReset>
  ) => authClient.requestPasswordReset(...args);
  const resetPasswordSession = (
    ...args: Parameters<typeof authClient.resetPassword>
  ) => authClient.resetPassword(...args);
  const verifyEmailSession = (
    ...args: Parameters<typeof authClient.verifyEmail>
  ) => authClient.verifyEmail(...args);
  const getSession = (...args: Parameters<typeof authClient.getSession>) =>
    authClient.getSession(...args);
  const forgetPassword = (
    ...args: Parameters<typeof authClient.forgetPassword>
  ) => authClient.forgetPassword(...args);
  const sendVerificationEmail = (
    ...args: Parameters<typeof authClient.sendVerificationEmail>
  ) => authClient.sendVerificationEmail(...args);
  const changeEmail = (...args: Parameters<typeof authClient.changeEmail>) =>
    authClient.changeEmail(...args);
  const deleteUser = (...args: Parameters<typeof authClient.deleteUser>) =>
    authClient.deleteUser(...args);
  const revokeSession = (
    ...args: Parameters<typeof authClient.revokeSession>
  ) => authClient.revokeSession(...args);
  const revokeSessions = (
    ...args: Parameters<typeof authClient.revokeSessions>
  ) => authClient.revokeSessions(...args);
  const revokeOtherSessions = (
    ...args: Parameters<typeof authClient.revokeOtherSessions>
  ) => authClient.revokeOtherSessions(...args);
  const linkSocial = (...args: Parameters<typeof authClient.linkSocial>) =>
    authClient.linkSocial(...args);
  const listAccounts = (...args: Parameters<typeof authClient.listAccounts>) =>
    authClient.listAccounts(...args);
  const unlinkAccount = (
    ...args: Parameters<typeof authClient.unlinkAccount>
  ) => authClient.unlinkAccount(...args);
  const refreshToken = (...args: Parameters<typeof authClient.refreshToken>) =>
    authClient.refreshToken(...args);
  const getAccessToken = (
    ...args: Parameters<typeof authClient.getAccessToken>
  ) => authClient.getAccessToken(...args);
  const accountInfo = (...args: Parameters<typeof authClient.accountInfo>) =>
    authClient.accountInfo(...args);
  const updateUser = (...args: Parameters<typeof authClient.updateUser>) =>
    authClient.updateUser(...args);
  const listSessions = (...args: Parameters<typeof authClient.listSessions>) =>
    authClient.listSessions(...args);

  const AUTH_API_ROUTE = `${backendURL}/api/auth`;

  /**
   * Gets an oAuth2 accessToken
   * @return The token information
   */
  const getOAuth2AccessToken = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetOAuth2TokenResult>(
      `${backendURL}/oauth2/token`,
      {},
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
    signInEmail,
    signUpEmail,
    signOut,
    signInSocial,
    linkSocial,
    changePasswordSession,
    requestPasswordResetSession,
    resetPasswordSession,
    verifyEmailSession,
    getSession,
    getOAuth2AccessToken,
    forgetPassword,
    sendVerificationEmail,
    changeEmail,
    deleteUser,
    revokeSession,
    revokeSessions,
    revokeOtherSessions,
    listAccounts,
    unlinkAccount,
    refreshToken,
    getAccessToken,
    accountInfo,
    updateUser,
    listSessions,
  };
};
