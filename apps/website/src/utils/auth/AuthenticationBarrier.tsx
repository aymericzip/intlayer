'use client';

import { redirect } from 'next/navigation';
import type { FC, ReactNode } from 'react';
import { useAuth, type AuthProviderProps } from '@/providers/AuthProvider';
import { PagesRoutes } from '@/Routes';

export type AuthenticationBarrierProps = AuthProviderProps & {
  children?: ReactNode;
  accessRule?: 'public' | 'authenticated' | 'admin' | 'none-authenticated';
  redirectionRoute?: string;
  session?: AuthProviderProps['session'];
};

export const AuthenticationBarrier: FC<AuthenticationBarrierProps> = ({
  children,
  accessRule = 'public',
  redirectionRoute = PagesRoutes.Home,
  session: sessionProp,
}) => {
  const { session: sessionClient } = useAuth();

  const session = sessionClient ?? sessionProp;

  if (
    !session?.user &&
    (accessRule === 'authenticated' || accessRule === 'admin')
  ) {
    redirect(redirectionRoute);
  }

  if (session?.user && accessRule === 'none-authenticated') {
    redirect(redirectionRoute);
  }

  if (
    session?.user &&
    accessRule === 'admin' &&
    !session.user?.role.includes('admin')
  ) {
    redirect(redirectionRoute);
  }

  return children;
};
