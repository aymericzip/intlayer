'use client';

import { getIntlayerAPI } from '@intlayer/api';
import { Check } from 'lucide-react';
import { useEffect, useMemo, useState, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { Button } from '../../Button';
import { Form, useForm } from '../../Form';
import { H3 } from '../../Headers';
import { Loader } from '../../Loader';
import { useUser } from '../useUser';
import content from './index.content';
import { type VerifyEmail, getVerifyEmailSchema } from './VerifyEmailSchema';

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
  const { verifyEmail, doneButton } = useDictionary(content);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { form } = useForm(VerifyEmailSchema, {});

  const targetedUserId = useMemo(
    () => userId ?? user?._id,
    [userId, user?._id]
  );

  useEffect(() => {
    if (!targetedUserId) return;
    if (isEmailVerified) return;

    // EventSource alow to receive server-sent events from the server
    // In this case, we are listening to the email verification status
    const eventSource = new EventSource(
      getIntlayerAPI().auth.getVerifyEmailStatusURL(targetedUserId!)
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

    return () => eventSource.close(); // Clean up on component unmount
  }, [revalidateSession, targetedUserId, userId, user?._id, isEmailVerified]);

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
