import { Form, useForm } from '@intlayer/design-system';
import { useUser } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import {
  useDefineNewPasswordSchema,
  type DefineNewPassword,
} from './useDefineNewPasswordSchema';

type DefineNewPasswordFormProps = {
  onSubmitSuccess: (data: DefineNewPassword) => Promise<void>;
  onSubmitError?: (error: Error) => void;
};

export const DefineNewPasswordForm: FC<DefineNewPasswordFormProps> = ({
  onSubmitSuccess,
  onSubmitError,
}) => {
  const { newPasswordInput, confirmPasswordInput, changePasswordButton } =
    useIntlayer('defined-password-form');
  const { user } = useUser();
  const ChangePasswordSchema = useDefineNewPasswordSchema();

  const { form, isSubmitting, isValid } = useForm(ChangePasswordSchema);

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
        variant="default"
        label={changePasswordButton.ariaLabel.value}
      >
        {changePasswordButton.text.value}
      </Form.Button>
    </Form>
  );
};
