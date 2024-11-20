'use client';

import type { FC } from 'react';
import { Form, useForm } from '../../Form';
import { getSignUpContent } from './index.content';
import { getSignUpSchema, type SignUp } from './SignUpSchema';

type SignUpFormProps = {
  onSubmitSuccess: (data: SignUp) => Promise<void>;
  onClickBackToSignIn: () => void;
  onSubmitError?: (error: Error) => void;
};

export const SignUpForm: FC<SignUpFormProps> = ({
  onSubmitSuccess,
  onSubmitError,
  onClickBackToSignIn,
}) => {
  const {
    emailInput,
    passwordInput,
    passwordConfirmationInput,
    signUpButton,
    loginLink,
  } = getSignUpContent();
  const SignUpSchema = getSignUpSchema();
  const { form, isSubmitting } = useForm(SignUpSchema);

  return (
    <Form
      schema={SignUpSchema}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitError={onSubmitError}
      autoComplete
      {...form}
    >
      <div className="flex flex-col gap-y-6">
        <Form.Input
          name="email"
          label={emailInput.label}
          placeholder={emailInput.placeholder}
          isRequired
          autoComplete="email"
          minLength={5}
          maxLength={50}
        />

        <Form.InputPassword
          name="password"
          label={passwordInput.label}
          placeholder={passwordInput.placeholder}
          autoComplete="new-password"
          isRequired
        />

        <Form.InputPassword
          name="passwordConfirmation"
          label={passwordConfirmationInput.label}
          placeholder={passwordConfirmationInput.placeholder}
          autoComplete="new-password"
          isRequired
        />
      </div>

      <Form.Button
        className="mt-12 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting}
        label={signUpButton.ariaLabel}
      >
        {signUpButton.text}
      </Form.Button>

      <span className="text-neutral dark:text-neutral-dark m-auto mt-3 flex w-full items-center justify-center text-center align-middle text-xs">
        {loginLink.message}
        <Form.Button
          variant="link"
          label={loginLink.ariaLabel}
          color="text"
          onClick={onClickBackToSignIn}
        >
          {loginLink.text}
        </Form.Button>
      </span>
    </Form>
  );
};
