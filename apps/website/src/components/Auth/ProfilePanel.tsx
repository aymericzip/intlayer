'use client';

import { Button } from '@intlayer/design-system';
import { useUser } from '@utils/auth/useUser';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

export const ProfilePanel: FC = () => {
  const { isUnauthenticated, user, logout } = useUser();
  const router = useRouter();

  if (isUnauthenticated) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-5">
      {user?.name && (
        <span className="whitespace-nowrap text-lg font-bold">{user.name}</span>
      )}
      {user?.email && (
        <span className="whitespace-nowrap text-base">{user.email}</span>
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
        onClick={logout}
        label="Logout from app"
      >
        Logout
      </Button>
    </div>
  );
};
