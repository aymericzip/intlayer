'use client';

import { useContext, useEffect, type FC } from 'react';
import { SessionContext } from '../AuthProvider';
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
  const { session: sessionClient, setSession } = useContext(SessionContext);

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
