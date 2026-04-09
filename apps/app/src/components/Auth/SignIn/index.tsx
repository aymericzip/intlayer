import { useLogin } from '@intlayer/design-system/hooks';
import { App_Auth_AskResetPassword_Path } from '@intlayer/design-system/routes';
import { useSearch } from '@tanstack/react-router';
import { type FC, useEffect, useRef } from 'react';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { type SignIn, SignInForm as SignInFormUI } from './SignInForm/index';

export const SignInForm: FC<{
  callbackUrl?: string;
}> = ({ callbackUrl }) => {
  const navigate = useLocalizedNavigate();
  const { mutate: login, isPending } = useLogin();
  const search = useSearch({ strict: false }) as any;
  const email = search.email;
  const emailInputRef = useRef<HTMLInputElement>(null);

  // If callbackUrl is provided but redirect_url is not in the URL,
  // add it to the current URL so 2FA redirect can preserve it
  useEffect(() => {
    if (callbackUrl && !search.redirect_url) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('redirect_url', callbackUrl);
      window.history.replaceState({}, '', currentUrl.toString());
    }
  }, [callbackUrl, search]);

  const onSubmitSuccess = ({ email, password, rememberMe }: SignIn) => {
    login({
      email,
      password,
      rememberMe,
      callbackURL: callbackUrl ?? window.location.href,
    });
  };

  const getEmailContext = () => {
    const email = search.email;

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
      navigate({
        to: '/auth/password/ask-reset',
        search: {
          email,
        },
      });
    } else {
      navigate({ to: App_Auth_AskResetPassword_Path });
    }
  };

  const onClickSignUp = () => {
    const email = getEmailContext();

    if (email) {
      navigate({ to: '/auth/register', search: { email } });
    } else {
      navigate({ to: '/auth/register' });
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
