'use client';

import { useEffect, type FC } from 'react';
import { getRegisterSchema, type Register } from './RegisterSchema';
import {
  useForm,
  Form,
  ExternalsLoginButtons,
  H2,
} from '@intlayer/design-system';
import { useRegister } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import { PagesRoutes } from '@/Routes';
import { StepLayout } from '../StepLayout';
import { useStep } from '../useStep';

export const RegisterStepForm: FC = () => {
  const { emailInput, loginLink, title } = useIntlayer('register-step');
  const RegisterSchema = getRegisterSchema();
  const { next, goNextStep, goPreviousStep, setState, setFormData, formData } =
    useStep(PagesRoutes.Onboarding_Registration);
  const { form, isSubmitting } = useForm(RegisterSchema, {
    defaultValues: formData,
  });
  const router = useRouter();

  const { register, isLoading } = useRegister();

  const onClickToSignIn = () =>
    router.push(
      `${PagesRoutes.Auth_SignIn}?redirect_url=${encodeURIComponent(window.location.href)}`
    );

  const onSubmitSuccess = async (data: Register) => {
    setFormData(data);

    await register(data, {
      callBack_url: `${window.location.origin}${next}`,
    }).then((response) => {
      if (response.data) {
        setState({
          user: response.data,
        });
        goNextStep();
      }
    });
  };

  useEffect(() => {
    // Reset the form to the initial state once loaded from the session storage
    form.reset(formData);
  }, [formData, form]);

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

        <span className="text-neutral dark:text-neutral-dark m-auto mt-3 flex w-full items-center justify-center text-center align-middle text-xs">
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

        <ExternalsLoginButtons />
      </StepLayout>
    </Form>
  );
};
