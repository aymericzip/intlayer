'use client';

import type { FC, ReactNode } from 'react';
import { useAuth, type AuthProviderProps } from '../AuthProvider';

export type AuthenticationBarrierProps = AuthProviderProps & {
  children?: ReactNode;
  accessRule?: 'public' | 'authenticated' | 'admin' | 'none-authenticated';
  redirectionRoute?: string;
  session?: AuthProviderProps['session'];
  /**
   * Function to replace for a nextjs redirection
   *
   * Example:
   * ```js
   * import { redirect } from 'next/navigation';
   * ...
   * redirectionMethod={(url) => redirect(url)}
   * ```
   */
  redirectionMethod?: (redirectionRoute: string) => void;
};

const redirect = (redirectionRoute: string) =>
  (window.location.href = redirectionRoute);

export const AuthenticationBarrier: FC<AuthenticationBarrierProps> = ({
  children,
  accessRule = 'public',
  redirectionRoute = '/',
  session: sessionProp,
  redirectionMethod = redirect,
}) => {
  const { session: sessionClient } = useAuth();

  const session = sessionClient ?? sessionProp;

  if (
    !session?.user &&
    (accessRule === 'authenticated' || accessRule === 'admin')
  ) {
    redirectionMethod(redirectionRoute);
  }

  if (session?.user && accessRule === 'none-authenticated') {
    redirectionMethod(redirectionRoute);
  }

  if (
    session?.user &&
    accessRule === 'admin' &&
    !session.user?.role.includes('admin')
  ) {
    redirectionMethod(redirectionRoute);
  }

  return children;
};
