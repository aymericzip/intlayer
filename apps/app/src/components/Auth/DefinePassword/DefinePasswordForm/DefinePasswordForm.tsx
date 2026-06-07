import {
  Form,
  FormButton,
  FormInputPassword,
  useForm,
} from '@intlayer/design-system/form';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  type DefinePassword,
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
      </div>

      <FormButton
        className="mt-4 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting}
        disabled={!isValid}
        label={definePasswordButton.ariaLabel.value}
      >
        {definePasswordButton.text.value}
      </FormButton>
    </Form>
  );
};
