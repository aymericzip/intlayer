import { backendAPI } from '@utils/backend-api';
import { useContext } from 'react';
import { SessionContext } from '@/providers/AuthProvider';

export const useUser = () => {
  const { session, checkSession, setSession } = useContext(SessionContext);

  const status = session?.user ? 'authenticated' : 'unauthenticated';

  const isAuthenticated = status === 'authenticated';
  const isUnauthenticated = status === 'unauthenticated';

  const user = session?.user;

  const logout = async () => {
    setSession(null);
    await backendAPI.auth.logout().then(() => {
      checkSession();
    });
  };

  return {
    isAuthenticated,
    isUnauthenticated,
    user,
    logout,
  };
};
