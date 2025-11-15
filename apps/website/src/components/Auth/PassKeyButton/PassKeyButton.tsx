'use client';

import { Button } from '@intlayer/design-system';
import { useSession } from '@intlayer/design-system/hooks';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { useRouter } from 'next/navigation';
import { type FC, useEffect } from 'react';

export const PasskeyButton: FC = () => {
  const router = useRouter();
  const { fetchSession } = useSession();
  const authClient = getAuthAPI().getAuthClient();

  useEffect(() => {
    authClient.signIn.passkey(
      { autoFill: true },
      {
        onSuccess() {
          fetchSession();
          router.push('/');
        },
      }
    );
  }, [router, fetchSession]);

  return (
    <Button
      variant="outline"
      className="w-full"
      label="Use Passkey"
      onClick={() =>
        authClient.signIn.passkey(undefined, {
          onSuccess() {
            fetchSession();
            router.push('/');
          },
        })
      }
    >
      Use Passkey
    </Button>
  );
};
