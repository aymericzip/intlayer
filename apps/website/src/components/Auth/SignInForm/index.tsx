'use client';

import { PagesRoutes } from '@/Routes';
import { useLogin } from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import { type FC } from 'react';
import { SignInForm as SignInFormUI, type SignIn } from './SignInForm/index';

export const SignInForm: FC<{
  callbackUrl?: number;
}> = ({ callbackUrl }) => {
  const router = useRouter();
  const { login } = useLogin();

  const onSubmitSuccess = async ({ email, password, rememberMe }: SignIn) => {
    await login({
      email,
      password,
      rememberMe,
      resizeTo: callbackUrl ?? window.innerWidth,
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
