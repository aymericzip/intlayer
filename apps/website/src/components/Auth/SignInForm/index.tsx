'use client';

import {
  SignInForm as SignInFormUI,
  type SignIn,
} from '@intlayer/design-system';
import { useLogin } from '@intlayer/design-system/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FC } from 'react';
import { PagesRoutes } from '@/Routes';

type SignInFormProps = {
  callbackUrl?: string;
};

export const SignInForm: FC<SignInFormProps> = ({ callbackUrl }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useLogin();

  const redirectURLQuery = searchParams.get('redirect_url');
  const redirectURL = callbackUrl ?? redirectURLQuery;

  const onSubmitSuccess = async ({ email, password }: SignIn) => {
    const response = await login({
      email,
      password,
    });

    if (response.data) {
      if (redirectURL) {
        router.push(redirectURL);
      }
    }
  };

  const onClickForgotPassword = () =>
    router.push(PagesRoutes.Auth_ResetPassword);

  const onClickSignUp = () => router.push(PagesRoutes.Auth_SignUp);

  return (
    <SignInFormUI
      onSubmitSuccess={onSubmitSuccess}
      onClickForgotPassword={onClickForgotPassword}
      onClickSignUp={onClickSignUp}
    />
  );
};
