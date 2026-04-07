'use client';

import { Button } from '@intlayer/design-system/button';
import { useChangePassword, useUser } from '@intlayer/design-system/hooks';
import { App_Home_Path } from '@intlayer/design-system/routes';
import { useNavigate } from '@tanstack/react-router';
import { Check } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ChangePasswordForm as ChangePasswordFormUI } from './ChangePasswordForm';

type ChangePasswordFormProps = {
  callbackUrl?: string;
};

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  callbackUrl = App_Home_Path,
}) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { mutate: changePassword, isSuccess } = useChangePassword();
  const { goToLoginButton } = useIntlayer('change-password-form');

  if (!user) return null;

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
          onClick={() => navigate({ to: callbackUrl as any })}
          isFullWidth
        >
          {goToLoginButton.text}
        </Button>
      </>
    );
  }

  return <ChangePasswordFormUI onSubmitSuccess={changePassword} />;
};
