'use client';

import type { UserAPI } from '@intlayer/backend';
import { useRegister } from '@intlayer/design-system/hooks';
import { App_Auth_SignIn_Path } from '@intlayer/design-system/routes';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { type FC, useRef, useState } from 'react';
import { VerifyEmailForm as VerifyEmailFormUI } from '../VerifyEmail';
import type { SignUp } from './SignUpForm';
import { SignUpForm as SignUpFormUI } from './SignUpForm/SignUpForm';

export const SignUpForm: FC = () => {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as any;
  const userId = search[''] as string | undefined;
  const [user, setUser] = useState<UserAPI | null>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const email = search.email ?? undefined;

  const { mutate: register, isPending } = useRegister();

  const handleRegistration = ({ email, password }: SignUp) => {
    register(
      {
        name: email.split('@')[0],
        email,
        password,
      },
      {
        onSuccess: (response: any) => {
          if (response?.data?.user) {
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
      navigate({ to: `${App_Auth_SignIn_Path}?email=${email}` as any });
    } else {
      navigate({ to: App_Auth_SignIn_Path as any });
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
