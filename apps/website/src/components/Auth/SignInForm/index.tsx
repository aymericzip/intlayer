'use client';

import {
  Button,
  Form,
  InputElement,
  InputPasswordElement,
  useForm,
  // useToast,
} from '@intlayer/design-system';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import {
  GoogleLoginButton,
  GitHubLoginButton,
  ExtLoginButtons,
} from '../ExtLoginButtons';
import { SignInSchema, type SignIn } from './SignInSchema';
import { PagesRoutes } from '@/Routes';

type SignInFormProps = {
  callbackUrl?: string;
};

export const SignInForm: FC<SignInFormProps> = ({
  callbackUrl = PagesRoutes.Home,
}) => {
  const {
    forgotPasswordLink,
    signUpLink,
    signInButton,
    emailInput,
    passwordInput,
  } = useIntlayer('sign-in-form');
  const router = useRouter();
  // const { toast } = useToast();
  const { form, isSubmitting } = useForm(SignInSchema);

  const onSubmitSuccess = async ({ email, password }: SignIn) => {
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl,
    });
  };

  const onSubmitError = (error: Error) => {
    // toast({
    //   title: error.message,
    //   variant: 'default',
    // });
  };

  return (
    <>
      <Form
        schema={SignInSchema}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitError={onSubmitError}
        {...form}
      >
        <div className="flex flex-col gap-y-6">
          <InputElement
            name="email"
            label={emailInput.label}
            placeholder={emailInput.placeholder.value}
            isRequired
            autoComplete="email"
          />

          <InputPasswordElement
            name="password"
            label={passwordInput.label}
            placeholder={passwordInput.placeholder.value}
            isRequired
            autoComplete="current-password"
          />
        </div>

        <Link
          href={PagesRoutes.Auth_ResetPassword}
          className="text-primary dark:text-primary-dark float-right !m-0 p-2 text-xs"
          aria-label={forgotPasswordLink.ariaLabel.value}
        >
          {forgotPasswordLink.text}
        </Link>

        <Button
          type="submit"
          className="mt-12 w-full"
          isLoading={isSubmitting}
          label={signInButton.ariaLabel.value}
        >
          {signInButton.text}
        </Button>

        <span className="text-neutral dark:text-neutral-dark m-auto mt-3 flex items-center justify-center text-center align-middle text-xs">
          {signUpLink.message}
          <Link
            href={PagesRoutes.Auth_SignUp}
            className="text-primary dark:text-primary-dark ml-1 p-1 text-xs"
            aria-label={signUpLink.ariaLabel.value}
          >
            {signUpLink.text}
          </Link>
        </span>
      </Form>
      <ExtLoginButtons />
    </>
  );
};
