import { intlayerAPI } from '@intlayer/core';
import { useContext } from 'react';
import { SessionContext } from '../AuthProvider';

export const useUser = () => {
  const { session, checkSession, setSession } = useContext(SessionContext);

  const status = session?.user ? 'authenticated' : 'unauthenticated';

  const isAuthenticated = status === 'authenticated';
  const isUnauthenticated = status === 'unauthenticated';

  const user = session?.user;

  const logout = async () => {
    setSession(null);
    await intlayerAPI.auth.logout().then(async () => {
      await checkSession();
    });
  };

  return {
    isAuthenticated,
    isUnauthenticated,
    user,
    logout,
  };
};
