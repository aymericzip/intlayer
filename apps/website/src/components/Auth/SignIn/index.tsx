'use client';

import { PagesRoutes } from '@/Routes';
import { useLogin } from '@intlayer/design-system/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, type FC } from 'react';
import { SignInForm as SignInFormUI, type SignIn } from './SignInForm/index';

export const SignInForm: FC<{
  callbackUrl?: string;
}> = ({ callbackUrl }) => {
  const router = useRouter();
  const { login } = useLogin();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const emailInputRef = useRef<HTMLInputElement>(null);

  const onSubmitSuccess = async ({ email, password, rememberMe }: SignIn) => {
    await login({
      email,
      password,
      rememberMe,
      callbackURL: callbackUrl ?? window.location.href,
    });
  };

  const getEmailContext = () => {
    const email = searchParams.get('email');

    if (email) {
      return email;
    } else {
      const emailFromInput = emailInputRef.current;
      return emailFromInput?.value;
    }
  };

  const onClickForgotPassword = () => {
    const email = getEmailContext();

    if (email) {
      router.push(`${PagesRoutes.Auth_AskResetPassword}?email=${email}`);
    } else {
      router.push(PagesRoutes.Auth_AskResetPassword);
    }
  };

  const onClickSignUp = () => {
    const email = getEmailContext();

    if (email) {
      router.push(`${PagesRoutes.Auth_SignUp}?email=${email}`);
    } else {
      router.push(PagesRoutes.Auth_SignUp);
    }
  };

  return (
    <SignInFormUI
      onSubmitSuccess={onSubmitSuccess}
      onClickForgotPassword={onClickForgotPassword}
      onClickSignUp={onClickSignUp}
      defaultEmail={email ?? undefined}
      emailInputRef={emailInputRef}
    />
  );
};
