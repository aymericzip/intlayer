import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types';
import { createAuthClient } from 'better-auth/client';
import { passkeyClient, twoFactorClient } from 'better-auth/client/plugins';

const getAuthClient = (backendURL: string) =>
  createAuthClient({
    baseURL: backendURL,
    withCredentials: true, // makes fetch forward cookies
    plugins: [
      twoFactorClient({
        onTwoFactorRedirect: () => {
          window.location.href = '/auth/2fa';
        },
      }),
      passkeyClient(),
    ],
  });

type AuthClient = ReturnType<typeof getAuthClient>;

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
  enableTwoFactor: AuthClient['twoFactor']['enable'];
  disableTwoFactor: AuthClient['twoFactor']['disable'];
  verifyTotp: AuthClient['twoFactor']['verifyTotp'];
  verifyBackupCode: AuthClient['twoFactor']['verifyBackupCode'];
}

export const getAuthAPI = (intlayerConfig?: IntlayerConfig): AuthAPI => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration?.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }

  const client = getAuthClient(backendURL);

  const signInEmail: AuthClient['signIn']['email'] = async (...args) => {
    return client.signIn.email(...args);
  };

  const signInSocial: AuthClient['signIn']['social'] = async (...args) => {
    return client.signIn.social(...args);
  };

  const signUpEmail: AuthClient['signUp']['email'] = async (...args) => {
    return client.signUp.email(...args);
  };

  const signOut: AuthClient['signOut'] = async (...args) => {
    return client.signOut(...args);
  };

  const changePasswordSession: AuthClient['changePassword'] = async (
    ...args
  ) => {
    return client.changePassword(...args);
  };

  const requestPasswordResetSession: AuthClient['requestPasswordReset'] =
    async (...args) => {
      return client.requestPasswordReset(...args);
    };

  // @ts-ignore - resetPassword is not typed
  const resetPassword: AuthClient['resetPassword'] = async (...args) => {
    return client.resetPassword(...args);
  };

  const verifyEmailSession: AuthClient['verifyEmail'] = async (...args) => {
    return client.verifyEmail(...args);
  };

  const getSession: AuthClient['getSession'] = async (...args) => {
    return client.getSession(...args);
  };

  const forgetPassword: AuthClient['forgetPassword'] = async (...args) => {
    return client.forgetPassword(...args);
  };

  const sendVerificationEmail: AuthClient['sendVerificationEmail'] = async (
    ...args
  ) => {
    return client.sendVerificationEmail(...args);
  };

  const changeEmail: AuthClient['changeEmail'] = async (...args) => {
    return client.changeEmail(...args);
  };

  // @ts-ignore - deleteUser is not typed
  const deleteUser: AuthClient['deleteUser'] = async (...args) => {
    return client.deleteUser(...args);
  };

  const revokeSession: AuthClient['revokeSession'] = async (...args) => {
    return client.revokeSession(...args);
  };

  const revokeSessions: AuthClient['revokeSessions'] = async (...args) => {
    return client.revokeSessions(...args);
  };

  const revokeOtherSessions: AuthClient['revokeOtherSessions'] = async (
    ...args
  ) => {
    return client.revokeOtherSessions(...args);
  };

  const linkSocial: AuthClient['linkSocial'] = async (...args) => {
    return client.linkSocial(...args);
  };

  const listAccounts: AuthClient['listAccounts'] = async (...args) => {
    return client.listAccounts(...args);
  };

  const unlinkAccount: AuthClient['unlinkAccount'] = async (...args) => {
    return client.unlinkAccount(...args);
  };

  const refreshToken: AuthClient['refreshToken'] = async (...args) => {
    return client.refreshToken(...args);
  };

  const getAccessToken: AuthClient['getAccessToken'] = async (...args) => {
    return client.getAccessToken(...args);
  };

  const accountInfo: AuthClient['accountInfo'] = async (...args) => {
    return client.accountInfo(...args);
  };

  const updateUser: AuthClient['updateUser'] = async (...args) => {
    return client.updateUser(...args);
  };

  const listSessions: AuthClient['listSessions'] = async (...args) => {
    return client.listSessions(...args);
  };

  const enableTwoFactor: AuthClient['twoFactor']['enable'] = async (
    ...args: Parameters<AuthClient['twoFactor']['enable']>
  ) => {
    return client.twoFactor.enable(...args) as ReturnType<
      AuthClient['twoFactor']['enable']
    >;
  };

  const disableTwoFactor: AuthClient['twoFactor']['disable'] = async (
    ...args: Parameters<AuthClient['twoFactor']['disable']>
  ) => {
    return client.twoFactor.disable(...args) as ReturnType<
      AuthClient['twoFactor']['disable']
    >;
  };

  const verifyTotp: AuthClient['twoFactor']['verifyTotp'] = async (
    ...args: Parameters<AuthClient['twoFactor']['verifyTotp']>
  ) => {
    return client.twoFactor.verifyTotp(...args) as ReturnType<
      AuthClient['twoFactor']['verifyTotp']
    >;
  };

  const verifyBackupCode: AuthClient['twoFactor']['verifyBackupCode'] = async (
    ...args: Parameters<AuthClient['twoFactor']['verifyBackupCode']>
  ) => {
    return client.twoFactor.verifyBackupCode(...args) as ReturnType<
      AuthClient['twoFactor']['verifyBackupCode']
    >;
  };

  return {
    getAuthClient: () => client,
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
    enableTwoFactor,
    disableTwoFactor,
    verifyTotp,
    verifyBackupCode,
  };
};
