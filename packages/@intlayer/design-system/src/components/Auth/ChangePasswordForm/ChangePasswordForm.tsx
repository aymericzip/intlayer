import type { FC } from 'react';
import { Form, useForm } from '../../Form';
import { useUser } from '../useUser';
import {
  getChangePasswordSchema,
  type ChangePassword,
} from './ChangePasswordSchema';
import { getChangePasswordContent } from './index.content';

type ChangePasswordFormProps = {
  onSubmitSuccess: (data: ChangePassword) => Promise<void>;
  onClickBackToHome: () => void;
  onSubmitError?: (error: Error) => void;
};

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  onSubmitSuccess,
  onSubmitError,
  onClickBackToHome,
}) => {
  const {
    currentPasswordInput,
    newPasswordInput,
    confirmPasswordInput,
    changePasswordButton,
    backToHomeButton,
  } = getChangePasswordContent();
  const { user } = useUser();
  const ChangePasswordSchema = getChangePasswordSchema();

  const { form, isSubmitting, isSubmitted, isValid } =
    useForm(ChangePasswordSchema);

  return (
    <Form
      schema={ChangePasswordSchema}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitError={onSubmitError}
      autoComplete
      className="gap-y-0"
      {...form}
    >
      <div className="flex flex-col gap-y-6">
        <Form.Input
          type="text"
          name="email"
          value={user?.email ?? ''}
          autoComplete="username email"
          disabled
          hidden
          className="hidden"
        />
        <Form.InputPassword
          name="currentPassword"
          label={currentPasswordInput.label}
          placeholder={currentPasswordInput.placeholder}
          autoComplete="current-password"
          isRequired
        />
        <Form.InputPassword
          name="newPassword"
          label={newPasswordInput.label}
          placeholder={newPasswordInput.placeholder}
          autoComplete="new-password"
          isRequired
        />
        <Form.InputPassword
          name="newPasswordConfirmation"
          label={confirmPasswordInput.label}
          placeholder={confirmPasswordInput.placeholder}
          autoComplete="new-password"
          isRequired
        />
      </div>

      <Form.Button
        className="mt-12 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting}
        disabled={!isValid}
        variant={isSubmitted ? 'outline' : 'default'}
        label={changePasswordButton.ariaLabel}
      >
        {changePasswordButton.text}
      </Form.Button>
      {isSubmitted && (
        <Form.Button
          className="mt-4 w-full"
          label={backToHomeButton.ariaLabel}
          onClick={onClickBackToHome}
        >
          {backToHomeButton.text}
        </Form.Button>
      )}
    </Form>
  );
};
