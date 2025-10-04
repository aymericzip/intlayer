import { getUserAPI } from '@intlayer/api';
import { Form, H2, Loader, useForm } from '@intlayer/design-system';
import { useUser } from '@intlayer/design-system/hooks';
import { Check } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useState } from 'react';
import { StepLayout } from '../StepLayout';
import { Steps } from '../steps';
import { useStep } from '../useStep';
import { getVerifyEmailSchema, type VerifyEmail } from './VerifyEmailSchema';

export const VerifyEmailStepForm: FC = () => {
  const VerifyEmailSchema = getVerifyEmailSchema();
  const { revalidateSession, user } = useUser();
  const { verifyEmail } = useIntlayer('verify-email-step');
  const userId = useSearchParams().get('userId') as string | undefined;
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { state: registrationState } = useStep(Steps.Password);
  const { formData, goNextStep, goPreviousStep, setState, setFormData } =
    useStep(Steps.VerifyEmail);
  const { form, isSubmitting } = useForm(VerifyEmailSchema, {
    defaultValues: formData,
  });

  const targetedUserId = userId ?? registrationState?.user?.id ?? user?.id;

  const onSubmitSuccess = async (data: VerifyEmail) => {
    setState({
      isEmailVerified: true,
    });
    setFormData(data);
    goNextStep();
  };

  useEffect(() => {
    if (!targetedUserId) return;
    if (isEmailVerified) return;

    // EventSource alow to receive server-sent events from the server
    // In this case, we are listening to the email verification status
    const eventSource = new EventSource(
      getUserAPI().getVerifyEmailStatusURL(targetedUserId!)
    );

    eventSource.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.status === 'verified') {
        // Update your UI to reflect the verification

        setIsEmailVerified(true);

        await revalidateSession();

        eventSource.close(); // Close the connection if no longer needed
      }
    };

    eventSource.onerror = (event) => {
      console.error(event);
      // Handle errors or reconnection logic
      eventSource.close();
    };

    return eventSource.close; // Clean up on component unmount
  }, [
    registrationState?.user?.id,
    revalidateSession,
    targetedUserId,
    userId,
    user?.id,
    isEmailVerified,
  ]);

  return (
    <Form
      schema={VerifyEmailSchema}
      autoComplete
      {...form}
      onSubmitSuccess={onSubmitSuccess}
    >
      <StepLayout
        onGoToPreviousStep={goPreviousStep}
        isLoading={isSubmitting}
        disabled={!isEmailVerified}
      >
        <H2>{verifyEmail.title}</H2>
        <span className="text-neutral text-sm">{verifyEmail.description}</span>
        <Loader isLoading={!isEmailVerified}>
          <div className="bg-success/30 m-auto aspect-square rounded-full p-5">
            <Check className="text-success" size={50} />
          </div>
        </Loader>
      </StepLayout>
    </Form>
  );
};
