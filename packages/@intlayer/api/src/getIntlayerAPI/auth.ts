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
    try {
      /*
       * Extract each method to avoid type inference issues at build time.
       */
      const { createAuthClient } = await import('better-auth/client');

      const authClient = createAuthClient({
        baseURL: backendURL,
        withCredentials: true, // makes fetch forward cookies
      });

      console.log('authClient', authClient);
      return authClient;
    } catch (error) {
      console.error('Failed to create auth client:', error);
      throw new Error(
        `Failed to create auth client: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };

  const signInEmail: AuthClient['signIn']['email'] = async (...args) => {
    const client = await getAuthClient();
    return await client.signIn.email(...args);
  };

  const signInSocial: AuthClient['signIn']['social'] = async (...args) => {
    const client = await getAuthClient();
    return await client.signIn.social(...args);
  };

  const signUpEmail: AuthClient['signUp']['email'] = async (...args) => {
    const client = await getAuthClient();
    return await client.signUp.email(...args);
  };

  const signOut: AuthClient['signOut'] = async (...args) => {
    const client = await getAuthClient();
    return await client.signOut(...args);
  };

  const changePasswordSession: AuthClient['changePassword'] = async (
    ...args
  ) => {
    const client = await getAuthClient();
    return await client.changePassword(...args);
  };

  const requestPasswordResetSession: AuthClient['requestPasswordReset'] =
    async (...args) => {
      const client = await getAuthClient();
      return await client.requestPasswordReset(...args);
    };

  // @ts-expect-error - resetPassword is not typed
  const resetPassword: AuthClient['resetPassword'] = async (...args) => {
    const client = await getAuthClient();
    return await client.resetPassword(...args);
  };

  const verifyEmailSession: AuthClient['verifyEmail'] = async (...args) => {
    const client = await getAuthClient();
    return await client.verifyEmail(...args);
  };

  const getSession: AuthClient['getSession'] = async (...args) => {
    const client = await getAuthClient();
    return await client.getSession(...args);
  };

  const forgetPassword: AuthClient['forgetPassword'] = async (...args) => {
    const client = await getAuthClient();
    return await client.forgetPassword(...args);
  };

  const sendVerificationEmail: AuthClient['sendVerificationEmail'] = async (
    ...args
  ) => {
    const client = await getAuthClient();
    return await client.sendVerificationEmail(...args);
  };

  const changeEmail: AuthClient['changeEmail'] = async (...args) => {
    const client = await getAuthClient();
    return await client.changeEmail(...args);
  };

  // @ts-expect-error - deleteUser is not typed
  const deleteUser: AuthClient['deleteUser'] = async (...args) => {
    const client = await getAuthClient();
    return await client.deleteUser(...args);
  };

  const revokeSession: AuthClient['revokeSession'] = async (...args) => {
    const client = await getAuthClient();
    return await client.revokeSession(...args);
  };

  const revokeSessions: AuthClient['revokeSessions'] = async (...args) => {
    const client = await getAuthClient();
    return await client.revokeSessions(...args);
  };

  const revokeOtherSessions: AuthClient['revokeOtherSessions'] = async (
    ...args
  ) => {
    const client = await getAuthClient();
    return await client.revokeOtherSessions(...args);
  };

  const linkSocial: AuthClient['linkSocial'] = async (...args) => {
    const client = await getAuthClient();
    return await client.linkSocial(...args);
  };

  const listAccounts: AuthClient['listAccounts'] = async (...args) => {
    const client = await getAuthClient();
    return await client.listAccounts(...args);
  };

  const unlinkAccount: AuthClient['unlinkAccount'] = async (...args) => {
    const client = await getAuthClient();
    return await client.unlinkAccount(...args);
  };

  const refreshToken: AuthClient['refreshToken'] = async (...args) => {
    const client = await getAuthClient();
    return await client.refreshToken(...args);
  };

  const getAccessToken: AuthClient['getAccessToken'] = async (...args) => {
    const client = await getAuthClient();
    return await client.getAccessToken(...args);
  };

  const accountInfo: AuthClient['accountInfo'] = async (...args) => {
    const client = await getAuthClient();
    return await client.accountInfo(...args);
  };

  const updateUser: AuthClient['updateUser'] = async (...args) => {
    const client = await getAuthClient();
    return await client.updateUser(...args);
  };

  const listSessions: AuthClient['listSessions'] = async (...args) => {
    const client = await getAuthClient();
    return await client.listSessions(...args);
  };

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
