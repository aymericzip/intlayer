import { Form, H2, useForm } from '@intlayer/design-system';
import { useEffect, type FC } from 'react';
import { StepLayout } from '../StepLayout';
import { getPaymentSchema, Payment } from './PaymentSchema';
import { useStep } from '../useStep';
import { PagesRoutes } from '@/Routes';
import { useIntlayer } from 'next-intlayer';

export const PaymentStepForm: FC = () => {
  const PaymentSchema = getPaymentSchema();
  const { goNextStep, goPreviousStep, formData, setState, setFormData } =
    useStep(PagesRoutes.Onboarding_Payment);
  const { title } = useIntlayer('payment-step');
  const { form, isSubmitting } = useForm(PaymentSchema, {
    defaultValues: formData,
  });

  const onSubmitSuccess = async (data: Payment) => {
    setFormData(data);
    setState({
      isPaymentSuccessful: true,
    });
    goNextStep();
  };

  useEffect(() => {
    // Reset the form to the initial state once loaded from the session storage
    form.reset(formData);
  }, [formData, form]);

  return (
    <Form
      schema={PaymentSchema}
      onSubmitSuccess={onSubmitSuccess}
      autoComplete
      {...form}
    >
      <StepLayout onGoToPreviousStep={goPreviousStep} isLoading={isSubmitting}>
        <H2>{title}</H2>
      </StepLayout>
    </Form>
  );
};
