'use client';

import { useEffect, type FC } from 'react';
import { useAuth } from '../AuthProvider';
import { accessValidation } from './accessValidation';
import type { AuthenticationBarrierProps } from '.';

export type AuthenticationBarrierClientProps = Omit<
  AuthenticationBarrierProps,
  'sessionToken' | 'redirectionFunction'
>;

export const AuthenticationBarrierClient: FC<
  AuthenticationBarrierClientProps
> = ({
  children,
  accessRule = 'public',
  redirectionRoute = '/',
  session: sessionProp,
}) => {
  const { session: sessionClient, setSession } = useAuth();

  useEffect(() => {
    if (!sessionClient) {
      setSession(sessionProp ?? null);
    }
  }, [sessionClient, sessionProp, setSession]);

  useEffect(() => {
    if (typeof sessionClient !== 'undefined') {
      accessValidation(
        accessRule,
        sessionClient,
        (redirectionRoute) => {
          window.location.href = redirectionRoute;
        },
        redirectionRoute
      );
    }
  }, [accessRule, redirectionRoute, sessionClient]);

  return children;
};
