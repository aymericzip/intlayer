import { Form, H2, toast, useForm } from '@intlayer/design-system';
import {
  useChangePassword,
  useCheckIfUserHasPassword,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { useEffect, type FC } from 'react';
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
    successToast,
  } = useIntlayer('define-password-step');
  const { formData, goNextStep, goPreviousStep, setState, setFormData } =
    useStep(Steps.Password);
  const { changePassword, isLoading } = useChangePassword();
  const { data } = useCheckIfUserHasPassword({
    autoFetch: true,
    cache: true,
  });

  const isPasswordDefined = Boolean(data?.data?.hasPassword);

  const DefinePasswordSchema = getDefinePasswordSchema(isPasswordDefined);
  const { form, isSubmitting } = useForm(DefinePasswordSchema);

  const onSubmitSuccess = async (data: DefinePassword) => {
    setFormData(data);
    await changePassword(data).then((response) => {
      if (response.data) {
        toast({
          title: successToast.title.value,
          description: successToast.description.value,
          variant: 'success',
        });
        setState({
          isPasswordDefined: true,
        });
      }
    });
    goNextStep();
  };

  useEffect(() => {
    // Reset the form to the initial state once loaded from the session storage
    form.reset(formData);
  }, [formData, form]);

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
