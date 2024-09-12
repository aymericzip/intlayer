'use client';

import { error } from 'console';
import {
  SignUpForm as SignUpFormUI,
  useAuth,
  useToast,
  type SignUp,
} from '@intlayer/design-system';
import { useRegister } from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

type SignUpFormProps = {
  callbackUrl?: string;
};

export const SignUpForm: FC<SignUpFormProps> = ({ callbackUrl }) => {
  const router = useRouter();

  const { checkSession } = useAuth();
  const { register } = useRegister();
  const { toast } = useToast();

  const onSubmitSuccess = async ({ email, password }: SignUp) => {
    const response = await register({
      email,
      password,
    });

    if (response.error) {
      toast({
        title: [response.error].flatMap((error) => error).join(', '),
        variant: 'error',
      });

      return;
    }

    if (response.data) {
      await checkSession();

      if (callbackUrl) {
        router.push(callbackUrl);
      }
    }
  };

  const onSubmitError = (error: Error) => {
    toast({
      title: error.message,
      variant: 'error',
    });
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
