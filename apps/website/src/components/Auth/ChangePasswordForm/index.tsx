'use client';

import {
  ChangePasswordForm as ChangePasswordFormUI,
  type ChangePassword,
  useUser,
  Button,
} from '@intlayer/design-system';
import { useChangePassword } from '@intlayer/design-system/hooks';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

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
      oldPassword: currentPassword,
      newPassword,
    });
  };

  if (!user) return null;

  if (isSuccess) {
    return (
      <>
        <div className="bg-success/30 dark:bg-success-dark/30 m-auto aspect-square rounded-full p-5">
          <Check className="text-success dark:text-success-dark" size={50} />
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
