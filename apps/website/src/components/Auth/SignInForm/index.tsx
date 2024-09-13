'use client';

import {
  SignInForm as SignInFormUI,
  useAuth,
  useToast,
  type SignIn,
} from '@intlayer/design-system';
import { useLogin } from '@intlayer/design-system/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, type FC } from 'react';
import { PagesRoutes } from '@/Routes';

type SignInFormProps = {
  callbackUrl?: string;
};

export const SignInForm: FC<SignInFormProps> = ({ callbackUrl }) => {
  const { checkSession } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, error } = useLogin();
  const { toast } = useToast();

  const redirectURLQuery = searchParams.get('redirect_url');
  const redirectURL = callbackUrl ?? redirectURLQuery;

  const onSubmitSuccess = async ({ email, password }: SignIn) => {
    const response = await login({
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

      if (redirectURL) {
        router.push(redirectURL);
      }
    }
  };

  const onSubmitError = (error: Error) => {
    toast({
      title: error.message,
      variant: 'error',
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        variant: 'error',
      });
    }
  }, [error, toast]);

  const onClickForgotPassword = () =>
    router.push(PagesRoutes.Auth_ResetPassword);

  const onClickSignUp = () => router.push(PagesRoutes.Auth_SignUp);

  return (
    <SignInFormUI
      onSubmitSuccess={onSubmitSuccess}
      onSubmitError={onSubmitError}
      onClickForgotPassword={onClickForgotPassword}
      onClickSignUp={onClickSignUp}
    />
  );
};
