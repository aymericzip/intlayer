'use client';

import { useLogout } from '../reactQuery';
import { useAuth } from '../useAuth';

export const useUser = () => {
  const { session, revalidateSession, setSession } = useAuth();
  const { mutate: logout } = useLogout();

  const status = session?.user ? 'authenticated' : 'unauthenticated';

  const isAuthenticated = status === 'authenticated';
  const isUnauthenticated = status === 'unauthenticated';

  const user = session?.user;

  const logoutHandle = async () => {
    setSession(null);
    logout();
  };

  return {
    isAuthenticated,
    isUnauthenticated,
    user,
    revalidateSession,
    logout: logoutHandle,
  };
};
