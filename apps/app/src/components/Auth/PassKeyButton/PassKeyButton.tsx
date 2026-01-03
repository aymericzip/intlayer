'use client';

import { Button } from '@intlayer/design-system';
import { useSession, useSignInPasskey } from '@intlayer/design-system/hooks';
import { Key } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

export const PasskeyButton: FC = () => {
  const { revalidateSession } = useSession();
  const { mutate: signInPasskey, isPending } = useSignInPasskey();
  const { text, ariaLabel } = useIntlayer('passkey-button');

  // useEffect(() => {
  //   // Check if the browser supports WebAuthn and Conditional UI
  //   signInPasskey(
  //     { autoFill: true },
  //     {
  //       onSuccess: () => revalidateSession(),
  //       onError: () => {
  //         // No need to handle errors
  //       },
  //     }
  //   );
  // }, []);

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
