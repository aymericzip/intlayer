'use client';

import {
  Button,
  Form,
  InputElement,
  useForm,
  // useToast,
} from '@intlayer/design-system';
import { backendAPI } from '@utils/backend-api';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { useState, type FC, useEffect, type ReactNode } from 'react';
import { ResetPasswordSchema, type ResetPassword } from './ResetPasswordSchema';
import { PagesRoutes } from '@/Routes';

type ForgotPasswordFormProps = {
  email?: string;
  callbackUrl?: string;
};

export const ResetPasswordForm: FC<ForgotPasswordFormProps> = ({
  email,
  callbackUrl = PagesRoutes.Auth_SignIn,
}) => {
  const {
    emailInput,
    sendRecoveryEmailButton,
    resendRecoveryEmailButton,
    resendInText,
    backToLoginButton,
  } = useIntlayer('reset-password-form');

  const { form, isSubmitting, isSubmitted, isValid } =
    useForm(ResetPasswordSchema);
  const [submissionState, setSubmissionState] = useState({
    isFrozen: isValid,
    remainingTime: 0,
  });
  const router = useRouter();
  // const { toast } = useToast();

  const onSubmitSuccess = async ({ email }: ResetPassword) => {
    const result = await backendAPI.user.askResetPassword(email);

    if (!result.success) {
      return router.push(callbackUrl);
    }
  };

  const onSubmitError = (error: Error) => {
    // toast({
    //   title: error.message,
    //   variant: 'default',
    // });
  };

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
          defaultValue={email}
        />
      </div>

      <Button
        type="submit"
        className="mt-12 w-full"
        isLoading={isSubmitting}
        disabled={!isValid || submissionState.isFrozen}
        variant={isSubmitted ? 'outline' : 'default'}
        label={sendRecoveryEmailButton.ariaLabel.value}
      >
        {getSubmitButtonText()}
      </Button>
      {isSubmitted && (
        <Button
          type="button"
          className="mt-4 w-full"
          label={backToLoginButton.text.value}
          onClick={() => router.push(callbackUrl)}
        >
          {backToLoginButton.text}
        </Button>
      )}
    </Form>
  );
};
