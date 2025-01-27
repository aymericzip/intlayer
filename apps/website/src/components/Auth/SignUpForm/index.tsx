'use client';

import { UserAPI } from '@intlayer/backend';
import {
  SignUpForm as SignUpFormUI,
  type SignUp,
  VerifyEmailForm as VerifyEmailFormUI,
} from '@intlayer/design-system';
import { useRegister } from '@intlayer/design-system/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, type FC } from 'react';
import { PagesRoutes } from '@/Routes';

type SignUpFormProps = {
  callbackUrl?: string;
};

export const SignUpForm: FC<SignUpFormProps> = ({ callbackUrl }) => {
  const router = useRouter();
  const userId = useSearchParams().get('') as string | undefined;
  const [user, setUser] = useState<UserAPI | null>(null);

  const { register } = useRegister();

  const handleRegistration = async ({ email, password }: SignUp) => {
    const response = await register({
      email,
      password,
    });

    if (response?.data) {
      setUser(response.data);
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
      userId={(user?._id ? String(user._id) : undefined) ?? userId}
    />
  ) : (
    <SignUpFormUI
      onSubmitSuccess={handleRegistration}
      onClickBackToSignIn={onClickBackToSignIn}
    />
  );
};
