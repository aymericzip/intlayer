'use client';

import {
  ResetPasswordForm as ResetPasswordFormUI,
  useToast,
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
  const { toast } = useToast();

  const onSubmitSuccess = async ({ email }: ResetPassword) => {
    const response = await askResetPassword(email);

    if (response.error) {
      toast({
        title: [response.error].flatMap((error) => error).join(', '),
        variant: 'error',
      });

      return;
    }

    if (response.data ?? callbackUrl) {
      router.push(callbackUrl);
    }
  };

  const onSubmitError = (error: Error) => {
    toast({
      title: error.message,
      variant: 'error',
    });
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
