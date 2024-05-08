import { useSession } from 'next-auth/react';

export const useUser = () => {
  const session = useSession();

  const isLoggedIn = session.status === 'authenticated';
  const isLoading = session.status === 'loading';
  const isUnauthenticated = session.status === 'unauthenticated';

  const name = session?.data?.user?.name ?? undefined;
  const email = session?.data?.user?.email ?? undefined;
  const imageURL = session?.data?.user?.image ?? undefined;

  return {
    isLoggedIn,
    isLoading,
    isUnauthenticated,
    name,
    email,
    imageURL,
  };
};
