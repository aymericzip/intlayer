'use client';

import {
  ChangePasswordForm as ChangePasswordFormUI,
  type ChangePassword,
  useUser,
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

    if (response.data ?? callbackUrl) {
      router.push(callbackUrl);
    }
  };

  const onClickBackToHome = () => router.push(callbackUrl);

  if (!user) return null;

  return (
    <ChangePasswordFormUI
      onSubmitSuccess={onSubmitSuccess}
      onClickBackToHome={onClickBackToHome}
    />
  );
};
