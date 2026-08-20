import { useSession, useSignInPasskey } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Key } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

type PassKeyButtonProps = {
  callbackUrl?: string;
};

export const PasskeyButton: FC<PassKeyButtonProps> = ({ callbackUrl }) => {
  const { revalidateSession } = useSession();
  const { mutate: signInPasskey, isPending } = useSignInPasskey();
  const { text, ariaLabel } = useIntlayer('passkey-button');

  const handleSignIn = () => {
    signInPasskey(
      { autoFill: false },
      {
        onSuccess: () => {
          revalidateSession();
          if (callbackUrl) {
            window.location.href = new URL(
              callbackUrl,
              window.location.origin
            ).toString();
          }
        },
      }
    );
  };

  return (
    <Button
      variant="outline"
      color="text"
      className="w-full"
      Icon={Key}
      label={ariaLabel.value}
      onClick={handleSignIn}
      isLoading={isPending}
    >
      {text}
    </Button>
  );
};
