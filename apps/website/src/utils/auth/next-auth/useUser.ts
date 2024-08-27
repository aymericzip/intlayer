import { useSession } from 'next-auth/react';

export const useUser = () => {
  const session = useSession();

  const status = session?.status ?? 'unauthenticated';

  const isLoggedIn = status === 'authenticated';
  const isLoading = status === 'loading';
  const isUnauthenticated = status === 'unauthenticated';

  const user = session?.data?.user;

  return {
    isLoggedIn,
    isLoading,
    isUnauthenticated,
    user,
  };
};
