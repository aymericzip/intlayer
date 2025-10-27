'use client';

import { useLogin } from '@intlayer/design-system/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FC, useRef } from 'react';
import { PagesRoutes } from '@/Routes';
import { type SignIn, SignInForm as SignInFormUI } from './SignInForm/index';

export const SignInForm: FC<{
  callbackUrl?: string;
}> = ({ callbackUrl }) => {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const emailInputRef = useRef<HTMLInputElement>(null);

  const onSubmitSuccess = ({ email, password, rememberMe }: SignIn) => {
    console.log({ email, password, rememberMe });
    login({
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
      isLoading={isPending}
    />
  );
};
