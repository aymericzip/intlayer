'use client';

import { Button } from '@intlayer/design-system';
import { useSession, useSignInPasskey } from '@intlayer/design-system/hooks';
import { Key } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect } from 'react';

export const PasskeyButton: FC = () => {
  const { revalidateSession } = useSession();
  const { mutate: signInPasskey, isPending } = useSignInPasskey();
  const { text, ariaLabel } = useIntlayer('passkey-button');

  useEffect(() => {
    const timeout = setTimeout(() => {
      signInPasskey(
        { autoFill: true },
        {
          onSuccess: () => revalidateSession(),
        }
      );
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const handleSignIn = () => {
    signInPasskey(
      { autoFill: false },
      {
        onSuccess: () => revalidateSession(),
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
