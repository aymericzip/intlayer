'use client';

import { PagesRoutes } from '@/Routes';
import { Button, useToast } from '@intlayer/design-system';
import { useResetPassword } from '@intlayer/design-system/hooks';
import { Check } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useRouter, useSearchParams } from 'next/navigation';
import type { FC } from 'react';
import { DefinePasswordForm as DefinePasswordFormUI } from './DefinePasswordForm';
import { type DefinePassword } from './DefinePasswordForm/useDefinePasswordSchema';

type DefinePasswordFormProps = {
  callbackUrl?: string;
};

export const DefinePasswordForm: FC<DefinePasswordFormProps> = ({
  callbackUrl = PagesRoutes.Home,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const { resetPassword, isSuccess } = useResetPassword();
  const { goToLoginButton } = useIntlayer('define-password-form');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmitSuccess = async ({ newPassword }: DefinePassword) => {
    if (!token) {
      toast({
        title: 'Error',
        description: 'Token is required',
        variant: 'error',
      });
      return;
    }

    await resetPassword({
      newPassword,
      token: token,
    });
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

  return <DefinePasswordFormUI onSubmitSuccess={onSubmitSuccess} />;
};
