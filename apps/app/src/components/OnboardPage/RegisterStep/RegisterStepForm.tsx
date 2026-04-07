'use client';

import { Form, useForm } from '@intlayer/design-system/form';
import { H2 } from '@intlayer/design-system/headers';
import { useUser } from '@intlayer/design-system/hooks';
import { App_Auth_SignIn_Path } from '@intlayer/design-system/routes';
import { useNavigate } from '@tanstack/react-router';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ExternalsLoginButtons } from '#components/Auth/ExternalsLoginButtons';
import { StepLayout } from '../StepLayout';
import { Steps } from '../steps';
import { useStep } from '../useStep';
import { type Register, useRegisterSchema } from './useRegisterSchema';

export const RegisterStepForm: FC = () => {
  const { user } = useUser();
  const { emailInput, loginLink, title } = useIntlayer('register-step');
  const RegisterSchema = useRegisterSchema();
  const { goNextStep, goPreviousStep, setFormData, formData, setState } =
    useStep(Steps.Registration);
  const { goNextStep: goToNextStep2 } = useStep(Steps.Password);

  const defaultValues = { ...formData, email: user?.email ?? formData?.email };

  const { form, isSubmitting } = useForm(RegisterSchema, {
    defaultValues,
  });
  const navigate = useNavigate();

  const onClickToSignIn = () =>
    navigate({
      to: App_Auth_SignIn_Path as any,
      search: {
        redirect_url: window.location.href,
      } as any,
    });

  const onSubmitSuccess = (data: Register) => {
    setState(data);
    setFormData(data);
    goNextStep();
  };

  return (
    <Form
      schema={RegisterSchema}
      onSubmitSuccess={onSubmitSuccess}
      autoComplete
      {...form}
    >
      <StepLayout
        onGoToPreviousStep={goPreviousStep}
        isLoading={isSubmitting}
        isSkippable={Boolean(user?.email)}
        onSkipStep={goNextStep}
      >
        <H2>{title}</H2>
        <div className="flex flex-col gap-y-6">
          <Form.Input
            name="email"
            label={emailInput.label}
            placeholder={emailInput.placeholder.value}
            isRequired
            autoComplete="email"
            minLength={5}
            maxLength={50}
          />
        </div>

        <span className="m-auto mt-3 flex w-full items-center justify-center text-center align-middle text-neutral text-xs">
          {loginLink.message}
          <Form.Button
            variant="link"
            label={loginLink.ariaLabel.value}
            color="text"
            onClick={onClickToSignIn}
          >
            {loginLink.text}
          </Form.Button>
        </span>

        <ExternalsLoginButtons onLogin={goToNextStep2} />
      </StepLayout>
    </Form>
  );
};
