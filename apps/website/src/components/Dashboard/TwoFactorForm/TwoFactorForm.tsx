'use client';

import { Button, Container, H3, Loader } from '@intlayer/design-system';
import { useSession } from '@intlayer/design-system/hooks';
import { ShieldCheck, ShieldOff } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';

export const TwoFactorForm: FC = () => {
  const { session } = useSession();
  const { user } = session ?? {};
  const {
    title,
    description,
    enabledStatus,
    disabledStatus,
    enableButton,
    disableButton,
  } = useIntlayer('two-factor-form');

  // TODO: Replace with actual 2FA status from user data
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleTwoFactor = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call to enable/disable 2FA
      // await toggleTwoFactor(!isTwoFactorEnabled);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsTwoFactorEnabled(!isTwoFactorEnabled);
    } catch (error) {
      console.error('Failed to toggle 2FA:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return <Loader />;

  return (
    <Container
      roundedSize="xl"
      padding="md"
      className="flex size-full max-w-md justify-center"
    >
      <H3 className="mb-8">{title}</H3>

      <div className="flex w-full flex-col gap-6">
        <p className="text-neutral text-sm">{description}</p>

        <div className="flex items-center justify-between rounded-lg bg-neutral/5 p-4">
          <div className="flex items-center gap-3">
            {isTwoFactorEnabled ? (
              <ShieldCheck className="text-success" size={24} />
            ) : (
              <ShieldOff className="text-neutral" size={24} />
            )}
            <span className="font-medium text-sm">
              {isTwoFactorEnabled ? enabledStatus : disabledStatus}
            </span>
          </div>
          <div
            className={`rounded-full px-3 py-1 font-semibold text-xs ${
              isTwoFactorEnabled
                ? 'bg-success/20 text-success'
                : 'bg-neutral/20 text-neutral'
            }`}
          >
            {isTwoFactorEnabled ? 'Active' : 'Inactive'}
          </div>
        </div>

        <Button
          className="mt-6 w-full"
          type="button"
          color={isTwoFactorEnabled ? 'error' : 'text'}
          variant={isTwoFactorEnabled ? 'outline' : 'solid'}
          isLoading={isLoading}
          onClick={handleToggleTwoFactor}
          Icon={isTwoFactorEnabled ? ShieldOff : ShieldCheck}
          label={
            isTwoFactorEnabled
              ? disableButton.ariaLabel.value
              : enableButton.ariaLabel.value
          }
        >
          {isTwoFactorEnabled ? disableButton.text : enableButton.text}
        </Button>
      </div>
    </Container>
  );
};
