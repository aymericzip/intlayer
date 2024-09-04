'use client';

import type { FC } from 'react';
import tw from 'twin.macro';
import { Button } from '../../Button';
import { Form, InputElement, InputPasswordElement, useForm } from '../../Form';
// import { ExternalsLoginButtons } from '../ExternalsLoginButtons';
import { getSignInContent } from './index.content';
import { getSignInSchema, type SignIn } from './SignInSchema';

type SignInFormProps = {
  onSubmitSuccess: (data: SignIn) => Promise<void>;
  onSubmitError: (error: Error) => void;
  onClickForgotPassword: () => void;
  onClickSignUp: () => void;
};

const StyledDiv = tw.div`flex flex-col gap-y-6`;
const StyledForgotPasswordButton = tw(Button)`block ml-auto mt-2`;
const StyledSubmitButton = tw(Button)`mt-12 w-full`;
const StyledLoginMessageContainer = tw.span`text-neutral dark:text-neutral-dark m-auto mt-3 flex w-full text-center align-middle text-xs gap-2 justify-center`;

export const SignInForm: FC<SignInFormProps> = ({
  onSubmitSuccess,
  onSubmitError,
  onClickForgotPassword,
  onClickSignUp,
}) => {
  const SignInSchema = getSignInSchema();
  const { form, isSubmitting } = useForm(SignInSchema);
  const signInContent = getSignInContent();

  return (
    <>
      <Form
        schema={SignInSchema}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitError={onSubmitError}
        {...form}
      >
        <StyledDiv>
          <InputElement
            name="email"
            label={signInContent.emailInput.label}
            placeholder={signInContent.emailInput.placeholder}
            isRequired
            autoComplete="email"
          />

          <InputPasswordElement
            name="password"
            label={signInContent.passwordInput.label}
            placeholder={signInContent.passwordInput.placeholder}
            isRequired
            autoComplete="current-password"
          />
        </StyledDiv>

        <StyledForgotPasswordButton
          variant="link"
          label={signInContent.forgotPasswordLink.ariaLabel}
          color="primary"
          type="button"
          onClick={onClickForgotPassword}
        >
          {signInContent.forgotPasswordLink.text}
        </StyledForgotPasswordButton>

        <StyledSubmitButton
          type="submit"
          isLoading={isSubmitting}
          label={signInContent.loginButton.ariaLabel}
        >
          {signInContent.loginButton.text}
        </StyledSubmitButton>

        <StyledLoginMessageContainer>
          {signInContent.signUpLink.message}
          <Button
            variant="link"
            label={signInContent.signUpLink.ariaLabel}
            color="primary"
            onClick={onClickSignUp}
            type="button"
          >
            {signInContent.signUpLink.text}
          </Button>
        </StyledLoginMessageContainer>
      </Form>
      {/* <ExternalsLoginButtons /> */}
    </>
  );
};
