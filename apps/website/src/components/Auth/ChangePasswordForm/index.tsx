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
  // const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const { changePassword } = useChangePassword();

  const onSubmitSuccess = async ({
    currentPassword,
    newPassword,
  }: ChangePassword) => {
    const result = await changePassword({
      oldPassword: currentPassword,
      newPassword,
    });

    if (!result.success) {
      return router.push(callbackUrl);
    }
  };

  const onSubmitError = (_error: Error) => {
    // toast({
    //   title: error.message,
    //   variant: 'default',
    // });
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
