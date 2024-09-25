'use client';

import { useState, type FC, useEffect, type ReactNode } from 'react';
import { Form, useForm } from '../../Form';
import { getResetPasswordContent } from './index.content';
import {
  getResetPasswordSchema,
  type ResetPassword,
} from './ResetPasswordSchema';

type ForgotPasswordFormProps = {
  email?: string;
  onSubmitSuccess: (data: ResetPassword) => Promise<void>;
  onSubmitError: (error: Error) => void;
  onClickBackToLogin: () => void;
};

export const ResetPasswordForm: FC<ForgotPasswordFormProps> = ({
  email,
  onSubmitSuccess,
  onSubmitError,
  onClickBackToLogin,
}) => {
  const ResetPasswordSchema = getResetPasswordSchema();
  const {
    emailInput,
    sendRecoveryEmailButton,
    resendRecoveryEmailButton,
    resendInText,
    backToLoginButton,
  } = getResetPasswordContent();
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
        isLoading={isSubmitting}
        disabled={!isValid || submissionState.isFrozen}
        variant={isSubmitted ? 'outline' : 'default'}
        label={sendRecoveryEmailButton.ariaLabel}
      >
        {getSubmitButtonText()}
      </Form.Button>
      {isSubmitted && (
        <Form.Button
          type="button"
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
