'use client';

import { Form, useForm } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import type { FC, RefObject } from 'react';
import { type SignUp, useSignUpSchema } from './useSignUpSchema';

type SignUpFormProps = {
  onSubmitSuccess: (data: SignUp) => Promise<void> | void;
  onClickBackToSignIn: () => void;
  onSubmitError?: (error: Error) => void;
  defaultEmail?: string;
  emailInputRef?: RefObject<HTMLInputElement | null>;
  isLoading?: boolean;
};

export const SignUpForm: FC<SignUpFormProps> = ({
  onSubmitSuccess,
  onSubmitError,
  onClickBackToSignIn,
  defaultEmail,
  emailInputRef,
  isLoading,
}) => {
  const {
    emailInput,
    passwordInput,
    passwordConfirmationInput,
    signUpButton,
    loginLink,
    termsAndConditionsCheckbox,
  } = useIntlayer('sign-up-form');
  const SignUpSchema = useSignUpSchema();
  const { form, isSubmitting } = useForm(SignUpSchema, {
    defaultValues: {
      email: defaultEmail,
    },
  });

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
          type="email"
          label={emailInput.label.value}
          placeholder={emailInput.placeholder.value}
          isRequired
          autoComplete="email"
          minLength={5}
          maxLength={50}
          ref={emailInputRef}
        />

        <Form.InputPassword
          name="password"
          label={passwordInput.label.value}
          placeholder={passwordInput.placeholder.value}
          autoComplete="new-password"
          isRequired
        />

        <Form.InputPassword
          name="passwordConfirmation"
          label={passwordConfirmationInput.label.value}
          placeholder={passwordConfirmationInput.placeholder.value}
          autoComplete="new-password"
          isRequired
        />

        <Form.Checkbox
          name="termsAndConditions"
          size="sm"
          color="text"
          inputLabel={termsAndConditionsCheckbox.description}
        />
      </div>

      <Form.Button
        className="mt-12 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting || isLoading}
        label={signUpButton.ariaLabel.value}
      >
        {signUpButton.text}
      </Form.Button>

      <span className="text-neutral m-auto mt-3 flex w-full items-center justify-center text-center align-middle text-xs">
        {loginLink.message}
        <Form.Button
          variant="link"
          label={loginLink.ariaLabel.value}
          color="text"
          onClick={onClickBackToSignIn}
        >
          {loginLink.text}
        </Form.Button>
      </span>
    </Form>
  );
};
