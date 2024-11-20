'use client';

import {
  ResetPasswordForm as ResetPasswordFormUI,
  type ResetPassword,
} from '@intlayer/design-system';
import { useAskResetPassword } from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

type ForgotPasswordFormProps = {
  email?: string;
  callbackUrl?: string;
};

export const ResetPasswordForm: FC<ForgotPasswordFormProps> = ({
  email,
  callbackUrl = PagesRoutes.Auth_SignIn,
}) => {
  const router = useRouter();
  const { askResetPassword } = useAskResetPassword();

  const onSubmitSuccess = async ({ email }: ResetPassword) => {
    const response = await askResetPassword(email);

    if (response.data ?? callbackUrl) {
      router.push(callbackUrl);
    }
  };

  const onClickBackToLogin = () => router.push(callbackUrl);

  return (
    <ResetPasswordFormUI
      onSubmitSuccess={onSubmitSuccess}
      email={email}
      onClickBackToLogin={onClickBackToLogin}
    />
  );
};
