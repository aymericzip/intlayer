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
  accessRule: barrierType = 'public',
  redirectionRoute = PagesRoutes.Home,
  session,
}) => {
  if (
    !session &&
    (barrierType === 'authenticated' || barrierType === 'admin')
  ) {
    redirect(redirectionRoute);
  }

  if (session && barrierType === 'none-authenticated') {
    redirect(redirectionRoute);
  }

  if (
    session &&
    barrierType === 'admin' &&
    !session.user.role.includes('admin')
  ) {
    redirect(redirectionRoute);
  }

  return <>{children}</>;
};
