'use client';

import { type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { Form, useForm } from '../../Form';
import content from './signUpForm.content';
import { useSignUpSchema, type SignUp } from './useSignUpSchema';

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
  } = useDictionary(content);
  const SignUpSchema = useSignUpSchema();
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
          label={emailInput.label.value}
          placeholder={emailInput.placeholder.value}
          isRequired
          autoComplete="email"
          minLength={5}
          maxLength={50}
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
      </div>

      <Form.Button
        className="mt-12 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting}
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
