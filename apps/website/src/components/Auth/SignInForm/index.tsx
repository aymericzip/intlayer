'use client';

import { intlayerAPI } from '@intlayer/core';
import {
  SignInForm as SignInFormUI,
  useAuth,
  type SignIn,
  // useToast,
} from '@intlayer/design-system';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

type SignInFormProps = {
  callbackUrl?: string;
};

export const SignInForm: FC<SignInFormProps> = ({ callbackUrl }) => {
  const { checkSession } = useAuth();
  const router = useRouter();
  // const { toast } = useToast();

  const onSubmitSuccess = async ({ email, password }: SignIn) => {
    const response = await intlayerAPI.auth.login({
      email,
      password,
    });

    if (response.data) {
      await checkSession();

      if (callbackUrl) {
        router.push(callbackUrl);
      }
    }
  };

  const onSubmitError = (_error: Error) => {
    // toast({
    //   title: error.message,
    //   variant: 'default',
    // });
  };

  const onClickForgotPassword = () =>
    router.push(PagesRoutes.Auth_ResetPassword);

  const onClickSignUp = () => router.push(PagesRoutes.Auth_SignUp);

  return (
    <SignInFormUI
      onSubmitSuccess={onSubmitSuccess}
      onSubmitError={onSubmitError}
      onClickForgotPassword={onClickForgotPassword}
      onClickSignUp={onClickSignUp}
    />
  );
};
