import { useSession, signOut } from 'next-auth/react';

export const useUser = () => {
  const session = useSession();

  const status = session?.status ?? 'unauthenticated';

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const isUnauthenticated = status === 'unauthenticated';

  const user = session?.data?.user;

  return {
    isAuthenticated,
    isLoading,
    isUnauthenticated,
    user,
    signOut,
  };
};
