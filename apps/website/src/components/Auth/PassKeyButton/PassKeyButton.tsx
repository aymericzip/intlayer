'use client';

import { Button } from '@intlayer/design-system';
import { useSession, useSignInPasskey } from '@intlayer/design-system/hooks';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { Key } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect } from 'react';

export const PasskeyButton: FC = () => {
  const router = useRouter();
  const { revalidateSession } = useSession();
  const authClient = getAuthAPI().getAuthClient();
  const { mutate: signInPasskey } = useSignInPasskey();
  const { text, ariaLabel } = useIntlayer('passkey-button');

  useEffect(() => {
    authClient.signIn.passkey(
      { autoFill: true },
      {
        onSuccess: () => revalidateSession(),
      }
    );
  }, [router, revalidateSession, authClient]);

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
    >
      {text}
    </Button>
  );
};
