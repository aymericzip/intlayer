'use client';

import { Button } from '@intlayer/design-system';
import { useSession, useSignInPasskey } from '@intlayer/design-system/hooks';
import { getAuthAPI } from '@intlayer/design-system/libs';
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
        onSuccess() {
          revalidateSession();
          router.push('/');
        },
      }
    );
  }, [router, revalidateSession, authClient]);

  const handleSignIn = () => {
    signInPasskey(undefined, {
      onSuccess: () => {
        revalidateSession();
        router.push('/');
      },
    });
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      label={ariaLabel.value}
      onClick={handleSignIn}
    >
      {text}
    </Button>
  );
};
