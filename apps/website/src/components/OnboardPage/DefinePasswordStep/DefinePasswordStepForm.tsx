import { Form, H2, useForm } from '@intlayer/design-system';
import { useRegister, useUser } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { StepLayout } from '../StepLayout';
import { Steps } from '../steps';
import { useStep } from '../useStep';
import {
  type DefinePassword,
  useDefinePasswordSchema,
} from './useDefinePasswordSchema';

export const DefinePasswordStepForm: FC = () => {
  const { title, newPasswordInput, confirmPasswordInput } = useIntlayer(
    'define-password-step'
  );
  const { user } = useUser();
  const { goNextStep, goPreviousStep, setState, nextUrl } = useStep(
    Steps.Password
  );
  const { formData: registrationFormData } = useStep(Steps.Registration);
  const { mutate: register, isPending } = useRegister();

  const DefinePasswordSchema = useDefinePasswordSchema();
  const { form, isSubmitting } = useForm(DefinePasswordSchema);

  const onSubmitSuccess = async (data: DefinePassword) => {
    if (!registrationFormData) {
      return goPreviousStep();
    }

    register(
      {
        email: registrationFormData.email,
        name: registrationFormData.email.split('@')[0],
        password: data.newPassword,
        callbackURL: `${window.location.origin}${nextUrl}`,
      },
      {
        onSuccess: (response) => {
          if (response?.data?.user) {
            setState({
              user: response.data.user,
            });

            goNextStep();
          } else {
            goPreviousStep();
          }
        },
      }
    );
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
        isLoading={isPending || isSubmitting}
        onGoToPreviousStep={goPreviousStep}
        onSkipStep={goNextStep}
        isSkippable={false}
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
