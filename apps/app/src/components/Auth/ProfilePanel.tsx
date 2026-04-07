'use client';

import { Button } from '@intlayer/design-system/button';
import { useUser } from '@intlayer/design-system/hooks';
import { App_Auth_ChangePassword_Path } from '@intlayer/design-system/routes';
import { useNavigate } from '@tanstack/react-router';
import type { FC } from 'react';

export const ProfilePanel: FC = () => {
  const { isUnauthenticated, user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout()
      .then(() => window.location.reload())
      .catch((err) => console.error(err));
  };

  if (isUnauthenticated) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-5">
      {user?.name && (
        <span className="whitespace-nowrap font-bold text-lg">{user.name}</span>
      )}
      {user?.email && (
        <span className="whitespace-nowrap text-base">{user.email}</span>
      )}
      <Button
        variant="link"
        color="text"
        onClick={() => navigate({ to: App_Auth_ChangePassword_Path as any })}
        label="Replace your password with a new one."
      >
        Change password
      </Button>
      <Button
        variant="outline"
        color="text"
        onClick={handleLogOut}
        label="Logout from app"
      >
        Logout
      </Button>
    </div>
  );
};
