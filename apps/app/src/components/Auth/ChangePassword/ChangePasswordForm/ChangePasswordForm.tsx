import { useUser } from '@intlayer/design-system/api';
import {
  Form,
  FormButton,
  FormInput,
  FormInputPassword,
  useForm,
} from '@intlayer/design-system/form';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  type ChangePassword,
  useChangePasswordSchema,
} from './useChangePasswordSchema';

type ChangePasswordFormProps = {
  onSubmitSuccess: (data: ChangePassword) => Promise<void> | void;
  onSubmitError?: (error: Error) => void;
};

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  onSubmitSuccess,
  onSubmitError,
}) => {
  const {
    currentPasswordInput,
    newPasswordInput,
    confirmPasswordInput,
    changePasswordButton,
  } = useIntlayer('change-password-schema');
  const { user } = useUser();
  const ChangePasswordSchema = useChangePasswordSchema();

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
        <FormInput
          id="change-password-email"
          name="email"
          value={user?.email ?? ''}
          autoComplete="email"
          disabled
          hidden
          layoutClassName="hidden"
        />
        <FormInputPassword
          name="currentPassword"
          label={currentPasswordInput.label.value}
          placeholder={currentPasswordInput.placeholder.value}
          autoComplete="current-password"
          isRequired
        />
        <FormInputPassword
          name="newPassword"
          label={newPasswordInput.label.value}
          placeholder={newPasswordInput.placeholder.value}
          autoComplete="new-password"
          isRequired
        />
        <FormInputPassword
          name="newPasswordConfirmation"
          label={confirmPasswordInput.label.value}
          placeholder={confirmPasswordInput.placeholder.value}
          autoComplete="new-password"
          isRequired
        />
        <FormInput
          type="text"
          name="email"
          id="change-password-email"
          value={user?.email ?? ''}
          autoComplete="username email"
          disabled
          hidden
          className="hidden"
        />
      </div>

      <FormButton
        className="w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting}
        disabled={!isValid}
        label={changePasswordButton.ariaLabel.value}
      >
        {changePasswordButton.text.value}
      </FormButton>
    </Form>
  );
};
