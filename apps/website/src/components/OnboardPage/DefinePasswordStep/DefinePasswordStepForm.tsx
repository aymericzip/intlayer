import { Form, H2, useForm, useUser } from '@intlayer/design-system';
import {
  useChangePassword,
  useCheckIfUserHasPassword,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { type FC } from 'react';
import { StepLayout } from '../StepLayout';
import { Steps } from '../steps';
import { useStep } from '../useStep';
import {
  getDefinePasswordSchema,
  DefinePassword,
} from './DefinePasswordSchema';

export const DefinePasswordStepForm: FC = () => {
  const {
    title,
    currentPasswordInput,
    newPasswordInput,
    confirmPasswordInput,
  } = useIntlayer('define-password-step');
  const { user } = useUser();
  const { formData, goNextStep, goPreviousStep, setState, setFormData } =
    useStep(Steps.Password);
  const { formData: registrationFormData } = useStep(Steps.Registration);
  const { changePassword, isLoading } = useChangePassword();
  const { data } = useCheckIfUserHasPassword({
    autoFetch: true,
    cache: true,
  });

  const isPasswordDefined = Boolean(data?.data?.hasPassword);

  const DefinePasswordSchema = getDefinePasswordSchema(isPasswordDefined);
  const { form, isSubmitting } = useForm(DefinePasswordSchema, {
    defaultValues: formData,
  });

  const onSubmitSuccess = async (data: DefinePassword) => {
    setFormData(data);
    await changePassword(data).then((response) => {
      if (response?.data) {
        setState({
          isPasswordDefined: true,
        });
      }
    });
    goNextStep();
  };

  const userEmail = user?.email ?? registrationFormData?.email ?? '';

  return (
    <Form
      schema={DefinePasswordSchema}
      onSubmitSuccess={onSubmitSuccess}
      autoComplete
      {...form}
    >
      <H2>{title}</H2>
      <StepLayout
        isLoading={isLoading || isSubmitting}
        onGoToPreviousStep={goPreviousStep}
        onSkipStep={goNextStep}
        isSkippable={isPasswordDefined}
      >
        <Form.Input
          type="text"
          name="email"
          value={userEmail}
          autoComplete="username email"
          disabled
          hidden
          className="hidden"
        />
        {isPasswordDefined && (
          <Form.Input
            name="currentPassword"
            label={currentPasswordInput.label.value}
            placeholder={currentPasswordInput.placeholder.value}
            autoComplete="current-password"
            isRequired
          />
        )}
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
      </StepLayout>
    </Form>
  );
};
