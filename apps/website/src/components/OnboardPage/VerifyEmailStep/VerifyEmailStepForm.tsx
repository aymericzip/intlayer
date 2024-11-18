import {
  Form,
  H2,
  Loader,
  useForm,
  useToast,
  useUser,
} from '@intlayer/design-system';
import { useEffect, useState, type FC } from 'react';
import { StepLayout } from '../StepLayout';
import { getVerifyEmailSchema, VerifyEmail } from './VerifyEmailSchema';
import { useStep } from '../useStep';
import { PagesRoutes } from '@/Routes';
import { useIntlayer } from 'next-intlayer';
import { intlayerAPI } from '@intlayer/design-system/libs';
import { Check } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export const VerifyEmailStepForm: FC = () => {
  const VerifyEmailSchema = getVerifyEmailSchema();
  const { form, isSubmitting } = useForm(VerifyEmailSchema);
  const { state: registrationState } = useStep(
    PagesRoutes.Onboarding_Registration
  );
  const { revalidateSession } = useUser();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { verifyEmail } = useIntlayer('verify-email-step');
  const userId = useSearchParams().get('userId') as string | undefined;
  const { toast } = useToast();
  const { formData, goNextStep, goPreviousStep, setState, setFormData } =
    useStep(PagesRoutes.Onboarding_VerifyEmail);

  const onSubmitSuccess = async (data: VerifyEmail) => {
    setState({
      isEmailVerified: true,
    });
    setFormData(data);
    goNextStep();
  };

  useEffect(() => {
    // Reset the form to the initial state once loaded from the session storage
    form.reset(formData);
  }, [formData, form]);

  useEffect(() => {
    if (!(registrationState?.user?._id ?? userId)) return;

    // EventSource alow to receive server-sent events from the server
    // In this case, we are listening to the email verification status
    const eventSource = new EventSource(
      intlayerAPI.auth.getVerifyEmailStatusURL(
        (registrationState?.user?._id ?? userId)!
      )
    );

    eventSource.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.status === 'verified') {
        // Update your UI to reflect the verification
        toast({
          variant: 'success',
          title: 'Email verified!',
        });
        await revalidateSession();
        setIsEmailVerified(true);
        eventSource.close(); // Close the connection if no longer needed
      }
    };

    eventSource.onerror = (event) => {
      console.error(event);
      // Handle errors or reconnection logic
      eventSource.close();
    };

    return () => eventSource.close(); // Clean up on component unmount
  }, [registrationState?.user?._id, userId, revalidateSession, toast]);

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
        <span className="text-neutral dark:text-neutral text-sm">
          {verifyEmail.description}
        </span>
        <Loader isLoading={!isEmailVerified}>
          <div className="bg-success/30 dark:bg-success-dark/30 m-auto aspect-square rounded-full p-5">
            <Check className="text-success dark:text-success-dark" size={50} />
          </div>
        </Loader>
      </StepLayout>
    </Form>
  );
};
