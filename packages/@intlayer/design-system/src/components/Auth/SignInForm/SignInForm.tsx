'use client';

import type { FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { Form, useForm } from '../../Form';
import { ExternalsLoginButtons } from '../ExternalsLoginButtons';
import { signInContent } from './signIn.content';
import { useSignInSchema, type SignIn } from './useSignInSchema';

type SignInFormProps = {
  onSubmitSuccess: (data: SignIn) => Promise<void>;
  onClickForgotPassword: () => void;
  onClickSignUp: () => void;
  onSubmitError?: (error: Error) => void;
};

export const SignInForm: FC<SignInFormProps> = ({
  onSubmitSuccess,
  onSubmitError,
  onClickForgotPassword,
  onClickSignUp,
}) => {
  const SignInSchema = useSignInSchema();
  const { form, isSubmitting } = useForm(SignInSchema);
  const {
    emailInput,
    passwordInput,
    forgotPasswordLink,
    loginButton,
    signUpLink,
  } = useDictionary(signInContent);

  return (
    <>
      <Form
        schema={SignInSchema}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitError={onSubmitError}
        autoComplete
        className="gap-y-0"
        {...form}
      >
        <div className="flex flex-col gap-y-6">
          <Form.Input
            name="email"
            label={emailInput.label.value}
            placeholder={emailInput.placeholder.value}
            isRequired
            autoComplete="email"
          />

          <Form.InputPassword
            name="password"
            label={passwordInput.label.value}
            placeholder={passwordInput.placeholder.value}
            isRequired
            autoComplete="current-password"
          />
        </div>

        <Form.Button
          className="ml-auto mt-2 block"
          variant="link"
          label={forgotPasswordLink.ariaLabel.value}
          color="text"
          size="sm"
          onClick={onClickForgotPassword}
        >
          {forgotPasswordLink.text}
        </Form.Button>

        <Form.Button
          className="mt-12 w-full"
          type="submit"
          color="text"
          isLoading={isSubmitting}
          label={loginButton.ariaLabel.value}
        >
          {loginButton.text}
        </Form.Button>

        <span className="text-neutral dark:text-neutral-dark m-auto mt-3 flex w-full items-center justify-center text-xs">
          {signUpLink.message}
          <Form.Button
            variant="link"
            label={signUpLink.ariaLabel.value}
            color="text"
            size="sm"
            onClick={onClickSignUp}
          >
            {signUpLink.text}
          </Form.Button>
        </span>
      </Form>
      <ExternalsLoginButtons />
    </>
  );
};
