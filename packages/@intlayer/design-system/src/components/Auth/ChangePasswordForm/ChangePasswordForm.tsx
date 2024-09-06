import type { FC } from 'react';
import { Button } from '../../Button';
import { InputPasswordElement, useForm, Form } from '../../Form';
import {
  getChangePasswordSchema,
  type ChangePassword,
} from './ChangePasswordSchema';
import { getChangePasswordContent } from './index.content';

type ChangePasswordFormProps = {
  onSubmitSuccess: (data: ChangePassword) => Promise<void>;
  onSubmitError: (error: Error) => void;
  onClickResetPassword: () => void;
  onClickBackToHome: () => void;
};

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  onSubmitSuccess,
  onSubmitError,
  onClickResetPassword,
  onClickBackToHome,
}) => {
  const {
    currentPasswordInput,
    newPasswordInput,
    confirmPasswordInput,
    forgotPasswordLink,
    changePasswordButton,
    backToHomeButton,
  } = getChangePasswordContent();
  const ChangePasswordSchema = getChangePasswordSchema();

  const { form, isSubmitting, isSubmitted, isValid } =
    useForm(ChangePasswordSchema);

  return (
    <Form
      schema={ChangePasswordSchema}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitError={onSubmitError}
      {...form}
    >
      <div className="flex flex-col gap-y-6">
        <div>
          <InputPasswordElement
            name="currentPassword"
            label={currentPasswordInput.label}
            placeholder={currentPasswordInput.placeholder}
            autoComplete="current-password"
            isRequired
          />
          <Button
            variant="link"
            label={forgotPasswordLink.ariaLabel}
            color="primary"
            onClick={onClickResetPassword}
            type="button"
          >
            {forgotPasswordLink.text}
          </Button>
        </div>
        <InputPasswordElement
          name="newPassword"
          label={newPasswordInput.label}
          placeholder={newPasswordInput.placeholder}
          autoComplete="new-password"
          isRequired
        />
        <InputPasswordElement
          name="newPasswordConfirmation"
          label={confirmPasswordInput.label}
          placeholder={confirmPasswordInput.placeholder}
          autoComplete="new-password"
          isRequired
        />
      </div>

      <Button
        className="mt-12 w-full"
        type="submit"
        isLoading={isSubmitting}
        disabled={!isValid}
        variant={isSubmitted ? 'outline' : 'default'}
        label={changePasswordButton.ariaLabel}
      >
        {changePasswordButton.text}
      </Button>
      {isSubmitted && (
        <Button
          className="mt-4 w-full"
          type="button"
          label={backToHomeButton.ariaLabel}
          onClick={onClickBackToHome}
        >
          {backToHomeButton.text}
        </Button>
      )}
    </Form>
  );
};
