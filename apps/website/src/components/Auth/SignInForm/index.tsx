'use client';

import {
  SignInForm as SignInFormUI,
  type SignIn,
} from '@intlayer/design-system';
import { useLogin } from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import { type FC } from 'react';
import { PagesRoutes } from '@/Routes';

export const SignInForm: FC = () => {
  const router = useRouter();
  const { login } = useLogin();

  const onSubmitSuccess = async ({ email, password }: SignIn) => {
    await login({
      email,
      password,
    }).then((res) => {
      if (res.data?.email) {
        router.refresh();
      }
    });
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
