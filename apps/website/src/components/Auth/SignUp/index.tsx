'use client';

import { PagesRoutes } from '@/Routes';
import type { UserAPI } from '@intlayer/backend';
import { useRegister } from '@intlayer/design-system/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, type FC } from 'react';
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

  const { register } = useRegister();

  const handleRegistration = async ({ email, password }: SignUp) => {
    const { data } = await register({
      email,
      password,
    });

    if (data?.user) {
      setUser(data.user);
    }
  };

  const handleEmailValidated = async () => {
    router.push(callbackUrl ?? PagesRoutes.Dashboard);
  };

  const onClickBackToSignIn = () => {
    router.push(PagesRoutes.Auth_SignIn);
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
    />
  );
};
