'use client';

import {
  ChangePasswordForm as ChangePasswordFormUI,
  type ChangePassword,
  useUser,
  useToast,
} from '@intlayer/design-system';
import { useChangePassword } from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

type ChangePasswordFormProps = {
  callbackUrl?: string;
};

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  callbackUrl = PagesRoutes.Home,
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const { changePassword } = useChangePassword();

  const onSubmitSuccess = async ({
    currentPassword,
    newPassword,
  }: ChangePassword) => {
    const response = await changePassword({
      oldPassword: currentPassword,
      newPassword,
    });

    if (response.error) {
      toast({
        title: [response.error].flatMap((error) => error).join(', '),
        variant: 'error',
      });

      return;
    }

    if (response.data ?? callbackUrl) {
      router.push(callbackUrl);
    }
  };

  const onSubmitError = (error: Error) => {
    toast({
      title: error.message,
      variant: 'error',
    });
  };

  const onClickBackToHome = () => router.push(callbackUrl);

  if (!user) return null;

  return (
    <ChangePasswordFormUI
      onSubmitSuccess={onSubmitSuccess}
      onSubmitError={onSubmitError}
      onClickBackToHome={onClickBackToHome}
    />
  );
};
