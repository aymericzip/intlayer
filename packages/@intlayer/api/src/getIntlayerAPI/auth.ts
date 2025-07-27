import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import type { createAuthClient } from 'better-auth/client';

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
}

export const getAuthAPI = (intlayerConfig?: IntlayerConfig): AuthAPI => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }

  const getAuthClient: () => Promise<AuthClient> = async () => {
    /*
     * Extract each method to avoid type inference issues at build time.
     */
    const { createAuthClient } = await import('better-auth/client');

    return createAuthClient({
      baseURL: backendURL,
      withCredentials: true, // makes fetch forward cookies
    });
  };

  const signInEmail: AuthClient['signIn']['email'] = async (...args) =>
    (await getAuthClient()).signIn.email(...args);

  const signInSocial: AuthClient['signIn']['social'] = async (...args) =>
    (await getAuthClient()).signIn.social(...args);

  const signUpEmail: AuthClient['signUp']['email'] = async (...args) =>
    (await getAuthClient()).signUp.email(...args);

  const signOut: AuthClient['signOut'] = async (...args) =>
    (await getAuthClient()).signOut(...args);

  const changePasswordSession: AuthClient['changePassword'] = async (...args) =>
    (await getAuthClient()).changePassword(...args);

  const requestPasswordResetSession: AuthClient['requestPasswordReset'] =
    async (...args) => (await getAuthClient()).requestPasswordReset(...args);

  // @ts-expect-error - resetPassword is not typed
  const resetPassword: AuthClient['resetPassword'] = async (...args) =>
    (await getAuthClient()).resetPassword(...args);

  const verifyEmailSession: AuthClient['verifyEmail'] = async (...args) =>
    (await getAuthClient()).verifyEmail(...args);

  const getSession: AuthClient['getSession'] = async (...args) =>
    (await getAuthClient()).getSession(...args);

  const forgetPassword: AuthClient['forgetPassword'] = async (...args) =>
    (await getAuthClient()).forgetPassword(...args);

  const sendVerificationEmail: AuthClient['sendVerificationEmail'] = async (
    ...args
  ) => (await getAuthClient()).sendVerificationEmail(...args);

  const changeEmail: AuthClient['changeEmail'] = async (...args) =>
    (await getAuthClient()).changeEmail(...args);

  // @ts-expect-error - deleteUser is not typed
  const deleteUser: AuthClient['deleteUser'] = async (...args) =>
    (await getAuthClient()).deleteUser(...args);

  const revokeSession: AuthClient['revokeSession'] = async (...args) =>
    (await getAuthClient()).revokeSession(...args);

  const revokeSessions: AuthClient['revokeSessions'] = async (...args) =>
    (await getAuthClient()).revokeSessions(...args);

  const revokeOtherSessions: AuthClient['revokeOtherSessions'] = async (
    ...args
  ) => (await getAuthClient()).revokeOtherSessions(...args);

  const linkSocial: AuthClient['linkSocial'] = async (...args) =>
    (await getAuthClient()).linkSocial(...args);

  const listAccounts: AuthClient['listAccounts'] = async (...args) =>
    (await getAuthClient()).listAccounts(...args);

  const unlinkAccount: AuthClient['unlinkAccount'] = async (...args) =>
    (await getAuthClient()).unlinkAccount(...args);

  const refreshToken: AuthClient['refreshToken'] = async (...args) =>
    (await getAuthClient()).refreshToken(...args);

  const getAccessToken: AuthClient['getAccessToken'] = async (...args) =>
    (await getAuthClient()).getAccessToken(...args);

  const accountInfo: AuthClient['accountInfo'] = async (...args) =>
    (await getAuthClient()).accountInfo(...args);

  const updateUser: AuthClient['updateUser'] = async (...args) =>
    (await getAuthClient()).updateUser(...args);

  const listSessions: AuthClient['listSessions'] = async (...args) =>
    (await getAuthClient()).listSessions(...args);

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
