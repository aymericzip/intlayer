'use client';

import { PagesRoutes } from '@/Routes';
import { Button } from '@intlayer/design-system';
import { useDefineNewPassword } from '@intlayer/design-system/hooks';
import { Check } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import {
  DefineNewPasswordForm as DefineNewPasswordFormUI,
  type DefineNewPassword,
} from './DefineNewPasswordForm';

type ForgotPasswordFormProps = {
  userId: string;
  secret: string;
  callbackUrl?: string;
};

export const DefineNewPasswordForm: FC<ForgotPasswordFormProps> = ({
  userId,
  secret,
  callbackUrl = PagesRoutes.Auth_SignIn,
}) => {
  const router = useRouter();
  const { goToLoginButton } = useIntlayer('define-new-password-form');

  const { defineNewPassword, isSuccess } = useDefineNewPassword();

  const onSubmitSuccess = async ({
    newPassword,
    newPasswordConfirmation,
  }: DefineNewPassword) => {
    if (newPassword === newPasswordConfirmation) {
      await defineNewPassword({
        userId,
        secret,
        password: newPassword,
      });
    }
  };

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

  return <DefineNewPasswordFormUI onSubmitSuccess={onSubmitSuccess} />;
};
