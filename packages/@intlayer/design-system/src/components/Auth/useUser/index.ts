'use client';

import { useLogout } from '../../../hooks';
import { useAuth } from '../useAuth';

export const useUser = () => {
  const { session, revalidateSession, setSession } = useAuth();
  const { logout } = useLogout();

  const status = session?.user ? 'authenticated' : 'unauthenticated';

  const isAuthenticated = status === 'authenticated';
  const isUnauthenticated = status === 'unauthenticated';

  const user = session?.user;

  const logoutHandle = async () => {
    setSession(null);
    await logout();
  };

  return {
    isAuthenticated,
    isUnauthenticated,
    user,
    revalidateSession,
    logout: logoutHandle,
  };
};
