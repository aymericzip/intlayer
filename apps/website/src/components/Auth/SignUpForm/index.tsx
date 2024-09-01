'use client';

import {
  Button,
  Form,
  InputElement,
  InputPasswordElement,
  useForm,
} from '@intlayer/design-system';
import { backendAPI } from '@utils/backend-api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { SignUpSchema, type SignUp } from './SignUpSchema';
import { useAuth } from '@/providers/AuthProvider';
import { PagesRoutes } from '@/Routes';

type SignUpFormProps = {
  callbackUrl?: string;
};

export const SignUpForm: FC<SignUpFormProps> = ({ callbackUrl }) => {
  const {
    emailInput,
    passwordInput,
    passwordConfirmationInput,
    signUpButton,
    loginLink,
  } = useIntlayer('sign-up-form');
  const router = useRouter();

  const { form, isSubmitting } = useForm(SignUpSchema);
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

  return (
    <Form
      schema={SignUpSchema}
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
          minLength={5}
          maxLength={50}
        />

        <InputPasswordElement
          name="password"
          label={passwordInput.label}
          placeholder={passwordInput.placeholder.value}
          autoComplete="new-password"
          isRequired
        />

        <InputPasswordElement
          name="passwordConfirmation"
          label={passwordConfirmationInput.label}
          placeholder={passwordConfirmationInput.placeholder.value}
          autoComplete="new-password"
          isRequired
        />
      </div>

      <Button
        type="submit"
        className="mt-12 w-full"
        isLoading={isSubmitting}
        label={signUpButton.ariaLabel.value}
      >
        {signUpButton.text}
      </Button>

      <span className="text-neutral dark:text-neutral-dark m-auto mt-3 block w-full text-center align-middle text-xs">
        {loginLink.message}
        <Link
          href={PagesRoutes.Auth_SignIn}
          className="text-primary dark:text-primary-dark p-1 text-xs"
          aria-label={loginLink.ariaLabel.value}
        >
          {loginLink.text}
        </Link>
      </span>
    </Form>
  );
};
