'use client';

import { Loader } from '@intlayer/design-system';
import { useSession } from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import { type FC, useEffect } from 'react';
import { PagesRoutes } from '@/Routes';
import {
  type AuthenticationBarrierProps,
  accessValidation,
} from './accessValidation';

type AuthenticationBarrierPropsClient = Omit<
  AuthenticationBarrierProps,
  'sessionToken' | 'redirectionFunction'
> & {
  redirectionRoute?: PagesRoutes | string;
};

export const AuthenticationBarrierClient: FC<
  AuthenticationBarrierPropsClient
> = ({
  children,
  redirectionRoute = PagesRoutes.Home,
  session: sessionProp,
  accessRule,
  isEnabled,
}) => {
  const router = useRouter();
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
        router.push,
        redirectionRoute,
        isEnabled
      );
    }
  }, [accessRule, redirectionRoute, sessionClient, isEnabled]);

  return <Loader isLoading={isLoading}>{children}</Loader>;
};
