import { useContext } from 'react';
import { useLogout } from '../../../hooks';
import { AuthContext } from '../AuthProvider';

export const useUser = () => {
  const { session, checkSession, setSession } = useContext(AuthContext);
  const { logout } = useLogout();

  const status = session?.user ? 'authenticated' : 'unauthenticated';

  const isAuthenticated = status === 'authenticated';
  const isUnauthenticated = status === 'unauthenticated';

  const user = session?.user;

  const logoutHandle = async () => {
    setSession(null);
    await logout().then(async () => {
      await checkSession();
    });
  };

  return {
    isAuthenticated,
    isUnauthenticated,
    user,
    checkSession,
    logout: logoutHandle,
  };
};
