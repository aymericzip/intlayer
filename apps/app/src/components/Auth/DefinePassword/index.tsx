import { Button } from '@intlayer/design-system/button';
import { useResetPassword } from '@intlayer/design-system/hooks';
import { App_Home_Path } from '@intlayer/design-system/routes';
import { useToast } from '@intlayer/design-system/toaster';
import { useSearch } from '@tanstack/react-router';
import { Check } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { DefinePasswordForm as DefinePasswordFormUI } from './DefinePasswordForm';
import type { DefinePassword } from './DefinePasswordForm/useDefinePasswordSchema';

type DefinePasswordFormProps = {
  callbackUrl?: string;
};

export const DefinePasswordForm: FC<DefinePasswordFormProps> = ({
  callbackUrl = App_Home_Path,
}) => {
  const navigate = useLocalizedNavigate();
  const { toast } = useToast();
  const { mutate: resetPassword, isSuccess } = useResetPassword();
  const { goToLoginButton } = useIntlayer('define-password-form');
  const search = useSearch({ strict: false }) as any;
  const token = search.token;

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
          onClick={() => navigate({ to: callbackUrl as any })}
          isFullWidth
        >
          {goToLoginButton.text}
        </Button>
      </>
    );
  }

  return <DefinePasswordFormUI onSubmitSuccess={onSubmitSuccess} />;
};
