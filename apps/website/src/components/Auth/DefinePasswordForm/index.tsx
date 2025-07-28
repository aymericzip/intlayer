'use client';

import { PagesRoutes } from '@/Routes';
import { Button, useToast } from '@intlayer/design-system';
import { useDefineNewPassword, useUser } from '@intlayer/design-system/hooks';
import { Check } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useRouter, useSearchParams } from 'next/navigation';
import type { FC } from 'react';
import { ChangePassword } from '../ChangePasswordForm/ChangePasswordForm';

type DefinePasswordFormProps = {
  callbackUrl?: string;
};

export const DefinePasswordForm: FC<DefinePasswordFormProps> = ({
  callbackUrl = PagesRoutes.Home,
}) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const { defineNewPassword, isSuccess } = useDefineNewPassword();
  const { goToLoginButton } = useIntlayer('define-password-form');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmitSuccess = async ({
    currentPassword,
    newPassword,
  }: ChangePassword) => {
    if (!token) {
      toast({
        title: 'Error',
        description: 'Token is required',
        variant: 'error',
      });
      return;
    }

    await defineNewPassword({
      newPassword,
      token: token,
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
