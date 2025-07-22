import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { createAuthClient } from 'better-auth/client';
import { FetcherOptions, fetcher } from '../fetcher';
import { GetOAuth2TokenBody, GetOAuth2TokenResult } from '../types';

type AuthClient = ReturnType<typeof createAuthClient>;

export interface AuthAPI {
  signInEmail: AuthClient['signIn']['email'];
  signUpEmail: AuthClient['signUp']['email'];
  signOut: AuthClient['signOut'];
  signInSocial: AuthClient['signIn']['social'];
  linkSocial: AuthClient['linkSocial'];
  changePasswordSession: AuthClient['changePassword'];
  requestPasswordResetSession: AuthClient['requestPasswordReset'];
  resetPassword: AuthClient['resetPassword'];
  verifyEmailSession: AuthClient['verifyEmail'];
  getSession: AuthClient['getSession'];
  forgetPassword: AuthClient['forgetPassword'];
  sendVerificationEmail: AuthClient['sendVerificationEmail'];
  changeEmail: AuthClient['changeEmail'];
  deleteUser: AuthClient['deleteUser'];
  revokeSession: AuthClient['revokeSession'];
  revokeSessions: AuthClient['revokeSessions'];
  revokeOtherSessions: AuthClient['revokeOtherSessions'];
  listAccounts: AuthClient['listAccounts'];
  unlinkAccount: AuthClient['unlinkAccount'];
  refreshToken: AuthClient['refreshToken'];
  getAccessToken: AuthClient['getAccessToken'];
  accountInfo: AuthClient['accountInfo'];
  updateUser: AuthClient['updateUser'];
  listSessions: AuthClient['listSessions'];
  getOAuth2AccessToken: (
    otherOptions?: FetcherOptions
  ) => Promise<GetOAuth2TokenResult>;
}

export const getAuthAPI = (intlayerConfig?: IntlayerConfig): AuthAPI => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration.editor?.backendURL;
  const { clientId, clientSecret } = intlayerConfig?.editor ?? {};

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }
  /*
   * Extract each method to avoid type inference issues at build time.
   */
  const authClient: AuthClient = createAuthClient({
    baseURL: backendURL,
    withCredentials: true, // makes fetch forward cookies
  });

  const signInEmail: AuthClient['signIn']['email'] = async (...args) =>
    await authClient.signIn.email(...args);

  const signInSocial: AuthClient['signIn']['social'] = async (...args) =>
    await authClient.signIn.social(...args);

  const signUpEmail: AuthClient['signUp']['email'] = async (...args) =>
    await authClient.signUp.email(...args);

  const signOut: AuthClient['signOut'] = async (...args) =>
    await authClient.signOut(...args);

  const changePasswordSession: AuthClient['changePassword'] = async (...args) =>
    await authClient.changePassword(...args);

  const requestPasswordResetSession: AuthClient['requestPasswordReset'] =
    async (...args) => await authClient.requestPasswordReset(...args);

  const resetPassword = authClient.resetPassword;

  const verifyEmailSession: AuthClient['verifyEmail'] = async (...args) =>
    await authClient.verifyEmail(...args);

  const getSession: AuthClient['getSession'] = async (...args) =>
    await authClient.getSession(...args);

  const forgetPassword: AuthClient['forgetPassword'] = async (...args) =>
    await authClient.forgetPassword(...args);

  const sendVerificationEmail: AuthClient['sendVerificationEmail'] = async (
    ...args
  ) => await authClient.sendVerificationEmail(...args);

  const changeEmail: AuthClient['changeEmail'] = async (...args) =>
    await authClient.changeEmail(...args);

  const deleteUser = authClient.deleteUser;

  const revokeSession: AuthClient['revokeSession'] = async (...args) =>
    await authClient.revokeSession(...args);

  const revokeSessions: AuthClient['revokeSessions'] = async (...args) =>
    await authClient.revokeSessions(...args);

  const revokeOtherSessions: AuthClient['revokeOtherSessions'] = async (
    ...args
  ) => await authClient.revokeOtherSessions(...args);

  const linkSocial: AuthClient['linkSocial'] = async (...args) =>
    await authClient.linkSocial(...args);

  const listAccounts: AuthClient['listAccounts'] = async (...args) =>
    await authClient.listAccounts(...args);

  const unlinkAccount: AuthClient['unlinkAccount'] = async (...args) =>
    await authClient.unlinkAccount(...args);

  const refreshToken: AuthClient['refreshToken'] = async (...args) =>
    await authClient.refreshToken(...args);

  const getAccessToken: AuthClient['getAccessToken'] = async (...args) =>
    await authClient.getAccessToken(...args);

  const accountInfo: AuthClient['accountInfo'] = async (...args) =>
    await authClient.accountInfo(...args);

  const updateUser: AuthClient['updateUser'] = async (...args) =>
    await authClient.updateUser(...args);

  const listSessions: AuthClient['listSessions'] = async (...args) =>
    await authClient.listSessions(...args);

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
    resetPassword,
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
