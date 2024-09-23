'use client';

import type { FC } from 'react';
import { Button } from '../../Button';
import { Form, InputElement, InputPasswordElement, useForm } from '../../Form';
import { getSignUpContent } from './index.content';
import { getSignUpSchema, type SignUp } from './SignUpSchema';

type SignUpFormProps = {
  onSubmitSuccess: (data: SignUp) => Promise<void>;
  onSubmitError: (error: Error) => void;
  onClickBackToSignIn: () => void;
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
        <InputElement
          name="email"
          label={emailInput.label}
          placeholder={emailInput.placeholder}
          isRequired
          autoComplete="email"
          minLength={5}
          maxLength={50}
        />

        <InputPasswordElement
          name="password"
          label={passwordInput.label}
          placeholder={passwordInput.placeholder}
          autoComplete="new-password"
          isRequired
        />

        <InputPasswordElement
          name="passwordConfirmation"
          label={passwordConfirmationInput.label}
          placeholder={passwordConfirmationInput.placeholder}
          autoComplete="new-password"
          isRequired
        />
      </div>

      <Button
        className="mt-12 w-full"
        type="submit"
        isLoading={isSubmitting}
        label={signUpButton.ariaLabel}
      >
        {signUpButton.text}
      </Button>

      <span className="text-neutral dark:text-neutral-dark m-auto mt-3 flex w-full justify-center text-center align-middle text-xs">
        {loginLink.message}
        <Button
          variant="link"
          label={loginLink.ariaLabel}
          color="primary"
          onClick={onClickBackToSignIn}
          aria-label={loginLink.ariaLabel}
          type="button"
        >
          {loginLink.text}
        </Button>
      </span>
    </Form>
  );
};
