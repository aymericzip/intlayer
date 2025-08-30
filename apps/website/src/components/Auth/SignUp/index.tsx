'use client';

import { PagesRoutes } from '@/Routes';
import type { UserAPI } from '@intlayer/backend';
import { useRegister } from '@intlayer/design-system/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState, type FC } from 'react';
import { VerifyEmailForm as VerifyEmailFormUI } from '../VerifyEmail';
import { SignUp } from './SignUpForm';
import { SignUpForm as SignUpFormUI } from './SignUpForm/SignUpForm';

type SignUpFormProps = {
  callbackUrl?: string;
};

export const SignUpForm: FC<SignUpFormProps> = ({ callbackUrl }) => {
  const router = useRouter();
  const userId = useSearchParams().get('') as string | undefined;
  const [user, setUser] = useState<UserAPI | null>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? undefined;

  const { mutate: register } = useRegister();

  const handleRegistration = ({ email, password }: SignUp) => {
    register(
      {
        name: email.split('@')[0],
        email,
        password,
      },
      {
        onSuccess: (response) => {
          if (response?.data?.user) {
            setUser(response.data.user);
          }
        },
      }
    );
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

  const onClickBackToSignIn = () => {
    const email = getEmailContext();

    if (email) {
      router.push(`${PagesRoutes.Auth_SignIn}?email=${email}`);
    } else {
      router.push(PagesRoutes.Auth_SignIn);
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
    />
  );
};
