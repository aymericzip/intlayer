'use client';

import { intlayerAPI } from '@intlayer/core';
import {
  ChangePasswordForm as ChangePasswordFormUI,
  type ChangePassword,
  useUser,
} from '@intlayer/design-system';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

type ChangePasswordFormProps = {
  callbackUrl?: string;
};

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  callbackUrl = PagesRoutes.Auth_SignIn,
}) => {
  // const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();

  const onSubmitSuccess = async ({
    currentPassword,
    newPassword,
  }: ChangePassword) => {
    const result = await intlayerAPI.auth.changePassword({
      oldPassword: currentPassword,
      newPassword,
    });

    if (!result.success) {
      return router.push(callbackUrl);
    }
  };

  const onSubmitError = (_error: Error) => {
    // toast({
    //   title: error.message,
    //   variant: 'default',
    // });
  };

  const onClickResetPassword = () => router.push(callbackUrl);

  const onClickBackToHome = () => router.push(PagesRoutes.Home);

  if (!user) return null;

  return (
    <ChangePasswordFormUI
      onSubmitSuccess={onSubmitSuccess}
      onSubmitError={onSubmitError}
      onClickResetPassword={onClickResetPassword}
      onClickBackToHome={onClickBackToHome}
    />
  );
};
