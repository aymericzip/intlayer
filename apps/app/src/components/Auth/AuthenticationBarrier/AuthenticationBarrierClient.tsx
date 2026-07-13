import { useSession } from '@intlayer/design-system/api';
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
  /**
   * Redirect target used when the failure is "unauthenticated".
   * Falls back to `redirectionRoute` when not provided.
   */
  unauthenticatedRedirectionRoute?: string;
  originUrl?: string;
  /**
   * If false, render the loader before redirecting if access is not allowed.
   * If true, render the children before redirecting if access is not allowed.
   */
  isPermissive?: boolean;
};

export const AuthenticationBarrierClient: FC<
  AuthenticationBarrierPropsClient
> = ({
  children,
  redirectionRoute = App_Home_Path,
  unauthenticatedRedirectionRoute,
  session: sessionProp,
  accessRule,
  isEnabled,
  originUrl,
  isPermissive = true,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { session: sessionClient } = useSession(sessionProp);

  const isLoading = sessionClient === undefined && sessionProp === undefined;

  useEffect(() => {
    // Do nothing if we have explicitly disabled it (the server has already made a decision)
    if (isEnabled === false) return;
    if (typeof sessionClient === 'undefined') return;

    accessValidation(
      accessRule,
      sessionClient,
      (fallbackUrl, failureReason) => {
        const url =
          failureReason === 'unauthenticated'
            ? (unauthenticatedRedirectionRoute ?? fallbackUrl)
            : fallbackUrl;

        // Never navigate to the page we are already on. This also breaks the
        // redirect loop where a barrier still mounted during a route
        // transition re-fires against the destination pathname.
        const urlPathname = url?.split('?')[0];
        const samePath =
          typeof window !== 'undefined' &&
          (url === pathname || urlPathname === pathname || url === originUrl);

        if (samePath) return;

        navigate({ to: url, replace: true });
      },
      redirectionRoute,
      isEnabled
    );
  }, [
    accessRule,
    redirectionRoute,
    unauthenticatedRedirectionRoute,
    sessionClient,
    isEnabled,
    pathname,
    originUrl,
    navigate,
  ]);

  if (isPermissive) {
    return children;
  }

  return <Loader isLoading={isLoading}>{children}</Loader>;
};
