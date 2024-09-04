'use client';

import {
  SignUpForm as SignUpFormUI,
  type SignUp,
} from '@intlayer/design-system';
import { backendAPI } from '@utils/backend-api';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { PagesRoutes } from '@/Routes';

type SignUpFormProps = {
  callbackUrl?: string;
};

export const SignUpForm: FC<SignUpFormProps> = ({ callbackUrl }) => {
  const router = useRouter();

  const { checkSession } = useAuth();

  const onSubmitSuccess = async ({ email, password }: SignUp) => {
    const response = await backendAPI.auth.register({
      email,
      password,
    });

    if (response.data) {
      await checkSession();

      if (callbackUrl) {
        router.push(callbackUrl);
      }
    }
  };

  const onSubmitError = (error: Error) => {
    // toast({
    //   title: error.message,
    //   variant: 'default',
    // });
  };

  const onClickBackToSignIn = () => {
    router.push(PagesRoutes.Auth_SignIn);
  };

  return (
    <SignUpFormUI
      onSubmitSuccess={onSubmitSuccess}
      onSubmitError={onSubmitError}
      onClickBackToSignIn={onClickBackToSignIn}
    />
  );
};
