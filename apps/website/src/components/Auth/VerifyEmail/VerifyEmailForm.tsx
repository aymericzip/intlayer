'use client';

import { getIntlayerAPI } from '@intlayer/api';
import { Button, Form, H3, Loader, useForm } from '@intlayer/design-system';
import { useUser } from '@intlayer/design-system/hooks';
import { Check } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useState } from 'react';
import { getVerifyEmailSchema, type VerifyEmail } from './VerifyEmailSchema';

type VerifyEmailFormProps = {
  onSubmitSuccess: (data: VerifyEmail) => Promise<void>;
  onSubmitError?: (error: Error) => void;
  userId?: string;
};

export const VerifyEmailForm: FC<VerifyEmailFormProps> = ({
  userId,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const VerifyEmailSchema = getVerifyEmailSchema();
  const { revalidateSession, user } = useUser();
  const { verifyEmail, doneButton } = useIntlayer('verify-email-form');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { form } = useForm(VerifyEmailSchema, {});

  const targetedUserId = userId ?? user?.id;

  useEffect(() => {
    if (!targetedUserId) return;
    if (isEmailVerified) return;

    const verifyEmailStatusURL = getIntlayerAPI().user.getVerifyEmailStatusURL(
      String(targetedUserId)
    );

    // EventSource alow to receive server-sent events from the server
    // In this case, we are listening to the email verification status
    const eventSource = new EventSource(verifyEmailStatusURL);

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

    return () => eventSource.close(); // Clean up on component unmount
  }, [revalidateSession, targetedUserId, userId, user?.id, isEmailVerified]);

  return (
    <Form
      schema={VerifyEmailSchema}
      autoComplete
      {...form}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitError={onSubmitError}
    >
      <H3>{verifyEmail.title}</H3>
      <span className="text-neutral text-sm">{verifyEmail.description}</span>
      <Loader isLoading={!isEmailVerified}>
        <div className="bg-success/30 m-auto aspect-square rounded-full p-5">
          <Check className="text-success" size={50} />
        </div>
      </Loader>
      <Button
        disabled={!isEmailVerified}
        label={doneButton.text.value}
        type="submit"
        color="text"
      >
        {doneButton.text}
      </Button>
    </Form>
  );
};
