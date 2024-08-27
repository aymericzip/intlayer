'use client';

import { Button } from '@intlayer/design-system';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';
import { useUser } from '@/utils/auth/next-auth/useUser';

export const ProfilePanel: FC = () => {
  const { isUnauthenticated, user } = useUser();
  const router = useRouter();

  if (isUnauthenticated) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-5">
      {user?.name && (
        <span className="whitespace-nowrap text-lg font-bold">{user.name}</span>
      )}
      <Button
        variant="link"
        color="text"
        onClick={() => router.push(PagesRoutes.Auth_ChangePassword)}
        label="Replace your password with a new one."
      >
        Change password
      </Button>
      <Button
        variant="outline"
        color="text"
        onClick={() => signOut()}
        label="Logout from app"
      >
        Logout
      </Button>
    </div>
  );
};
