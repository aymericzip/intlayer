import {
  Form,
  H2,
  Loader,
  useForm,
  useToast,
  useUser,
} from '@intlayer/design-system';
import { useEffect, useMemo, type FC } from 'react';
import { StepLayout } from '../StepLayout';
import { getVerifyEmailSchema, VerifyEmail } from './VerifyEmailSchema';
import { useStep } from '../useStep';
import { useIntlayer } from 'next-intlayer';
import { intlayerAPI } from '@intlayer/design-system/libs';
import { Check } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Steps } from '../steps';

export const VerifyEmailStepForm: FC = () => {
  const VerifyEmailSchema = getVerifyEmailSchema();
  const { form, isSubmitting } = useForm(VerifyEmailSchema);
  const { revalidateSession } = useUser();
  const { verifyEmail, successToast } = useIntlayer('verify-email-step');
  const userId = useSearchParams().get('userId') as string | undefined;
  const { toast } = useToast();
  const { user } = useUser();
  const { state: registrationState, formData: registrationFormData } = useStep(
    Steps.Registration
  );
  const { formData, goNextStep, goPreviousStep, setState, setFormData } =
    useStep(Steps.VerifyEmail);

  const targetedUserId = useMemo(
    () => userId ?? registrationState?.user?._id,
    [userId, registrationState?.user?._id]
  );
  const targetedUserEmail = useMemo(
    () => registrationFormData?.email,
    [registrationFormData?.email]
  );
  const isTargetedUserAuthenticated = useMemo(
    () =>
      String(user?._id) === String(targetedUserId) ||
      targetedUserEmail === user?.email,
    [user?._id, targetedUserEmail, user?.email]
  );

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
    if (!(targetedUserId || targetedUserEmail)) return;
    if (isTargetedUserAuthenticated) return; // User is already verified

    // EventSource alow to receive server-sent events from the server
    // In this case, we are listening to the email verification status
    const eventSource = new EventSource(
      intlayerAPI.auth.getVerifyEmailStatusURL(
        (registrationState?.user?._id ?? userId ?? user?._id)!
      )
    );

    eventSource.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.status === 'verified') {
        // Update your UI to reflect the verification
        toast({
          variant: 'success',
          title: successToast.title.value,
          description: successToast.description.value,
        });

        await revalidateSession();

        eventSource.close(); // Close the connection if no longer needed
      }
    };

    eventSource.onerror = (event) => {
      console.error(event);
      // Handle errors or reconnection logic
      eventSource.close();
    };

    return () => eventSource.close(); // Clean up on component unmount
  }, [
    registrationState?.user?._id,
    targetedUserEmail,
    userId,
    user?._id,
    revalidateSession,
    toast,
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
        disabled={!isTargetedUserAuthenticated}
      >
        <H2>{verifyEmail.title}</H2>
        <span className="text-neutral dark:text-neutral text-sm">
          {verifyEmail.description}
        </span>
        <Loader isLoading={!isTargetedUserAuthenticated}>
          <div className="bg-success/30 dark:bg-success-dark/30 m-auto aspect-square rounded-full p-5">
            <Check className="text-success dark:text-success-dark" size={50} />
          </div>
        </Loader>
      </StepLayout>
    </Form>
  );
};
