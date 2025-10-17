import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types';
import { createAuthClient } from 'better-auth/client';

type AuthClient = ReturnType<typeof createAuthClient>;

export interface AuthAPI {
  getAuthClient: () => AuthClient;
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
}

export const getAuthAPI = (intlayerConfig?: IntlayerConfig): AuthAPI => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration?.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }

  const getAuthClient = (): AuthClient => {
    return createAuthClient({
      baseURL: backendURL,
      withCredentials: true, // makes fetch forward cookies
    });
  };

  const signInEmail: AuthClient['signIn']['email'] = async (...args) => {
    const client = getAuthClient();
    return client.signIn.email(...args);
  };

  const signInSocial: AuthClient['signIn']['social'] = async (...args) => {
    const client = getAuthClient();
    return client.signIn.social(...args);
  };

  const signUpEmail: AuthClient['signUp']['email'] = async (...args) => {
    const client = getAuthClient();
    return client.signUp.email(...args);
  };

  const signOut: AuthClient['signOut'] = async (...args) => {
    const client = getAuthClient();
    return client.signOut(...args);
  };

  const changePasswordSession: AuthClient['changePassword'] = async (
    ...args
  ) => {
    const client = getAuthClient();
    return client.changePassword(...args);
  };

  const requestPasswordResetSession: AuthClient['requestPasswordReset'] =
    async (...args) => {
      const client = getAuthClient();
      return client.requestPasswordReset(...args);
    };

  // @ts-ignore - resetPassword is not typed
  const resetPassword: AuthClient['resetPassword'] = async (...args) => {
    const client = getAuthClient();
    return client.resetPassword(...args);
  };

  const verifyEmailSession: AuthClient['verifyEmail'] = async (...args) => {
    const client = getAuthClient();
    return client.verifyEmail(...args);
  };

  const getSession: AuthClient['getSession'] = async (...args) => {
    const client = getAuthClient();
    return client.getSession(...args);
  };

  const forgetPassword: AuthClient['forgetPassword'] = async (...args) => {
    const client = getAuthClient();
    return client.forgetPassword(...args);
  };

  const sendVerificationEmail: AuthClient['sendVerificationEmail'] = async (
    ...args
  ) => {
    const client = getAuthClient();
    return client.sendVerificationEmail(...args);
  };

  const changeEmail: AuthClient['changeEmail'] = async (...args) => {
    const client = getAuthClient();
    return client.changeEmail(...args);
  };

  // @ts-ignore - deleteUser is not typed
  const deleteUser: AuthClient['deleteUser'] = async (...args) => {
    const client = getAuthClient();
    return client.deleteUser(...args);
  };

  const revokeSession: AuthClient['revokeSession'] = async (...args) => {
    const client = getAuthClient();
    return client.revokeSession(...args);
  };

  const revokeSessions: AuthClient['revokeSessions'] = async (...args) => {
    const client = getAuthClient();
    return client.revokeSessions(...args);
  };

  const revokeOtherSessions: AuthClient['revokeOtherSessions'] = async (
    ...args
  ) => {
    const client = getAuthClient();
    return client.revokeOtherSessions(...args);
  };

  const linkSocial: AuthClient['linkSocial'] = async (...args) => {
    const client = getAuthClient();
    return client.linkSocial(...args);
  };

  const listAccounts: AuthClient['listAccounts'] = async (...args) => {
    const client = getAuthClient();
    return client.listAccounts(...args);
  };

  const unlinkAccount: AuthClient['unlinkAccount'] = async (...args) => {
    const client = getAuthClient();
    return client.unlinkAccount(...args);
  };

  const refreshToken: AuthClient['refreshToken'] = async (...args) => {
    const client = getAuthClient();
    return client.refreshToken(...args);
  };

  const getAccessToken: AuthClient['getAccessToken'] = async (...args) => {
    const client = getAuthClient();
    return client.getAccessToken(...args);
  };

  const accountInfo: AuthClient['accountInfo'] = async (...args) => {
    const client = getAuthClient();
    return client.accountInfo(...args);
  };

  const updateUser: AuthClient['updateUser'] = async (...args) => {
    const client = getAuthClient();
    return client.updateUser(...args);
  };

  const listSessions: AuthClient['listSessions'] = async (...args) => {
    const client = getAuthClient();
    return client.listSessions(...args);
  };

  return {
    getAuthClient,
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
