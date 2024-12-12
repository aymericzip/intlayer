'use client';

import { useState, type FC, useEffect, type ReactNode } from 'react';
// @ts-ignore react-intlayer not build yet
import { useDictionary } from 'react-intlayer';
import { Form, useForm } from '../../Form';
import { resetPasswordContent } from './resetPasswordContent.content';
import {
  useResetPasswordSchema,
  type ResetPassword,
} from './useResetPasswordSchema';

type ForgotPasswordFormProps = {
  email?: string;
  onSubmitSuccess: (data: ResetPassword) => Promise<void>;
  onClickBackToLogin: () => void;
  onSubmitError?: (error: Error) => void;
};

export const ResetPasswordForm: FC<ForgotPasswordFormProps> = ({
  email,
  onSubmitSuccess,
  onSubmitError,
  onClickBackToLogin,
}) => {
  const ResetPasswordSchema = useResetPasswordSchema();
  const {
    emailInput,
    sendRecoveryEmailButton,
    resendRecoveryEmailButton,
    resendInText,
    backToLoginButton,
  } = useDictionary(resetPasswordContent);
  const { form, isSubmitting, isSubmitted, isValid } = useForm(
    ResetPasswordSchema,
    {
      defaultValues: { email },
    }
  );
  const [submissionState, setSubmissionState] = useState({
    isFrozen: isValid,
    remainingTime: 0,
  });

  useEffect(() => {
    // If form valid and form is not submitted, unfreeze the submission
    if (isValid && !isSubmitted) {
      setSubmissionState((prevState) => ({
        ...prevState,
        isFrozen: false,
      }));
    }
  }, [isSubmitted, isValid]);

  useEffect(() => {
    // If form valid and submission is frozen and there is remaining time, start the timer
    if (
      isValid &&
      submissionState.isFrozen &&
      submissionState.remainingTime > 0
    ) {
      const interval = setInterval(() => {
        setSubmissionState((prevState) => {
          if (prevState.remainingTime <= 1) {
            clearInterval(interval); // Stop the timer when reaching 0
            return { ...prevState, isFrozen: false, remainingTime: 0 };
          }
          return { ...prevState, remainingTime: prevState.remainingTime - 1 };
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isValid, submissionState.isFrozen, submissionState.remainingTime]);

  const getSubmitButtonText = (): ReactNode => {
    if (submissionState.remainingTime > 0) {
      return `${resendInText} ${submissionState.remainingTime}s`;
    }
    return isSubmitted
      ? resendRecoveryEmailButton.text
      : sendRecoveryEmailButton.text;
  };

  return (
    <Form
      schema={ResetPasswordSchema}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitError={onSubmitError}
      className="gap-y-0"
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
      </div>

      <Form.Button
        className="mt-12 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting}
        disabled={!isValid || submissionState.isFrozen}
        variant={isSubmitted ? 'outline' : 'default'}
        label={sendRecoveryEmailButton.ariaLabel}
      >
        {getSubmitButtonText()}
      </Form.Button>
      {isSubmitted && (
        <Form.Button
          className="mt-4 w-full"
          label={backToLoginButton.text}
          onClick={onClickBackToLogin}
        >
          {backToLoginButton.text}
        </Form.Button>
      )}
    </Form>
  );
};
