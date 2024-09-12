'use client';

import {
  ResetPasswordForm as ResetPasswordFormUI,
  type ResetPassword,
  // useToast,
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
  // const { toast } = useToast();

  const onSubmitSuccess = async ({ email }: ResetPassword) => {
    const result = await askResetPassword(email);

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

  const onClickBackToLogin = () => router.push(callbackUrl);

  return (
    <ResetPasswordFormUI
      onSubmitSuccess={onSubmitSuccess}
      onSubmitError={onSubmitError}
      email={email}
      onClickBackToLogin={onClickBackToLogin}
    />
  );
};
