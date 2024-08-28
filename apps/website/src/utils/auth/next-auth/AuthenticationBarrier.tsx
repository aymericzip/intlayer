import { redirect } from 'next/navigation';
import type { FC, ReactNode } from 'react';
import type { NextAuthProviderProps } from '@/providers/NextAuthProvider';
import { PagesRoutes } from '@/Routes';

export type AuthenticationBarrierProps = NextAuthProviderProps & {
  children?: ReactNode;
  accessRule?: 'public' | 'authenticated' | 'admin' | 'none-authenticated';
  redirectionRoute?: string;
};

export const AuthenticationBarrier: FC<AuthenticationBarrierProps> = ({
  children,
  accessRule = 'public',
  redirectionRoute = PagesRoutes.Home,
  session,
}) => {
  if (!session && (accessRule === 'authenticated' || accessRule === 'admin')) {
    redirect(redirectionRoute);
  }

  if (session && accessRule === 'none-authenticated') {
    redirect(redirectionRoute);
  }

  if (
    session &&
    accessRule === 'admin' &&
    !session.user.role.includes('admin')
  ) {
    redirect(redirectionRoute);
  }

  return children;
};
