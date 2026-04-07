'use client';

import { Button } from '@intlayer/design-system/button';
import { useResetPassword } from '@intlayer/design-system/hooks';
import { App_Home_Path } from '@intlayer/design-system/routes';
import { useToast } from '@intlayer/design-system/toaster';
import { Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { DefinePasswordForm as DefinePasswordFormUI } from './DefinePasswordForm';
import type { DefinePassword } from './DefinePasswordForm/useDefinePasswordSchema';

type DefinePasswordFormProps = {
  callbackUrl?: string;
};

export const DefinePasswordForm: FC<DefinePasswordFormProps> = ({
  callbackUrl = App_Home_Path,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: resetPassword, isSuccess } = useResetPassword();
  const { goToLoginButton } = useIntlayer('define-password-form');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmitSuccess = ({ newPassword }: DefinePassword) => {
    if (!token) {
      toast({
        title: 'Error',
        description: 'Token is required',
        variant: 'error',
      });
      return;
    }

    resetPassword({
      newPassword,
      token: token,
    });
  };

  if (isSuccess) {
    return (
      <>
        <div className="m-auto aspect-square rounded-full bg-success/30 p-5">
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
