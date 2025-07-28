'use client';

import { PagesRoutes } from '@/Routes';
import { useAskResetPassword } from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import {
  ResetPasswordForm as ResetPasswordFormUI,
  type ResetPassword,
} from './ResetPasswordForm';

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
    await askResetPassword({
      email,
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/${PagesRoutes.Auth_ChangePassword}`,
    });
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
