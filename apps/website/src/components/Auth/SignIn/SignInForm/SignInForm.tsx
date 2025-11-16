'use client';

import { Form, useForm } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode, RefObject } from 'react';
import { ExternalsLoginButtons } from '../../ExternalsLoginButtons';
import { PasskeyButton } from '../../PassKeyButton';
import { type SignIn, useSignInSchema } from './useSignInSchema';

type SignInFormProps = {
  defaultEmail?: string;
  onSubmitSuccess: (data: SignIn) => Promise<void> | void;
  onClickForgotPassword: () => void;
  onClickSignUp: () => void;
  onSubmitError?: (error: Error) => void;
  emailInputRef?: RefObject<HTMLInputElement | null>;
  isLoading?: boolean;
};

const Separator: FC = () => {
  const { or } = useIntlayer('sign-in');

  return (
    <div className="mb-3 flex w-full items-center gap-3 text-center text-base">
      <div className="h-px w-full bg-neutral" />
      <div className="text-neutral">{or}</div>
      <div className="h-px w-full bg-neutral" />
    </div>
  );
};

export const SignInForm: FC<SignInFormProps> = ({
  defaultEmail,
  onSubmitSuccess,
  onSubmitError,
  onClickForgotPassword,
  onClickSignUp,
  emailInputRef,
  isLoading,
}) => {
  const SignInSchema = useSignInSchema();

  const { form, isSubmitting } = useForm(SignInSchema, {
    defaultValues: {
      email: defaultEmail,
    },
  });
  const {
    emailInput,
    passwordInput,
    forgotPasswordLink,
    loginButton,
    signUpLink,
    rememberMeCheckbox,
    or,
  } = useIntlayer('sign-in');

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
            type="email"
            autoComplete="email"
            label={emailInput.label.value}
            placeholder={emailInput.placeholder.value}
            isRequired
            ref={emailInputRef}
          />

          <Form.InputPassword
            name="password"
            autoComplete="current-password"
            label={passwordInput.label.value}
            placeholder={passwordInput.placeholder.value}
            isRequired
          />
        </div>

        <Form.Button
          className="mt-2 ml-auto block"
          variant="link"
          label={forgotPasswordLink.ariaLabel.value}
          color="text"
          size="sm"
          onClick={onClickForgotPassword}
        >
          {forgotPasswordLink.text}
        </Form.Button>

        <Form.Checkbox
          name="rememberMe"
          size="sm"
          color="text"
          inputLabel={rememberMeCheckbox.description}
        />

        <Form.Button
          className="mt-12 w-full"
          type="submit"
          color="text"
          isLoading={isSubmitting || isLoading}
          label={loginButton.ariaLabel.value}
        >
          {loginButton.text}
        </Form.Button>

        <span className="m-auto mt-3 flex w-full items-center justify-center text-neutral text-xs">
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
      <Separator />
      <div className="space-y-6">
        <PasskeyButton />
        <ExternalsLoginButtons />
      </div>
    </>
  );
};
