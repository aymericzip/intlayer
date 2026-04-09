import type { UserAPI } from '@intlayer/backend';
import { usePersistedStore, useRegister } from '@intlayer/design-system/hooks';
import { App_Auth_SignIn_Path } from '@intlayer/design-system/routes';
import { useSearch } from '@tanstack/react-router';
import { type FC, useRef } from 'react';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { VerifyEmailForm as VerifyEmailFormUI } from '../VerifyEmail';
import type { SignUp } from './SignUpForm';
import { SignUpForm as SignUpFormUI } from './SignUpForm/SignUpForm';

export const SignUpForm: FC = () => {
  const navigate = useLocalizedNavigate();
  const search = useSearch({ strict: false }) as any;
  const userId = search[''] as string | undefined;
  const [user, setUser] = usePersistedStore<UserAPI | null>('user', null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const email = search.email ?? undefined;

  const { mutate: register, isPending } = useRegister();

  const handleRegistration = ({ email, password }: SignUp) => {
    register(
      {
        name: email.split('@')[0],
        email,
        password,
        redirect: false,
      },
      {
        onSuccess: (response: any) => {
          if (response?.data?.user) {
            console.log(response.data.user);
            setUser(response.data.user);
          }
        },
      }
    );
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

  const onClickBackToSignIn = () => {
    const email = getEmailContext();

    if (email) {
      navigate({ to: App_Auth_SignIn_Path, search: { email } });
    } else {
      navigate({ to: App_Auth_SignIn_Path });
    }
  };

  const handleEmailValidated = async () => {
    onClickBackToSignIn();
  };

  return user ? (
    <VerifyEmailFormUI
      onSubmitSuccess={handleEmailValidated}
      userId={(user?.id ? String(user.id) : undefined) ?? userId}
    />
  ) : (
    <SignUpFormUI
      onSubmitSuccess={handleRegistration}
      onClickBackToSignIn={onClickBackToSignIn}
      emailInputRef={emailInputRef}
      defaultEmail={email}
      isLoading={isPending}
    />
  );
};
