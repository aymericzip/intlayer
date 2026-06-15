import {
  Form,
  FormButton,
  FormCheckbox,
  FormInput,
  FormInputPassword,
  useForm,
} from '@intlayer/design-system/form';
import type { FC, RefObject } from 'react';
import { useIntlayer } from 'react-intlayer';
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
        <FormInput
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

        <FormInputPassword
          name="password"
          label={passwordInput.label.value}
          placeholder={passwordInput.placeholder.value}
          autoComplete="new-password"
          isRequired
        />

        <FormInputPassword
          name="passwordConfirmation"
          label={passwordConfirmationInput.label.value}
          placeholder={passwordConfirmationInput.placeholder.value}
          autoComplete="new-password"
          isRequired
        />

        <FormCheckbox
          name="termsAndConditions"
          size="sm"
          color="text"
          inputLabel={termsAndConditionsCheckbox.description}
        />
      </div>

      <FormButton
        className="mt-4 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting || isLoading}
        label={signUpButton.ariaLabel.value}
      >
        {signUpButton.text}
      </FormButton>

      <span className="m-auto mt-3 flex w-full items-center justify-center text-center align-middle text-neutral text-xs">
        {loginLink.message}
        <FormButton
          variant="link"
          label={loginLink.ariaLabel.value}
          color="text"
          onClick={onClickBackToSignIn}
        >
          {loginLink.text}
        </FormButton>
      </span>
    </Form>
  );
};
