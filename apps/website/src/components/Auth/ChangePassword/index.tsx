'use client';

import { PagesRoutes } from '@/Routes';
import { Button } from '@intlayer/design-system';
import { useChangePassword, useUser } from '@intlayer/design-system/hooks';
import { Check } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import {
  ChangePasswordForm as ChangePasswordFormUI,
  type ChangePassword,
} from './ChangePasswordForm';

type ChangePasswordFormProps = {
  callbackUrl?: string;
};

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  callbackUrl = PagesRoutes.Home,
}) => {
  const router = useRouter();
  const { user } = useUser();
  const { changePassword, isSuccess } = useChangePassword();
  const { goToLoginButton } = useIntlayer('change-password-form');

  const onSubmitSuccess = async ({
    currentPassword,
    newPassword,
  }: ChangePassword) => {
    await changePassword({
      currentPassword,
      newPassword,
    });
  };

  if (!user) return null;

  if (isSuccess) {
    return (
      <>
        <div className="bg-success/30 m-auto aspect-square rounded-full p-5">
          <Check className="text-success" size={50} />
        </div>
        <Button
          label={goToLoginButton.text.value}
          color="text"
          Icon={Check}
          onClick={() => router.push(callbackUrl)}
          isFullWidth
        >
          {goToLoginButton.text}
        </Button>
      </>
    );
  }

  return <ChangePasswordFormUI onSubmitSuccess={onSubmitSuccess} />;
};
