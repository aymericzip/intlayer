import { Form, useForm } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import {
  DefinePassword,
  useDefinePasswordSchema,
} from './useDefinePasswordSchema';

type DefinePasswordFormProps = {
  onSubmitSuccess: (data: DefinePassword) => Promise<void> | void;
  onSubmitError?: (error: Error) => void;
};

export const DefinePasswordForm: FC<DefinePasswordFormProps> = ({
  onSubmitSuccess,
  onSubmitError,
}) => {
  const { newPasswordInput, confirmPasswordInput, definePasswordButton } =
    useIntlayer('define-password-schema');
  const DefinePasswordSchema = useDefinePasswordSchema();

  const { form, isSubmitting, isValid } = useForm(DefinePasswordSchema);

  return (
    <Form
      schema={DefinePasswordSchema}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitError={onSubmitError}
      autoComplete
      className="gap-y-0"
      {...form}
    >
      <div className="flex flex-col gap-y-6">
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
        label={definePasswordButton.ariaLabel.value}
      >
        {definePasswordButton.text.value}
      </Form.Button>
    </Form>
  );
};
