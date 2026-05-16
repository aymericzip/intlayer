import { getIntlayerAPI } from '@intlayer/api';
import { Button } from '@intlayer/design-system/button';
import { Form, useForm } from '@intlayer/design-system/form';
import { H3 } from '@intlayer/design-system/headers';
import { useUser } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { useRouter } from '@tanstack/react-router';
import { Check, RefreshCw } from 'lucide-react';
import { type FC, useCallback, useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { getVerifyEmailSchema, type VerifyEmail } from './VerifyEmailSchema';

type VerifyEmailFormProps = {
  onSubmitSuccess: (data: VerifyEmail) => Promise<void>;
  onSubmitError?: (error: Error) => void;
  onCancel?: () => void;
  userId?: string;
};

export const VerifyEmailForm: FC<VerifyEmailFormProps> = ({
  userId,
  onSubmitSuccess,
  onSubmitError,
  onCancel,
}) => {
  const VerifyEmailSchema = getVerifyEmailSchema();
  const router = useRouter();
  const { revalidateSession, user, logout } = useUser();
  const { verifyEmail, doneButton, refreshButton, cancelButton } =
    useIntlayer('verify-email-form');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { form } = useForm(VerifyEmailSchema, {});

  const targetedUserId = userId ?? user?.id;

  const handleVerified = useCallback(async () => {
    setIsEmailVerified(true);
    await revalidateSession();
    await router.invalidate();
  }, [revalidateSession, router]);

  useEffect(() => {
    if (!targetedUserId) return;
    if (isEmailVerified) return;

    const verifyEmailStatusURL = getIntlayerAPI().user.getVerifyEmailStatusURL(
      String(targetedUserId)
    );

    const eventSource = new EventSource(verifyEmailStatusURL);

    eventSource.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.status === 'verified') {
        await handleVerified();
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => eventSource.close();
  }, [handleVerified, targetedUserId, isEmailVerified]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const session = await revalidateSession();
      if (session?.user?.emailVerified) {
        await handleVerified();
      }
    } finally {
      setIsRefreshing(false);
    }
  };

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
        <div className="m-auto aspect-square rounded-full bg-success/30 p-5">
          <Check className="text-success" size={50} />
        </div>
      </Loader>
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-row gap-2">
          <Button
            label={cancelButton.ariaLabel.value}
            type="button"
            variant="outline"
            color="text"
            className="w-full"
            onClick={async () => {
              await logout();
              onCancel?.();
            }}
          >
            {cancelButton.text}
          </Button>
          {!isEmailVerified && (
            <Button
              label={refreshButton.ariaLabel.value}
              type="button"
              variant="outline"
              className="w-full"
              color="text"
              Icon={RefreshCw}
              isLoading={isRefreshing}
              onClick={handleRefresh}
            >
              {refreshButton.text}
            </Button>
          )}
        </div>

        <Button
          disabled={!isEmailVerified}
          label={doneButton.text.value}
          type="submit"
          color="text"
          Icon={Check}
        >
          {doneButton.text}
        </Button>
      </div>
    </Form>
  );
};
