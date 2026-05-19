import { useLogin } from '@intlayer/design-system/hooks';
import {
  App_Auth_AskResetPassword_Path,
  App_Home_Path,
} from '@intlayer/design-system/routes';
import { useRouter, useSearch } from '@tanstack/react-router';
import { type FC, useEffect, useRef } from 'react';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { type SignIn, SignInForm as SignInFormUI } from './SignInForm/index';

export const SignInForm: FC<{
  callbackUrl?: string;
}> = ({ callbackUrl }) => {
  const navigate = useLocalizedNavigate();
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin();
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

  const getTarget = () =>
    callbackUrl ??
    (typeof search.redirect_url === 'string'
      ? (search.redirect_url as string)
      : App_Home_Path);

  const onSubmitSuccess = async ({ email, password, rememberMe }: SignIn) => {
    // No `callbackURL` here — better-auth would otherwise hard-navigate the
    // browser back to /login, racing the session cache and triggering a
    // login → / → /organization → /login bounce. Instead we let useLogin
    // refresh the session cache, then SPA-navigate ourselves.
    await login({ email, password, rememberMe });

    await router.invalidate();

    navigate({ to: getTarget() as any, replace: true });
  };

  const onLogin = async () => {
    await router.invalidate();
    navigate({ to: getTarget() as any, replace: true });
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
      onLogin={onLogin}
      defaultEmail={email ?? undefined}
      emailInputRef={emailInputRef}
      isLoading={isPending}
    />
  );
};
