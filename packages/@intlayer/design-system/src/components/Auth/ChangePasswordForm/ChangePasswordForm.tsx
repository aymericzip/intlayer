import type { FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { Form, useForm } from '../../Form';
import { useUser } from '../useUser';
import { changePasswordContent } from './changePasswordForm.content';
import {
  useChangePasswordSchema,
  type ChangePassword,
} from './useChangePasswordSchema';

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
  } = useDictionary(changePasswordContent);
  const { user } = useUser();
  const ChangePasswordSchema = useChangePasswordSchema();

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
          label={currentPasswordInput.label.value}
          placeholder={currentPasswordInput.placeholder.value}
          autoComplete="current-password"
          isRequired
        />
        <Form.InputPassword
          name="newPassword"
          label={newPasswordInput.label.value}
          placeholder={newPasswordInput.placeholder.value}
          autoComplete="new-password"
          isRequired
        />
        <Form.InputPassword
          name="newPasswordConfirmation"
          label={confirmPasswordInput.label.value}
          placeholder={confirmPasswordInput.placeholder.value}
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
        label={changePasswordButton.ariaLabel.value}
      >
        {changePasswordButton.text.value}
      </Form.Button>
      {isSubmitted && (
        <Form.Button
          className="mt-4 w-full"
          label={backToHomeButton.ariaLabel.value}
          onClick={onClickBackToHome}
        >
          {backToHomeButton.text.value}
        </Form.Button>
      )}
    </Form>
  );
};
