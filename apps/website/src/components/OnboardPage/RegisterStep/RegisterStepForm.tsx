'use client';

import { PagesRoutes } from '@/Routes';
import {
  ExternalsLoginButtons,
  Form,
  H2,
  useForm,
  useUser,
} from '@intlayer/design-system';
import { useRegister } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import { type FC } from 'react';
import { StepLayout } from '../StepLayout';
import { Steps } from '../steps';
import { useStep } from '../useStep';
import { useRegisterSchema, type Register } from './useRegisterSchema';

export const RegisterStepForm: FC = () => {
  const { user } = useUser();
  const { emailInput, loginLink, title } = useIntlayer('register-step');
  const RegisterSchema = useRegisterSchema();
  const {
    goNextStep,
    goPreviousStep,
    setState,
    setFormData,
    formData,
    nextUrl,
  } = useStep(Steps.Registration);
  const { goNextStep: goToNextStep2 } = useStep(Steps.Password);

  const defaultValues = { ...formData, email: user?.email ?? formData?.email };

  const { form, isSubmitting } = useForm(RegisterSchema, {
    defaultValues,
  });
  const router = useRouter();

  const { register, isLoading } = useRegister();

  const onClickToSignIn = () =>
    router.push(
      `${PagesRoutes.Auth_SignIn}?redirect_url=${encodeURIComponent(window.location.href)}`
    );

  const onSubmitSuccess = async (data: Register) => {
    setFormData(data);

    await register({
      email: data.email,
      callbackURL: `${window.location.origin}${nextUrl}`,
    }).then((response) => {
      if (response?.data?.user) {
        setState({
          user: response.data.user,
        });

        goNextStep();
      }
    });
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
        isLoading={isLoading || isSubmitting}
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

        <span className="text-neutral m-auto mt-3 flex w-full items-center justify-center text-center align-middle text-xs">
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
