'use client';

import { useSession } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { App_Home_Path } from '@intlayer/design-system/routes';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { type FC, useEffect } from 'react';
import {
  type AuthenticationBarrierProps,
  accessValidation,
} from './accessValidation';

type AuthenticationBarrierPropsClient = Omit<
  AuthenticationBarrierProps,
  'sessionToken' | 'redirectionFunction'
> & {
  redirectionRoute?: string;
  originUrl?: string;
};

export const AuthenticationBarrierClient: FC<
  AuthenticationBarrierPropsClient
> = ({
  children,
  redirectionRoute = App_Home_Path,
  session: sessionProp,
  accessRule,
  isEnabled,
  originUrl,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { session: sessionClient } = useSession(sessionProp);

  const isLoading = sessionClient === undefined && sessionProp === undefined;

  useEffect(() => {
    // Do nothing if we have explicitly disabled it (the server has already made a decision)
    if (isEnabled === false) return;
    if (typeof sessionClient === 'undefined') return;

    const samePath =
      typeof window !== 'undefined' &&
      (redirectionRoute === pathname || redirectionRoute === originUrl);

    if (samePath) return;

    accessValidation(
      accessRule,
      sessionClient,
      (url) => navigate({ to: url as any, replace: true }),
      redirectionRoute,
      isEnabled
    );
  }, [
    accessRule,
    redirectionRoute,
    sessionClient,
    isEnabled,
    pathname,
    originUrl,
    navigate,
  ]);

  return <Loader isLoading={isLoading}>{children}</Loader>;
};
