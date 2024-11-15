'use client';

import { useEffect, type FC } from 'react';
import { Loader } from '../../Loader';
import { useSession } from '../useAuth/useSession';
import { accessValidation } from './accessValidation';
import type { AuthenticationBarrierProps } from '.';

export type AuthenticationBarrierClientProps = Omit<
  AuthenticationBarrierProps,
  'sessionToken'
>;

export const AuthenticationBarrierClient: FC<
  AuthenticationBarrierClientProps
> = ({
  children,
  accessRule = 'public',
  redirectionRoute = '/',
  session: sessionProp,
  redirectionFunction,
}) => {
  const { session: sessionClient, setSession } = useSession(sessionProp);
  const isLoading = sessionClient === undefined && sessionProp === undefined;

  useEffect(() => {
    if (!sessionClient && sessionProp) {
      setSession(sessionProp ?? null);
    }
  }, [sessionClient, sessionProp, setSession]);

  useEffect(() => {
    if (typeof sessionClient !== 'undefined') {
      accessValidation(
        accessRule,
        sessionClient,
        redirectionFunction,
        redirectionRoute
      );
    }
  }, [accessRule, redirectionRoute, redirectionFunction, sessionClient]);

  return <Loader isLoading={isLoading}>{children}</Loader>;
};
