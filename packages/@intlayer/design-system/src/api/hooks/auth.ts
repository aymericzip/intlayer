'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AuthAPI } from '../../libs/auth';
import { useIntlayerAuth } from '../useIntlayerAPI';

export const useLogin = () => {
  const intlayerAuth = useIntlayerAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (args: Parameters<AuthAPI['signInEmail']>[0]) =>
      intlayerAuth.signInEmail(args),
    onSuccess: (data) => {
      const session = queryClient.getQueryData(['session']);

      queryClient.setQueryData(['session'], {
        ...session,
        user: data.data.user,
      });
    },
  });
};

export const useListAccounts = () => {
  const intlayerAuth = useIntlayerAuth();
  return useQuery({
    queryKey: ['listAccounts'],
    queryFn: () => intlayerAuth.listAccounts(),
  });
};

export const useUnlinkAccount = () => {
  const intlayerAuth = useIntlayerAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['unlinkAccount'],
    mutationFn: (args: Parameters<AuthAPI['unlinkAccount']>[0]) =>
      intlayerAuth.unlinkAccount(args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listAccounts'] });
    },
  });
};

export const useLinkSocial = () => {
  const intlayerAuth = useIntlayerAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['linkSocial'],
    mutationFn: (args: Parameters<AuthAPI['linkSocial']>[0]) =>
      intlayerAuth.linkSocial(args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listAccounts'] });
    },
  });
};

export const useGetVerifyEmailStatus = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['getVerifyEmailStatus'],
    mutationFn: (args: Parameters<AuthAPI['verifyEmailSession']>) =>
      intlayerAuth.verifyEmailSession(...args),
  });
};

export const useRegister = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['register'],
    mutationFn: (args: Parameters<AuthAPI['signUpEmail']>[0]) =>
      intlayerAuth.signUpEmail(args),
  });
};

export const useLogout = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => intlayerAuth.signOut(),
    meta: {
      resetQueries: [
        ['session'],
        ['users'],
        ['organizations'],
        ['projects'],
        ['dictionaries'],
        ['tags'],
      ],
    },
  });
};

export const useChangePassword = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['changePassword'],
    mutationFn: (args: Parameters<AuthAPI['changePasswordSession']>) =>
      intlayerAuth.changePasswordSession(...args),
  });
};

export const useAskResetPassword = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['askResetPassword'],
    mutationFn: (args: Parameters<AuthAPI['requestPasswordResetSession']>[0]) =>
      intlayerAuth.requestPasswordResetSession(args),
  });
};

export const useResetPassword = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: (args: Parameters<AuthAPI['resetPassword']>[0]) =>
      intlayerAuth.resetPassword(args),
  });
};

export const useVerifyEmail = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['verifyEmail'],
    mutationFn: (args: Parameters<AuthAPI['verifyEmailSession']>[0]) =>
      intlayerAuth.verifyEmailSession(args),
  });
};

export const useGetUserByAccount = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['user'],
    mutationFn: (args: Parameters<AuthAPI['accountInfo']>[0]) =>
      intlayerAuth.accountInfo(args),
  });
};

export const useEnableTwoFactor = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['enableTwoFactor'],
    mutationFn: (args: Parameters<AuthAPI['enableTwoFactor']>[0]) =>
      intlayerAuth.enableTwoFactor(args),
  });
};

export const useDisableTwoFactor = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['disableTwoFactor'],
    mutationFn: (args: Parameters<AuthAPI['disableTwoFactor']>[0]) =>
      intlayerAuth.disableTwoFactor(args),
  });
};

export const useVerifyTotp = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['verifyTotp'],
    mutationFn: (args: Parameters<AuthAPI['verifyTotp']>[0]) =>
      intlayerAuth.verifyTotp(args),
  });
};

export const useVerifyBackupCode = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['verifyBackupCode'],
    mutationFn: (args: Parameters<AuthAPI['verifyBackupCode']>[0]) =>
      intlayerAuth.verifyBackupCode(args),
  });
};

export const useAddPasskey = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['addPasskey'],
    mutationFn: (args: Parameters<AuthAPI['addPasskey']>[0]) =>
      intlayerAuth.addPasskey(args),
  });
};

export const useSignInPasskey = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['signInPasskey'],
    mutationFn: (args?: Parameters<AuthAPI['signInPasskey']>[0]) =>
      intlayerAuth.signInPasskey(args),
  });
};

export const useDeletePasskey = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['deletePasskey'],
    mutationFn: (args: Parameters<AuthAPI['deletePasskey']>[0]) =>
      intlayerAuth.deletePasskey(args),
  });
};

export const useListPasskeys = () => {
  const intlayerAuth = useIntlayerAuth();
  return useQuery({
    queryKey: ['listPasskeys'],
    queryFn: () => intlayerAuth.listPasskeys(),
  });
};

export const useSignInMagicLink = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['signInMagicLink'],
    mutationFn: (args?: any) => intlayerAuth.signInMagicLink(args),
  });
};

export const useRegisterSSO = () => {
  const intlayerAuth = useIntlayerAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['registerSSO'],
    mutationFn: (args: Parameters<AuthAPI['registerSSO']>[0]) =>
      intlayerAuth.registerSSO(args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ssoProviders'] });
    },
  });
};

export const useSignInSSO = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['signInSSO'],
    mutationFn: (args: Parameters<AuthAPI['signInSSO']>[0]) =>
      intlayerAuth.signInSSO(args),
  });
};

export const useListSSOProviders = () => {
  const intlayerAuth = useIntlayerAuth();
  return useQuery({
    queryKey: ['ssoProviders'],
    queryFn: () => intlayerAuth.listSSOProviders(),
  });
};

export const useDeleteSSOProvider = () => {
  const intlayerAuth = useIntlayerAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteSSOProvider'],
    mutationFn: (args: Parameters<AuthAPI['deleteSSOProvider']>[0]) =>
      intlayerAuth.deleteSSOProvider(args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ssoProviders'] });
    },
  });
};
