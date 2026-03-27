'use client';

import { useLogin } from '@intlayer/design-system/hooks';
import {
  App_Auth_AskResetPassword_Path,
  App_Auth_SignUp_Path,
} from '@intlayer/design-system/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FC, useEffect, useRef } from 'react';
import { type SignIn, SignInForm as SignInFormUI } from './SignInForm/index';

export const SignInForm: FC<{
  callbackUrl?: string;
}> = ({ callbackUrl }) => {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const emailInputRef = useRef<HTMLInputElement>(null);

  // If callbackUrl is provided but redirect_url is not in the URL,
  // add it to the current URL so 2FA redirect can preserve it
  useEffect(() => {
    if (callbackUrl && !searchParams.get('redirect_url')) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('redirect_url', callbackUrl);
      window.history.replaceState({}, '', currentUrl.toString());
    }
  }, [callbackUrl, searchParams]);

  const onSubmitSuccess = ({ email, password, rememberMe }: SignIn) => {
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
      router.push(`${App_Auth_AskResetPassword_Path}?email=${email}`);
    } else {
      router.push(App_Auth_AskResetPassword_Path);
    }
  };

  const onClickSignUp = () => {
    const email = getEmailContext();

    if (email) {
      router.push(`${App_Auth_SignUp_Path}?email=${email}`);
    } else {
      router.push(App_Auth_SignUp_Path);
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
