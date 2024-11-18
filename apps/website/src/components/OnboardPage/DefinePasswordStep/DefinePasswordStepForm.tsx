import { Form, H2, toast, useForm } from '@intlayer/design-system';
import { useEffect, type FC } from 'react';
import { StepLayout } from '../StepLayout';
import {
  getDefinePasswordSchema,
  DefinePassword,
} from './DefinePasswordSchema';
import { useStep } from '../useStep';
import { PagesRoutes } from '@/Routes';
import { useIntlayer } from 'next-intlayer';
import { useChangePassword } from '@intlayer/design-system/hooks';

export const DefinePasswordStepForm: FC = () => {
  const DefinePasswordSchema = getDefinePasswordSchema();
  const { form, isSubmitting } = useForm(DefinePasswordSchema);
  const { title, newPasswordInput, confirmPasswordInput } = useIntlayer(
    'define-password-step'
  );
  const { formData, goNextStep, goPreviousStep, setState, setFormData } =
    useStep(PagesRoutes.Onboarding_Password);
  const { changePassword, isLoading } = useChangePassword();

  const onSubmitSuccess = async (data: DefinePassword) => {
    setFormData(data);
    setState({
      isPasswordDefined: true,
    });
    await changePassword(data).then(async (response) => {
      if (response.data) {
        toast({
          title: 'Password defined successfully',
          description: 'You can now sign using this password.',
          variant: 'success',
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
        onGoToPreviousStep={goPreviousStep}
        isLoading={isLoading || isSubmitting}
      >
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
