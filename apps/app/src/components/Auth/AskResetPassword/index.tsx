import { useAskResetPassword } from '@intlayer/design-system/hooks';
import { App_Auth_SignIn_Path } from '@intlayer/design-system/routes';
import { useSearch } from '@tanstack/react-router';
import { type FC, useRef } from 'react';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import {
  type AskResetPassword,
  AskResetPasswordForm as ResetPasswordFormUI,
} from './AskResetPasswordForm';

type AskResetPasswordFormProps = {
  email?: string;
  callbackUrl?: string;
};

export const AskResetPasswordForm: FC<AskResetPasswordFormProps> = ({
  email,
  callbackUrl = App_Auth_SignIn_Path,
}) => {
  const navigate = useLocalizedNavigate();
  const { mutate: askResetPassword } = useAskResetPassword();
  const search = useSearch({ strict: false }) as any;
  const emailFromParams = search.email;
  const emailInputRef = useRef<HTMLInputElement>(null);

  const onSubmitSuccess = ({ email }: AskResetPassword) => {
    askResetPassword({
      email,
      redirectTo: `${import.meta.env.VITE_SITE_URL}${callbackUrl}`,
    });
  };

  const getEmailContext = () => {
    const email = search.email;

    if (email) {
      return email;
    } else {
      const emailFromInput = emailInputRef.current;
      return emailFromInput?.value;
    }
  };

  const onClickBackToLogin = () => {
    const email = getEmailContext();

    if (email) {
      navigate({ to: `${callbackUrl}?email=${email}` as any });
    } else {
      navigate({ to: callbackUrl as any });
    }
  };

  return (
    <ResetPasswordFormUI
      onSubmitSuccess={onSubmitSuccess}
      email={email ?? emailFromParams ?? undefined}
      onClickBackToLogin={onClickBackToLogin}
      emailInputRef={emailInputRef}
    />
  );
};
